import Papa from 'papaparse'

export const csvParser = {
  // Parse CSV file from URL
  parseFromUrl: async (url) => {
    try {
      const response = await fetch(url)
      const csvText = await response.text()
      
      return new Promise((resolve, reject) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            resolve(results.data)
          },
          error: (error) => {
            reject(error)
          }
        })
      })
    } catch (error) {
      console.error('Error parsing CSV from URL:', error)
      throw error
    }
  },

  // Parse CSV string
  parseString: (csvString) => {
    return new Promise((resolve, reject) => {
      Papa.parse(csvString, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          resolve(results.data)
        },
        error: (error) => {
          reject(error)
        }
      })
    })
  },

  // Convert data to CSV
  toCSV: (data) => {
    return Papa.unparse(data)
  },

  // Validate guest data
  validateGuestData: (guests) => {
    return guests.filter(guest => {
      return guest && 
             guest.name && 
             typeof guest.name === 'string' && 
             guest.name.trim().length > 0
    }).map(guest => ({
      name: guest.name.trim(),
      relation: guest.relation || 'Tamu',
      seat: guest.seat || '',
      group: guest.group || 'Umum',
      status: guest.status || 'pending'
    }))
  },

  // Search guests by name
  searchGuests: (guests, searchTerm) => {
    if (!searchTerm) return guests
    
    const term = searchTerm.toLowerCase()
    return guests.filter(guest => 
      guest.name.toLowerCase().includes(term) ||
      (guest.relation && guest.relation.toLowerCase().includes(term)) ||
      (guest.group && guest.group.toLowerCase().includes(term))
    )
  },

  // Group guests by relation
  groupGuestsByRelation: (guests) => {
    const groups = {}
    
    guests.forEach(guest => {
      const relation = guest.relation || 'Lainnya'
      if (!groups[relation]) {
        groups[relation] = []
      }
      groups[relation].push(guest)
    })
    
    return groups
  },

  // Sort guests alphabetically
  sortGuests: (guests, field = 'name') => {
    return [...guests].sort((a, b) => {
      const aValue = a[field] || ''
      const bValue = b[field] || ''
      return aValue.localeCompare(bValue)
    })
  },

  // Generate seating arrangement
  generateSeatingArrangement: (guests, seatsPerTable = 8) => {
    const tables = []
    let currentTable = []
    
    guests.forEach((guest, index) => {
      if (currentTable.length >= seatsPerTable) {
        tables.push([...currentTable])
        currentTable = []
      }
      currentTable.push({
        ...guest,
        seatNumber: `T${tables.length + 1}-S${currentTable.length + 1}`
      })
    })
    
    if (currentTable.length > 0) {
      tables.push(currentTable)
    }
    
    return tables
  }
}

// Default guest list structure
export const defaultGuestStructure = {
  name: 'Nama Lengkap',
  relation: 'Hubungan',
  seat: 'Nomor Kursi',
  group: 'Grup',
  status: 'Status',
  phone: 'Nomor Telepon',
  email: 'Email',
  plusOne: 'Tambah Satu',
  dietary: 'Kebutuhan Makanan'
}

// Sample guest data for development
export const sampleGuests = [
  { name: 'Bapak Budi & Ibu Ani', relation: 'Keluarga', seat: 'A1', group: 'Keluarga Mempelai Pria' },
  { name: 'Saudara Rudi', relation: 'Teman', seat: 'B2', group: 'Teman Mempelai Pria' },
  { name: 'Bapak Joko & Ibu Sari', relation: 'Rekan Kerja', seat: 'A3', group: 'Rekan Kerja' },
  { name: 'Saudari Maya', relation: 'Keluarga', seat: 'B1', group: 'Keluarga Mempelai Wanita' }
]
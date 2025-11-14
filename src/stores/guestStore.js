import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import Papa from 'papaparse'

export const useGuestStore = defineStore('guest', () => {
  const guests = ref([])
  const currentGuest = ref(null)
  const loading = ref(false)

  const loadGuests = async () => {
    loading.value = true
    try {
      const response = await fetch('/data/guests.csv')
      const csvText = await response.text()
      
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          guests.value = results.data.filter(guest => guest.name)
          loading.value = false
        },
        error: (error) => {
          console.error('Error loading guests:', error)
          loading.value = false
        }
      })
    } catch (error) {
      console.error('Failed to load guests:', error)
      loading.value = false
    }
  }

  const setCurrentGuest = (guestName) => {
    if (!guestName) return
    
    currentGuest.value = guests.value.find(
      guest => guest.name.toLowerCase().includes(guestName.toLowerCase())
    ) || { name: guestName }
  }

  const isInvited = computed(() => {
    return currentGuest.value && guests.value.some(
      guest => guest.name.toLowerCase().includes(currentGuest.value.name.toLowerCase())
    )
  })

  return {
    guests,
    currentGuest,
    loading,
    loadGuests,
    setCurrentGuest,
    isInvited
  }
})
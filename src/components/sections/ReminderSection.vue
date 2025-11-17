<template>
  <section ref="sectionRef"
    class="reminder-section py-20 bg-gradient-to-b from-soft-pink via-ivory to-rose-200 rounded-4xl relative overflow-hidden">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl md:text-5xl font-great-vibes text-gold text-center mb-4">
        Pengingat Acara
      </h2>
      <p class="text-gray-600 font-lora text-lg text-center mb-12 max-w-2xl mx-auto">
        Jangan sampai terlewat momen bahagia kami
      </p>

      <div class="max-w-4xl mx-auto">
        <!-- Reminder Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div v-for="(reminder, index) in reminders" :key="index"
            class="reminder-card wedding-frame bg-white p-6 rounded-xl text-center transform hover:scale-105 transition duration-300 cursor-pointer"
            @click="handleReminderAction(reminder.action)">
            <div class="text-4xl mb-4">{{ reminder.icon }}</div>
            <h3 class="text-xl font-cormorant text-deep-red font-semibold mb-3">
              {{ reminder.title }}
            </h3>
            <p class="text-gray-600 font-lora text-sm leading-relaxed mb-4">
              {{ reminder.description }}
            </p>
            <button class="text-gold font-semibold text-sm hover:text-rose-gold transition duration-300">
              {{ reminder.buttonText }}
            </button>
          </div>
        </div>

        <!-- Additional Info -->
        <div class="text-center">
          <div class="wedding-frame bg-white p-8 rounded-xl inline-block max-w-2xl">
            <h3 class="text-2xl font-cormorant text-deep-red font-semibold mb-4">
              Informasi Penting
            </h3>
            <div class="space-y-3 font-lora text-gray-700 text-left">
              <p class="flex items-center">
                <span class="mr-3 text-gold">📅</span>
                <span><strong>Tanggal:</strong> Sabtu, 25 Desember 2024</span>
              </p>
              <p class="flex items-center">
                <span class="mr-3 text-gold">🕗</span>
                <span><strong>Waktu:</strong> 11:00 - 14:00 WIB</span>
              </p>
              <p class="flex items-center">
                <span class="mr-3 text-gold">📍</span>
                <span><strong>Lokasi:</strong> Ballroom Hotel Grand Luxury, Jakarta</span>
              </p>
              <p class="flex items-center">
                <span class="mr-3 text-gold">👔</span>
                <span><strong>Dress Code:</strong> Formal / Traditional Attire</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-4 justify-center mt-8">
          <button @click="downloadICS"
            class="flex items-center gap-2 bg-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition duration-300">
            <span>📥</span>
            <span>Download Undangan</span>
          </button>
          <button @click="shareInvitation"
            class="flex items-center gap-2 bg-forest-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition duration-300">
            <span>📤</span>
            <span>Bagikan Undangan</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Success Notification -->
    <div v-if="showNotification"
      class="fixed top-4 right-4 bg-gold text-white px-6 py-3 rounded-lg shadow-lg transition duration-300 z-50">
      ✅ {{ notificationMessage }}
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { weddingAnimations, createScrollTrigger } from '../../utils/animations'

const sectionRef = ref(null)
const showNotification = ref(false)
const notificationMessage = ref('')

const reminders = ref([
  {
    icon: '📅',
    title: 'Simpan ke Kalender',
    description: 'Tambahkan acara ini ke kalender Anda agar tidak terlewat',
    buttonText: 'Tambahkan ke Kalender',
    action: 'addToCalendar'
  },
  {
    icon: '📍',
    title: 'Simpan Lokasi',
    description: 'Simpan lokasi venue untuk memudahkan navigasi',
    buttonText: 'Simpan Lokasi',
    action: 'saveLocation'
  },
  {
    icon: '⏰',
    title: 'Setel Pengingat',
    description: 'Dapatkan notifikasi sebelum acara dimulai',
    buttonText: 'Aktifkan Pengingat',
    action: 'setReminder'
  }
])

const showNotificationMessage = (message) => {
  notificationMessage.value = message
  showNotification.value = true
  setTimeout(() => {
    showNotification.value = false
  }, 3000)
}

const handleReminderAction = (action) => {
  switch (action) {
    case 'addToCalendar':
      addToCalendar()
      break
    case 'saveLocation':
      saveLocation()
      break
    case 'setReminder':
      setReminder()
      break
  }
}

const addToCalendar = () => {
  const eventDetails = {
    title: 'Pernikahan Ahmad & Sari',
    description: 'Resepsi pernikahan Ahmad & Sari di Hotel Grand Luxury',
    location: 'Hotel Grand Luxury, Jl. Sudirman No. 123, Jakarta Selatan',
    startTime: '20241225T110000',
    endTime: '20241225T140000'
  }

  const calendarContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${eventDetails.title}
DESCRIPTION:${eventDetails.description}
LOCATION:${eventDetails.location}
DTSTART:20241225T110000
DTEND:20241225T140000
END:VEVENT
END:VCALENDAR`

  const blob = new Blob([calendarContent], { type: 'text/calendar' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'Pernikahan-Ahmad-Sari.ics'
  link.click()
  URL.revokeObjectURL(url)

  showNotificationMessage('Berhasil ditambahkan ke kalender')
}

const saveLocation = () => {
  if (navigator.share) {
    navigator.share({
      title: 'Lokasi Pernikahan Ahmad & Sari',
      text: 'Hotel Grand Luxury, Jl. Sudirman No. 123, Jakarta Selatan',
      url: window.location.href
    })
  } else {
    const address = encodeURIComponent('Hotel Grand Luxury, Jl. Sudirman No. 123, Jakarta Selatan')
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank')
  }

  showNotificationMessage('Lokasi berhasil disimpan')
}

const setReminder = () => {
  if ('Notification' in window && Notification.permission === 'granted') {
    // Schedule notification for 1 hour before event
    const eventTime = new Date('2024-12-25T10:00:00') // 1 hour before
    const now = new Date()
    const timeUntilEvent = eventTime.getTime() - now.getTime()

    if (timeUntilEvent > 0) {
      setTimeout(() => {
        new Notification('Pengingat Pernikahan', {
          body: 'Pernikahan Ahmad & Sari akan dimulai dalam 1 jam!',
          icon: '/vite.svg'
        })
      }, timeUntilEvent)
    }

    showNotificationMessage('Pengingat berhasil diaktifkan')
  } else if ('Notification' in window && Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        showNotificationMessage('Pengingat berhasil diaktifkan')
      }
    })
  } else {
    showNotificationMessage('Pengingat browser tidak didukung')
  }
}

const downloadICS = () => {
  addToCalendar() // Reuse calendar function
}

const shareInvitation = () => {
  if (navigator.share) {
    navigator.share({
      title: 'Undangan Pernikahan Ahmad & Sari',
      text: 'You are invited to the wedding of Ahmad & Sari',
      url: window.location.href
    })
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(window.location.href)
    showNotificationMessage('Link undangan berhasil disalin')
  }
}

onMounted(() => {
  if (sectionRef.value) {
    createScrollTrigger(sectionRef.value, (element) => {
      weddingAnimations.staggerGrid(element.querySelectorAll('.reminder-card'), 0.1)
    })
  }
})
</script>

<style scoped>
.reminder-section {
  position: relative;
}

.reminder-card {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.reminder-card:hover {
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.2);
}
</style>
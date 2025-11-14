<template>
  <section 
    ref="sectionRef"
    class="maps-section py-20 bg-white"
  >
    <div class="container mx-auto px-4">
      <h2 class="text-4xl md:text-5xl font-great-vibes text-gold text-center mb-4">
        Lokasi Acara
      </h2>
      <p class="text-gray-600 font-lora text-lg text-center mb-12 max-w-2xl mx-auto">
        Tempat diselenggarakannya resepsi pernikahan kami
      </p>

      <div class="max-w-6xl mx-auto">
        <!-- Map Container -->
        <div class="wedding-frame overflow-hidden rounded-2xl mb-8">
          <div class="bg-gray-200 h-96 flex items-center justify-center relative">
            <!-- Static Map Image as Fallback -->
            <img 
              src="https://maps.googleapis.com/maps/api/staticmap?center=Hotel+Grand+Luxury,Jakarta&zoom=15&size=800x400&markers=color:red%7Clabel:V%7CHotel+Grand+Luxury,Jakarta&key=YOUR_API_KEY"
              alt="Peta Lokasi Hotel Grand Luxury"
              class="w-full h-full object-cover"
              @error="handleMapError"
            >
            
            <!-- Fallback if map image fails -->
            <div 
              v-if="mapError"
              class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200"
            >
              <div class="text-center text-gray-500">
                <div class="text-5xl mb-4">🗺️</div>
                <p class="text-xl font-lora mb-2">Peta Lokasi</p>
                <p class="text-sm">Hotel Grand Luxury, Jakarta</p>
              </div>
            </div>

            <!-- Map Overlay -->
            <div class="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3">
              <button 
                @click="openGoogleMaps"
                class="flex items-center gap-2 text-sm text-gray-700 hover:text-gold transition duration-300"
              >
                <span>🗺️</span>
                <span>Buka di Google Maps</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Location Details -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Venue Info -->
          <div class="wedding-frame bg-soft-pink bg-opacity-30 p-6 rounded-xl">
            <h3 class="text-2xl font-cormorant text-deep-red font-semibold mb-4 flex items-center">
              <span class="mr-3">🏨</span>
              Hotel Grand Luxury
            </h3>
            <div class="space-y-3 font-lora text-gray-700">
              <p class="flex items-center">
                <span class="mr-3">📍</span>
                Jl. Sudirman No. 123, Jakarta Selatan
              </p>
              <p class="flex items-center">
                <span class="mr-3">📅</span>
                Sabtu, 25 Desember 2024
              </p>
              <p class="flex items-center">
                <span class="mr-3">🕗</span>
                11:00 - 14:00 WIB
              </p>
              <p class="flex items-center">
                <span class="mr-3">📞</span>
                (021) 1234-5678
              </p>
            </div>
          </div>

          <!-- Transportation -->
          <div class="wedding-frame bg-champagne bg-opacity-30 p-6 rounded-xl">
            <h3 class="text-2xl font-cormorant text-deep-red font-semibold mb-4 flex items-center">
              <span class="mr-3">🚗</span>
              Akses Transportasi
            </h3>
            <div class="space-y-3 font-lora text-gray-700">
              <p>• 5 menit dari Stasiun Sudirman</p>
              <p>• 10 menit dari Halte TransJakarta</p>
              <p>• Parkir tersedia untuk 200 kendaraan</p>
              <p>• Valet service tersedia</p>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-4 justify-center mt-8">
          <button 
            @click="openGoogleMaps"
            class="flex items-center gap-2 bg-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition duration-300"
          >
            <span>🗺️</span>
            <span>Buka Google Maps</span>
          </button>
          <button 
            @click="openWaze"
            class="flex items-center gap-2 bg-forest-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition duration-300"
          >
            <span>🚗</span>
            <span>Buka Waze</span>
          </button>
          <button 
            @click="saveToCalendar"
            class="flex items-center gap-2 bg-rose-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition duration-300"
          >
            <span>📅</span>
            <span>Simpan ke Kalender</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { weddingAnimations, createScrollTrigger } from '../../utils/animations'

const sectionRef = ref(null)
const mapError = ref(false)

const handleMapError = () => {
  mapError.value = true
}

const openGoogleMaps = () => {
  const address = encodeURIComponent('Hotel Grand Luxury, Jl. Sudirman No. 123, Jakarta Selatan')
  window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank')
}

const openWaze = () => {
  const address = encodeURIComponent('Hotel Grand Luxury, Jl. Sudirman No. 123, Jakarta Selatan')
  window.open(`https://www.waze.com/ul?q=${address}&navigate=yes`, '_blank')
}

const saveToCalendar = () => {
  const eventDetails = {
    title: 'Pernikahan Ahmad & Sari',
    description: 'Resepsi pernikahan Ahmad & Sari di Hotel Grand Luxury',
    location: 'Hotel Grand Luxury, Jl. Sudirman No. 123, Jakarta Selatan',
    startTime: '2024-12-25T11:00:00',
    endTime: '2024-12-25T14:00:00'
  }

  // Simple calendar download
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
}

onMounted(() => {
  if (sectionRef.value) {
    createScrollTrigger(sectionRef.value, (element) => {
      weddingAnimations.fadeInUp(element, 0.2)
    })
  }
})
</script>

<style scoped>
.maps-section {
  background-image: 
    radial-gradient(circle at 10% 20%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 90% 80%, rgba(183, 110, 121, 0.05) 0%, transparent 50%);
}
</style>
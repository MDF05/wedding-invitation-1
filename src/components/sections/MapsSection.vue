<template>
  <section ref="sectionRef"
    class="maps-section py-20 relative overflow-hidden  bg-gradient-to-b from-soft-pink via-ivory to-rose-200 rounded-4xl">
    <!-- 3D Floating Petals -->
    <div class="petals-container pointer-events-none">
      <div v-for="n in 15" :key="n" class="petal"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <h2 class="text-4xl md:text-5xl font-great-vibes text-gold text-center mb-4 fade-title">
        Lokasi Acara
      </h2>

      <p class="text-gray-600 font-lora text-lg text-center mb-12 max-w-2xl mx-auto fade-subtitle">
        Tempat diselenggarakannya resepsi pernikahan kami
      </p>

      <!-- MAP WRAPPER -->
      <div class="max-w-6xl mx-auto">
        <div class="wedding-frame overflow-hidden rounded-3xl mb-12 shadow-2xl map-tilt">
          <div class="relative bg-gray-200 h-[420px] md:h-[480px] flex items-center justify-center map-glow">
            <img
              src="https://maps.googleapis.com/maps/api/staticmap?center=Hotel+Grand+Luxury,Jakarta&zoom=15&size=800x400&markers=color:red%7Clabel:V%7CHotel+Grand+Luxury,Jakarta&key=YOUR_API_KEY"
              alt="Peta Lokasi Hotel Grand Luxury" class="w-full h-full object-cover" @error="handleMapError">

            <!-- Fallback -->
            <div v-if="mapError"
              class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <div class="text-center text-gray-500">
                <div class="text-5xl mb-4">🗺️</div>
                <p class="text-xl font-lora mb-2">Peta Lokasi</p>
                <p class="text-sm">Hotel Grand Luxury, Jakarta</p>
              </div>
            </div>

            <!-- Floating Action Button -->
            <div
              class="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-3 hover:scale-105 transition">
              <button @click="openGoogleMaps"
                class="flex items-center gap-2 text-sm text-gray-700 hover:text-gold transition">
                <span>🗺️</span>
                <span>Buka di Google Maps</span>
              </button>
            </div>
          </div>
        </div>

        <!-- DETAILS GRID -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 fade-cards">
          <!-- Venue Info -->
          <div class="wedding-card">
            <h3 class="card-title"><span class="mr-3">🏨</span> Hotel Grand Luxury</h3>
            <div class="space-y-3 font-lora text-gray-700">
              <p class="flex items-center"><span class="mr-3">📍</span> Jl. Sudirman No. 123, Jakarta Selatan</p>
              <p class="flex items-center"><span class="mr-3">📅</span> Sabtu, 25 Desember 2024</p>
              <p class="flex items-center"><span class="mr-3">🕗</span> 11:00 - 14:00 WIB</p>
              <p class="flex items-center"><span class="mr-3">📞</span> (021) 1234-5678</p>
            </div>
          </div>

          <!-- Transportation -->
          <div class="wedding-card">
            <h3 class="card-title"><span class="mr-3">🚗</span> Akses Transportasi</h3>
            <div class="space-y-3 font-lora text-gray-700">
              <p>• 5 menit dari Stasiun Sudirman</p>
              <p>• 10 menit dari Halte TransJakarta</p>
              <p>• Parkir tersedia untuk 200 kendaraan</p>
              <p>• Valet service tersedia</p>
            </div>
          </div>
        </div>

        <!-- BUTTONS -->
        <div class="flex flex-wrap gap-4 justify-center mt-10 fade-buttons">
          <button @click="openGoogleMaps" class="btn-map">🗺️ Buka Google Maps</button>
          <button @click="openWaze" class="btn-waze">🚗 Buka Waze</button>
          <button @click="saveToCalendar" class="btn-calendar">📅 Simpan ke Kalender</button>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { weddingAnimations, createScrollTrigger } from '../../utils/animations'
import VanillaTilt from 'vanilla-tilt'

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
  const calendarContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Pernikahan Ahmad & Sari
DESCRIPTION:Resepsi pernikahan Ahmad & Sari di Hotel Grand Luxury
LOCATION:Hotel Grand Luxury, Jl. Sudirman No. 123, Jakarta Selatan
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
    // fade-in animation
    createScrollTrigger(sectionRef.value, () => {
      weddingAnimations.fadeInUp(sectionRef.value, 0.2)
    })
  }

  // Tilt map frame
  const tiltElement = document.querySelector(".map-tilt")
  if (tiltElement) {
    VanillaTilt.init(tiltElement, {
      max: 10,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
    })
  }
})
</script>

<style scoped>
/* .maps-section {
  background-image:
    radial-gradient(circle at 10% 20%, rgba(212, 175, 55, 0.05), transparent 60%),
    radial-gradient(circle at 90% 80%, rgba(195, 135, 150, 0.08), transparent 60%);
} */

/* Petals */
.petal {
  position: absolute;
  width: 30px;
  height: 30px;
  background-image: url('/img/petal-red.png');
  background-size: cover;
  opacity: 0.8;
  animation: fall 8s linear infinite;
}

@keyframes fall {
  0% {
    transform: translateY(-100px) rotateZ(0);
    opacity: 0;
  }

  20% {
    opacity: 0.8;
  }

  100% {
    transform: translateY(900px) rotateZ(360deg);
    opacity: 0;
  }
}

.petal:nth-child(odd) {
  animation-duration: 10s;
}

.petal:nth-child(even) {
  animation-duration: 12s;
}

/* Cards */
.wedding-card {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(6px);
  padding: 24px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 10px 25px rgba(212, 175, 55, 0.15);
  transition: 0.2s;
}

.wedding-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(212, 175, 55, 0.25);
}

.card-title {
  font-size: 1.7rem;
  font-family: 'Cormorant', serif;
  color: #8c0f1a;
  font-weight: bold;
  margin-bottom: 12px;
}

/* Buttons */
.btn-map,
.btn-waze,
.btn-calendar {
  padding: 12px 22px;
  border-radius: 12px;
  font-weight: 600;
  transition: 0.2s;
}

.btn-map {
  background: #d4af37;
  color: white;
}

.btn-map:hover {
  background: #c19b2e;
}

.btn-waze {
  background: #2d6a4f;
  color: white;
}

.btn-waze:hover {
  background: #23523d;
}

.btn-calendar {
  background: #c08475;
  color: white;
}

.btn-calendar:hover {
  background: #a86c5f;
}

/* Map glow */
.map-glow::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transform: translateX(-200%);
  animation: shine 3s infinite;
}

@keyframes shine {
  0% {
    transform: translateX(-200%);
  }

  100% {
    transform: translateX(200%);
  }
}
</style>

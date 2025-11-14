<template>
  <section 
    ref="sectionRef"
    class="live-stream-section py-20 bg-white"
  >
    <div class="container mx-auto px-4">
      <h2 class="text-4xl md:text-5xl font-great-vibes text-gold text-center mb-4">
        Live Streaming
      </h2>
      <p class="text-gray-600 font-lora text-lg text-center mb-12 max-w-2xl mx-auto">
        Saksikan momen bahagia kami secara virtual
      </p>

      <div class="max-w-4xl mx-auto">
        <!-- Live Stream Container -->
        <div 
          v-if="isLiveStreamAvailable"
          class="live-container wedding-frame overflow-hidden rounded-2xl mb-8 transform hover:scale-105 transition duration-300"
        >
          <!-- YouTube Embed -->
          <div class="aspect-w-16 aspect-h-9 bg-black">
            <div class="w-full h-96 bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
              <div class="text-center text-white">
                <div class="text-6xl mb-4">📹</div>
                <p class="text-xl font-lora mb-2">Live Streaming Akan Dimulai</p>
                <p class="text-gold font-playfair">Sabtu, 25 Desember 2024 - 11:00 WIB</p>
                
                <!-- Countdown to Live -->
                <div class="mt-6 flex justify-center gap-4">
                  <div class="text-center">
                    <div class="text-2xl font-bold">{{ liveCountdown.days }}</div>
                    <div class="text-sm">Hari</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold">{{ liveCountdown.hours }}</div>
                    <div class="text-sm">Jam</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold">{{ liveCountdown.minutes }}</div>
                    <div class="text-sm">Menit</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Not Available Message -->
        <div 
          v-else
          class="not-available text-center py-16"
        >
          <div class="wedding-frame bg-soft-pink bg-opacity-30 p-12 rounded-2xl inline-block">
            <div class="text-6xl mb-6">📡</div>
            <h3 class="text-2xl font-cormorant text-deep-red font-semibold mb-4">
              Live Streaming Tidak Tersedia
            </h3>
            <p class="text-gray-600 font-lora max-w-md mx-auto leading-relaxed">
              Acara pernikahan kami akan diselenggarakan secara privat. 
              Namun, Anda tetap dapat memberikan doa dan ucapan melalui website ini.
            </p>
          </div>
        </div>

        <!-- Live Stream Info -->
        <div 
          v-if="isLiveStreamAvailable"
          class="live-info grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <!-- Schedule -->
          <div class="wedding-frame bg-champagne bg-opacity-30 p-6 rounded-xl">
            <h3 class="text-xl font-cormorant text-deep-red font-semibold mb-4 flex items-center">
              <span class="mr-3">📅</span>
              Jadwal Live
            </h3>
            <div class="space-y-3 font-lora text-gray-700">
              <p><strong>Akad Nikah:</strong> 08:00 WIB</p>
              <p><strong>Resepsi:</strong> 11:00 WIB</p>
              <p><strong>Sesi Foto:</strong> 14:00 WIB</p>
            </div>
          </div>

          <!-- Instructions -->
          <div class="wedding-frame bg-soft-pink bg-opacity-30 p-6 rounded-xl">
            <h3 class="text-xl font-cormorant text-deep-red font-semibold mb-4 flex items-center">
              <span class="mr-3">💡</span>
              Cara Menonton
            </h3>
            <div class="space-y-2 font-lora text-gray-700 text-sm">
              <p>• Klik tombol play saat live dimulai</p>
              <p>• Pastikan koneksi internet stabil</p>
              <p>• Gunakan headphone untuk pengalaman terbaik</p>
              <p>• Berikan komentar di section ucapan</p>
            </div>
          </div>
        </div>

        <!-- Reminder Button -->
        <div 
          v-if="isLiveStreamAvailable"
          class="text-center mt-8"
        >
          <button 
            @click="setReminder"
            class="bg-gold text-white px-8 py-4 rounded-lg font-semibold hover:bg-rose-gold transition duration-300 flex items-center gap-2 mx-auto"
          >
            <span>⏰</span>
            <span>Ingatkan Saya</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { weddingAnimations, createScrollTrigger } from '../../utils/animations'

const sectionRef = ref(null)

// Set this to true if live stream is available
const isLiveStreamAvailable = ref(false)

const liveStreamDate = new Date('2024-12-25T11:00:00')

const liveCountdown = ref({
  days: '00',
  hours: '00',
  minutes: '00'
})

const updateLiveCountdown = () => {
  const now = new Date()
  const difference = liveStreamDate.getTime() - now.getTime()

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))

    liveCountdown.value = {
      days: days.toString().padStart(2, '0'),
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0')
    }
  } else {
    liveCountdown.value = {
      days: '00',
      hours: '00',
      minutes: '00'
    }
  }
}

const setReminder = () => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Pengingat Live Streaming', {
      body: 'Live streaming pernikahan Ahmad & Sari akan dimulai sebentar lagi!',
      icon: '/vite.svg'
    })
  } else if ('Notification' in window && Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification('Pengingat Live Streaming', {
          body: 'Live streaming pernikahan Ahmad & Sari akan dimulai sebentar lagi!',
          icon: '/vite.svg'
        })
      }
    })
  }
  
  // Fallback alert
  alert('Pengingat live streaming telah diaktifkan! Kami akan mengingatkan Anda 30 menit sebelum acara dimulai.')
}

let countdownInterval

onMounted(() => {
  updateLiveCountdown()
  countdownInterval = setInterval(updateLiveCountdown, 60000) // Update every minute

  if (sectionRef.value) {
    createScrollTrigger(sectionRef.value, (element) => {
      weddingAnimations.fadeInUp(element, 0.2)
    })
  }
})

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})
</script>

<style scoped>
.live-stream-section {
  background-image: 
    radial-gradient(circle at 70% 30%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 30% 70%, rgba(183, 110, 121, 0.05) 0%, transparent 50%);
}

.live-container {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

.not-available {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}
</style>
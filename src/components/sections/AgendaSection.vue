<template>
  <section ref="sectionRef"
    class="py-20 agenda-section bg-gradient-to-b from-green-100 via-ivory to-cyan-900 rounded-4xl">
    <div class="container px-4 mx-auto">
      <h2 class="mb-4 text-4xl text-center md:text-5xl font-great-vibes text-gold">
        Agenda Acara
      </h2>
      <p class="max-w-2xl mx-auto mb-12 text-lg text-center text-gray-600 font-lora">
        Rangkaian acara pernikahan kami yang penuh makna dan kebahagiaan
      </p>

      <!-- Timeline -->
      <div class="relative max-w-4xl mx-auto">
        <div v-for="(event, index) in events" :key="index" class="relative flex items-start gap-6 mb-12 timeline-item">
          <!-- Dot + connecting line -->
          <div class="relative flex flex-col items-center">
            <!-- Dot -->
            <div
              class="relative z-10 w-12 h-12 rounded-full bg-gradient-to-tr from-gold to-yellow-400 flex items-center justify-center text-white font-semibold shadow-[0_0_15px_rgba(255,215,0,0.6)] animate-pulse-ring">
              {{ index + 1 }}
            </div>

            <!-- Garis vertikal hitam ke nomor berikutnya -->
            <div v-if="index < events.length - 1"
              class="absolute w-0.5 h-[calc(550%+5vmax)] md:h-[calc(10vmax+10vmin)] lg:h-[calc(15vmin+5vmax)] bg-gray-600 top-12 timeline-connector">
            </div>
          </div>

          <!-- Card -->
          <div
            class="flex-1 bg-white/90 backdrop-blur-sm border border-gold/20 p-6 rounded-2xl shadow-lg hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] transition-all duration-300 hover:translate-x-2">
            <div class="flex flex-col mb-4 md:flex-row md:items-start md:justify-between">
              <h3 class="mb-2 text-2xl font-semibold font-cormorant text-deep-red md:mb-0">
                {{ event.title }}
              </h3>
              <span class="px-3 py-1 text-lg font-semibold rounded-full shadow-sm text-gold font-playfair bg-champagne">
                {{ event.time }}
              </span>
            </div>

            <p class="mb-3 leading-relaxed text-gray-600 font-lora">
              {{ event.description }}
            </p>

            <div class="flex items-center text-sm text-gray-500">
              <span class="mr-2">📍</span>
              <span>{{ event.location }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { weddingAnimations, createScrollTrigger } from '../../utils/animations'

const sectionRef = ref(null)

const events = ref([
  {
    time: '07:00 - 08:00',
    title: 'Persiapan Akad',
    description: 'Persiapan dan penyambutan tamu untuk prosesi akad nikah',
    location: 'Kediaman Mempelai Wanita'
  },
  {
    time: '08:00 - 09:00',
    title: 'Akad Nikah',
    description: 'Prosesi akad nikah sesuai syariat Islam',
    location: 'Kediaman Mempelai Wanita'
  },
  {
    time: '09:00 - 11:00',
    title: 'Sesi Foto Keluarga',
    description: 'Foto bersama keluarga dari kedua belah pihak',
    location: 'Kediaman Mempelai Wanita'
  },
  {
    time: '11:00 - 14:00',
    title: 'Resepsi Pernikahan',
    description: 'Syukuran pernikahan dan jamuan makan siang bersama tamu undangan',
    location: 'Ballroom Hotel Grand Luxury'
  },
  {
    time: '14:00 - 15:00',
    title: 'Sesi Foto Bersama Tamu',
    description: 'Foto bersama dengan tamu undangan',
    location: 'Garden Area Hotel'
  }
])

onMounted(() => {
  if (sectionRef.value) {
    createScrollTrigger(sectionRef.value, (element) => {
      const items = element.querySelectorAll('.timeline-item')
      const connectors = element.querySelectorAll('.timeline-connector')

      weddingAnimations.staggerGrid(items, 0.25)

      // Animate connectors
      connectors.forEach((connector, index) => {
        setTimeout(() => {
          connector.style.opacity = '1'
        }, index * 250 + 500)
      })
    })
  }
})
</script>

<style scoped>
.timeline-item {
  opacity: 0;
  transform: translateY(40px);
  animation: fadeUp 0.8s ease forwards;
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.timeline-connector {
  opacity: 0;
  transition: opacity 0.8s ease;
}

/* Efek berdenyut di dot */
@keyframes pulseRing {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.5);
  }

  70% {
    box-shadow: 0 0 0 12px rgba(255, 215, 0, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(255, 215, 0, 0);
  }
}

.animate-pulse-ring {
  animation: pulseRing 2.5s infinite;
}
</style>
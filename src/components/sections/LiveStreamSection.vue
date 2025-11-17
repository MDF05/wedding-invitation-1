<template>
  <section ref="sectionRef" class="live-stream-section py-20 bg-white relative overflow-hidden">
    <!-- 3D Background Elements -->
    <div class="bg-elements">
      <div class="bg-element camera-1"></div>
      <div class="bg-element camera-2"></div>
      <div class="bg-element heart-1"></div>
      <div class="bg-element heart-2"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <!-- Enhanced Header -->
      <div class="header-3d mb-16" ref="headerRef">
        <h2 class="text-4xl md:text-5xl font-great-vibes text-gold text-center mb-4 header-main">
          Live Streaming
        </h2>
        <div class="title-underline"></div>
        <p class="text-gray-600 font-lora text-lg text-center mb-12 max-w-2xl mx-auto header-subtitle">
          Saksikan momen bahagia kami secara virtual
        </p>
      </div>

      <div class="max-w-4xl mx-auto">
        <!-- Live Stream Container with 3D Effects -->
        <div v-if="isLiveStreamAvailable"
          class="live-container-3d wedding-frame overflow-hidden rounded-2xl mb-8 scroll-element" data-delay="0">
          <!-- YouTube Embed with Enhanced Design -->
          <div class="aspect-w-16 aspect-h-9 bg-black relative">
            <div
              class="w-full h-96 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 flex items-center justify-center relative overflow-hidden">
              <!-- Animated Background -->
              <div class="absolute inset-0 opacity-10">
                <div class="floating-particle p1"></div>
                <div class="floating-particle p2"></div>
                <div class="floating-particle p3"></div>
                <div class="floating-particle p4"></div>
              </div>

              <div class="text-center text-white relative z-10">
                <div class="text-6xl mb-4 live-icon">📹</div>
                <p class="text-xl font-lora mb-2">Live Streaming Akan Dimulai</p>
                <p class="text-gold font-playfair text-lg mb-6">Sabtu, 25 Desember 2024 - 11:00 WIB</p>

                <!-- Enhanced Countdown to Live -->
                <div class="mt-8 flex justify-center gap-6 countdown-3d">
                  <div class="countdown-item">
                    <div class="countdown-number">{{ liveCountdown.days }}</div>
                    <div class="countdown-label">Hari</div>
                  </div>
                  <div class="countdown-separator">:</div>
                  <div class="countdown-item">
                    <div class="countdown-number">{{ liveCountdown.hours }}</div>
                    <div class="countdown-label">Jam</div>
                  </div>
                  <div class="countdown-separator">:</div>
                  <div class="countdown-item">
                    <div class="countdown-number">{{ liveCountdown.minutes }}</div>
                    <div class="countdown-label">Menit</div>
                  </div>
                </div>

                <!-- Live Status Indicator -->
                <div class="mt-6 flex items-center justify-center gap-2">
                  <div class="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span class="text-sm text-gray-300">Akan Segera Live</span>
                </div>
              </div>
            </div>
          </div>
          <div class="live-glow"></div>
        </div>

        <!-- Enhanced Not Available Message -->
        <div v-else class="not-available-3d text-center py-16 scroll-element" data-delay="100">
          <div class="wedding-frame bg-soft-pink bg-opacity-30 p-12 rounded-2xl inline-block not-available-card">
            <div class="text-6xl mb-6 not-available-icon">📡</div>
            <h3 class="text-2xl font-cormorant text-deep-red font-semibold mb-4">
              Live Streaming Tidak Tersedia
            </h3>
            <p class="text-gray-600 font-lora max-w-md mx-auto leading-relaxed">
              Acara pernikahan kami akan diselenggarakan secara privat.
              Namun, Anda tetap dapat memberikan doa dan ucapan melalui website ini.
            </p>
          </div>
          <div class="not-available-glow"></div>
        </div>

        <!-- Enhanced Live Stream Info -->
        <div v-if="isLiveStreamAvailable" class="live-info-3d grid grid-cols-1 md:grid-cols-2 gap-8 scroll-element"
          data-delay="200">
          <!-- Schedule Card -->
          <div class="info-card wedding-frame bg-champagne bg-opacity-30 p-6 rounded-xl">
            <div class="card-content">
              <h3 class="text-xl font-cormorant text-deep-red font-semibold mb-4 flex items-center">
                <span class="icon-3d mr-3">📅</span>
                Jadwal Live
              </h3>
              <div class="space-y-4 font-lora text-gray-700">
                <div class="schedule-item flex justify-between items-center">
                  <span class="font-semibold">Akad Nikah:</span>
                  <span class="text-gold font-semibold">08:00 WIB</span>
                </div>
                <div class="schedule-item flex justify-between items-center">
                  <span class="font-semibold">Resepsi:</span>
                  <span class="text-gold font-semibold">11:00 WIB</span>
                </div>
                <div class="schedule-item flex justify-between items-center">
                  <span class="font-semibold">Sesi Foto:</span>
                  <span class="text-gold font-semibold">14:00 WIB</span>
                </div>
              </div>
            </div>
            <div class="card-glow"></div>
          </div>

          <!-- Instructions Card -->
          <div class="info-card wedding-frame bg-soft-pink bg-opacity-30 p-6 rounded-xl">
            <div class="card-content">
              <h3 class="text-xl font-cormorant text-deep-red font-semibold mb-4 flex items-center">
                <span class="icon-3d mr-3">💡</span>
                Cara Menonton
              </h3>
              <div class="space-y-3 font-lora text-gray-700 text-sm">
                <div class="instruction-item flex items-center gap-3">
                  <div class="instruction-number">1</div>
                  <span>Klik tombol play saat live dimulai</span>
                </div>
                <div class="instruction-item flex items-center gap-3">
                  <div class="instruction-number">2</div>
                  <span>Pastikan koneksi internet stabil</span>
                </div>
                <div class="instruction-item flex items-center gap-3">
                  <div class="instruction-number">3</div>
                  <span>Gunakan headphone untuk pengalaman terbaik</span>
                </div>
                <div class="instruction-item flex items-center gap-3">
                  <div class="instruction-number">4</div>
                  <span>Berikan komentar di section ucapan</span>
                </div>
              </div>
            </div>
            <div class="card-glow"></div>
          </div>
        </div>

        <!-- Enhanced Reminder Button -->
        <div v-if="isLiveStreamAvailable" class="text-center mt-12 scroll-element" data-delay="300">
          <button @click="setReminder"
            class="reminder-btn-3d bg-gradient-to-r from-gold to-rose-gold text-white px-10 py-5 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 mx-auto shadow-lg hover:shadow-xl">
            <span class="text-xl">⏰</span>
            <span class="text-lg">Ingatkan Saya</span>
          </button>
          <p class="text-gray-500 font-lora text-sm mt-4">
            Kami akan mengingatkan Anda 30 menit sebelum acara dimulai
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const sectionRef = ref(null)
const headerRef = ref(null)

// Set this to true if live stream is available
const isLiveStreamAvailable = ref(true)

const liveStreamDate = new Date('2024-12-25T11:00:00')

const liveCountdown = ref({
  days: '00',
  hours: '00',
  minutes: '00'
})

let scrollListener = null
let countdownInterval = null

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

  // Enhanced feedback
  const reminderBtn = document.querySelector('.reminder-btn-3d')
  if (reminderBtn) {
    reminderBtn.innerHTML = '<span class="text-xl">✅</span><span class="text-lg">Pengingat Diaktifkan!</span>'
    reminderBtn.classList.add('bg-gradient-to-r', 'from-green-500', 'to-emerald-600')

    setTimeout(() => {
      reminderBtn.innerHTML = '<span class="text-xl">⏰</span><span class="text-lg">Ingatkan Saya</span>'
      reminderBtn.classList.remove('bg-gradient-to-r', 'from-green-500', 'to-emerald-600')
      reminderBtn.classList.add('bg-gradient-to-r', 'from-gold', 'to-rose-gold')
    }, 3000)
  }
}

// Enhanced scroll animation handler
const handleScroll = () => {
  if (!sectionRef.value) return

  const elements = sectionRef.value.querySelectorAll('.scroll-element')
  const windowHeight = window.innerHeight

  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top
    const elementBottom = element.getBoundingClientRect().bottom
    const delay = parseInt(element.getAttribute('data-delay')) || 0

    // Element is in viewport
    const isInViewport = elementTop < windowHeight * 0.85 && elementBottom > 0

    if (isInViewport) {
      const progress = Math.min(1, Math.max(0, (windowHeight * 0.85 - elementTop) / (windowHeight * 0.5)))

      setTimeout(() => {
        if (element.classList.contains('header-main')) {
          const translateY = (1 - progress) * 30
          const scale = 0.9 + (progress * 0.1)
          element.style.transform = `translateY(${translateY}px) scale(${scale})`
          element.style.opacity = progress
        }
        else if (element.classList.contains('header-subtitle')) {
          const translateY = (1 - progress) * 20
          element.style.transform = `translateY(${translateY}px)`
          element.style.opacity = progress
        }
        else {
          const rotationY = (1 - progress) * 5
          const translateZ = progress * 20
          const translateY = (1 - progress) * 40
          element.style.transform = `perspective(1000px) rotateY(${rotationY}deg) translateZ(${translateZ}px) translateY(${translateY}px)`
          element.style.opacity = progress
        }
      }, delay)
    } else if (elementTop >= windowHeight) {
      // Reset elements below viewport
      element.style.transform = 'perspective(1000px) rotateY(5deg) translateZ(0px) translateY(40px)'
      element.style.opacity = '0'
    }
  })

  // Handle title underline
  const titleUnderline = sectionRef.value.querySelector('.title-underline')
  if (titleUnderline) {
    const headerTop = sectionRef.value.getBoundingClientRect().top
    if (headerTop < windowHeight * 0.8 && headerTop > -sectionRef.value.offsetHeight) {
      const progress = 1 - (headerTop / (windowHeight * 0.8))
      titleUnderline.style.width = `${progress * 100}%`
    }
  }
}

const initAnimations = () => {
  const elements = sectionRef.value?.querySelectorAll('.scroll-element')
  elements?.forEach(element => {
    element.style.opacity = '0'
    element.style.transform = 'perspective(1000px) rotateY(5deg) translateZ(0px) translateY(40px)'
    element.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
  })
  handleScroll()
}

onMounted(() => {
  updateLiveCountdown()
  countdownInterval = setInterval(updateLiveCountdown, 60000)

  scrollListener = () => handleScroll()
  window.addEventListener('scroll', scrollListener)

  setTimeout(initAnimations, 100)
})

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
  if (scrollListener) {
    window.removeEventListener('scroll', scrollListener)
  }
})
</script>

<style scoped>
.live-stream-section {
  background-image:
    radial-gradient(circle at 70% 30%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 30% 70%, rgba(183, 110, 121, 0.05) 0%, transparent 50%);
  transform-style: preserve-3d;
  perspective: 1000px;
}

/* 3D Background Elements */
.bg-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.bg-element {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
  animation: floatElement 8s ease-in-out infinite;
  transform-style: preserve-3d;
}

.camera-1 {
  width: 80px;
  height: 80px;
  top: 15%;
  left: 5%;
  animation-delay: 0s;
}

.camera-2 {
  width: 60px;
  height: 60px;
  top: 70%;
  right: 8%;
  animation-delay: 2s;
}

.heart-1 {
  width: 50px;
  height: 50px;
  bottom: 20%;
  left: 10%;
  background: radial-gradient(circle, rgba(183, 110, 121, 0.1) 0%, transparent 70%);
  animation-delay: 4s;
}

.heart-2 {
  width: 70px;
  height: 70px;
  top: 30%;
  right: 15%;
  background: radial-gradient(circle, rgba(183, 110, 121, 0.1) 0%, transparent 70%);
  animation-delay: 1s;
}

@keyframes floatElement {

  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }

  33% {
    transform: translateY(-15px) rotate(5deg);
  }

  66% {
    transform: translateY(10px) rotate(-5deg);
  }
}

/* Header Styles */
.header-3d {
  position: relative;
  transform-style: preserve-3d;
}

.header-main {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.title-underline {
  height: 3px;
  background: linear-gradient(90deg,
      transparent,
      rgba(212, 175, 55, 0.8),
      rgba(183, 110, 121, 0.8),
      transparent);
  margin: 0 auto;
  width: 0%;
  transition: width 1.2s cubic-bezier(0.23, 1, 0.32, 1);
  max-width: 300px;
  border-radius: 2px;
}

/* Enhanced Live Container */
.live-container-3d {
  transform-style: preserve-3d;
  position: relative;
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.3),
    0 10px 30px rgba(212, 175, 55, 0.2);
  border: 2px solid transparent;
  background: linear-gradient(white, white) padding-box,
    linear-gradient(45deg, #D4AF37, #B76E79) border-box;
}

.live-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center,
      rgba(212, 175, 55, 0.15) 0%,
      transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: 16px;
}

.live-container-3d:hover .live-glow {
  opacity: 1;
}

.live-container-3d:hover {
  transform: translateY(-5px) translateZ(10px) !important;
}

/* Floating Particles */
.floating-particle {
  position: absolute;
  background: rgba(212, 175, 55, 0.3);
  border-radius: 50%;
  animation: floatParticle 6s ease-in-out infinite;
}

.p1 {
  width: 8px;
  height: 8px;
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.p2 {
  width: 6px;
  height: 6px;
  top: 60%;
  left: 70%;
  animation-delay: 2s;
}

.p3 {
  width: 10px;
  height: 10px;
  top: 40%;
  left: 40%;
  animation-delay: 4s;
}

.p4 {
  width: 5px;
  height: 5px;
  top: 80%;
  left: 30%;
  animation-delay: 1s;
}

@keyframes floatParticle {

  0%,
  100% {
    transform: translateY(0) translateX(0);
  }

  50% {
    transform: translateY(-20px) translateX(10px);
  }
}

/* Enhanced Countdown */
.countdown-3d {
  transform-style: preserve-3d;
}

.countdown-item {
  text-align: center;
  transform-style: preserve-3d;
}

.countdown-number {
  font-size: 2.5rem;
  font-weight: bold;
  background: linear-gradient(45deg, #D4AF37, #B76E79);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 0.5rem;
}

.countdown-label {
  font-size: 0.875rem;
  color: #CBD5E1;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.countdown-separator {
  font-size: 2rem;
  font-weight: bold;
  color: #D4AF37;
  display: flex;
  align-items: center;
}

/* Enhanced Not Available Section */
.not-available-3d {
  transform-style: preserve-3d;
  position: relative;
}

.not-available-card {
  animation: gentlePulse 3s ease-in-out infinite;
  transform-style: preserve-3d;
}

.not-available-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center,
      rgba(183, 110, 121, 0.1) 0%,
      transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: 16px;
}

.not-available-3d:hover .not-available-glow {
  opacity: 1;
}

@keyframes gentlePulse {

  0%,
  100% {
    transform: scale(1) translateZ(0);
  }

  50% {
    transform: scale(1.02) translateZ(10px);
  }
}

/* Info Cards */
.live-info-3d {
  transform-style: preserve-3d;
}

.info-card {
  transform-style: preserve-3d;
  transition: all 0.4s ease;
  border: 1px solid transparent;
  background: linear-gradient(135deg, rgba(247, 231, 206, 0.4) 0%, rgba(248, 233, 233, 0.4) 100%);
}

.info-card:hover {
  transform: translateY(-5px) translateZ(10px) !important;
  box-shadow:
    0 15px 40px rgba(212, 175, 55, 0.15),
    0 8px 20px rgba(183, 110, 121, 0.1);
}

.info-card:hover .card-glow {
  opacity: 1;
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center,
      rgba(212, 175, 55, 0.1) 0%,
      transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: 12px;
}

/* Enhanced Icons */
.icon-3d {
  transform-style: preserve-3d;
  transition: all 0.3s ease;
}

.info-card:hover .icon-3d {
  transform: scale(1.2) translateZ(5px);
}

/* Schedule and Instruction Items */
.schedule-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(212, 175, 55, 0.1);
}

.schedule-item:last-child {
  border-bottom: none;
}

.instruction-item {
  padding: 0.5rem 0;
}

.instruction-number {
  width: 24px;
  height: 24px;
  background: linear-gradient(45deg, #D4AF37, #B76E79);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
  flex-shrink: 0;
}

/* Enhanced Reminder Button */
.reminder-btn-3d {
  transform-style: preserve-3d;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  overflow: hidden;
}

.reminder-btn-3d::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.reminder-btn-3d:hover::before {
  left: 100%;
}

.reminder-btn-3d:hover {
  transform: translateY(-3px) translateZ(5px);
  box-shadow:
    0 15px 30px rgba(212, 175, 55, 0.3),
    0 8px 20px rgba(183, 110, 121, 0.2);
}

/* Scroll Element Base Styles */
.scroll-element {
  transform-style: preserve-3d;
  position: relative;
  overflow: hidden;
  opacity: 0;
}

.card-content {
  position: relative;
  z-index: 2;
}

/* Color Definitions */
.text-gold {
  color: #D4AF37;
}

.text-deep-red {
  color: #8B4513;
}

.bg-soft-pink {
  background-color: #F8E9E9;
}

.bg-champagne {
  background-color: #F7E7CE;
}

/* Responsive Design */
@media (max-width: 768px) {
  .scroll-element {
    transform: none !important;
    opacity: 1 !important;
  }

  .title-underline {
    width: 70% !important;
  }

  .bg-element {
    display: none;
  }

  .countdown-3d {
    gap: 4;
  }

  .countdown-number {
    font-size: 2rem;
  }

  .countdown-separator {
    font-size: 1.5rem;
  }
}

/* Performance Optimizations */
.scroll-element {
  will-change: transform, opacity;
}
</style>
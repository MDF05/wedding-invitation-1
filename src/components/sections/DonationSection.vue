<template>
  <section ref="sectionRef"
    class="digital-envelope-section py-20 bg-gradient-to-br from-cyan-900 via-ivory to-green-100 rounded-4xl relative overflow-hidden">
    <!-- 3D Background Elements -->
    <div class="bg-elements">
      <div class="bg-element coin-1"></div>
      <div class="bg-element coin-2"></div>
      <div class="bg-element coin-3"></div>
      <div class="bg-element envelope-1"></div>
      <div class="bg-element envelope-2"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <!-- Enhanced Header -->
      <div class="header-3d mb-16" ref="headerRef">
        <h2 class="text-4xl md:text-5xl font-great-vibes text-gold text-center mb-4 header-main">
          Amplop Digital
        </h2>
        <div class="title-underline"></div>
        <p class="text-gray-600 font-lora text-lg text-center mb-12 max-w-2xl mx-auto header-subtitle">
          Bagi yang ingin memberikan tanda kasih dan doa untuk kami
        </p>
      </div>

      <div class="max-w-6xl mx-auto">
        <!-- Bank Transfer Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <!-- QR Code with 3D Effect -->
          <div class="text-center">
            <div class="wedding-frame p-4 inline-block mb-6 qr-container-3d scroll-element" data-delay="0">
              <div class="bg-white p-4 rounded-lg shadow-2xl qr-card-3d">
                <div
                  class="w-64 h-64 mx-auto bg-gradient-to-br from-cyan-50 to-green-50 rounded-lg flex items-center justify-center mb-4 qr-frame">
                  <div class="text-center">
                    <div class="text-4xl mb-2 w-full h-full qr-image-container">
                      <img src="/images/qr-code.png" alt="QR Code Donasi"
                        class="w-full h-full object-contain rounded-lg">
                    </div>
                    <p class="text-sm text-gray-600 mt-2">QR Code Donasi</p>
                  </div>
                </div>
                <p class="text-gray-600 font-lora text-sm">Scan QR code untuk transfer</p>
              </div>
              <div class="qr-glow"></div>
            </div>
          </div>

          <!-- Bank Accounts with Enhanced Cards -->
          <div>
            <h3
              class="text-2xl font-cormorant text-deep-red font-semibold mb-6 text-center lg:text-left section-title scroll-element"
              data-delay="100">
              Transfer Bank
            </h3>

            <div class="space-y-6">
              <div v-for="(account, index) in bankAccounts" :key="index"
                class="account-card-3d wedding-frame bg-soft-pink bg-opacity-30 p-6 rounded-xl scroll-element"
                :data-delay="200 + (index * 100)">
                <div class="card-content">
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-4">
                      <div
                        class="w-12 h-12 bg-gradient-to-br from-gold to-rose-gold rounded-full flex items-center justify-center text-white shadow-lg bank-icon">
                        <span class="text-lg">🏦</span>
                      </div>
                      <div>
                        <h4 class="font-cormorant text-xl font-semibold text-deep-red">{{ account.bank }}</h4>
                        <p class="font-lora text-gray-700 text-lg font-mono tracking-wider">{{ account.accountNumber }}
                        </p>
                      </div>
                    </div>
                    <button @click="copyToClipboard(account.accountNumber)"
                      class="copy-btn-3d text-gold hover:text-rose-gold transition-all duration-300 transform hover:scale-110"
                      :title="`Salin ${account.accountNumber}`">
                      <div class="copy-icon">
                        📋
                      </div>
                    </button>
                  </div>
                  <div class="text-center pt-4 border-t border-gold border-opacity-20">
                    <p class="font-lora text-gray-700 font-semibold text-lg">a.n. {{ account.accountName }}</p>
                  </div>
                </div>
                <div class="card-glow"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- E-Wallet with Enhanced Grid -->
        <div class="mb-16">
          <h3 class="text-2xl font-cormorant text-deep-red font-semibold mb-8 text-center section-title scroll-element"
            data-delay="300">
            E-Wallet
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div v-for="(ewallet, index) in eWallets" :key="index"
              class="ewallet-card-3d wedding-frame bg-champagne bg-opacity-30 p-6 rounded-xl text-center scroll-element"
              :data-delay="400 + (index * 100)">
              <div class="card-content">
                <div class="ewallet-icon text-5xl mb-4 transform hover:scale-110 transition duration-300">
                  {{ ewallet.icon }}
                </div>
                <h4 class="font-cormorant text-xl font-semibold text-deep-red mb-3">{{ ewallet.name }}</h4>
                <p class="font-lora text-gray-700 font-semibold mb-4 text-lg font-mono">{{ ewallet.number }}</p>
                <button @click="copyToClipboard(ewallet.number)"
                  class="copy-btn-3d text-gold hover:text-rose-gold transition-all duration-300 transform hover:scale-105 text-sm font-semibold">
                  📋 Salin Nomor
                </button>
              </div>
              <div class="card-glow"></div>
            </div>
          </div>
        </div>

        <!-- Enhanced Message Section -->
        <div class="text-center max-w-2xl mx-auto">
          <div
            class="message-card-3d wedding-frame bg-gradient-to-r from-soft-pink to-champagne p-8 rounded-xl scroll-element"
            data-delay="600">
            <div class="card-content">
              <p class="text-gray-700 font-lora text-lg leading-relaxed mb-4 italic">
                "Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lainnya."
              </p>
              <p class="text-gold font-playfair font-semibold text-lg">HR. Ahmad</p>
              <p class="text-gray-600 font-lora text-sm mt-6 leading-relaxed">
                Doa dan restu Anda merupakan hadiah terindah bagi kami. Terima kasih atas segala kebaikan dan kasih
                sayangnya.
              </p>
            </div>
            <div class="message-glow"></div>
          </div>
        </div>

        <!-- Enhanced Copy Notification -->
        <div v-if="showCopyNotification"
          class="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gold to-rose-gold text-white px-8 py-4 rounded-xl shadow-2xl transition-all duration-300 copy-notification-3d z-50">
          <div class="flex items-center gap-3">
            <div class="text-xl">✅</div>
            <span class="font-semibold">Berhasil disalin ke clipboard</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const sectionRef = ref(null)
const showCopyNotification = ref(false)

let scrollListener = null
let resizeListener = null

const bankAccounts = ref([
  {
    bank: 'BCA',
    accountNumber: '1234 5678 9012',
    accountName: 'AHMAD'
  },
  {
    bank: 'Mandiri',
    accountNumber: '9876 5432 1098',
    accountName: 'SARI'
  },
  {
    bank: 'BNI',
    accountNumber: '5678 1234 9012',
    accountName: 'AHMAD & SARI'
  }
])

const eWallets = ref([
  {
    name: 'GoPay',
    number: '0812 3456 7890',
    icon: '📱'
  },
  {
    name: 'OVO',
    number: '0812 3456 7890',
    icon: '💜'
  },
  {
    name: 'Dana',
    number: '0812 3456 7890',
    icon: '💙'
  }
])

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    showCopyNotification.value = true
    setTimeout(() => {
      showCopyNotification.value = false
    }, 2000)
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)

    showCopyNotification.value = true
    setTimeout(() => {
      showCopyNotification.value = false
    }, 2000)
  }
}

// Improved scroll animation handler
const handleScroll = () => {
  if (!sectionRef.value) return

  const elements = sectionRef.value.querySelectorAll('.scroll-element')
  const windowHeight = window.innerHeight

  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top
    const elementBottom = element.getBoundingClientRect().bottom
    const delay = parseInt(element.getAttribute('data-delay')) || 0

    // Element is in viewport (top is above bottom of screen, bottom is below top of screen)
    const isInViewport = elementTop < windowHeight * 0.85 && elementBottom > 0

    if (isInViewport) {
      // Calculate progress based on how far element has entered the viewport
      const progress = Math.min(1, Math.max(0, (windowHeight * 0.85 - elementTop) / (windowHeight * 0.5)))

      setTimeout(() => {
        // Apply animation based on element type
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
        else if (element.classList.contains('section-title')) {
          const translateX = (1 - progress) * 50
          element.style.transform = `translateX(${translateX}px)`
          element.style.opacity = progress
        }
        else if (element.classList.contains('qr-container-3d')) {
          const rotationY = (1 - progress) * 10
          const translateZ = progress * 20
          element.style.transform = `perspective(1000px) rotateY(${rotationY}deg) translateZ(${translateZ}px) translateY(${(1 - progress) * 40}px)`
          element.style.opacity = progress
        }
        else {
          // For cards and other elements
          const rotationY = (1 - progress) * 5
          const translateZ = progress * 15
          const translateY = (1 - progress) * 40
          element.style.transform = `perspective(1000px) rotateY(${rotationY}deg) translateZ(${translateZ}px) translateY(${translateY}px)`
          element.style.opacity = progress
        }
      }, delay)
    } else if (elementTop >= windowHeight) {
      // Element is below viewport - reset to initial state
      element.style.transform = 'perspective(1000px) rotateY(5deg) translateZ(0px) translateY(40px)'
      element.style.opacity = '0'
    }
  })

  // Handle title underline separately
  const titleUnderline = sectionRef.value.querySelector('.title-underline')
  if (titleUnderline) {
    const headerTop = sectionRef.value.getBoundingClientRect().top
    if (headerTop < windowHeight * 0.8 && headerTop > -sectionRef.value.offsetHeight) {
      const progress = 1 - (headerTop / (windowHeight * 0.8))
      titleUnderline.style.width = `${progress * 100}%`
    }
  }
}

// Initialize animations on mount
const initAnimations = () => {
  // Set initial state for all scroll elements
  const elements = sectionRef.value?.querySelectorAll('.scroll-element')
  elements?.forEach(element => {
    element.style.opacity = '0'
    element.style.transform = 'perspective(1000px) rotateY(5deg) translateZ(0px) translateY(40px)'
    element.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
  })

  // Trigger initial scroll check
  handleScroll()
}

onMounted(() => {
  scrollListener = () => handleScroll()
  resizeListener = () => handleScroll()

  window.addEventListener('scroll', scrollListener)
  window.addEventListener('resize', resizeListener)

  // Initialize after a small delay to ensure DOM is ready
  setTimeout(initAnimations, 100)
})

onUnmounted(() => {
  if (scrollListener) {
    window.removeEventListener('scroll', scrollListener)
  }
  if (resizeListener) {
    window.removeEventListener('resize', resizeListener)
  }
})
</script>

<style scoped>
.digital-envelope-section {
  position: relative;
  transform-style: preserve-3d;
  perspective: 1000px;
}

/* Background Elements */
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

.coin-1 {
  width: 80px;
  height: 80px;
  top: 15%;
  left: 5%;
  animation-delay: 0s;
}

.coin-2 {
  width: 60px;
  height: 60px;
  top: 70%;
  right: 8%;
  animation-delay: 2s;
}

.coin-3 {
  width: 40px;
  height: 40px;
  bottom: 20%;
  left: 10%;
  animation-delay: 4s;
}

.envelope-1 {
  width: 100px;
  height: 60px;
  top: 25%;
  right: 12%;
  border-radius: 8px;
  background: radial-gradient(ellipse, rgba(183, 110, 121, 0.1) 0%, transparent 70%);
  animation-delay: 1s;
}

.envelope-2 {
  width: 70px;
  height: 45px;
  bottom: 30%;
  left: 15%;
  border-radius: 6px;
  background: radial-gradient(ellipse, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
  animation-delay: 3s;
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

.header-subtitle {
  /* Styles are applied via JS */
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

.section-title {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

/* QR Code 3D Styles */
.qr-container-3d {
  transform-style: preserve-3d;
  position: relative;
}

.qr-card-3d {
  transform-style: preserve-3d;
  transition: all 0.4s ease;
  border: 2px solid transparent;
  background: linear-gradient(white, white) padding-box,
    linear-gradient(45deg, #D4AF37, #B76E79) border-box;
}

.qr-frame {
  background: linear-gradient(135deg, #f0f9ff 0%, #f0fff4 100%);
  border: 1px solid rgba(212, 175, 55, 0.2);
  transition: all 0.3s ease;
}

.qr-glow {
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

.qr-container-3d:hover .qr-glow {
  opacity: 1;
}

.qr-container-3d:hover .qr-card-3d {
  transform: translateZ(10px) scale(1.02);
}

/* Enhanced Card Styles */
.scroll-element {
  transform-style: preserve-3d;
  position: relative;
  overflow: hidden;
}

.card-content {
  position: relative;
  z-index: 2;
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
}

/* Account Cards */
.account-card-3d {
  background: linear-gradient(135deg, rgba(248, 233, 233, 0.4) 0%, rgba(247, 231, 206, 0.4) 100%);
  border: 1px solid rgba(212, 175, 55, 0.15);
  box-shadow:
    0 8px 25px rgba(183, 110, 121, 0.1),
    0 4px 12px rgba(212, 175, 55, 0.05);
}

.account-card-3d:hover {
  transform: translateY(-5px) translateZ(15px) !important;
  box-shadow:
    0 15px 40px rgba(183, 110, 121, 0.15),
    0 8px 20px rgba(212, 175, 55, 0.1);
}

.account-card-3d:hover .card-glow {
  opacity: 1;
}

.bank-icon {
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
  transition: all 0.3s ease;
}

.account-card-3d:hover .bank-icon {
  transform: scale(1.1);
  box-shadow: 0 6px 18px rgba(212, 175, 55, 0.4);
}

/* E-Wallet Cards */
.ewallet-card-3d {
  background: linear-gradient(135deg, rgba(247, 231, 206, 0.4) 0%, rgba(248, 233, 233, 0.4) 100%);
  border: 1px solid rgba(212, 175, 55, 0.15);
  box-shadow:
    0 8px 25px rgba(212, 175, 55, 0.1),
    0 4px 12px rgba(183, 110, 121, 0.05);
}

.ewallet-card-3d:hover {
  transform: translateY(-5px) translateZ(15px) !important;
  box-shadow:
    0 15px 40px rgba(212, 175, 55, 0.15),
    0 8px 20px rgba(183, 110, 121, 0.1);
}

.ewallet-card-3d:hover .card-glow {
  opacity: 1;
}

.ewallet-icon {
  transition: all 0.3s ease;
}

.ewallet-card-3d:hover .ewallet-icon {
  transform: scale(1.2);
}

/* Message Card */
.message-card-3d {
  background: linear-gradient(135deg, #F8E9E9 0%, #F7E7CE 100%);
  border: 1px solid rgba(212, 175, 55, 0.2);
  box-shadow:
    0 10px 30px rgba(183, 110, 121, 0.1),
    0 5px 15px rgba(212, 175, 55, 0.05);
  position: relative;
  overflow: hidden;
}

.message-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg,
      rgba(212, 175, 55, 0.1) 0%,
      rgba(183, 110, 121, 0.1) 50%,
      transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.message-card-3d:hover .message-glow {
  opacity: 1;
}

.message-card-3d:hover {
  transform: translateY(-3px) translateZ(10px) !important;
}

/* Copy Button Styles */
.copy-btn-3d {
  position: relative;
  transition: all 0.3s ease;
}

.copy-btn-3d::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #D4AF37, #B76E79);
  border-radius: 6px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.copy-btn-3d:hover::before {
  opacity: 0.1;
}

/* Enhanced Copy Notification */
.copy-notification-3d {
  box-shadow:
    0 10px 30px rgba(212, 175, 55, 0.3),
    0 5px 15px rgba(183, 110, 121, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  animation: notificationPop 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

@keyframes notificationPop {
  0% {
    opacity: 0;
    transform: translate(-50%, 20px) scale(0.9);
  }

  100% {
    opacity: 1;
    transform: translate(-50%, 0) scale(1);
  }
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

.bg-ivory {
  background-color: #FFFFF0;
}

.from-ivory {
  --tw-gradient-from: #FFFFF0;
}

.to-champagne {
  --tw-gradient-to: #F7E7CE;
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

  .account-card-3d,
  .ewallet-card-3d {
    padding: 1rem;
  }
}

/* Performance Optimizations */
.scroll-element {
  will-change: transform, opacity;
}
</style>
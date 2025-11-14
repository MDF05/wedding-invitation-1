<template>
  <section ref="sectionRef"
    class="relative flex items-center justify-center min-h-screen py-10 overflow-hidden text-center header-section">

    <!-- Animated Background -->
    <div class="absolute inset-0 z-0 bg-gradient-to-br from-green-100 via-ivory to-cyan-800"></div>

    <!-- Flower Confetti -->
    <div class="flower-confetti">
      <div v-for="i in 22" :key="'left' + i" class="confetti flower-left">🌸</div>
      <div v-for="i in 22" :key="'right' + i" class="confetti flower-right">🌺</div>
    </div>

    <!-- 3D Floating Elements -->
    <div class="floating-elements">
      <div v-for="i in 12" :key="i" class="floating-element" :class="`element-${i % 4}`" :style="elementStyle(i)">
        <span v-if="i % 3 === 3">
          <img src="/images/mawar.png" alt="" class="w-[100px] h-[100px] object-contain" />
        </span>
        <span v-if="i % 3 === 4">
          <img src="/images/mawar.png" alt="" class="w-[100px] h-[100px] object-contain" />
        </span>
        <span v-else-if="i % 3 === 1">
          <img src="/images/mawar-2.png" alt=" " class="w-[100px] h-[100px] object-contain">
        </span>
        <span v-else-if="i % 3 === 2">
          <img src="/images/mawar.png" alt=" " class="w-[100px] h-[100px] object-contain">
        </span>
        <span v-else-if="i % 3 === 3">
          <img src="/images/mawar-2.png" alt=" " class="w-[100px] h-[100px] object-contain">
        </span>
        <span v-else-if="i % 3 === 5">
          <img src="/images/mawar-2.png" alt=" " class="w-[100px] h-[100px] object-contain">
        </span>
        <span v-else-if="i % 3 === 0"></span>

      </div>
    </div>

    <!-- Geometric Background Patterns -->
    <div class="absolute inset-0 geometric-pattern opacity-10"></div>

    <!-- Main Content -->
    <div class="container relative z-10 px-4 mx-auto">
      <!-- Wedding Date with 3D Effect -->
      <div class="mb-16 transform perspective-1000">
        <p class="mb-6 font-bold tracking-widest wedding-title text-8xl font-playfair text-outline">
          THE WEDDING OF
        </p>

        <div class="w-24 h-1 mx-auto mt-6 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
      </div>

      <!-- Couple Photos with Enhanced 3D Frames -->
      <div class="flex flex-col items-center justify-center gap-8 mb-16 md:gap-16 md:flex-row">

        <!-- Groom -->
        <div class="relative text-center transition-all duration-500 transform hover:scale-105 group">
          <div
            class="absolute transition-opacity duration-500 rounded-full -inset-4 bg-gradient-to-r from-gold to-rose-gold opacity-20 blur-lg group-hover:opacity-40">
          </div>

          <div class="relative z-10 w-56 h-56 mx-auto mb-8 rounded-full cursor-pointer md:w-64 md:h-64 wedding-3d-frame"
            @click="showPhoto('groom')">
            <div
              class="absolute inset-0 transform scale-105 rotate-45 rounded-full bg-gradient-to-br from-gold/20 to-rose-gold/20">
            </div>

            <img src="/images/groom.jpg" alt="Mempelai Pria"
              class="relative z-10 object-cover w-full h-full transition-transform duration-700 transform rounded-full group-hover:scale-110"
              @error="handleImageError">

            <div class="absolute inset-0 transform scale-105 border-2 rounded-full border-gold/30"></div>
          </div>

          <h3 class="mb-3 text-4xl font-bold tracking-wide font-cormorant text-deep-red">Ahmad</h3>
          <p class="text-lg text-gray-600 font-lora">Putra dari Bapak Rahman & Ibu Siti</p>
        </div>

        <!-- Heart -->
        <div
          class="hidden text-6xl transition-transform duration-500 transform text-gold font-great-vibes heartbeat-3d-animation md:block hover:rotate-12">
          ❤️
        </div>

        <!-- Bride -->
        <div class="relative text-center transition-all duration-500 transform hover:scale-105 group">
          <div
            class="absolute transition-opacity duration-500 rounded-full -inset-4 bg-gradient-to-r from-rose-gold to-gold opacity-20 blur-lg group-hover:opacity-40">
          </div>

          <div class="relative z-10 w-56 h-56 mx-auto mb-8 rounded-full cursor-pointer md:w-64 md:h-64 wedding-3d-frame"
            @click="showPhoto('bride')">
            <div
              class="absolute inset-0 transform scale-105 -rotate-45 rounded-full bg-gradient-to-br from-rose-gold/20 to-gold/20">
            </div>

            <img src="/images/bride.jpg" alt="Mempelai Wanita"
              class="relative z-10 object-cover w-full h-full transition-transform duration-700 transform rounded-full group-hover:scale-110"
              @error="handleImageError">

            <div class="absolute inset-0 transform scale-105 border-2 rounded-full border-rose-gold/30"></div>
          </div>

          <h3 class="mb-3 text-4xl font-bold tracking-wide font-cormorant text-deep-red">Sari</h3>
          <p class="text-lg text-gray-600 font-lora">Putri dari Bapak Wijaya & Ibu Maya</p>
        </div>

      </div>

      <!-- Guest Section -->
      <div class="max-w-3xl mx-auto transform perspective-1000">
        <div class="p-8 border shadow-2xl bg-white/80 backdrop-blur-sm rounded-2xl md:p-12 border-gold/20 quote-3d">

          <div class="mb-6 text-center">
            <span class="text-lg tracking-wider text-gold font-playfair">KEPADA YANG TERHORMAT</span>

            <div
              class="text-2xl md:text-3xl font-cormorant text-deep-red font-bold mt-2 min-h-[4rem] flex items-center justify-center">
              {{ guestName }}
            </div>
          </div>

          <div class="w-16 h-0.5 bg-gradient-to-r from-gold to-rose-gold mx-auto my-6"></div>

          <p class="mb-6 text-lg leading-relaxed text-gray-700 font-lora md:text-xl text-balance">
            Dengan penuh syukur dan kebahagiaan, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara pernikahan
            kami
          </p>

          <div class="text-center">
            <p class="text-xl font-semibold tracking-wider text-gold font-playfair">Ahmad & Sari</p>
            <p class="mt-2 text-lg text-gray-600 font-lora">25 Desember 2024</p>
          </div>

        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="mt-16 animate-bounce">
        <div class="flex justify-center w-6 h-10 mx-auto border-2 rounded-full border-gold">
          <div class="w-1 h-3 mt-2 rounded-full bg-gold animate-pulse"></div>
        </div>
      </div>
    </div>

    <!-- Sparkle Overlay -->
    <div class="absolute inset-0 pointer-events-none sparkle-overlay"></div>


  </section>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { weddingAnimations, createScrollTrigger } from '../../utils/animations'

const sectionRef = ref(null)
const route = useRoute()

const guestName = computed(() => {
  const g = route.query.guest || route.query.nama || route.query.to

  if (g) {
    return decodeURIComponent(g)
      .replace(/\+/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase())
  }

  return "Bapak/Ibu/Saudara/i Yang Terhormat"
})

const elementStyle = (i) => {
  const left = Math.random() * 100
  const top = Math.random() * 100
  const delay = Math.random() * 6
  const duration = 5 + Math.random() * 4

  return {
    left: `${left}%`,
    top: `${top}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
  }
}

const handleImageError = (e) => {
  e.target.style.display = 'none'
  const parent = e.target.parentElement
  parent.classList.add('bg-gradient-to-br', 'from-rose-100', 'to-gold/20')
  parent.innerHTML = `<div class="flex items-center justify-center w-full h-full text-lg text-gold font-cormorant">${e.target.alt}</div>`
}

const showPhoto = (type) => {
  console.log("Show", type)
}

onMounted(() => {
  if (sectionRef.value) {
    createScrollTrigger(sectionRef.value, (el) => {
      weddingAnimations.fadeInUp(el, 0.2)
    })
  }
})
</script>



<style scoped>
/* HEADER BG */
.header-section {
  background: linear-gradient(135deg, #fdf2f8 0%, #fef7ed 50%, #fff1f2 100%);
}

/* FLOWER CONFETTI */
.flower-confetti {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 5;
}

.confetti {
  position: absolute;
  font-size: 1.6rem;
  opacity: 0;
  top: calc(10% + (80% * var(--pos-y)));
  transform: translateX(0) scale(0.7) rotate(0deg);
  animation: 2.8s ease-out forwards;
}

.flower-left {
  left: -60px;
  --pos-y: calc(var(--i) / 22);
  animation-name: confettiLeft;
}

.flower-right {
  right: -60px;
  --pos-y: calc(var(--i) / 22);
  animation-name: confettiRight;
}

@keyframes confettiLeft {
  0% {
    opacity: 0;
    transform: translateX(0) rotate(0deg) scale(0.5);
  }

  20% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translateX(350px) rotate(360deg) scale(1);
  }
}

@keyframes confettiRight {
  0% {
    opacity: 0;
    transform: translateX(0) rotate(0deg) scale(0.5);
  }

  20% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translateX(-350px) rotate(-360deg) scale(1);
  }
}

/* TITLE EFFECT */
.wedding-title {
  background: linear-gradient(135deg,
      #d4af37 0%,
      #f6e27a 25%,
      #fff7d1 50%,
      #f6d76b 75%,
      #d4af37 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;

  text-shadow:
    0 4px 10px rgba(212, 175, 55, 0.25),
    0 8px 20px rgba(0, 0, 0, 0.15);

  animation: titleFadeUp 1.4s ease-out forwards,
    shimmer 4s infinite linear;
  opacity: 0;
}

@keyframes titleFadeUp {
  0% {
    transform: translateY(30px) scale(0.95);
    opacity: 0;
  }

  60% {
    opacity: 1;
  }

  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

@keyframes shimmer {
  0% {
    background-position: 0% 50%;
  }

  100% {
    background-position: 200% 50%;
  }
}



/* FLOATING ELEMENTS */
.floating-elements {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}

.floating-element {
  position: absolute;
  font-size: 1.5rem;
  opacity: 0;
  animation: float3d ease-in-out infinite;
  filter: drop-shadow(0 4px 8px rgba(212, 175, 55, 0.3));
}

.element-0 {
  animation-name: float3d-rotate;
}

.element-1 {
  animation-name: float3d-scale;
}

.element-2 {
  animation-name: float3d-swing;
}

.element-3 {
  animation-name: float3d-bounce;
}

/* KEYFRAMES */
@keyframes float3d {

  0%,
  100% {
    opacity: 0;
    transform: translateY(0) rotate(0deg) scale(1);
  }

  50% {
    opacity: 1;
    transform: translateY(-100px) rotate(180deg) scale(1.2);
  }
}

@keyframes float3d-rotate {

  0%,
  100% {
    opacity: 0;
    transform: translateY(0) rotate(0deg);
  }

  50% {
    opacity: 1;
    transform: translateY(-80px) rotate(360deg);
  }
}

@keyframes float3d-scale {

  0%,
  100% {
    opacity: 0;
    transform: translateY(0) scale(1);
  }

  50% {
    opacity: 1;
    transform: translateY(-120px) scale(1.5);
  }
}

@keyframes float3d-swing {

  0%,
  100% {
    opacity: 0;
    transform: translateY(0) rotate(0deg);
  }

  25% {
    transform: translateY(-60px) rotate(-15deg);
  }

  50% {
    opacity: 1;
    transform: translateY(-100px) rotate(0deg);
  }
}

@keyframes float3d-bounce {

  0%,
  100% {
    opacity: 0;
    transform: translateY(0);
  }

  50% {
    opacity: 1;
    transform: translateY(-80px);
  }
}


.heartbeat-3d-animation {
  animation: heartbeat-3d 2s ease-in-out infinite;
}

@keyframes heartbeat-3d {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.3);
  }
}

/* SPARKLE OVERLAY */
.sparkle-overlay {
  background-image:
    radial-gradient(2px 2px at 20px 30px, #FFD700, transparent),
    radial-gradient(2px 2px at 40px 70px, #D4AF37, transparent),
    radial-gradient(2px 2px at 60px 20px, #FFF8DC, transparent),
    radial-gradient(2px 2px at 80px 50px, #FFD700, transparent),
    radial-gradient(2px 2px at 90px 80px, #D4AF37, transparent);
  background-size: 100px 100px;
  animation: sparkle 8s linear infinite;
}

@keyframes sparkle {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 100px 100px;
  }
}


/* QUOTE 3D BOX */
.quote-3d {
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(212, 175, 55, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transform: perspective(1000px) rotateX(2deg);
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .header-section {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }

  .wedding-title {
    font-size: 2.8rem;
  }
}

.text-outline {
  -webkit-text-stroke: 1.5px black;
  text-stroke: 1.5px black;
  /* untuk browser modern */
  /* text-shadow:
    2px 2px 0 #000,
    -2px 2px 0 #000,
    2px -2px 0 #000,
    -2px -2px 0 #000; */
}
</style>

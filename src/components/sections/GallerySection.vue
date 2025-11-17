<template>
  <section ref="sectionRef" class="py-20 bg-gradient-to-br from-cyan-700 via-ivory to-green-200 rounded-4xl">
    <div class="container px-4 mx-auto">
      <h2 class="mb-4 text-4xl text-center md:text-5xl font-great-vibes text-gold">
        Galeri Cinta Kami
      </h2>
      <p class="max-w-2xl mx-auto mb-12 text-lg text-center text-gray-600 font-lora">
        Kenangan indah perjalanan cinta kami yang akan abadi selamanya
      </p>

      <!-- Gallery Grid -->
      <div class="grid max-w-6xl grid-cols-1 gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">

        <div v-for="(photo, index) in photos" :key="index" class="gallery-item group cursor-pointer"
          @mousemove="tiltCard($event, index)" @mouseleave="resetTilt(index)" @click="openLightbox(index)">
          <div class="gallery-card relative h-64 overflow-hidden wedding-frame rounded-xl transition-all duration-500"
            :style="cardStyles[index]">
            <div class="gallery-inner relative w-full h-full rounded-xl overflow-hidden">

              <img :src="photo.src" :alt="photo.alt"
                class="object-cover w-full h-full transition duration-700 group-hover:scale-110"
                @error="handleImageError">

              <!-- Glass Reflection -->
              <div class="reflection"></div>

              <!-- Hover Overlay -->
              <div class="absolute inset-0 flex items-center justify-center transition duration-300 pointer-events-none 
                       group-hover:bg-black/30">
                <div class="text-white transition duration-300 transform translate-y-4 opacity-0 
                         group-hover:opacity-100 group-hover:translate-y-0">
                  <div class="flex items-center justify-center w-full text-7xl">🔍</div>
                  <p class="mt-2 text-sm">Klik untuk melihat</p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Lightbox Modal -->
    <div v-if="lightboxVisible" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90"
      @click="closeLightbox">
      <div class="relative max-w-4xl max-h-full">
        <button @click="closeLightbox"
          class="absolute right-0 text-2xl text-white transition duration-300 -top-12 hover:text-gold">
          ✕
        </button>

        <img :src="currentPhoto.src" :alt="currentPhoto.alt" class="max-w-full max-h-[80vh] object-contain rounded-lg">

        <!-- Navigation -->
        <button v-if="currentIndex > 0" @click.stop="prevPhoto" class="absolute p-2 text-2xl text-white transition duration-300 transform -translate-y-1/2 
                 bg-black bg-opacity-50 rounded-full left-4 top-1/2 hover:bg-gold">
          ‹
        </button>

        <button v-if="currentIndex < photos.length - 1" @click.stop="nextPhoto" class="absolute p-2 text-2xl text-white transition duration-300 transform -translate-y-1/2 
                 bg-black bg-opacity-50 rounded-full right-4 top-1/2 hover:bg-gold">
          ›
        </button>

        <!-- Photo Info -->
        <div class="mt-4 text-center text-white">
          <p class="text-lg font-lora">{{ currentPhoto.alt }}</p>
          <p class="text-sm text-gray-300">{{ currentIndex + 1 }} / {{ photos.length }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { weddingAnimations, createScrollTrigger } from '../../utils/animations'

const sectionRef = ref(null)
const lightboxVisible = ref(false)
const currentIndex = ref(0)

const photos = ref([
  { src: '/images/bride.jpg', alt: 'Prewedding Session' },
  { src: '/images/gallery-2.jpg', alt: 'Romantic Moment' },
  { src: '/images/gallery-3.jpg', alt: 'Together Forever' },
  { src: '/images/gallery-4.jpg', alt: 'Love Story' },
  { src: '/images/gallery-5.jpg', alt: 'Sweet Memories' },
  { src: '/images/gallery-6.jpg', alt: 'Our Journey' }
])

const currentPhoto = computed(() => photos.value[currentIndex.value])

// Lightbox functions
const openLightbox = (index) => {
  currentIndex.value = index
  lightboxVisible.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxVisible.value = false
  document.body.style.overflow = 'auto'
}

const nextPhoto = () => {
  if (currentIndex.value < photos.value.length - 1) currentIndex.value++
}

const prevPhoto = () => {
  if (currentIndex.value > 0) currentIndex.value--
}

// Image error handler
const handleImageError = (event) => {
  const parent = event.target.parentElement
  event.target.style.display = 'none'
  parent.classList.add('bg-gradient-to-br', 'from-gray-100', 'to-gray-200')
  parent.innerHTML = `
    <div class="flex items-center justify-center w-full h-full text-gray-400">
      <div class="text-center">
        <div class="mb-2 text-3xl">📷</div>
        <p class="text-sm">Foto ${event.target.alt}</p>
      </div>
    </div>
  `
}

// 3D Tilt Logic
const cardStyles = ref({})

const tiltCard = (e, index) => {
  const card = e.currentTarget.querySelector(".gallery-card")
  const rect = card.getBoundingClientRect()

  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const tiltX = ((y - rect.height / 2) / rect.height) * 12
  const tiltY = ((x - rect.width / 2) / rect.width) * -12

  cardStyles.value[index] = `
    transform: rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.06);
    box-shadow: 0 25px 50px rgba(0,0,0,0.35);
  `
}

const resetTilt = (index) => {
  cardStyles.value[index] = `
    transform: rotateX(0deg) rotateY(0deg) scale(1);
    box-shadow: 0 15px 30px rgba(0,0,0,0.18);
  `
}

onMounted(() => {
  document.addEventListener('keydown', (event) => {
    if (!lightboxVisible.value) return
    if (event.key === 'Escape') closeLightbox()
    if (event.key === 'ArrowRight') nextPhoto()
    if (event.key === 'ArrowLeft') prevPhoto()
  })

  if (sectionRef.value) {
    createScrollTrigger(sectionRef.value, (element) => {
      weddingAnimations.staggerGrid(element.querySelectorAll('.gallery-item'), 0.12)
    })
  }
})
</script>


<style scoped>
/* 3D Card Base */
.gallery-card {
  transform-style: preserve-3d;
  perspective: 1000px;
  border: 2px solid rgba(255, 215, 0, 0.4);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(4px);
  will-change: transform;
}

/* Premium Gold Emboss */
.wedding-frame {
  border-radius: 18px;
  border: 3px solid rgba(255, 223, 150, 0.75);
  box-shadow:
    inset 0 0 10px rgba(255, 255, 255, 0.4),
    inset 0 0 20px rgba(255, 215, 0, 0.5),
    0 12px 28px rgba(0, 0, 0, 0.25);
}

/* Floating Animation */
.gallery-item {
  animation: floating 6s ease-in-out infinite;
}

@keyframes floating {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-6px);
  }
}

/* Reflection Highlight */
.reflection {
  position: absolute;
  top: 0;
  left: -120%;
  width: 60%;
  height: 100%;
  background: linear-gradient(120deg,
      transparent,
      rgba(255, 255, 255, 0.45),
      transparent);
  transform: skewX(-25deg);
  transition: 0.8s ease;
}

.gallery-item:hover .reflection {
  left: 150%;
}

/* Smooth parallax inner glass */
.gallery-inner {
  backdrop-filter: blur(2px);
}
</style>
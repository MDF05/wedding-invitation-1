<template>
  <section ref="sectionRef" class="py-20 bg-white gallery-section">
    <div class="container px-4 mx-auto">
      <h2 class="mb-4 text-4xl text-center md:text-5xl font-great-vibes text-gold">
        Galeri Cinta Kami
      </h2>
      <p class="max-w-2xl mx-auto mb-12 text-lg text-center text-gray-600 font-lora">
        Kenangan indah perjalanan cinta kami yang akan abadi selamanya
      </p>

      <!-- Gallery Grid -->
      <div class="grid max-w-6xl grid-cols-1 gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
        <div v-for="(photo, index) in photos" :key="index"
          class="transition duration-500 transform cursor-pointer gallery-item group hover:scale-105"
          @click="openLightbox(index)">
          <div class="relative h-64 overflow-hidden wedding-frame rounded-xl">
            <img :src="photo.src" :alt="photo.alt"
              class="object-cover w-full h-full transition duration-700 group-hover:scale-110"
              @error="handleImageError">
            <div
              class="absolute inset-0 flex items-center justify-center transition duration-300 pointer-events-none group-hover:bg-opacity-30 group-hover:bg-black">
              <div
                class="text-white transition duration-300 transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                <div class="flex items-center justify-center w-full text-7xl ">🔍</div>
                <p class="mt-2 text-sm">Klik untuk melihat</p>
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
        <button v-if="currentIndex > 0" @click.stop="prevPhoto"
          class="absolute p-2 text-2xl text-white transition duration-300 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full left-4 top-1/2 hover:bg-gold">
          ‹
        </button>

        <button v-if="currentIndex < photos.length - 1" @click.stop="nextPhoto"
          class="absolute p-2 text-2xl text-white transition duration-300 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full right-4 top-1/2 hover:bg-gold">
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
import { ref, onMounted, computed } from 'vue'
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
  if (currentIndex.value < photos.value.length - 1) {
    currentIndex.value++
  }
}

const prevPhoto = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const handleImageError = (event) => {
  const parent = event.target.parentElement
  event.target.style.display = 'none'
  parent.classList.add('bg-gradient-to-br', 'from-gray-100', 'to-gray-200')
  parent.innerHTML = '<div class="flex items-center justify-center w-full h-full text-gray-400"><div class="text-center"><div class="mb-2 text-3xl">📷</div><p class="text-sm">Foto ' + event.target.alt + '</p></div></div>'
}

// Keyboard navigation
const handleKeydown = (event) => {
  if (!lightboxVisible.value) return

  if (event.key === 'Escape') closeLightbox()
  if (event.key === 'ArrowRight') nextPhoto()
  if (event.key === 'ArrowLeft') prevPhoto()
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)

  if (sectionRef.value) {
    createScrollTrigger(sectionRef.value, (element) => {
      weddingAnimations.staggerGrid(element.querySelectorAll('.gallery-item'), 0.1)
    })
  }
})
</script>

<style scoped>
.gallery-section {
  background-image:
    radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(183, 110, 121, 0.05) 0%, transparent 50%);
}

.gallery-item {
  animation-delay: calc(var(--item-index, 0) * 0.1s);
}
</style>
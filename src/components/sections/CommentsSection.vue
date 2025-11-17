<template>
  <section ref="sectionRef"
    class="wishes-section py-20 bg-gradient-to-br from-cyan-900 to-green-100 rounded-4xl relative overflow-hidden">
    <!-- 3D Background Elements -->
    <div class="bg-elements">
      <div class="bg-element envelope-1"></div>
      <div class="bg-element envelope-2"></div>
      <div class="bg-element heart-1"></div>
      <div class="bg-element heart-2"></div>
      <div class="bg-element flower-1"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <!-- Enhanced Header -->
      <div class="header-3d mb-16" ref="headerRef">
        <h2 class="text-4xl md:text-5xl font-great-vibes text-gold text-center mb-4 header-main">
          Ucapan & Doa
        </h2>
        <div class="title-underline"></div>
        <p class="text-gray-600 font-lora text-lg text-center mb-12 max-w-2xl mx-auto header-subtitle">
          Berikan ucapan dan doa restu untuk pernikahan kami
        </p>
      </div>

      <div class="max-w-4xl mx-auto">
        <!-- Enhanced Comment Form -->
        <div class="wedding-frame bg-white p-8 rounded-xl mb-12 form-container-3d scroll-element" data-delay="0">
          <form @submit.prevent="submitComment" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="form-group-3d">
                <label class="block text-gray-700 font-lora mb-2 font-semibold">Nama Anda</label>
                <input v-model="newComment.name" type="text" placeholder="Masukkan nama Anda"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-300 form-input-3d"
                  required>
                <div class="input-glow"></div>
              </div>
              <div class="form-group-3d">
                <label class="block text-gray-700 font-lora mb-2 font-semibold">Hubungan</label>
                <select v-model="newComment.relation"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-300 form-input-3d">
                  <option value="">Pilih hubungan</option>
                  <option value="Keluarga">Keluarga</option>
                  <option value="Saudara">Saudara</option>
                  <option value="Teman">Teman</option>
                  <option value="Rekan Kerja">Rekan Kerja</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
                <div class="input-glow"></div>
              </div>
            </div>

            <div class="form-group-3d">
              <label class="block text-gray-700 font-lora mb-2 font-semibold">Ucapan & Doa</label>
              <textarea v-model="newComment.message" rows="4" placeholder="Tuliskan ucapan dan doa restu untuk kami..."
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-300 resize-none form-input-3d"
                required></textarea>
              <div class="input-glow"></div>
            </div>

            <button type="submit"
              class="w-full bg-gradient-to-r from-gold to-rose-gold text-white py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 submit-btn-3d shadow-lg hover:shadow-xl"
              :disabled="submitting">
              <span v-if="submitting" class="animate-spin text-xl">⏳</span>
              <span v-else class="text-xl">💌</span>
              <span class="text-lg">{{ submitting ? 'Mengirim...' : 'Kirim Ucapan' }}</span>
            </button>
          </form>
          <div class="form-glow"></div>
        </div>

        <!-- Enhanced Comments List -->
        <div class="space-y-6 comments-container">
          <div v-for="(comment, index) in comments" :key="comment.id"
            class="comment-card-3d wedding-frame bg-white p-6 rounded-xl scroll-element"
            :data-delay="100 + (index * 50)" :style="`--index: ${index}`">
            <div class="card-content">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-4">
                  <div
                    class="avatar-3d w-12 h-12 bg-gradient-to-br from-gold to-rose-gold rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                    {{ getInitials(comment.name) }}
                  </div>
                  <div>
                    <h4 class="font-cormorant text-lg font-semibold text-deep-red">{{ comment.name }}</h4>
                    <p class="font-lora text-gray-500 text-sm">{{ comment.relation }} • {{ comment.timestamp }}</p>
                  </div>
                </div>
                <button @click="likeComment(comment.id)"
                  class="like-btn-3d flex items-center gap-2 text-gray-400 transition-all duration-300 px-3 py-2 rounded-lg"
                  :class="{
                    'text-rose-gold bg-rose-50 border border-rose-200': comment.likes > 0,
                    'hover:text-rose-500 hover:bg-gray-50': comment.likes === 0
                  }">
                  <span class="text-lg">❤️</span>
                  <span class="text-sm font-semibold">{{ comment.likes }}</span>
                </button>
              </div>

              <p class="font-lora text-gray-700 leading-relaxed comment-text">{{ comment.message }}</p>
            </div>
            <div class="card-glow"></div>
          </div>

          <!-- Enhanced Empty State -->
          <div v-if="comments.length === 0" class="text-center py-16 empty-state-3d scroll-element" data-delay="200">
            <div class="empty-container wedding-frame bg-soft-pink bg-opacity-30 p-12 rounded-2xl inline-block">
              <div class="text-6xl mb-6 empty-icon">💌</div>
              <h3 class="text-2xl font-cormorant text-deep-red font-semibold mb-4">
                Belum Ada Ucapan
              </h3>
              <p class="text-gray-600 font-lora max-w-md mx-auto leading-relaxed">
                Jadilah yang pertama memberikan ucapan dan doa restu untuk pernikahan kami
              </p>
            </div>
            <div class="empty-glow"></div>
          </div>
        </div>

        <!-- Load More Button -->
        <div v-if="comments.length > 0 && hasMoreComments" class="text-center mt-12 scroll-element" data-delay="300">
          <button @click="loadMoreComments"
            class="load-more-btn-3d bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 mx-auto border-2 border-gray-300 hover:border-gold">
            <span class="text-lg">📨</span>
            <span>Muat Lebih Banyak</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useCommentsStore } from '../../stores/commentsStore'

const sectionRef = ref(null)
const commentsStore = useCommentsStore()
const submitting = ref(false)
const hasMoreComments = ref(true)

let scrollListener = null

const newComment = ref({
  name: '',
  relation: '',
  message: ''
})

const comments = ref([])

const getInitials = (name) => {
  return name.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2)
}

const submitComment = async () => {
  if (!newComment.value.name || !newComment.value.message) return

  submitting.value = true

  // Simulate API call delay with enhanced visual feedback
  const submitBtn = document.querySelector('.submit-btn-3d')
  if (submitBtn) {
    submitBtn.classList.add('bg-gradient-to-r', 'from-green-500', 'to-emerald-600')
  }

  await new Promise(resolve => setTimeout(resolve, 1500))

  commentsStore.addComment({
    name: newComment.value.name,
    relation: newComment.value.relation || 'Tamu',
    message: newComment.value.message
  })

  // Reset form with animation
  newComment.value = {
    name: '',
    relation: '',
    message: ''
  }

  submitting.value = false

  // Reset button color
  if (submitBtn) {
    submitBtn.classList.remove('bg-gradient-to-r', 'from-green-500', 'to-emerald-600')
    submitBtn.classList.add('bg-gradient-to-r', 'from-gold', 'to-rose-gold')
  }

  // Refresh comments
  loadComments()
}

const likeComment = (commentId) => {
  const commentCard = document.querySelector(`[data-comment-id="${commentId}"]`)
  if (commentCard) {
    commentCard.classList.add('comment-liked')
    setTimeout(() => {
      commentCard.classList.remove('comment-liked')
    }, 600)
  }

  commentsStore.likeComment(commentId)
  loadComments()
}

const loadMoreComments = () => {
  // Simulate loading more comments
  setTimeout(() => {
    hasMoreComments.value = false
  }, 1000)
}

const loadComments = () => {
  commentsStore.loadComments()
  comments.value = commentsStore.comments
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
          const rotationY = (1 - progress) * 3
          const translateZ = progress * 15
          const translateY = (1 - progress) * 30
          element.style.transform = `perspective(1000px) rotateY(${rotationY}deg) translateZ(${translateZ}px) translateY(${translateY}px)`
          element.style.opacity = progress
        }
      }, delay)
    } else if (elementTop >= windowHeight) {
      // Reset elements below viewport
      element.style.transform = 'perspective(1000px) rotateY(3deg) translateZ(0px) translateY(30px)'
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
    element.style.transform = 'perspective(1000px) rotateY(3deg) translateZ(0px) translateY(30px)'
    element.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
  })
  handleScroll()
}

onMounted(() => {
  loadComments()

  scrollListener = () => handleScroll()
  window.addEventListener('scroll', scrollListener)

  setTimeout(initAnimations, 100)
})

onUnmounted(() => {
  if (scrollListener) {
    window.removeEventListener('scroll', scrollListener)
  }
})
</script>

<style scoped>
.wishes-section {
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

.envelope-1 {
  width: 80px;
  height: 80px;
  top: 15%;
  left: 5%;
  animation-delay: 0s;
}

.envelope-2 {
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

.flower-1 {
  width: 90px;
  height: 90px;
  top: 50%;
  left: 8%;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%);
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

/* Enhanced Form Styles */
.form-container-3d {
  transform-style: preserve-3d;
  position: relative;
  box-shadow:
    0 15px 40px rgba(0, 0, 0, 0.1),
    0 8px 20px rgba(212, 175, 55, 0.08);
  border: 2px solid transparent;
  background: linear-gradient(white, white) padding-box,
    linear-gradient(45deg, #D4AF37, #B76E79) border-box;
}

.form-glow {
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
  border-radius: 16px;
}

.form-container-3d:hover .form-glow {
  opacity: 1;
}

.form-container-3d:hover {
  transform: translateY(-5px) translateZ(10px) !important;
}

/* Form Input Styles */
.form-group-3d {
  position: relative;
  transform-style: preserve-3d;
}

.form-input-3d {
  transition: all 0.3s ease;
  background: white;
  transform-style: preserve-3d;
}

.form-input-3d:focus {
  transform: translateZ(5px);
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.15);
}

.input-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center,
      rgba(212, 175, 55, 0.05) 0%,
      transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: 12px;
  z-index: -1;
}

.form-input-3d:focus~.input-glow {
  opacity: 1;
}

/* Submit Button */
.submit-btn-3d {
  transform-style: preserve-3d;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  overflow: hidden;
}

.submit-btn-3d::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.submit-btn-3d:hover::before {
  left: 100%;
}

.submit-btn-3d:hover {
  transform: translateY(-3px) translateZ(5px);
  box-shadow:
    0 15px 30px rgba(212, 175, 55, 0.3),
    0 8px 20px rgba(183, 110, 121, 0.2);
}

.submit-btn-3d:disabled {
  opacity: 0.7;
  transform: none !important;
}

/* Enhanced Comment Cards */
.comment-card-3d {
  transform-style: preserve-3d;
  position: relative;
  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.08),
    0 4px 12px rgba(212, 175, 55, 0.05);
  border: 1px solid transparent;
  background: linear-gradient(white, white) padding-box,
    linear-gradient(45deg, transparent, rgba(212, 175, 55, 0.1)) border-box;
  transition: all 0.4s ease;
}

.comment-card-3d:hover {
  transform: translateY(-5px) translateZ(10px) !important;
  box-shadow:
    0 15px 40px rgba(212, 175, 55, 0.15),
    0 8px 20px rgba(183, 110, 121, 0.1);
}

.comment-card-3d:hover .card-glow {
  opacity: 1;
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center,
      rgba(212, 175, 55, 0.08) 0%,
      transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: 12px;
}

/* Avatar Styles */
.avatar-3d {
  transform-style: preserve-3d;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
}

.comment-card-3d:hover .avatar-3d {
  transform: scale(1.1) translateZ(5px);
  box-shadow: 0 6px 18px rgba(212, 175, 55, 0.4);
}

/* Like Button */
.like-btn-3d {
  transform-style: preserve-3d;
  transition: all 0.3s ease;
}

.like-btn-3d:hover {
  transform: scale(1.1) translateZ(2px);
}

/* Comment Text */
.comment-text {
  position: relative;
  z-index: 2;
}

/* Empty State */
.empty-state-3d {
  transform-style: preserve-3d;
  position: relative;
}

.empty-container {
  animation: gentlePulse 3s ease-in-out infinite;
  transform-style: preserve-3d;
}

.empty-glow {
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

.empty-state-3d:hover .empty-glow {
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

/* Load More Button */
.load-more-btn-3d {
  transform-style: preserve-3d;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.load-more-btn-3d:hover {
  transform: translateY(-3px) translateZ(5px);
  box-shadow: 0 10px 25px rgba(212, 175, 55, 0.2);
  background: linear-gradient(45deg, #f8f9fa, #e9ecef);
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

.bg-ivory {
  background-color: #FFFFF0;
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

  .form-container-3d,
  .comment-card-3d {
    padding: 1.5rem;
  }
}

/* Performance Optimizations */
.scroll-element {
  will-change: transform, opacity;
}
</style>
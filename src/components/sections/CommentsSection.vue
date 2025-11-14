<template>
  <section 
    ref="sectionRef"
    class="comments-section py-20 bg-gradient-to-b from-champagne to-ivory"
  >
    <div class="container mx-auto px-4">
      <h2 class="text-4xl md:text-5xl font-great-vibes text-gold text-center mb-4">
        Ucapan & Doa
      </h2>
      <p class="text-gray-600 font-lora text-lg text-center mb-12 max-w-2xl mx-auto">
        Berikan ucapan dan doa restu untuk pernikahan kami
      </p>

      <div class="max-w-4xl mx-auto">
        <!-- Comment Form -->
        <div class="wedding-frame bg-white p-8 rounded-xl mb-12 transform hover:scale-105 transition duration-300">
          <form @submit.prevent="submitComment" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-gray-700 font-lora mb-2">Nama Anda</label>
                <input 
                  v-model="newComment.name"
                  type="text" 
                  placeholder="Masukkan nama Anda"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition duration-300"
                  required
                >
              </div>
              <div>
                <label class="block text-gray-700 font-lora mb-2">Hubungan</label>
                <select 
                  v-model="newComment.relation"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition duration-300"
                >
                  <option value="">Pilih hubungan</option>
                  <option value="Keluarga">Keluarga</option>
                  <option value="Saudara">Saudara</option>
                  <option value="Teman">Teman</option>
                  <option value="Rekan Kerja">Rekan Kerja</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
            </div>
            
            <div>
              <label class="block text-gray-700 font-lora mb-2">Ucapan & Doa</label>
              <textarea 
                v-model="newComment.message"
                rows="4"
                placeholder="Tuliskan ucapan dan doa restu untuk kami..."
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition duration-300 resize-none"
                required
              ></textarea>
            </div>
            
            <button 
              type="submit"
              class="w-full bg-gold text-white py-4 rounded-lg font-semibold hover:bg-rose-gold transition duration-300 flex items-center justify-center gap-2"
              :disabled="submitting"
            >
              <span v-if="submitting" class="animate-spin">⏳</span>
              <span v-else>💌</span>
              {{ submitting ? 'Mengirim...' : 'Kirim Ucapan' }}
            </button>
          </form>
        </div>

        <!-- Comments List -->
        <div class="space-y-6">
          <div 
            v-for="comment in comments" 
            :key="comment.id"
            class="comment-card wedding-frame bg-white p-6 rounded-xl transform hover:scale-105 transition duration-300"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-gradient-to-br from-gold to-rose-gold rounded-full flex items-center justify-center text-white font-semibold">
                  {{ getInitials(comment.name) }}
                </div>
                <div>
                  <h4 class="font-cormorant text-lg font-semibold text-deep-red">{{ comment.name }}</h4>
                  <p class="font-lora text-gray-500 text-sm">{{ comment.relation }} • {{ comment.timestamp }}</p>
                </div>
              </div>
              <button 
                @click="likeComment(comment.id)"
                class="flex items-center gap-1 text-gray-400 hover:text-rose-gold transition duration-300"
                :class="{ 'text-rose-gold': comment.likes > 0 }"
              >
                <span>❤️</span>
                <span class="text-sm">{{ comment.likes }}</span>
              </button>
            </div>
            
            <p class="font-lora text-gray-700 leading-relaxed">{{ comment.message }}</p>
          </div>

          <!-- Empty State -->
          <div 
            v-if="comments.length === 0"
            class="text-center py-12"
          >
            <div class="text-6xl mb-4">💌</div>
            <p class="text-gray-500 font-lora text-lg">Jadilah yang pertama memberikan ucapan dan doa</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCommentsStore } from '../../stores/commentsStore'
import { weddingAnimations, createScrollTrigger } from '../../utils/animations'

const sectionRef = ref(null)
const commentsStore = useCommentsStore()
const submitting = ref(false)

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
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  commentsStore.addComment({
    name: newComment.value.name,
    relation: newComment.value.relation || 'Tamu',
    message: newComment.value.message
  })
  
  // Reset form
  newComment.value = {
    name: '',
    relation: '',
    message: ''
  }
  
  submitting.value = false
  
  // Refresh comments
  loadComments()
}

const likeComment = (commentId) => {
  commentsStore.likeComment(commentId)
  loadComments()
}

const loadComments = () => {
  commentsStore.loadComments()
  comments.value = commentsStore.comments
}

onMounted(() => {
  loadComments()
  
  if (sectionRef.value) {
    createScrollTrigger(sectionRef.value, (element) => {
      weddingAnimations.fadeInUp(element, 0.2)
    })
  }
})
</script>

<style scoped>
.comments-section {
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(183, 110, 121, 0.08) 0%, transparent 50%);
}

.comment-card {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  animation: slideInUp 0.6s ease forwards;
  opacity: 0;
  transform: translateY(30px);
}

.comment-card:nth-child(odd) {
  animation-delay: calc(var(--index, 0) * 0.1s);
}

.comment-card:nth-child(even) {
  animation-delay: calc(var(--index, 0) * 0.1s + 0.05s);
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
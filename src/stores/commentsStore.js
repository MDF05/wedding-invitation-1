import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommentsStore = defineStore('comments', () => {
  const comments = ref([])
  const loading = ref(false)

  const addComment = (comment) => {
    const newComment = {
      id: Date.now(),
      name: comment.name || 'Tamu',
      message: comment.message,
      timestamp: new Date().toLocaleString('id-ID'),
      likes: 0
    }
    comments.value.unshift(newComment)
    
    // Simpan ke localStorage
    localStorage.setItem('weddingComments', JSON.stringify(comments.value))
  }

  const loadComments = () => {
    const savedComments = localStorage.getItem('weddingComments')
    if (savedComments) {
      comments.value = JSON.parse(savedComments)
    }
  }

  const likeComment = (commentId) => {
    const comment = comments.value.find(c => c.id === commentId)
    if (comment) {
      comment.likes++
      localStorage.setItem('weddingComments', JSON.stringify(comments.value))
    }
  }

  return {
    comments,
    loading,
    addComment,
    loadComments,
    likeComment
  }
})
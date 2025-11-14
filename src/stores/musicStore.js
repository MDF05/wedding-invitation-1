import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMusicStore = defineStore('music', () => {
  const isPlaying = ref(false)
  const hasConsent = ref(false)
  const showConsentModal = ref(true)
  const volume = ref(0.5)

  const audioElement = ref(null)

  const initAudio = () => {
    if (!audioElement.value) {
      audioElement.value = new Audio('/audio/wedding-music.mp3')
      audioElement.value.loop = true
      audioElement.value.volume = volume.value
    }
  }

  const playMusic = () => {
    if (!hasConsent.value) return
    
    initAudio()
    const playPromise = audioElement.value.play()
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isPlaying.value = true
        })
        .catch(error => {
          console.error('Error playing music:', error)
          isPlaying.value = false
        })
    }
  }

  const pauseMusic = () => {
    if (audioElement.value) {
      audioElement.value.pause()
      isPlaying.value = false
    }
  }

  const toggleMusic = () => {
    if (isPlaying.value) {
      pauseMusic()
    } else {
      playMusic()
    }
  }

  const setConsent = (consent) => {
    hasConsent.value = consent
    showConsentModal.value = false
    
    if (consent) {
      playMusic()
    } else {
      pauseMusic()
    }
    
    localStorage.setItem('musicConsent', consent.toString())
  }

  const loadConsent = () => {
    const savedConsent = localStorage.getItem('musicConsent')
    if (savedConsent) {
      hasConsent.value = savedConsent === 'true'
      showConsentModal.value = false
      
      if (hasConsent.value) {
        playMusic()
      }
    }
  }

  return {
    isPlaying,
    hasConsent,
    showConsentModal,
    volume,
    playMusic,
    pauseMusic,
    toggleMusic,
    setConsent,
    loadConsent
  }
})
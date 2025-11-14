import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const currentSection = ref('header')
  const isMenuOpen = ref(false)

  const setCurrentSection = (section) => {
    currentSection.value = section
  }

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  return {
    currentSection,
    isMenuOpen,
    setCurrentSection,
    toggleMenu
  }
})
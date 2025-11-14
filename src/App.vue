<template>
  <div id="app" class="min-h-screen bg-ivory">
    <ConsentModal 
      v-if="musicStore.showConsentModal"
      @consent="handleConsent"
    />
    
    <RouterView :key="$route.fullPath" />
    
    <MusicPlayer 
      v-if="musicStore.hasConsent"
      class="fixed bottom-6 right-6 z-50"
    />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useMusicStore } from './stores/musicStore'
import { useGuestStore } from './stores/guestStore'
import ConsentModal from './components/ui/ConsentModal.vue'
import MusicPlayer from './components/sections/MusicPlayer.vue'

const musicStore = useMusicStore()
const guestStore = useGuestStore()

const handleConsent = (consent) => {
  musicStore.setConsent(consent)
}

onMounted(() => {
  musicStore.loadConsent()
  guestStore.loadGuests()
})
</script>

<style>
@import './assets/styles/animations.css';
</style>
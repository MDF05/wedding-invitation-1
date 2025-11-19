<template>
  <div id="app" class="min-h-screen bg-ivory">
    <ConsentModal v-if="musicStore.showConsentModal" @consent="handleConsent" />

    <RouterView :key="$route.fullPath" />

    <MusicPlayer v-if="musicStore.hasConsent" class="fixed bottom-6 right-6 z-50
    rounded-full p-3 shadow-xl cursor-pointer

    /* 3D Effect */
    bg-gradient-to-b from-pink-800 via-ivory to-red-700
    shadow-[0_10px_10px_rgba(0,0,0,0.6)]
    border border-white/20

    /* Neon Glow */
    before:content-[''] before:absolute before:inset-0 before:rounded-full
    before:bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.4),transparent)]
    before:blur-xl before:opacity-70 before:-z-10

    /* Glass effect */
    backdrop-blur-md bg-opacity-80

    /* Hover Effects */
    hover:scale-110 hover:shadow-[0_0_15px_5px_rgba(100,115,115,0.5)]
    transition-all duration-300 ease-out
  " />

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
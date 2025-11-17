<template>
  <div class="music-player">
    <button @click="musicStore.toggleMusic"
      class="w-14 h-14 bg-gold text-white rounded-full shadow-lg flex items-center justify-center text-xl hover:bg-rose-gold transition-all duration-300 relative group"
      :class="{ 'heartbeat-animation': musicStore.isPlaying }">
      {{ musicStore.isPlaying ? '🔊' : '🔇' }}

      <!-- Equalizer Animation -->
      <div v-if="musicStore.isPlaying"
        class="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 rounded-lg p-2 hidden group-hover:flex items-end gap-1">
        <div v-for="n in 5" :key="n" class="w-1 bg-gold rounded-full equalizer-bar"
          :style="`height: ${Math.random() * 12 + 3}px`"></div>
      </div>
    </button>
  </div>
</template>

<script setup>
import { useMusicStore } from '../../stores/musicStore'

const musicStore = useMusicStore()
</script>

<style scoped>
.equalizer-bar {
  animation: equalizer 1s ease-in-out infinite;
  animation-delay: calc(var(--i, 0) * 0.15s);
}

@keyframes equalizer {

  0%,
  100% {
    height: 3px;
  }

  50% {
    height: 15px;
  }
}

.music-player {
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}
</style>
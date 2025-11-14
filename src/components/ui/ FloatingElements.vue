<template>
  <div class="floating-elements">
    <div 
      v-for="element in elements"
      :key="element.id"
      class="floating-element"
      :class="element.type"
      :style="elementStyle(element)"
      @animationend="resetAnimation(element)"
    >
      {{ element.emoji }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const elements = ref([])

const elementTypes = [
  { type: 'heart', emoji: '❤️', size: '1.2rem' },
  { type: 'flower', emoji: '🌸', size: '1rem' },
  { type: 'sparkle', emoji: '✨', size: '0.8rem' },
  { type: 'star', emoji: '⭐', size: '1rem' },
  { type: 'music', emoji: '🎵', size: '1.1rem' }
]

const generateElement = () => {
  const type = elementTypes[Math.floor(Math.random() * elementTypes.length)]
  return {
    id: Date.now() + Math.random(),
    type: type.type,
    emoji: type.emoji,
    size: type.size,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 7
  }
}

const elementStyle = (element) => {
  return {
    left: `${element.left}%`,
    fontSize: element.size,
    animationDelay: `${element.delay}s`,
    animationDuration: `${element.duration}s`
  }
}

const resetAnimation = (element) => {
  const index = elements.value.findIndex(el => el.id === element.id)
  if (index > -1) {
    elements.value.splice(index, 1)
  }
}

let animationInterval

onMounted(() => {
  // Initial elements
  for (let i = 0; i < 8; i++) {
    elements.value.push(generateElement())
  }

  // Add new elements periodically
  animationInterval = setInterval(() => {
    if (elements.value.length < 15) {
      elements.value.push(generateElement())
    }
  }, 2000)
})

onUnmounted(() => {
  if (animationInterval) {
    clearInterval(animationInterval)
  }
})
</script>

<style scoped>
.floating-elements {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
}

.floating-element {
  position: absolute;
  top: -50px;
  opacity: 0;
  animation: float-down linear forwards;
  pointer-events: none;
  user-select: none;
}

.floating-element.heart {
  animation-name: float-down-heart;
  filter: drop-shadow(0 0 3px rgba(255, 0, 0, 0.3));
}

.floating-element.flower {
  animation-name: float-down-flower;
  filter: drop-shadow(0 0 3px rgba(255, 182, 193, 0.3));
}

.floating-element.sparkle {
  animation-name: float-down-sparkle;
  filter: drop-shadow(0 0 3px rgba(255, 215, 0, 0.3));
}

.floating-element.star {
  animation-name: float-down-star;
  filter: drop-shadow(0 0 3px rgba(255, 255, 0, 0.3));
}

.floating-element.music {
  animation-name: float-down-music;
  filter: drop-shadow(0 0 3px rgba(212, 175, 55, 0.3));
}

@keyframes float-down {
  0% {
    transform: translateY(0) rotate(0deg) scale(0.8);
    opacity: 0;
  }
  10% {
    opacity: 0.7;
  }
  90% {
    opacity: 0.7;
  }
  100% {
    transform: translateY(100vh) rotate(360deg) scale(1.2);
    opacity: 0;
  }
}

@keyframes float-down-heart {
  0% {
    transform: translateY(0) rotate(0deg) scale(0.8);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  50% {
    transform: translateX(20px) rotate(180deg) scale(1.1);
  }
  90% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(100vh) translateX(-20px) rotate(360deg) scale(1.3);
    opacity: 0;
  }
}

@keyframes float-down-flower {
  0% {
    transform: translateY(0) rotate(0deg) scale(0.7);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  50% {
    transform: translateX(-15px) rotate(120deg) scale(0.9);
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(100vh) translateX(15px) rotate(240deg) scale(1.1);
    opacity: 0;
  }
}

@keyframes float-down-sparkle {
  0% {
    transform: translateY(0) rotate(0deg) scale(0.6);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  40% {
    transform: scale(1.2);
  }
  60% {
    transform: scale(0.8);
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg) scale(1);
    opacity: 0;
  }
}

@keyframes float-down-star {
  0% {
    transform: translateY(0) rotate(0deg) scale(0.7);
    opacity: 0;
  }
  15% {
    opacity: 0.9;
  }
  30% {
    transform: translateX(10px) rotate(90deg) scale(1);
  }
  70% {
    transform: translateX(-10px) rotate(270deg) scale(1.1);
  }
  85% {
    opacity: 0.9;
  }
  100% {
    transform: translateY(100vh) rotate(360deg) scale(1.2);
    opacity: 0;
  }
}

@keyframes float-down-music {
  0% {
    transform: translateY(0) rotate(0deg) scale(0.8);
    opacity: 0;
  }
  10% {
    opacity: 0.7;
  }
  25% {
    transform: translateX(8px) scale(1.1);
  }
  50% {
    transform: translateX(-8px) scale(0.9);
  }
  75% {
    transform: translateX(8px) scale(1.05);
  }
  90% {
    opacity: 0.7;
  }
  100% {
    transform: translateY(100vh) translateX(-8px) rotate(180deg) scale(1.1);
    opacity: 0;
  }
}

/* Reduce animation for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  .floating-element {
    animation: none;
    display: none;
  }
}
</style>
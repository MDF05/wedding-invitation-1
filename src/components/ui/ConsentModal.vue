<template>
  <div class="consent-modal fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
    <div class="consent-content wedding-frame bg-ivory rounded-2xl p-8 max-w-md w-full text-center transform scale-95 animate-scale-in">
      <!-- Decorative Elements -->
      <div class="floating-hearts">
        <div class="heart">💖</div>
        <div class="heart">💕</div>
        <div class="heart">💗</div>
      </div>

      <div class="text-5xl mb-6">🎵</div>
      
      <h2 class="text-2xl font-playfair text-gold mb-4">
        Background Music
      </h2>
      
      <p class="text-gray-700 font-lora mb-6 leading-relaxed">
        Apakah Anda ingin memutar musik latar untuk pengalaman yang lebih romantis?
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-4">
        <button 
          @click="handleConsent(true)"
          class="consent-btn yes-btn flex-1 bg-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <span>🎵</span>
          <span>Ya, Putar Musik</span>
        </button>
        <button 
          @click="handleConsent(false)"
          class="consent-btn no-btn flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <span>🔇</span>
          <span>Tidak</span>
        </button>
      </div>
      
      <p class="text-sm text-gray-500 font-lora">
        Anda dapat mengubahnya nanti di pengaturan musik
      </p>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['consent'])

const handleConsent = (consent) => {
  emit('consent', consent)
}
</script>

<style scoped>
.consent-modal {
  backdrop-filter: blur(5px);
}

.consent-content {
  position: relative;
  overflow: hidden;
}

.floating-hearts {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.heart {
  position: absolute;
  font-size: 1.2rem;
  opacity: 0.3;
  animation: heart-float 3s ease-in-out infinite;
}

.heart:nth-child(1) {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.heart:nth-child(2) {
  top: 60%;
  left: 80%;
  animation-delay: 1s;
}

.heart:nth-child(3) {
  top: 30%;
  left: 70%;
  animation-delay: 2s;
}

@keyframes heart-float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
    opacity: 0.6;
  }
}

@keyframes scale-in {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-scale-in {
  animation: scale-in 0.5s ease-out forwards;
}

.consent-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.yes-btn:hover {
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
}

.no-btn:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}
</style>
<template>
  <div class="home-page">
    <!-- Background Petals -->
    <div class="petal-container">
      <div v-for="i in 25" :key="i" class="petal" :style="petalStyle(i)"></div>
    </div>

    <main class="container relative z-10 px-4 py-8 mx-auto">
      <!-- Header Section -->
      <HeaderSection :guest-name="guestName" class="mb-20" />

      <!-- Guest Welcome -->
      <section v-if="guestName && guestStore.currentGuest"
        class="p-8 mb-16 text-center bg-opacity-50 wedding-frame bg-soft-pink">
        <h2 class="mb-4 text-3xl font-great-vibes text-gold">
          Kepada Yth.
        </h2>
        <p class="text-2xl font-cormorant text-deep-red">
          {{ guestStore.currentGuest.name }}
        </p>
        <p class="mt-2 text-gray-600 font-lora">
          Kami mengucapkan terima kasih atas kehadiran dan doa restunya
        </p>
      </section>

      <!-- Countdown -->
      <CountdownSection class="mb-20" />

      <!-- Agenda -->
      <AgendaSection class="mb-20" />

      <!-- Maps -->
      <MapsSection class="mb-20" />

      <!-- Gallery -->
      <GallerySection class="mb-20" />

      <!-- Religious -->
      <ReligiousSection class="mb-20" />

      <!-- Donation -->
      <DonationSection class="mb-20" />

      <!-- Live Stream -->
      <LiveStreamSection class="mb-20" />

      <!-- Comments -->
      <CommentsSection class="mb-20" />

      <!-- Reminder -->
      <ReminderSection class="mb-20" />
    </main>

    <!-- Footer -->
    <footer class="relative z-10 py-12 text-center bg-champagne">
      <p class="mb-4 text-lg italic text-gray-700 font-lora">
        "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri,
        supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang."
      </p>
      <p class="text-xl text-gold font-playfair">QS. Ar-Rum: 21</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useGuestStore } from '../stores/guestStore'

// Components
import HeaderSection from '../components/sections/HeaderSection.vue'
import GallerySection from '../components/sections/GallerySection.vue'
import MapsSection from '../components/sections/MapsSection.vue'
import CountdownSection from '../components/sections/CountdownSection.vue'
import ReminderSection from '../components/sections/ReminderSection.vue'
import ReligiousSection from '../components/sections/ReligiousSection.vue'
import DonationSection from '../components/sections/DonationSection.vue'
import AgendaSection from '../components/sections/AgendaSection.vue'
import CommentsSection from '../components/sections/CommentsSection.vue'
import LiveStreamSection from '../components/sections/LiveStreamSection.vue'

const route = useRoute()
const guestStore = useGuestStore()

const guestName = computed(() => route.params.guestName)

const petalStyle = (index) => {
  const left = Math.random() * 100
  const animationDelay = Math.random() * 15
  const animationDuration = 15 + Math.random() * 10

  return {
    left: `${left}%`,
    animationDelay: `${animationDelay}s`,
    animationDuration: `${animationDuration}s`
  }
}

onMounted(() => {
  if (guestName.value) {
    guestStore.setCurrentGuest(guestName.value)
  }
})
</script>

<style scoped>
.home-page {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
}

.petal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.petal {
  position: absolute;
  width: 12px;
  height: 12px;
  background: radial-gradient(circle, #ffb6c1, #ff69b4);
  border-radius: 50% 0 50% 50%;
  transform: rotate(45deg);
  opacity: 0.6;
  animation: petal-fall linear infinite;
}
</style>
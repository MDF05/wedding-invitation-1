<template>
  <section ref="sectionRef" class="religious-section py-20 bg-gradient-to-b from-ivory to-champagne">
    <!-- Simplified Background Elements -->
    <div class="floating-elements">
      <div class="floating-element element-1"></div>
      <div class="floating-element element-2"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <!-- Simplified Header -->
      <div class="header-3d mb-16" ref="headerRef">
        <div class="text-center mb-4">
          <h2 class="text-4xl md:text-5xl font-great-vibes text-gold mb-4 header-main">
            Doa & Ayat Suci
          </h2>
          <div class="title-underline"></div>
        </div>
        <p class="text-gray-600 font-lora text-lg text-center mb-12 max-w-2xl mx-auto header-subtitle">
          Dengan memohon ridho dan berkah Allah SWT dalam membangun rumah tangga
        </p>
      </div>

      <!-- Quran Verses -->
      <div class="max-w-4xl mx-auto mb-16">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-cormorant text-deep-red font-semibold mb-6 section-title">Ayat Al-Qur'an</h3>
        </div>

        <div v-for="(verse, index) in quranVerses" :key="'verse-' + index"
          class="verse-card wedding-frame bg-white p-8 rounded-xl mb-6 scroll-card" :data-index="index">
          <div class="card-content">
            <div class="arabic-text text-3xl font-arabic text-deep-red text-right leading-loose mb-4">
              {{ verse.arabic }}
            </div>
            <div class="latin-text text-gray-600 font-lora italic mb-3 text-sm">
              {{ verse.latin }}
            </div>
            <div class="translation-text text-gray-700 font-lora leading-relaxed mb-3">
              "{{ verse.translation }}"
            </div>
            <div class="surah-text text-gold font-playfair font-semibold text-right">
              QS. {{ verse.surah }} : {{ verse.verse }}
            </div>
          </div>
        </div>
      </div>

      <!-- Prayers -->
      <div class="max-w-4xl mx-auto mb-16">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-cormorant text-deep-red font-semibold mb-6 section-title">Doa Untuk Pengantin</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="(prayer, index) in prayers" :key="'prayer-' + index"
            class="prayer-card wedding-frame bg-soft-pink bg-opacity-30 p-6 rounded-xl scroll-card" :data-index="index">
            <div class="card-content">
              <div class="arabic-text text-2xl font-arabic text-deep-red text-right leading-loose mb-4">
                {{ prayer.arabic }}
              </div>
              <div class="latin-text text-gray-600 font-lora italic mb-3 text-sm">
                {{ prayer.latin }}
              </div>
              <div class="translation-text text-gray-700 font-lora leading-relaxed">
                {{ prayer.translation }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Hadiths -->
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-cormorant text-deep-red font-semibold mb-6 section-title">Hadits Tentang Pernikahan
          </h3>
        </div>

        <div v-for="(hadith, index) in hadiths" :key="'hadith-' + index"
          class="hadith-card wedding-frame bg-white p-6 rounded-xl mb-4 scroll-card" :data-index="index">
          <div class="card-content">
            <div class="text-gray-700 font-lora leading-relaxed mb-3 italic">
              "{{ hadith.text }}"
            </div>
            <div class="translation-text text-gray-600 font-lora mb-2">
              {{ hadith.translation }}
            </div>
            <div class="source-text text-gold font-playfair text-sm text-right">
              {{ hadith.source }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Islamic Pattern Background -->
    <div class="islamic-pattern absolute inset-0 pointer-events-none opacity-5"></div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const sectionRef = ref(null)
const headerRef = ref(null)

let scrollListener = null

const quranVerses = ref([
  {
    arabic: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
    latin: 'Wa min āyātihī an khalaqa lakum min anfusikum azwājal litaskunū ilaihā wa ja\'ala bainakum mawaddataw wa rahmah',
    translation: 'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang.',
    surah: 'Ar-Rum',
    verse: '21'
  },
  {
    arabic: 'وَأَنكِحُوا الْأَيَامَىٰ مِنكُمْ وَالصَّالِحِينَ مِنْ عِبَادِكُمْ وَإِمَائِكُمْ',
    latin: 'Wa ankihul ayama minkum wassalihina min ibadikum wa imaikum',
    translation: 'Dan nikahkanlah orang-orang yang sendirian di antara kamu, dan orang-orang yang layak (menikah) dari hamba-hamba sahayamu yang lelaki dan hamba-hamba sahayamu yang perempuan.',
    surah: 'An-Nur',
    verse: '32'
  }
])

const prayers = ref([
  {
    arabic: 'بَارَكَ اللهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
    latin: 'Bārakallāhu laka wa bāraka \'alaika wa jama\'a bainakumā fī khair',
    translation: 'Semoga Allah memberkahimu di waktu bahagia dan memberkahimu di waktu susah, dan semoga Allah mempersatukan kalian berdua dalam kebaikan.'
  },
  {
    arabic: 'جَعَلَ اللهُ بَيْنَكُمَا مَوَدَّةً وَرَحْمَةً وَرِزْقًا وَاسِعًا',
    latin: 'Ja\'alallāhu bainakumā mawaddatan wa rahmataw wa rizqan wāsi\'ā',
    translation: 'Semoga Allah menjadikan untuk kalian berdua kasih sayang, rahmat, dan rezeki yang luas.'
  }
])

const hadiths = ref([
  {
    text: 'النِّكَاحُ مِنْ سُنَّتِي فَمَنْ لَمْ يَعْمَلْ بِسُنَّتِي فَلَيْسَ مِنِّي',
    translation: 'Menikah adalah bagian dari sunnahku. Barangsiapa tidak mengamalkan sunnahku, maka dia bukan termasuk golonganku.',
    source: 'HR. Ibnu Majah'
  },
  {
    text: 'تَزَوَّجُوا الْوَدُودَ الْوَلُودَ فَإِنِّي مُكَاثِرٌ بِكُمُ الْأُمَمَ',
    translation: 'Nikahilah wanita yang penyayang dan subur (banyak anak), karena sesungguhnya aku akan berbangga dengan banyaknya kalian di hadapan umat-umat yang lain.',
    source: 'HR. Abu Daud'
  }
])

// Simplified scroll animation handler
const handleScroll = () => {
  if (!sectionRef.value) return

  const sectionTop = sectionRef.value.getBoundingClientRect().top
  const windowHeight = window.innerHeight

  if (sectionTop < windowHeight * 0.8) {
    const scrollProgress = 1 - (sectionTop / (windowHeight * 0.8))

    // Header animation
    if (headerRef.value) {
      const headerMain = headerRef.value.querySelector('.header-main')
      const headerSubtitle = headerRef.value.querySelector('.header-subtitle')
      const titleUnderline = headerRef.value.querySelector('.title-underline')

      if (headerMain) {
        const translateY = (1 - scrollProgress) * 20
        headerMain.style.transform = `translateY(${translateY}px)`
        headerMain.style.opacity = Math.min(1, scrollProgress * 1.2)
      }

      if (headerSubtitle) {
        const translateY = (1 - scrollProgress) * 15
        headerSubtitle.style.transform = `translateY(${translateY}px)`
        headerSubtitle.style.opacity = Math.min(1, scrollProgress * 1.1)
      }

      if (titleUnderline) {
        titleUnderline.style.width = `${scrollProgress * 100}%`
      }
    }

    // Animate cards with simple fade and slide
    animateCards('.scroll-card', scrollProgress)
    animateCards('.section-title', scrollProgress, 0.3)
  }
}

// Simple card animation
const animateCards = (selector, scrollProgress, delay = 0) => {
  const cards = document.querySelectorAll(selector)
  cards.forEach((card, index) => {
    const cardTop = card.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    if (cardTop < windowHeight * 0.8) {
      const cardProgress = 1 - (cardTop / (windowHeight * 0.8))
      const progress = Math.max(0, Math.min(1, cardProgress - (index * 0.1) - delay))

      // Simple transform and opacity
      card.style.transform = `translateY(${(1 - progress) * 30}px)`
      card.style.opacity = progress
    }
  })
}

onMounted(() => {
  // Initialize scroll listener only
  scrollListener = () => handleScroll()
  window.addEventListener('scroll', scrollListener)
  handleScroll() // Initial call to set positions
})

onUnmounted(() => {
  if (scrollListener) {
    window.removeEventListener('scroll', scrollListener)
  }
})
</script>

<style scoped>
.religious-section {
  position: relative;
}

/* Simplified Floating Elements */
.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-element {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%);
  animation: floatSimple 10s ease-in-out infinite;
}

.element-1 {
  width: 120px;
  height: 120px;
  top: 15%;
  left: 8%;
  animation-delay: 0s;
}

.element-2 {
  width: 80px;
  height: 80px;
  top: 65%;
  right: 12%;
  animation-delay: 3s;
}

@keyframes floatSimple {

  0%,
  100% {
    transform: translateY(0) scale(1);
    opacity: 0.6;
  }

  50% {
    transform: translateY(-15px) scale(1.05);
    opacity: 0.8;
  }
}

/* Header Styles */
.header-3d {
  position: relative;
}

.header-main {
  transition: all 0.6s ease;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.header-subtitle {
  transition: all 0.6s ease 0.1s;
}

.title-underline {
  height: 2px;
  background: linear-gradient(90deg,
      transparent,
      rgba(212, 175, 55, 0.6),
      transparent);
  margin: 0 auto;
  width: 0%;
  transition: width 1s ease;
  max-width: 200px;
}

.section-title {
  transition: all 0.5s ease;
}

/* Card Styles with Simple Animations */
.scroll-card {
  transition: all 0.6s ease;
  opacity: 0;
  transform: translateY(30px);
}

.verse-card,
.prayer-card,
.hadith-card {
  box-shadow:
    0 4px 15px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.verse-card:hover,
.prayer-card:hover,
.hadith-card:hover {
  box-shadow:
    0 8px 25px rgba(212, 175, 55, 0.15),
    0 4px 12px rgba(183, 110, 121, 0.1);
  transform: translateY(-2px);
  border-color: rgba(212, 175, 55, 0.1);
}

/* Arabic Text */
.arabic-text {
  line-height: 2.5;
  font-family: 'Amiri', 'Lateef', serif;
  transition: all 0.3s ease;
}

.verse-card:hover .arabic-text,
.prayer-card:hover .arabic-text {
  transform: scale(1.01);
}

/* Islamic Pattern */
.islamic-pattern {
  background-image:
    radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.2) 1px, transparent 0),
    radial-gradient(circle at 75% 75%, rgba(183, 110, 121, 0.2) 1px, transparent 0);
  background-size: 60px 60px;
  animation: patternMove 30s linear infinite;
}

@keyframes patternMove {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 60px 60px;
  }
}

/* Color Definitions */
.text-gold {
  color: #D4AF37;
}

.text-deep-red {
  color: #8B4513;
}

.bg-soft-pink {
  background-color: #F8E9E9;
}

.bg-champagne {
  background-color: #F7E7CE;
}

.bg-ivory {
  background-color: #FFFFF0;
}

.from-ivory {
  --tw-gradient-from: #FFFFF0;
}

.to-champagne {
  --tw-gradient-to: #F7E7CE;
}

/* Responsive Design */
@media (max-width: 768px) {

  .header-main,
  .header-subtitle,
  .section-title,
  .scroll-card {
    transform: none !important;
    opacity: 1 !important;
  }

  .title-underline {
    width: 60% !important;
  }

  .floating-element {
    display: none;
  }

  .arabic-text {
    font-size: 1.5rem;
    line-height: 2;
  }
}

/* Smooth transitions for better performance */
.scroll-card,
.header-main,
.header-subtitle,
.section-title {
  will-change: transform, opacity;
}
</style>
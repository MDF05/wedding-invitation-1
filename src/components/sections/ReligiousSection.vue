<template>
  <section 
    ref="sectionRef"
    class="religious-section py-20 bg-gradient-to-b from-ivory to-champagne"
  >
    <div class="container mx-auto px-4">
      <h2 class="text-4xl md:text-5xl font-great-vibes text-gold text-center mb-4">
        Doa & Ayat Suci
      </h2>
      <p class="text-gray-600 font-lora text-lg text-center mb-12 max-w-2xl mx-auto">
        Dengan memohon ridho dan berkah Allah SWT dalam membangun rumah tangga
      </p>

      <!-- Quran Verses -->
      <div class="max-w-4xl mx-auto mb-16">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-cormorant text-deep-red font-semibold mb-6">Ayat Al-Qur'an</h3>
        </div>
        
        <div 
          v-for="(verse, index) in quranVerses" 
          :key="'verse-' + index"
          class="verse-card wedding-frame bg-white p-8 rounded-xl mb-6 transform hover:scale-105 transition duration-300"
        >
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

      <!-- Prayers -->
      <div class="max-w-4xl mx-auto mb-16">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-cormorant text-deep-red font-semibold mb-6">Doa Untuk Pengantin</h3>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            v-for="(prayer, index) in prayers" 
            :key="'prayer-' + index"
            class="prayer-card wedding-frame bg-soft-pink bg-opacity-30 p-6 rounded-xl transform hover:scale-105 transition duration-300"
          >
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

      <!-- Hadiths -->
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-cormorant text-deep-red font-semibold mb-6">Hadits Tentang Pernikahan</h3>
        </div>
        
        <div 
          v-for="(hadith, index) in hadiths" 
          :key="'hadith-' + index"
          class="hadith-card wedding-frame bg-white p-6 rounded-xl mb-4 transform hover:scale-105 transition duration-300"
        >
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

      <!-- Islamic Pattern Background -->
      <div class="islamic-pattern absolute inset-0 pointer-events-none opacity-5"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { weddingAnimations, createScrollTrigger } from '../../utils/animations'

const sectionRef = ref(null)

const quranVerses = ref([
  {
    arabic: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
    latin: 'Wa min āyātihi an khalaqa lakum min anfusikum azwājan litaskunū ilaihā wa ja\'ala bainakum mawaddataw wa rahmah',
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
    translation: 'Nikahilah wanita yang penyayang dan subur (banyak keturunan), karena sesungguhnya aku akan membanggakan banyaknya kalian di hadapan umat-umat yang lain.',
    source: 'HR. Abu Daud'
  }
])

onMounted(() => {
  if (sectionRef.value) {
    createScrollTrigger(sectionRef.value, (element) => {
      weddingAnimations.fadeInUp(element, 0.2)
    })
  }
})
</script>

<style scoped>
.religious-section {
  position: relative;
}

.arabic-text {
  line-height: 2.5;
  font-family: 'Amiri', 'Lateef', serif;
}

.islamic-pattern {
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.3) 2px, transparent 0),
    radial-gradient(circle at 75% 75%, rgba(183, 110, 121, 0.3) 2px, transparent 0);
  background-size: 80px 80px;
}

.verse-card, .prayer-card, .hadith-card {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.verse-card:hover, .prayer-card:hover, .hadith-card:hover {
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.2);
}
</style>
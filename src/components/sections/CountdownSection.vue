<template>
  <section ref="sectionRef" class="countdown-section py-16" aria-label="Countdown menuju hari bahagia">
    <!-- background gradient + subtle dot pattern to match hero -->
    <div class="bg-overlay absolute inset-0 pointer-events-none"></div>

    <div class="container mx-auto px-6 relative z-10">
      <h2 class="mb-3 text-center text-4xl md:text-5xl font-great-vibes text-gold drop-shadow-lg">
        Menuju Hari Bahagia
      </h2>
      <p class="max-w-2xl mx-auto mb-12 text-center text-lg md:text-xl text-gray-600 font-lora">
        Hitung mundur menuju hari pernikahan kami. Semoga Allah memudahkan segala urusan dan meridhoi pernikahan kami.
      </p>

      <!-- Animated ring that encloses the countdown grid -->
      <div class="relative max-w-4xl mx-auto">
        <svg viewBox="0 0 500 220" class="absolute -top-20 left-1/2 transform -translate-x-1/2 ring-svg"
          aria-hidden="true">
          <!-- outer decorative ring -->
          <defs>
            <linearGradient id="ringGrad" x1="0" x2="1">
              <stop offset="0%" stop-color="#f6d365" stop-opacity="0.95" />
              <stop offset="50%" stop-color="#a8edea" stop-opacity="0.85" />
              <stop offset="100%" stop-color="#5ee7df" stop-opacity="0.7" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g transform="translate(250,110)">
            <circle r="100" fill="transparent" stroke="rgba(0,0,0,0.08)" stroke-width="10" />
            <circle class="ring-stroke" r="100" fill="transparent" stroke="url(#ringGrad)" stroke-width="6"
              stroke-linecap="round" stroke-dasharray="628.3" stroke-dashoffset="0" style="filter: url(#glow)"
              transform="rotate(-90)" />
          </g>
        </svg>

        <!-- countdown grid sits visually inside the ring -->
        <div ref="gridRef"
          class="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 md:p-12 rounded-2xl relative z-20 countdown-grid">
          <div v-for="(item, index) in countdownItems" :key="index" class="countdown-item relative transform-style-3d"
            @mousemove="onMouseMove($event, index)" @mouseleave="resetTilt(index)" :data-index="index">
            <div
              class="wedding-frame min-h-[120px] flex flex-col items-center justify-center p-6 rounded-xl bg-glass border border-white/10">
              <div class="value text-4xl md:text-5xl font-playfair font-bold text-gold transition-all duration-400"
                v-text="item.value" :key="item.value + '-' + index" />
              <div class="label mt-2 text-md md:text-lg text-gray-600 font-lora">
                {{ item.label }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- wedding date block -->
      <div class="mt-8 inline-block p-6 bg-white/70 backdrop-blur-sm rounded-xl wedding-frame-2 shadow-lg border">
        <p class="text-3xl md:text-4xl font-semibold text-deep-red font-cormorant">
          📅 Sabtu, 25 Desember 2024
        </p>
        <p class="mt-2 text-lg text-gray-600 font-lora">🕗 08:00 WIB - Selesai</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const gridRef = ref(null)

const countdownItems = ref([
  { value: '00', label: 'Hari' },
  { value: '00', label: 'Jam' },
  { value: '00', label: 'Menit' },
  { value: '00', label: 'Detik' }
])

const weddingDate = new Date('2024-12-25T08:00:00')
let countdownInterval = null

// store tilt state for mouse parallax
const tiltState = reactive({
  transforms: [null, null, null, null]
})

const updateCountdown = () => {
  const now = new Date()
  const difference = weddingDate.getTime() - now.getTime()

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)

    countdownItems.value = [
      { value: String(days).padStart(2, '0'), label: 'Hari' },
      { value: String(hours).padStart(2, '0'), label: 'Jam' },
      { value: String(minutes).padStart(2, '0'), label: 'Menit' },
      { value: String(seconds).padStart(2, '0'), label: 'Detik' }
    ]

    // animate ring stroke based on % of time left relative to some reference (for nice visual)
    animateRing(difference)
  } else {
    countdownItems.value = [
      { value: '00', label: 'Hari' },
      { value: '00', label: 'Jam' },
      { value: '00', label: 'Menit' },
      { value: '00', label: 'Detik' }
    ]
    animateRing(0)
  }
}

// animate ring stroke dashoffset (visual progress)
const animateRing = (difference) => {
  // compute a smooth progress value (0..1) from now -> wedding (cap at 1)
  // For the ring we use linear mapping from (now..wedding) to dashoffset.
  const totalSpan = Math.max(weddingDate.getTime() - Date.now(), 1)
  // We'll compute percent remaining of a longer interval (e.g. 90 days) for prettier animation.
  const referenceSpan = 1000 * 60 * 60 * 24 * 90 // 90 days
  const percent = Math.max(0, Math.min(1, difference / referenceSpan))
  const strokeLength = 2 * Math.PI * 100 // circle r=100 -> circumference
  const dashoffset = strokeLength * (1 - percent)
  // animate via GSAP
  const ring = document.querySelector('.ring-stroke')
  if (ring) {
    gsap.to(ring, { strokeDashoffset: dashoffset, duration: 0.9, ease: 'power2.out' })
    gsap.to(ring, { rotation: 360, transformOrigin: '50% 50%', duration: 12, repeat: -1, ease: 'linear' })
  }
}

// mouse parallax tilt
const onMouseMove = (e, idx) => {
  const item = e.currentTarget
  const rect = item.getBoundingClientRect()
  const px = (e.clientX - rect.left) / rect.width
  const py = (e.clientY - rect.top) / rect.height
  const rotateY = (px - 0.5) * 10
  const rotateX = (0.5 - py) * 10
  const frame = item.querySelector('.wedding-frame')
  if (frame) {
    gsap.to(frame, { rotationY: rotateY, rotationX: rotateX, transformPerspective: 800, transformOrigin: 'center', duration: 0.25, ease: 'power1.out' })
  }
}

const resetTilt = (idx) => {
  const item = document.querySelector(`.countdown-item[data-index="${idx}"]`)
  const frame = item?.querySelector('.wedding-frame')
  if (frame) {
    gsap.to(frame, { rotationY: 0, rotationX: 0, duration: 0.5, ease: 'elastic.out(1, 0.6)' })
  }
}

onMounted(() => {
  updateCountdown()
  countdownInterval = setInterval(updateCountdown, 1000)

  // entrance animations: reveal grid & items with stagger and 3D pop
  if (sectionRef.value) {
    const s = sectionRef.value

    // main section fade in
    gsap.from(s, {
      autoAlpha: 0,
      y: 30,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: s,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    // items stagger
    const items = s.querySelectorAll('.countdown-item')
    gsap.from(items, {
      autoAlpha: 0,
      y: 20,
      z: 0,
      rotateX: -6,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: gridRef.value,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    })

    // subtle floating for the entire grid (tiny 3D hover)
    gsap.to('.countdown-grid', { y: -6, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' })
  } else {
    // fallback: IntersectionObserver reveal (if GSAP/ScrollTrigger not applied)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.25 }
    )
    if (gridRef.value) observer.observe(gridRef.value)
  }
})

onUnmounted(() => {
  if (countdownInterval) clearInterval(countdownInterval)
  ScrollTrigger.getAll().forEach(t => t.kill && t.kill())
})
</script>

<style scoped>
/* --- base tokens to match hero --- */
:root {
  --bg-a: #cfeeea;
  /* light teal-ish */
  --bg-b: #3b8f8f;
  /* deeper teal */
  --gold: #d4af37;
  --soft-pink: #ffe3ea;
  --deep-red: #8b2b2b;
}

/* section layout */
.countdown-section {
  position: relative;
  overflow: visible;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(0, 0, 0, 0.03));
  padding-bottom: 6rem;
}

/* background overlay pattern (dots + gradient) */
.bg-overlay {
  background: radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.06), transparent 8%),
    radial-gradient(circle at 90% 90%, rgba(255, 255, 255, 0.04), transparent 6%),
    linear-gradient(120deg, rgba(176, 225, 220, 0.35), rgba(115, 178, 177, 0.45));
  background-size: 16px 16px, 18px 18px, cover;
  mix-blend-mode: multiply;
  z-index: 0;
}

/* ring svg styles (positioning & responsiveness) */
.ring-svg {
  width: min(680px, 110%);
  height: auto;
  pointer-events: none;
}

/* glass card */
.bg-glass {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.6));
  box-shadow:
    0 6px 18px rgba(8, 18, 40, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(6px);
}

/* wedding frame styles */
.wedding-frame {
  border-radius: 14px;
  transition: transform 0.35s cubic-bezier(.2, .9, .3, 1), box-shadow 0.35s;
  will-change: transform;
  box-shadow: 0 8px 22px rgba(20, 40, 60, 0.06);
}

/* second block */
.wedding-frame-2 {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.75));
  border-radius: 12px;
}

/* fonts / colors hooks (assumes you have those fonts loaded already) */
.text-gold,
.font-playfair {
  color: var(--gold);
}

.text-deep-red {
  color: var(--deep-red);
}

/* 3D transforms container */
.transform-style-3d {
  perspective: 1200px;
}

/* item hover (desktop) */
.countdown-item .wedding-frame:hover {
  transform: translateY(-8px) scale(1.02) rotateX(1deg);
  box-shadow: 0 20px 50px rgba(30, 50, 80, 0.12);
}

/* mobile comfortable sizes */
@media (max-width: 767px) {
  .ring-svg {
    display: none;
  }

  .countdown-grid {
    padding: 4px;
  }
}

/* ring stroke animation base */
.ring-stroke {
  transition: stroke-dashoffset 0.6s ease;
  transform-origin: 50% 50%;
}

/* revealed fallback */
.revealed {
  opacity: 1;
  transform: none !important;
}

/* accessibility / small niceties */
.countdown-item .value {
  text-shadow: 0 2px 0 rgba(255, 255, 255, 0.25);
}

/* fine tuning for drop shadows and outline */
.container .wedding-frame {
  border: 1px solid rgba(0, 0, 0, 0.04);
}

/* reduce motion preference */
@media (prefers-reduced-motion: reduce) {

  .ring-svg,
  .countdown-grid,
  .wedding-frame {
    transition: none !important;
    animation: none !important;
  }

  *[style] {
    animation: none !important;
  }
}
</style>

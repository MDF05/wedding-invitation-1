import { ref, computed, onUnmounted } from 'vue'

export function useCountdown(targetDate) {
  const now = ref(new Date())
  const target = ref(new Date(targetDate))

  const timeLeft = computed(() => {
    const difference = target.value.getTime() - now.value.getTime()
    
    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isPast: true,
        isToday: false
      }
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)

    const isToday = days === 0 && hours <= 24

    return {
      days,
      hours,
      minutes,
      seconds,
      isPast: false,
      isToday,
      totalSeconds: difference / 1000
    }
  })

  const formattedTime = computed(() => {
    const { days, hours, minutes, seconds } = timeLeft.value
    return {
      days: days.toString().padStart(2, '0'),
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0')
    }
  })

  const percentage = computed(() => {
    const totalTime = 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
    const elapsed = totalTime - (target.value.getTime() - now.value.getTime())
    return Math.min(Math.max((elapsed / totalTime) * 100, 0), 100)
  })

  const message = computed(() => {
    const { isPast, isToday, days } = timeLeft.value
    
    if (isPast) {
      return "Acara telah berlangsung! Terima kasih atas doa dan restunya."
    }
    
    if (isToday) {
      return "Hari yang ditunggu telah tiba! Sampai jumpa di acara kami."
    }
    
    if (days === 1) {
      return "Besok adalah hari bahagia kami! Semoga Allah memudahkan segala urusan."
    }
    
    if (days <= 7) {
      return `${days} hari lagi menuju hari bahagia! Persiapkan diri Anda.`
    }
    
    return "Hitungan mundur menuju hari pernikahan kami. Semoga Allah meridhoi."
  })

  const timer = setInterval(() => {
    now.value = new Date()
  }, 1000)

  onUnmounted(() => {
    clearInterval(timer)
  })

  return {
    timeLeft,
    formattedTime,
    percentage,
    message,
    isWeddingDay: computed(() => timeLeft.value.days === 0 && !timeLeft.value.isPast)
  }
}

// Additional countdown utilities
export const countdownUtils = {
  // Format duration for display
  formatDuration: (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    return {
      days: days % 365,
      hours: hours % 24,
      minutes: minutes % 60,
      seconds: seconds % 60
    }
  },

  // Calculate time until next hour
  timeUntilNextHour: () => {
    const now = new Date()
    const nextHour = new Date(now)
    nextHour.setHours(now.getHours() + 1)
    nextHour.setMinutes(0)
    nextHour.setSeconds(0)
    nextHour.setMilliseconds(0)
    
    return nextHour.getTime() - now.getTime()
  },

  // Check if it's wedding season (customizable)
  isWeddingSeason: (date = new Date()) => {
    const month = date.getMonth() + 1
    // Common wedding seasons: Spring (3-5) and Fall (9-11)
    return (month >= 3 && month <= 5) || (month >= 9 && month <= 11)
  }
}
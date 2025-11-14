<template>
  <div 
    class="animated-frame"
    :class="[frameClass, animationClass]"
    :style="frameStyle"
  >
    <div class="frame-content">
      <slot></slot>
    </div>
    
    <!-- Animated Border -->
    <div class="frame-border"></div>
    <div class="frame-corner top-left"></div>
    <div class="frame-corner top-right"></div>
    <div class="frame-corner bottom-left"></div>
    <div class="frame-corner bottom-right"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'gold', // 'gold', 'rose', 'champagne'
  },
  animated: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'normal' // 'small', 'normal', 'large'
  }
})

const frameClass = computed(() => {
  const classes = ['wedding-frame']
  if (props.type === 'rose') {
    classes.push('frame-rose')
  } else if (props.type === 'champagne') {
    classes.push('frame-champagne')
  }
  return classes.join(' ')
})

const animationClass = computed(() => {
  return props.animated ? 'frame-animated' : ''
})

const frameStyle = computed(() => {
  const styles = {}
  if (props.size === 'small') {
    styles.padding = '0.5rem'
  } else if (props.size === 'large') {
    styles.padding = '2rem'
  }
  return styles
})
</script>

<style scoped>
.animated-frame {
  position: relative;
  padding: 1rem;
  border-radius: 15px;
  background: linear-gradient(135deg, #FFFFF0, #F7E7CE);
  border: 3px solid transparent;
}

.frame-content {
  position: relative;
  z-index: 2;
}

.frame-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 12px;
  background: linear-gradient(45deg, #D4AF37, #B76E79, #D4AF37);
  z-index: 1;
  opacity: 0.8;
}

.animated-frame::before {
  content: '';
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  background: linear-gradient(45deg, #D4AF37, #B76E79, #D4AF37);
  border-radius: 18px;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.animated-frame:hover::before {
  opacity: 1;
}

.frame-corner {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid #D4AF37;
  z-index: 3;
}

.frame-corner.top-left {
  top: -2px;
  left: -2px;
  border-right: none;
  border-bottom: none;
  border-top-left-radius: 15px;
}

.frame-corner.top-right {
  top: -2px;
  right: -2px;
  border-left: none;
  border-bottom: none;
  border-top-right-radius: 15px;
}

.frame-corner.bottom-left {
  bottom: -2px;
  left: -2px;
  border-right: none;
  border-top: none;
  border-bottom-left-radius: 15px;
}

.frame-corner.bottom-right {
  bottom: -2px;
  right: -2px;
  border-left: none;
  border-top: none;
  border-bottom-right-radius: 15px;
}

/* Animation */
.frame-animated {
  animation: frame-glow 2s ease-in-out infinite alternate;
}

@keyframes frame-glow {
  from {
    box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
  }
  to {
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.6);
  }
}

/* Frame Variations */
.frame-rose .frame-border {
  background: linear-gradient(45deg, #B76E79, #D4AF37, #B76E79);
}

.frame-rose .frame-corner {
  border-color: #B76E79;
}

.frame-champagne .frame-border {
  background: linear-gradient(45deg, #F7E7CE, #D4AF37, #F7E7CE);
}

.frame-champagne .frame-corner {
  border-color: #F7E7CE;
}
</style>
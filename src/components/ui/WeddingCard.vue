<template>
  <div 
    class="wedding-card"
    :class="[cardClass, animationClass]"
    :style="cardStyle"
  >
    <div class="card-header" v-if="$slots.header || title">
      <slot name="header">
        <h3 class="card-title">{{ title }}</h3>
        <p v-if="subtitle" class="card-subtitle">{{ subtitle }}</p>
      </slot>
    </div>
    
    <div class="card-content">
      <slot></slot>
    </div>
    
    <div class="card-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>

    <!-- Decorative Elements -->
    <div class="card-decoration" v-if="decorative">
      <div class="decoration-corner top-left"></div>
      <div class="decoration-corner top-right"></div>
      <div class="decoration-corner bottom-left"></div>
      <div class="decoration-corner bottom-right"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  subtitle: String,
  type: {
    type: String,
    default: 'default' // 'default', 'primary', 'secondary', 'accent'
  },
  decorative: {
    type: Boolean,
    default: true
  },
  animated: {
    type: Boolean,
    default: true
  },
  padding: {
    type: String,
    default: 'normal' // 'none', 'small', 'normal', 'large'
  }
})

const cardClass = computed(() => {
  const classes = ['wedding-frame']
  classes.push(`card-${props.type}`)
  return classes.join(' ')
})

const animationClass = computed(() => {
  return props.animated ? 'card-animated' : ''
})

const cardStyle = computed(() => {
  const styles = {}
  
  switch (props.padding) {
    case 'none':
      styles.padding = '0'
      break
    case 'small':
      styles.padding = '1rem'
      break
    case 'large':
      styles.padding = '2rem'
      break
    default:
      styles.padding = '1.5rem'
  }
  
  return styles
})
</script>

<style scoped>
.wedding-card {
  position: relative;
  background: white;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.card-header {
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(212, 175, 55, 0.2);
}

.card-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #8B0000;
  margin: 0 0 0.5rem 0;
}

.card-subtitle {
  font-family: 'Lora', serif;
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.card-content {
  position: relative;
  z-index: 2;
}

.card-footer {
  padding-top: 1rem;
  margin-top: 1rem;
  border-top: 1px solid rgba(212, 175, 55, 0.2);
}

/* Card Types */
.card-default {
  background: linear-gradient(135deg, #FFFFFF, #F8F9FA);
}

.card-primary {
  background: linear-gradient(135deg, #FFFFF0, #F7E7CE);
}

.card-secondary {
  background: linear-gradient(135deg, #F8E9E9, #FADADD);
}

.card-accent {
  background: linear-gradient(135deg, #F7E7CE, #F8E9E9);
}

/* Animations */
.card-animated {
  animation: card-float 3s ease-in-out infinite;
}

.wedding-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(212, 175, 55, 0.3);
}

@keyframes card-float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

/* Decorative Elements */
.card-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.decoration-corner {
  position: absolute;
  width: 30px;
  height: 30px;
  border: 2px solid rgba(212, 175, 55, 0.3);
}

.decoration-corner.top-left {
  top: 0;
  left: 0;
  border-right: none;
  border-bottom: none;
}

.decoration-corner.top-right {
  top: 0;
  right: 0;
  border-left: none;
  border-bottom: none;
}

.decoration-corner.bottom-left {
  bottom: 0;
  left: 0;
  border-right: none;
  border-top: none;
}

.decoration-corner.bottom-right {
  bottom: 0;
  right: 0;
  border-left: none;
  border-top: none;
}

/* Responsive */
@media (max-width: 768px) {
  .wedding-card {
    margin: 0.5rem;
  }
  
  .card-title {
    font-size: 1.25rem;
  }
}
</style>
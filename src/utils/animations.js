import { gsap } from 'gsap'

export const weddingAnimations = {
  // Basic fade in up animation
  fadeInUp: (element, delay = 0) => {
    gsap.fromTo(element, 
      { 
        y: 50, 
        opacity: 0,
        rotationX: -10
      },
      { 
        y: 0, 
        opacity: 1, 
        rotationX: 0,
        duration: 1, 
        delay, 
        ease: "power3.out",
        overwrite: "auto"
      }
    )
  },

  // Bloom effect for photos and important elements
  bloom: (element) => {
    gsap.fromTo(element,
      { 
        scale: 0, 
        opacity: 0, 
        rotationY: 180 
      },
      { 
        scale: 1, 
        opacity: 1, 
        rotationY: 0, 
        duration: 1.5, 
        ease: "back.out(1.7)",
        overwrite: "auto"
      }
    )
  },

  // Stagger animation for grid items
  staggerGrid: (elements, staggerTime = 0.1) => {
    gsap.fromTo(elements,
      { 
        y: 30, 
        opacity: 0,
        scale: 0.8
      },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 0.8, 
        stagger: staggerTime, 
        ease: "power2.out",
        overwrite: "auto"
      }
    )
  },

  // Floating animation for decorative elements
  float: (element) => {
    gsap.to(element, {
      y: -15,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      overwrite: "auto"
    })
  },

  // Heart beat animation for important elements
  heartbeat: (element) => {
    gsap.to(element, {
      scale: 1.1,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      overwrite: "auto"
    })
  },

  // Text glow animation
  textGlow: (element) => {
    gsap.to(element, {
      textShadow: "0 0 10px rgba(212, 175, 55, 0.8)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      overwrite: "auto"
    })
  },

  // Slide in from left
  slideInLeft: (element, delay = 0) => {
    gsap.fromTo(element,
      {
        x: -100,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        delay,
        ease: "power3.out",
        overwrite: "auto"
      }
    )
  },

  // Slide in from right
  slideInRight: (element, delay = 0) => {
    gsap.fromTo(element,
      {
        x: 100,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        delay,
        ease: "power3.out",
        overwrite: "auto"
      }
    )
  },

  // Scale in animation
  scaleIn: (element, delay = 0) => {
    gsap.fromTo(element,
      {
        scale: 0,
        opacity: 0,
        rotation: -180
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1,
        delay,
        ease: "back.out(1.7)",
        overwrite: "auto"
      }
    )
  },

  // Typewriter effect for text
  typewriter: (element) => {
    const text = element.textContent
    element.textContent = ''
    
    gsap.to(element, {
      duration: text.length * 0.05,
      ease: "none",
      overwrite: "auto",
      onUpdate: function() {
        const progress = this.progress()
        const chars = Math.floor(text.length * progress)
        element.textContent = text.substring(0, chars)
      }
    })
  },

  // Parallax effect for background elements
  parallax: (element, speed = 0.5) => {
    gsap.to(element, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      },
      overwrite: "auto"
    })
  }
}

// Intersection Observer for scroll animations
export const createScrollTrigger = (element, animation, threshold = 0.1, once = true) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animation(entry.target)
          if (once) {
            observer.unobserve(entry.target)
          }
        }
      })
    },
    { 
      threshold,
      rootMargin: '0px 0px -50px 0px'
    }
  )

  if (element) {
    observer.observe(element)
  }

  return observer
}

// Page transition animations
export const pageTransitions = {
  enter: (element) => {
    gsap.fromTo(element,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }
    )
  },
  
  leave: (element) => {
    gsap.to(element,
      {
        opacity: 0,
        y: -30,
        duration: 0.5,
        ease: "power3.in"
      }
    )
  }
}

// Animation presets for common elements
export const animationPresets = {
  hero: (element) => {
    gsap.fromTo(element,
      {
        opacity: 0,
        scale: 1.1,
        y: 50
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out"
      }
    )
  },
  
  card: (element) => {
    gsap.fromTo(element,
      {
        opacity: 0,
        y: 40,
        rotationY: 10
      },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 1,
        ease: "back.out(1.2)"
      }
    )
  },
  
  image: (element) => {
    gsap.fromTo(element,
      {
        opacity: 0,
        scale: 1.2
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out"
      }
    )
  }
}
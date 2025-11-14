/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gold': '#D4AF37',
        'ivory': '#FFFFF0',
        'soft-pink': '#F8E9E9',
        'rose-gold': '#B76E79',
        'champagne': '#F7E7CE',
        'deep-red': '#8B0000',
        'forest-green': '#228B22',
      },
      fontFamily: {
        'great-vibes': ['Great Vibes', 'cursive'],
        'playfair': ['Playfair Display', 'serif'],
        'lora': ['Lora', 'serif'],
        'cormorant': ['Cormorant Garamond', 'serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'heartbeat': 'heartbeat 2s ease-in-out infinite',
        'petal-fall': 'petal-fall 10s linear infinite',
      }
    },
  },
  plugins: [],
}
<template>
  <section 
    ref="sectionRef"
    class="donation-section py-20 bg-white"
  >
    <div class="container mx-auto px-4">
      <h2 class="text-4xl md:text-5xl font-great-vibes text-gold text-center mb-4">
        Amplop Digital
      </h2>
      <p class="text-gray-600 font-lora text-lg text-center mb-12 max-w-2xl mx-auto">
        Bagi yang ingin memberikan tanda kasih dan doa untuk kami
      </p>

      <div class="max-w-6xl mx-auto">
        <!-- Bank Transfer -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <!-- QR Code -->
          <div class="text-center">
            <div class="wedding-frame p-4 inline-block mb-6">
              <div class="bg-white p-4 rounded-lg">
                <div class="w-64 h-64 mx-auto bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <div class="text-center text-gray-500">
                    <div class="text-4xl mb-2 w-[100%] h-[100%] " >
                      <img src="/images/qr-code.png" alt="">
                    </div>
                    <p class="text-sm">QR Code Donasi</p>
                  </div>
                </div>
                <p class="text-gray-600 font-lora text-sm">Scan QR code untuk transfer</p>
              </div>
            </div>
          </div>

          <!-- Bank Accounts -->
          <div>
            <h3 class="text-2xl font-cormorant text-deep-red font-semibold mb-6 text-center lg:text-left">
              Transfer Bank
            </h3>
            
            <div class="space-y-4">
              <div 
                v-for="(account, index) in bankAccounts" 
                :key="index"
                class="account-card wedding-frame bg-soft-pink bg-opacity-30 p-6 rounded-xl transform hover:scale-105 transition duration-300"
              >
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-white">
                      🏦
                    </div>
                    <div>
                      <h4 class="font-cormorant text-lg font-semibold text-deep-red">{{ account.bank }}</h4>
                      <p class="font-lora text-gray-600 text-sm">{{ account.accountNumber }}</p>
                    </div>
                  </div>
                  <button 
                    @click="copyToClipboard(account.accountNumber)"
                    class="text-gold hover:text-rose-gold transition duration-300"
                    :title="`Salin ${account.accountNumber}`"
                  >
                    📋
                  </button>
                </div>
                <div class="text-center">
                  <p class="font-lora text-gray-700 font-semibold">a.n. {{ account.accountName }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- E-Wallet -->
        <div class="mb-12">
          <h3 class="text-2xl font-cormorant text-deep-red font-semibold mb-6 text-center">
            E-Wallet
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div 
              v-for="(ewallet, index) in eWallets" 
              :key="index"
              class="ewallet-card wedding-frame bg-champagne bg-opacity-30 p-6 rounded-xl text-center transform hover:scale-105 transition duration-300"
            >
              <div class="text-4xl mb-4">{{ ewallet.icon }}</div>
              <h4 class="font-cormorant text-lg font-semibold text-deep-red mb-2">{{ ewallet.name }}</h4>
              <p class="font-lora text-gray-700 font-semibold mb-4">{{ ewallet.number }}</p>
              <button 
                @click="copyToClipboard(ewallet.number)"
                class="text-gold hover:text-rose-gold transition duration-300 text-sm"
              >
                📋 Salin Nomor
              </button>
            </div>
          </div>
        </div>

        <!-- Message -->
        <div class="text-center max-w-2xl mx-auto">
          <div class="wedding-frame bg-gradient-to-r from-soft-pink to-champagne p-8 rounded-xl">
            <p class="text-gray-700 font-lora text-lg leading-relaxed mb-4">
              "Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lainnya."
            </p>
            <p class="text-gold font-playfair font-semibold">HR. Ahmad</p>
            <p class="text-gray-600 font-lora text-sm mt-4">
              Doa dan restu Anda merupakan hadiah terindah bagi kami. Terima kasih atas segala kebaikan dan kasih sayangnya.
            </p>
          </div>
        </div>

        <!-- Copy Notification -->
        <div 
          v-if="showCopyNotification"
          class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gold text-white px-6 py-3 rounded-lg shadow-lg transition duration-300"
        >
          ✅ Berhasil disalin ke clipboard
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { weddingAnimations, createScrollTrigger } from '../../utils/animations'

const sectionRef = ref(null)
const showCopyNotification = ref(false)

const bankAccounts = ref([
  {
    bank: 'BCA',
    accountNumber: '1234 5678 9012',
    accountName: 'AHMAD'
  },
  {
    bank: 'Mandiri',
    accountNumber: '9876 5432 1098',
    accountName: 'SARI'
  },
  {
    bank: 'BNI',
    accountNumber: '5678 1234 9012',
    accountName: 'AHMAD & SARI'
  }
])

const eWallets = ref([
  {
    name: 'GoPay',
    number: '0812 3456 7890',
    icon: '📱'
  },
  {
    name: 'OVO',
    number: '0812 3456 7890',
    icon: '💜'
  },
  {
    name: 'Dana',
    number: '0812 3456 7890',
    icon: '💙'
  }
])

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    showCopyNotification.value = true
    setTimeout(() => {
      showCopyNotification.value = false
    }, 2000)
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    
    showCopyNotification.value = true
    setTimeout(() => {
      showCopyNotification.value = false
    }, 2000)
  }
}

onMounted(() => {
  if (sectionRef.value) {
    createScrollTrigger(sectionRef.value, (element) => {
      weddingAnimations.fadeInUp(element, 0.2)
    })
  }
})
</script>

<style scoped>
.donation-section {
  background-image: 
    radial-gradient(circle at 90% 10%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 10% 90%, rgba(183, 110, 121, 0.05) 0%, transparent 50%);
}

.account-card, .ewallet-card {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.account-card:hover, .ewallet-card:hover {
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.2);
}
</style>
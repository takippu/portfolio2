<template>
  <Transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="close"></div>
      
      <!-- Modal Content -->
      <div class="relative w-full max-w-2xl max-h-[90vh] bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
        <!-- Header -->
        <div class="sticky top-0 z-10 p-4 sm:p-6 border-b border-emerald-500/10 bg-inherit">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-emerald-900 dark:text-emerald-50">
              {{ title }}
            </h3>
            <button 
              @click="close"
              class="p-1 rounded-full hover:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Body -->
        <div class="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
          <slot></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
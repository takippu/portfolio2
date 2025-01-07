<template>
  <div class="overflow-hidden">
    <div
      v-motion
      :initial="{ y: '100%', opacity: 0 }"
      :enter="{ y: 0, opacity: 1 }"
      :delay="delay"
      :duration="duration"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  delay: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 800
  }
})
</script> 
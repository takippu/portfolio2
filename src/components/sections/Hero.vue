<template>
  <section id="home" class="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6">
    <div class="container mx-auto max-w-6xl">
      <div class="max-w-3xl mx-auto text-center">
        <!-- Profile Image -->
        <div 
          v-motion
          :initial="{ scale: 0, opacity: 0 }"
          :enter="{ scale: 1, opacity: 1 }"
          class="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8"
        >
          <img 
            src="https://via.placeholder.com/128" 
            alt="Profile" 
            class="rounded-full shadow-lg w-full h-full object-cover"
          />
        </div>

        <!-- Main Heading -->
        <h1 class="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6">
          <AnimatedText delay="200">
            Hi, I'm Your Name
          </AnimatedText>
        </h1>

        <!-- Subtitle -->
        <div 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="400"
          class="text-lg sm:text-xl text-base-content/60 mb-6 sm:mb-8 px-4"
        >
          Frontend Developer & UI/UX Enthusiast
        </div>

        <!-- CTA Buttons -->
        <div 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="600"
          class="flex flex-col sm:flex-row gap-3 justify-center px-4"
        >
          <a 
            href="#projects" 
            class="btn btn-primary w-full sm:w-auto"
          >
            View Projects
          </a>
          <a 
            href="#contact" 
            class="btn btn-outline w-full sm:w-auto"
          >
            Contact Me
          </a>
        </div>

        <!-- Scroll Indicator -->
        <div 
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 0.5 }"
          :delay="1000"
          class="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
        >
          <div class="animate-bounce">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import AnimatedText from '../ui/AnimatedText.vue'
</script>

<style scoped>
@media (max-height: 700px) {
  section {
    padding-top: 5rem;
    padding-bottom: 5rem;
    min-height: auto;
  }
}
</style> 
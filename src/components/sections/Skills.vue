<template>
  <section id="skills" class="py-16 sm:py-20 bg-base-100">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <!-- Section Header -->
      <div class="text-center mb-12 sm:mb-16">
        <h2 
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
          class="text-3xl sm:text-4xl font-bold mb-4"
        >
          Skills & Technologies
        </h2>
        <p 
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1 }"
          :delay="200"
          class="text-base-content/60 text-sm sm:text-base"
        >
          Technologies I've been working with recently
        </p>
      </div>

      <!-- Skills Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        <div 
          v-for="(skill, index) in skills" 
          :key="skill.name"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="100 + (index * 50)"
          class="skill-card"
        >
          <div 
            class="relative group bg-base-200 p-4 sm:p-6 rounded-xl hover:shadow-xl transition-all duration-300"
            @mouseenter="skill.isHovered = true"
            @mouseleave="skill.isHovered = false"
            @touchstart="skill.isHovered = true"
            @touchend="skill.isHovered = false"
          >
            <!-- Icon -->
            <div class="flex justify-center mb-3 sm:mb-4">
              <TechIcons 
                :icon="skill.icon" 
                class="w-8 h-8 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-110"
                :class="skill.iconClass"
              />
            </div>
            
            <!-- Skill Name -->
            <h3 class="text-center text-sm sm:text-base font-medium">
              {{ skill.name }}
            </h3>

            <!-- Experience Level -->
            <div class="mt-2 sm:mt-3 h-1 bg-base-300 rounded-full overflow-hidden">
              <div 
                class="h-full bg-primary transition-all duration-1000"
                :style="{ width: skill.isHovered ? `${skill.level}%` : '0%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import TechIcons from '../icons/TechIcons.vue'

const skills = ref([
  { 
    name: 'Vue.js', 
    icon: 'vue', 
    level: 90, 
    iconClass: 'text-[#41B883]',
    isHovered: false 
  },
  { 
    name: 'Laravel', 
    icon: 'laravel', 
    level: 85, 
    iconClass: 'text-[#FF2D20]',
    isHovered: false 
  },
  { 
    name: 'Tailwind CSS', 
    icon: 'tailwind', 
    level: 95, 
    iconClass: 'text-[#38BDF8]',
    isHovered: false 
  },
  { 
    name: 'JavaScript', 
    icon: 'javascript', 
    level: 88, 
    iconClass: 'text-[#F7DF1E]',
    isHovered: false 
  },
  { 
    name: 'TypeScript', 
    icon: 'typescript', 
    level: 80, 
    iconClass: 'text-[#3178C6]',
    isHovered: false 
  },
  { 
    name: 'React', 
    icon: 'react', 
    level: 75, 
    iconClass: 'text-[#61DAFB]',
    isHovered: false 
  },
  { 
    name: 'Node.js', 
    icon: 'nodejs', 
    level: 82, 
    iconClass: 'text-[#339933]',
    isHovered: false 
  },
  { 
    name: 'Git', 
    icon: 'git', 
    level: 88, 
    iconClass: 'text-[#F05032]',
    isHovered: false 
  },
  { 
    name: 'Docker', 
    icon: 'docker', 
    level: 70, 
    iconClass: 'text-[#2496ED]',
    isHovered: false 
  },
  { 
    name: 'MySQL', 
    icon: 'mysql', 
    level: 85, 
    iconClass: 'text-[#4479A1]',
    isHovered: false 
  },
  { 
    name: 'PHP', 
    icon: 'php', 
    level: 85, 
    iconClass: 'text-[#777BB4]',
    isHovered: false 
  },
  { 
    name: 'Figma', 
    icon: 'figma', 
    level: 75, 
    iconClass: 'text-[#F24E1E]',
    isHovered: false 
  },
])
</script>

<style scoped>
.skill-card {
  @apply transform transition-all duration-300 hover:-translate-y-1;
}

@media (hover: none) {
  .skill-card {
    transform: none !important;
  }
}
</style> 
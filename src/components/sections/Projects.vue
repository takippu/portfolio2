<template>
  <section id="projects" class="py-16 sm:py-20 min-h-screen relative overflow-hidden">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <!-- Section Header -->
      <div class="text-center mb-12 sm:mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold mb-4">
          Featured Projects
        </h2>
        <p class="text-base-content/60 text-sm sm:text-base">
          <span class="hidden sm:inline">Use arrow keys or buttons to navigate</span>
          <span class="sm:hidden">Swipe up or down to navigate</span>
        </p>
      </div>

      <!-- Projects Stack -->
      <div 
        class="relative h-[450px] sm:h-[500px] w-full max-w-3xl mx-auto"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <!-- Cards Stack -->
        <div class="relative w-full h-full">
          <div
            v-for="(project, index) in displayedProjects"
            :key="project.id"
            class="absolute top-0 left-0 w-full h-[350px] sm:h-[400px] rounded-xl"
            :style="{
              transform: `translateY(${index * 15}px) scale(${1 - index * 0.05})`,
              opacity: 1 - index * 0.15,
              zIndex: displayedProjects.length - index,
              transition: 'all 0.5s ease-out',
            }"
            @click="index === 0 ? null : nextProject()"
          >
            <!-- Card Content -->
            <div class="relative w-full h-full rounded-xl overflow-hidden group">
              <!-- Background Image -->
              <img 
                :src="project.image" 
                :alt="project.title"
                class="absolute inset-0 w-full h-full object-cover"
              />
              
              <!-- Content Overlay -->
              <div class="absolute inset-0 bg-black/50 p-4 sm:p-6 flex flex-col justify-end">
                <h3 class="text-xl sm:text-2xl font-bold text-white mb-2">{{ project.title }}</h3>
                <p class="text-white/80 text-sm sm:text-base mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                  {{ project.description }}
                </p>
                
                <!-- Technologies -->
                <div class="flex flex-wrap gap-2 mb-3 sm:mb-4">
                  <span 
                    v-for="tech in project.technologies" 
                    :key="tech"
                    class="px-2 py-1 bg-white/10 rounded-full text-white text-xs sm:text-sm"
                  >
                    {{ tech }}
                  </span>
                </div>

                <!-- Links -->
                <div class="flex gap-3">
                  <a 
                    v-if="project.demo" 
                    :href="project.demo" 
                    target="_blank"
                    class="btn btn-primary btn-sm"
                  >
                    Live Demo
                  </a>
                  <a 
                    v-if="project.github" 
                    :href="project.github" 
                    target="_blank"
                    class="btn btn-outline btn-sm text-white"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-4 sm:hidden">
          <button 
            @click="prevProject"
            class="btn btn-circle btn-sm"
            aria-label="Previous project"
          >
            ↑
          </button>
          <button 
            @click="nextProject"
            class="btn btn-circle btn-sm"
            aria-label="Next project"
          >
            ↓
          </button>
        </div>

        <!-- Desktop Navigation Buttons -->
        <button 
          @click="prevProject"
          class="hidden sm:block absolute left-4 top-1/2 -translate-y-1/2 btn btn-circle btn-ghost text-white z-50"
        >
          ↑
        </button>
        <button 
          @click="nextProject"
          class="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 btn btn-circle btn-ghost text-white z-50"
        >
          ↓
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with real-time inventory management.',
    image: 'https://picsum.photos/800/600?random=1',
    technologies: ['Vue.js', 'Laravel', 'Tailwind CSS', 'MySQL'],
    demo: 'https://demo.example.com',
    github: 'https://github.com/example'
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Collaborative task management tool with real-time updates.',
    image: 'https://picsum.photos/800/600?random=2',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    demo: 'https://demo.example.com',
    github: 'https://github.com/example'
  },
  {
    id: 3,
    title: 'AI Content Generator',
    description: 'AI-powered content generation tool using OpenAI API.',
    image: 'https://picsum.photos/800/600?random=3',
    technologies: ['Python', 'FastAPI', 'Vue.js', 'OpenAI'],
    demo: 'https://demo.example.com',
    github: 'https://github.com/example'
  },
  {
    id: 4,
    title: 'Social Media Dashboard',
    description: 'Real-time social media analytics and management platform.',
    image: 'https://picsum.photos/800/600?random=4',
    technologies: ['Vue.js', 'Firebase', 'TailwindCSS', 'Chart.js'],
    demo: 'https://demo.example.com',
    github: 'https://github.com/example'
  }
]

const currentIndex = ref(0)
const VISIBLE_CARDS = 4
let touchStartY = 0

// Touch handling for mobile swipe
const handleTouchStart = (e) => {
  touchStartY = e.touches[0].clientY
}

const handleTouchMove = (e) => {
  e.preventDefault()
}

const handleTouchEnd = (e) => {
  const touchEndY = e.changedTouches[0].clientY
  const deltaY = touchEndY - touchStartY

  if (Math.abs(deltaY) > 50) { // Minimum swipe distance
    if (deltaY > 0) {
      prevProject()
    } else {
      nextProject()
    }
  }
}

// Compute visible projects
const displayedProjects = computed(() => {
  const result = []
  for (let i = 0; i < VISIBLE_CARDS; i++) {
    const index = (currentIndex.value + i) % projects.length
    result.push(projects[index])
  }
  return result
})

const nextProject = () => {
  currentIndex.value = (currentIndex.value + 1) % projects.length
}

const prevProject = () => {
  currentIndex.value = currentIndex.value === 0 
    ? projects.length - 1 
    : currentIndex.value - 1
}
</script>

<style scoped>
.card-stack {
  perspective: 1000px;
}

@media (hover: none) {
  .card-stack {
    touch-action: none;
  }
}
</style> 
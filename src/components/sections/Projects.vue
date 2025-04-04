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
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-xl sm:text-2xl font-bold text-white">{{ project.title }}</h3>
                  <button 
                    @click.stop="openModal(project)"
                    class="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors absolute top-4 right-4"
                    title="View details"
                  >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
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

    <!-- Project Modal -->
    <Modal
      :is-open="isModalOpen"
      :title="selectedProject?.title || ''"
      @close="closeModal"
    >
      <div v-if="selectedProject" class="space-y-6">
        <!-- Project Image -->
        <div class="relative h-48 sm:h-64 rounded-lg overflow-hidden">
          <img 
            :src="selectedProject.image" 
            :alt="selectedProject.title"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Project Description -->
        <div class="space-y-4">
          <p class="text-emerald-800/80 dark:text-emerald-100/80">
            {{ selectedProject.description }}
          </p>

          <!-- Technologies -->
          <div>
            <h4 class="text-sm font-semibold text-emerald-900 dark:text-emerald-50 mb-2">Technologies</h4>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tech in selectedProject.technologies" 
                :key="tech"
                class="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- Links -->
          <div class="flex gap-3 pt-2">
            <a 
              v-if="selectedProject.demo" 
              :href="selectedProject.demo" 
              target="_blank"
              class="px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors text-sm"
            >
              View Live Demo
            </a>
            <a 
              v-if="selectedProject.github" 
              :href="selectedProject.github" 
              target="_blank"
              class="px-4 py-2 rounded-lg border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/10 transition-colors text-sm"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </Modal>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import Modal from '../ui/Modal.vue'

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
const touchStartY = ref(null)
const touchEndY = ref(null)
const isModalOpen = ref(false)
const selectedProject = ref(null)

// Modal functions
const openModal = (project) => {
  selectedProject.value = project
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedProject.value = null
}

// Touch handling for mobile swipe
const handleTouchStart = (e) => {
  touchStartY.value = e.touches[0].clientY
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
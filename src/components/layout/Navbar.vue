<template>
  <nav 
    class="fixed top-0 w-full z-50 transition-all duration-300"
    :class="[
      scrolled 
        ? 'bg-base-100/95 backdrop-blur-sm shadow-lg' 
        : 'bg-transparent'
    ]"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="navbar h-16">
        <!-- Logo/Brand -->
        <div class="navbar-start">
          <div class="flex items-center">
            <a href="#" class="text-xl sm:text-2xl font-bold text-primary mr-2">
              Portfolio
            </a>
            <!-- Add the GIFs here -->
            <div class="inline-block ml-2">
              <img src="https://media.tenor.com/sbfBfp3FeY8AAAAj/oia-uia.gif" alt="oia uia gif" class="inline-block h-8 w-auto" />
              <img src="https://media.tenor.com/sbfBfp3FeY8AAAAj/oia-uia.gif" alt="oia uia gif" class="inline-block h-8 w-auto" />
              <img src="https://media.tenor.com/sbfBfp3FeY8AAAAj/oia-uia.gif" alt="oia uia gif" class="inline-block h-8 w-auto" />
              <img src="https://media.tenor.com/sbfBfp3FeY8AAAAj/oia-uia.gif" alt="oia uia gif" class="inline-block h-8 w-auto" />
              <img src="https://media.tenor.com/sbfBfp3FeY8AAAAj/oia-uia.gif" alt="oia uia gif" class="inline-block h-8 w-auto" />
            </div>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <div class="navbar-end hidden lg:flex items-center gap-2">
          <ul class="flex items-center gap-8 mr-4">
            <li v-for="item in menuItems" :key="item.href">
              <a 
                :href="item.href" 
                class="font-medium hover:text-primary transition-colors"
                :class="{ 'text-primary': activeSection === item.href.slice(1) }"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>

          <!-- Theme Toggle -->
          <button 
            @click="toggleTheme" 
            class="btn btn-ghost btn-circle"
          >
            <svg
              v-if="theme === 'light'"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
          </button>
        </div>

        <!-- Mobile Navigation -->
        <div class="navbar-end lg:hidden flex items-center gap-2">
          <button 
            @click="toggleTheme" 
            class="btn btn-ghost btn-circle btn-sm"
          >
            <!-- Same theme toggle SVGs as above -->
          </button>

          <button 
            @click="isMenuOpen = !isMenuOpen"
            class="btn btn-ghost btn-circle btn-sm"
            aria-label="Menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-5 w-5" 
              :class="{ 'hidden': isMenuOpen }"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-5 w-5" 
              :class="{ 'hidden': !isMenuOpen }"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div 
        v-show="isMenuOpen"
        class="lg:hidden border-t border-base-200"
      >
        <ul class="py-4 space-y-2">
          <li v-for="item in menuItems" :key="item.href">
            <a 
              :href="item.href" 
              class="block py-2 px-4 hover:bg-base-200 rounded-lg transition-colors"
              :class="{ 'text-primary': activeSection === item.href.slice(1) }"
              @click="closeMenu"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isMenuOpen = ref(false)
const scrolled = ref(false)
const activeSection = ref('home')
const theme = ref(localStorage.getItem('theme') || 'light')

const menuItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
  checkActiveSection()
}

const checkActiveSection = () => {
  const sections = document.querySelectorAll('section[id]')
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100
    const sectionBottom = sectionTop + section.offsetHeight
    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      activeSection.value = section.id
    }
  })
}

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
  document.documentElement.setAttribute('data-theme', theme.value)
}

const closeMenu = () => {
  isMenuOpen.value = false
}

// Handle clicks outside menu to close it
const handleClickOutside = (event) => {
  const nav = document.querySelector('nav')
  if (isMenuOpen.value && nav && !nav.contains(event.target)) {
    closeMenu()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleClickOutside)
  document.documentElement.setAttribute('data-theme', theme.value)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.navbar {
  transition: all 0.3s ease;
}

@media (max-width: 1024px) {
  .navbar {
    padding-top: env(safe-area-inset-top);
  }
}
</style>

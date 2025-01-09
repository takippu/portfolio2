<template>
  <main class="h-screen md:h-screen md:overflow-hidden overflow-auto p-4 sm:p-6 relative">
    <!-- Animated Background -->
    <div class="fixed inset-0 -z-10">
      <div class="absolute inset-0 bg-gradient">
        <div class="absolute inset-0">
          <div 
            v-for="n in 3" 
            :key="n"
            class="absolute inset-0"
          >
            <div 
              class="absolute rounded-full blur-3xl opacity-30 dark:opacity-20 animate-blob"
              :class="{
                'bg-emerald-500 h-96 w-96 -top-20 -left-20': n === 1,
                'bg-blue-500 h-96 w-96 top-1/2 left-1/2': n === 2,
                'bg-purple-500 h-96 w-96 -bottom-20 -right-20': n === 3
              }"
              :style="{
                animationDelay: `${(n - 1) * 2}s`
              }"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Content Grid -->
    <div class="min-h-fit md:h-full grid gap-3 sm:gap-4 relative z-10 max-w-7xl mx-auto pb-20 md:pb-6">
      <!-- Welcome Card -->
      <div 
        class="opacity-0 p-4 sm:p-6 rounded-2xl card-backdrop card-border card-hover md:col-span-2 md:row-span-2 flex flex-col justify-between group transition-all duration-300"
        :class="isLoaded ? 'animate-card-1' : ''"
      >
        <div>
          <div class="text-sm mb-2 text-emerald-700/60 dark:text-emerald-500/60">welcome</div>
          <h1 class="text-2xl font-bold mb-3 text-emerald-900 dark:text-emerald-50">Hi, I'm {{ name }}, a Jr. Fullstack Developer</h1>
            <p class="text-emerald-800/80 dark:text-emerald-100/80 text-justify">
              I am a passionate Jr. Fullstack Developer with a strong proficiency in Laravel. My interests lie in exploring the latest advancements in AI and diving deep into various JavaScript frameworks. 
              <br/> I enjoy building robust and scalable web applications, constantly seeking to improve my skills and stay updated with the latest industry trends. Whether it's backend development with Laravel or creating dynamic front-end experiences, I am always eager to take on new challenges and contribute to innovative projects.
              <br/><br/> If you are interested to collaborate or something, hit me up (not literally).
            </p>
        </div>
        
      </div>

      <!-- Avatar/About Card -->
      <div 
        class="opacity-0 col-span-2 md:col-span-1 md:row-span-3 rounded-2xl card-backdrop card-border card-hover overflow-hidden group transition-all duration-300"
        :class="isLoaded ? 'animate-card-2' : ''"
      >
        <div class="p-4 sm:p-6 h-full flex flex-col">
          <div class="text-sm mb-2 text-emerald-700/60 dark:text-emerald-500/60">about</div>
          
          <!-- Introduction -->
          <div class="space-y-4 text-emerald-800/80 dark:text-emerald-100/80 text-sm">
            <p class="font-medium text-base text-bold">
              male, 25 years old, based in the Malaysia
            </p>

            <!-- Tools Section -->
            <div>
              <h3 class="font-medium mb-2">My primary tools of choice includes:</h3>
              <div class="flex flex-wrap gap-2">
                <!-- {/* Tool Tags */} -->
                <span 
                  v-for="tool in tools" 
                  :key="tool"
                  class="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs"
                >
                  {{ tool }}
                </span>
              </div>
            </div>
            <div>
              <h3 class="font-medium mb-2">subtools or interests :</h3>
              <div class="flex flex-wrap gap-2">
                <!-- {/* Tool Tags */} -->
                <span 
                  v-for="subTool in subTools" 
                  :key="subTool"
                  class="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs"
                >
                  {{ subTool }}
                </span>
              </div>
            </div>

            <!-- Passions & Hobbies -->
            <p>
              Beyond coding, I'm an avid Hiker and long term Gamer. I also enjoy reading, writing, and exploring new technologies.
            </p>

            <!-- Philosophy -->
            <p>
              I am curious and always thirst for new knowledge.
            </p>
          </div>
        </div>
      </div>

      <!-- Theme Toggle Card -->
      <!-- <div 
        class="opacity-0 p-4 sm:p-6 rounded-2xl card-backdrop card-border card-hover flex items-center justify-center group transition-all duration-300 h-[100px] md:h-auto"
        :class="isLoaded ? 'animate-card-3' : ''"
      >
        <button 
          @click="toggleTheme" 
          class="text-emerald-500 hover:text-emerald-400"
        >
          <svg v-if="theme === 'dark'" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
      </div> -->
      <!-- BlogPost Card -->
      <div 
    class="opacity-0 rounded-2xl card-backdrop card-border card-hover relative group overflow-hidden transition-all duration-300 h-[400px] md:h-full"
    :class="isLoaded ? 'animate-card-4' : ''"
  >
    <!-- Project Stack -->
    <div class="relative h-full">
      <TransitionGroup
        name="stack"
        tag="div"
        class="h-full"
      >
        <div 
          v-for="(post, index) in posts"
          :key="post.id"
          v-show="currentBlog === index"
          class="absolute inset-0 p-4 sm:p-6"
        >
          <!-- Project Content -->
          <div class="h-full flex flex-col">
            <!-- Read Now Button -->
            <a
              :href="`http://localhost:5173/blogs/${post.id}`"
              class="absolute top-4 right-4 p-2 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 transition-colors"
            >
              Read Now
            </a>

            <!-- Project Info -->
            <div class="flex-1">
              <h3 class="text-lg font-bold text-emerald-900 dark:text-emerald-50 mb-2">
                {{ post.title }}
              </h3>
              <p class="text-sm text-emerald-800/80 dark:text-emerald-100/80 mb-3 line-clamp-3">
                {{ post.description }}
              </p>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tech in post.technologies" 
                  :key="tech"
                  class="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>

      <!-- Navigation -->
      <div class="absolute inset-x-0 bottom-0 pb-3">
        <div class="flex items-center justify-between px-4 pt-2 border-t border-emerald-500/10">
          <button 
            @click="prevBlog"
            class="p-2 rounded-full bg-emerald-900/10 dark:bg-emerald-100/10 hover:bg-emerald-900/20 dark:hover:bg-emerald-100/20 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div class="flex gap-1.5">
            <div 
              v-for="(_, index) in posts" 
              :key="index"
              class="w-1.5 h-1.5 rounded-full transition-colors"
              :class="currentBlog === index ? 
                'bg-emerald-600 dark:bg-emerald-400' : 
                'bg-emerald-300/30 dark:bg-emerald-700/30'"
            />
          </div>
          <button 
            @click="nextBlog"
            class="p-2 rounded-full bg-emerald-900/10 dark:bg-emerald-100/10 hover:bg-emerald-900/20 dark:hover:bg-emerald-100/20 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
      <!-- Time Card -->
      <div 
        class="opacity-0 p-4 sm:p-6 rounded-2xl card-backdrop card-border card-hover flex items-center justify-center group transition-all duration-300 h-[100px] md:h-auto"
        :class="isLoaded ? 'animate-card-3' : ''"
      >
        <div class="font-mono text-2xl text-emerald-500">{{ currentTime }}</div>
      </div>

      <!-- Now Card -->
      <div 
        class="opacity-0 p-4 sm:p-6 rounded-2xl card-backdrop card-border card-hover group transition-all duration-300 md:h-auto relative overflow-hidden"
        :class="isLoaded ? 'animate-card-4' : ''"
      >
        <!-- Update the Now Card background SVG -->
        <div class="absolute inset-0 opacity-100 dark:opacity-40">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            xmlns:xlink="http://www.w3.org/1999/xlink" 
            viewBox="0 0 225 71"
            class="w-full h-full text-emerald-900 dark:text-emerald-400"
            preserveAspectRatio="xMidYMid meet"
          >
            <image 
              xlink:href="data:image/png;base64,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" 
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid contain"
            />
          </svg>
        </div>
        
        <!-- Content -->
        <div class="relative z-10">
          <div class="flex justify-between items-start mb-2 sm:mb-4">
            <h3 class="text-lg sm:text-xl font-bold text-emerald-900 dark:text-emerald-50">Now</h3>
            <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          </div>
          <p class="text-sm sm:text-base text-emerald-800/80 animate-pulse dark:text-emerald-100/80 mb-2 sm:mb-4">
            Currently working as <b>Jr. Fullstack Developer</b> at <b class="text-blue-500">{{ currentCompany }}</b>
          </p>
          <button 
            @click="showExperience = true"
            class="text-xs sm:text-sm inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors"
          >
            <span>View all experience</span>
            <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Design Works Card -->
      <!-- Projects Card -->
      <div 
        class="opacity-0 rounded-2xl card-backdrop card-border card-hover relative group overflow-hidden transition-all duration-300 h-[400px] md:h-full"
        :class="isLoaded ? 'animate-card-4' : ''"
      >
        <!-- Project Stack -->
        <div class="relative h-full">
          <TransitionGroup
            name="stack"
            tag="div"
            class="h-full"
          >
            <div 
              v-for="(project, index) in projects"
              :key="project.id"
              v-show="currentIndex === index"
              class="absolute inset-0 p-4 sm:p-6"
            >
              <!-- Project Content -->
              <div class="h-full flex flex-col">
                <!-- Project Image -->
                <div class="relative h-40 mb-4 rounded-lg overflow-hidden">
                  <img 
                    :src="project.image" 
                    :alt="project.title"
                    class="w-full h-full object-cover"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                <!-- Project Info -->
                <div class="flex-1">
                  <h3 class="text-lg font-bold text-emerald-900 dark:text-emerald-50 mb-2">
                    {{ project.title }}
                  </h3>
                  <p class="text-sm text-emerald-800/80 dark:text-emerald-100/80 mb-3 line-clamp-2">
                    {{ project.description }}
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="tech in project.technologies" 
                      :key="tech"
                      class="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TransitionGroup>

          <!-- Navigation -->
          <div class="absolute inset-x-0 bottom-0 pb-3">
            <div class="flex items-center justify-between px-4 pt-2 border-t border-emerald-500/10">
              <button 
                @click="prevProject"
                class="p-2 rounded-full bg-emerald-900/10 dark:bg-emerald-100/10 hover:bg-emerald-900/20 dark:hover:bg-emerald-100/20 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div class="flex gap-1.5">
                <div 
                  v-for="(_, index) in projects" 
                  :key="index"
                  class="w-1.5 h-1.5 rounded-full transition-colors"
                  :class="currentIndex === index ? 
                    'bg-emerald-600 dark:bg-emerald-400' : 
                    'bg-emerald-300/30 dark:bg-emerald-700/30'"
                />
              </div>
              <button 
                @click="nextProject"
                class="p-2 rounded-full bg-emerald-900/10 dark:bg-emerald-100/10 hover:bg-emerald-900/20 dark:hover:bg-emerald-100/20 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      
      <!-- Contact Card -->
      <div 
        class="opacity-0 col-span-2 md:col-span-1 p-4 sm:p-6 rounded-2xl card-backdrop card-border card-hover group transition-all duration-300 md:h-auto"
        :class="isLoaded ? 'animate-card-5' : ''"
      >
        <div class="space-y-4">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-xl font-bold text-emerald-50">Contact</h3>
            <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          </div>

          <!-- Email -->
          <a 
            href="mailto:thaqifrosdi@gmail.com"
            class="flex items-center gap-3 text-emerald-300 hover:text-emerald-400 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span class="text-sm">thaqifrosdi@gmail.com</span>
          </a>

          <!-- Social Links -->
          <div class="flex flex-wrap gap-3">
            <a 
              href="https://github.com/takippu"
              target="_blank"
              rel="noopener noreferrer"
              class="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-all"
              title="No don't look at my github, it's empty and a mess :'("
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>

            <a 
              href="https://linkedin.com/in/thaqifrosdi"
              target="_blank"
              rel="noopener noreferrer"
              class="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-all"
              title="LinkedIn"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>

            <a 
              href="https://instagram.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              class="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-all"
              title="Instagram"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            <!-- <a 
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              class="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-all"
              title="Twitter"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a> -->
          </div>

          <!-- Call to action -->
          <p class="text-sm text-emerald-300/80">
            Feel free to reach out for collaborations or just a friendly chat!
          </p>
        </div>
      </div>

      
    </div>

    <!-- Add the Experience Modal -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95 rotate-3"
      enter-to-class="opacity-100 scale-100 rotate-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100 rotate-0"
      leave-to-class="opacity-0 scale-95 -rotate-3"
    >
      <div 
        v-if="showExperience" 
        class="fixed inset-0 z-50 flex flex-col md:items-center justify-center overflow-y-auto md:overflow-y-hidden"
      >
        <!-- Modal Content -->
        <div 
          class="relative w-full min-h-screen md:min-h-0 md:h-auto md:max-h-[80vh] md:max-w-3xl bg-white dark:bg-neutral-900 md:rounded-2xl shadow-xl overflow-hidden flex flex-col"
        >
          <!-- Sticky Header -->
          <div class="sticky top-0 z-20 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
            <div class="px-4 py-4 sm:px-6 flex justify-between items-center">
              <h2 class="text-xl font-bold text-emerald-900 dark:text-emerald-50">
                Experience Timeline
              </h2>
              <button 
                @click="showExperience = false"
                class="p-2 text-emerald-800 dark:text-emerald-200 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Scrollable Content -->
          <div class="flex-1 md:overflow-y-auto md:overscroll-contain">
            <div class="px-4 py-6 sm:px-6">
              <!-- Timeline Content -->
              <div class="relative">
                <!-- Timeline Line with Glow -->
                <div 
                  class="absolute left-3 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/0 via-emerald-500/50 to-emerald-500/0"
                  style="box-shadow: 0 0 15px rgba(16,185,129,0.3);"
                />

                <!-- Experience Items -->
                <div class="space-y-8">
                  <div 
                    v-for="(job, index) in experience" 
                    :key="index"
                    class="relative pl-8 sm:pl-16"
                  >
                    <!-- Timeline Branch -->
                    <div 
                      class="absolute left-3 sm:left-8 top-3 w-5 sm:w-8 h-px bg-emerald-500/50"
                      style="box-shadow: 0 0 10px rgba(16,185,129,0.2);"
                    />
                    
                    <!-- Timeline Dot -->
                    <div 
                      class="absolute left-2 sm:left-7 top-2 w-2 h-2 rounded-full bg-emerald-500"
                      style="box-shadow: 0 0 10px rgba(16,185,129,0.5);"
                    />

                    <!-- Content -->
                    <div class="relative">
                      <div class="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 mb-1">
                        {{ job.period }}
                      </div>
                      <h3 class="text-base sm:text-lg font-semibold text-emerald-900 dark:text-emerald-50 mb-2">
                        {{ job.role }}
                      </h3>
                      <div class="text-sm sm:text-base text-emerald-800 dark:text-emerald-200 font-medium mb-2">
                        {{ job.company }}
                      </div>
                      <p class="text-xs sm:text-sm text-emerald-800/80 dark:text-emerald-100/80">
                        {{ job.description }}
                      </p>
                      
                      <!-- Technologies -->
                      <div class="flex flex-wrap gap-1.5 sm:gap-2 mt-3">
                        <span 
                          v-for="tech in job.technologies" 
                          :key="tech"
                          class="px-2 py-0.5 sm:py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                        >
                          {{ tech }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </main>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
// Reactive variable to store posts
const posts = ref([]);

// Current index for navigation
const currentBlog = ref(0);

// Function to fetch posts
const fetchPosts = async () => {
  try {
    const response = await fetch('/posts/blog-list.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    posts.value = data;
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

// Navigation functions
const nextBlog = () => {
  currentBlog.value = (currentBlog.value + 1) % posts.value.length;
};

const prevBlog = () => {
  currentBlog.value = (currentBlog.value - 1 + posts.value.length) % posts.value.length;
};

// Fetch posts when the component is mounted
onMounted(() => {
  fetchPosts();
});
const name = 'Thaqif Rosdi'
const currentTime = ref('12:03 AM')
const theme = ref(localStorage.getItem('theme') || 'dark')

const socials = [
  {
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: 'GithubIcon'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: 'LinkedinIcon'
  },
  // Add more socials
]

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
  document.documentElement.setAttribute('data-theme', theme.value)
}

const isLoaded = ref(false)

const showExperience = ref(false)
const currentCompany = 'ALPHV Technologies Sdn. Bhd.'

const experience = [
  {
    period: '2023 - Present',
    role: 'Senior Frontend Developer',
    company: 'Current Company Name',
    description: 'Leading the frontend development team, implementing new features, and improving application performance.',
    technologies: ['Vue.js', 'TypeScript', 'Tailwind CSS', 'GraphQL']
  },
  {
    period: '2021 - 2023',
    role: 'Frontend Developer',
    company: 'Previous Company Name',
    description: 'Developed and maintained multiple web applications, focusing on user experience and responsive design.',
    technologies: ['React', 'Next.js', 'SCSS', 'REST API']
  },
  {
    period: '2019 - 2021',
    role: 'Web Developer',
    company: 'Another Company',
    description: 'Built responsive websites and implemented various interactive features using modern web technologies.',
    technologies: ['JavaScript', 'PHP', 'MySQL', 'Bootstrap']
  },
  // Add more experiences...
]

const tools = [
  'Laravel',
  'MobaXterm',
  'Laragon',
  'HeidiSQL',
  'Svelte',
  'Nodejs'
]

const subTools = [
  'Gen AI',
  'JS Frameworks',
  'Python',
  'Business',
  'DevOps',
  'SaaS'
]

const currentIndex = ref(0)
const projects = [
  {
    id: 1,
    title: "Portfolio 2024",
    description: "Personal portfolio website built with Vue 3 and Tailwind CSS. Features smooth animations and dark mode.",
    image: "https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=2940&auto=format&fit=crop",
    technologies: ["Vue", "Tailwind", "Vite"]
  },
  {
    id: 2,
    title: "E-commerce Dashboard",
    description: "Admin dashboard for managing products, orders, and customers. Includes real-time analytics.",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2940&auto=format&fit=crop",
    technologies: ["React", "TypeScript", "Redux"]
  },
  {
    id: 3,
    title: "Weather App",
    description: "Beautiful weather application with animated backgrounds and 7-day forecast.",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=2940&auto=format&fit=crop",
    technologies: ["SolidJS", "TailwindCSS", "APIs"]
  }
]

const nextProject = () => {
  currentIndex.value = (currentIndex.value + 1) % projects.length
}

const prevProject = () => {
  currentIndex.value = currentIndex.value === 0 
    ? projects.length - 1 
    : currentIndex.value - 1
}

// Handle body scroll lock
watch(showExperience, (newValue) => {
  if (newValue) {
    document.body.classList.add('modal-open')
    // Reset scroll position when opening modal
    setTimeout(() => {
      const modalContent = document.querySelector('.overflow-y-auto')
      if (modalContent) modalContent.scrollTop = 0
    }, 0)
  } else {
    document.body.classList.remove('modal-open')
  }
})

// Clean up on unmount
onUnmounted(() => {
  document.body.classList.remove('modal-open')
})

onMounted(() => {
  // Initialize theme
  document.documentElement.setAttribute('data-theme', theme.value)
  
  // Update time every minute
  const updateTime = () => {
    const now = new Date()
    currentTime.value = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  updateTime()
  setInterval(updateTime, 60000)

  // Trigger the animation after a short delay
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})
</script>

<style>
:root {
  --animation-glow: 0 0 20px rgba(16,185,129,0.2);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  display: none;
}

/* Ensure the page doesn't scroll */
html, body {
  overflow: hidden;
  height: 100vh;
}

/* Background blob animation */
@keyframes blob {
  0% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

/* Update template classes to use these instead of bg-base-900/50 */
.card-backdrop {
  @apply bg-neutral-900/50 dark:bg-neutral-900/50 backdrop-blur-sm;
}

.card-border {
  @apply border border-emerald-600/20 dark:border-emerald-500/20;
}

.card-hover {
  @apply hover:border-emerald-600/40 dark:hover:border-emerald-500/40
         hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] 
         dark:hover:shadow-[0_0_20px_rgba(16,185,129,0.2)];
}

.bg-gradient {
  @apply bg-neutral-900 dark:bg-neutral-950;
}

/* Entry animations for cards */
@keyframes card-enter-1 {
  0% {
    opacity: 0;
    transform: translate(-100px, -100px) rotate(-10deg);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0) rotate(0);
  }
}

@keyframes card-enter-2 {
  0% {
    opacity: 0;
    transform: translate(100px, -100px) rotate(10deg);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0) rotate(0);
  }
}

@keyframes card-enter-3 {
  0% {
    opacity: 0;
    transform: translate(-100px, 100px) rotate(-5deg);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0) rotate(0);
  }
}

@keyframes card-enter-4 {
  0% {
    opacity: 0;
    transform: translate(100px, 100px) rotate(5deg);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0) rotate(0);
  }
}

@keyframes card-enter-5 {
  0% {
    opacity: 0;
    transform: translateY(100px) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-card-1 {
  animation: card-enter-1 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.animate-card-2 {
  animation: card-enter-2 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards;
}

.animate-card-3 {
  animation: card-enter-3 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
}

.animate-card-4 {
  animation: card-enter-4 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards;
}

.animate-card-5 {
  animation: card-enter-5 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95) rotate(3deg);
}

/* Custom scrollbar for the modal */
.modal-content::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-track {
  background: transparent;
}

.modal-content::-webkit-scrollbar-thumb {
  background: rgba(16,185,129,0.2);
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: rgba(16,185,129,0.4);
}

/* Mobile safe area utilities */
.h-safe-area-bottom {
  height: env(safe-area-inset-bottom, 0px);
}

/* Modal mobile styles */
@media (max-width: 640px) {
  .modal-content {
    touch-action: pan-y;
    -webkit-overflow-scrolling: touch;
  }
  
  /* Hide scrollbar on mobile but keep functionality */
  .modal-content::-webkit-scrollbar {
    display: none;
  }
  
  /* Prevent body scroll when modal is open */
  body.modal-open {
    overflow: hidden;
    position: fixed;
    width: 100%;
  }
}

/* Add smooth scroll behavior */
.modal-content {
  scroll-behavior: smooth;
}

/* Improve touch targets on mobile */
@media (max-width: 640px) {
  .modal-content button {
    min-height: 44px;
    min-width: 44px;
  }
}

/* Mobile-specific grid adjustments */
@media (max-width: 768px) {
  .grid {
    grid-auto-rows: auto;
    grid-template-rows: auto;
  }
}

/* Ensure content doesn't overflow cards */
.card-backdrop {
  @apply overflow-hidden;
}

/* Adjust text sizes for better mobile readability */
@media (max-width: 640px) {
  .text-xl {
    font-size: 1.125rem;
  }
  .text-2xl {
    font-size: 1.5rem;
  }
  .text-base {
    font-size: 0.875rem;
  }
}

/* Add height transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Desktop-specific grid adjustments */
@media (min-width: 768px) {
  .grid {
    grid-template-rows: repeat(3, minmax(0, 1fr));
    height: calc(100vh - 3rem); /* Account for padding */
  }
  
  /* Ensure avatar card spans full height */
  .grid > div:nth-child(2) {
    height: 100%;
  }
}

/* Maintain mobile optimizations */
@media (max-width: 768px) {
  .grid {
    grid-auto-rows: auto;
    grid-template-rows: auto;
  }
}

/* Ensure proper spacing */
.grid > * {
  min-height: 0; /* Prevents grid item expansion */
}

/* Add smooth transitions for height changes */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Maintain aspect ratios */
@media (min-width: 768px) {
  .grid > div {
    height: 100%;
  }
}

/* Grid layout adjustments */
@media (min-width: 768px) {
  .grid {
    grid-template-rows: repeat(3, minmax(0, 1fr));
    height: calc(100vh - 3rem); /* Account for padding */
  }
  
  /* Ensure avatar card spans full height */
  .grid > div:nth-child(2) {
    height: 100%;
  }
}

/* Maintain mobile optimizations */
@media (max-width: 768px) {
  .grid {
    grid-auto-rows: auto;
    grid-template-rows: auto;
  }
}

/* Base card styles */
.card-backdrop {
  height: 100%; /* Make cards fill their grid areas */
  display: flex;
  flex-direction: column;
}

/* Ensure content doesn't overflow */
.card-backdrop > * {
  flex-shrink: 0;
}

/* Add smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Ensure proper content scaling */
@media (min-width: 768px) {
  .text-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

/* Fix viewport height on mobile */
@supports (-webkit-touch-callout: none) {
  .min-h-screen {
    min-height: -webkit-fill-available;
  }
}

/* Modal fixes */
@media (max-width: 768px) {
  /* Prevent body scroll when modal is open */
  body.modal-open {
    @apply overflow-hidden touch-none fixed inset-0;
  }

  /* Modal scroll container */
  .overflow-y-auto {
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-y: contain;
  }
}

/* Background image styles */
.card-backdrop img {
  @apply transition-opacity duration-300;
}

.group:hover .card-backdrop img {
  @apply opacity-20 dark:opacity-10;
}

/* Add smooth scrollbar for overflow content */
@media (min-width: 768px) {
  .md\:row-span-3 {
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(16,185,129,0.2) transparent;
  }

  .md\:row-span-3::-webkit-scrollbar {
    width: 4px;
  }

  .md\:row-span-3::-webkit-scrollbar-track {
    background: transparent;
  }

  .md\:row-span-3::-webkit-scrollbar-thumb {
    background-color: rgba(16,185,129,0.2);
    border-radius: 2px;
  }
}

/* Improve text readability */
.text-sm {
  line-height: 1.6;
}

/* Stack Animation */
.stack-enter-active,
.stack-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  width: 100%;
  height: 100%;
}

.stack-enter-from {
  opacity: 0;
  transform: translateY(-20%) scale(0.9) rotate(-2deg);
  z-index: 1;
}

.stack-leave-to {
  opacity: 0;
  transform: translateY(20%) scale(0.9) rotate(2deg);
  z-index: 0;
}

.stack-enter-to,
.stack-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1) rotate(0);
}

/* Mobile-specific grid adjustments */
@media (max-width: 767px) {
  .grid {
    grid-template-columns: 1fr !important; /* Force single column */
    gap: 1rem !important;
  }

  /* Make all cards take full width */
  .grid > div {
    grid-column: 1 / -1 !important;
    height: auto !important;
    min-height: 100px;
  }

  /* Adjust specific card heights */
  .grid > div:first-child {
    min-height: 200px;
  }

  .grid > div:nth-child(2) {
    min-height: 400px;
  }

  /* Projects card height */
  .grid > div:nth-child(6) {
    height: 450px !important;
  }

  /* Contact card */
  .grid > div:last-child {
    min-height: 250px;
  }
}

/* Modal mobile improvements */
@media (max-width: 767px) {
  /* Full screen modal on mobile */
  .fixed.inset-0.z-50 {
    padding: 0;
  }

  /* Modal content improvements */
  .modal-content {
    height: 100vh;
    height: -webkit-fill-available;
    border-radius: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  /* Better touch targets */
  .modal-content button {
    min-height: 44px;
    min-width: 44px;
    padding: 12px;
  }

  /* Improve modal header */
  .sticky.top-0 {
    padding: 1rem;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
  }

  /* Add safe area padding */
  .modal-content {
    padding-bottom: env(safe-area-inset-bottom, 20px);
  }
}

/* Maintain desktop layout */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, minmax(0, 1fr));
  }
}

/* Add these styles */
@media (max-width: 767px) {
  body {
    overflow-y: auto;
  }
}

@media (min-width: 768px) {
  body {
    overflow: hidden;
  }
}
</style> 
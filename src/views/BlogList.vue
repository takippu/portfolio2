<template>
    <div class="p-6 bg-gradient min-h-screen flex flex-col">
      <!-- Main Content -->
      <div class="flex flex-1 overflow-y-auto">
        <!-- Pagination Navigation (Left Side) -->
        <div class="flex items-center justify-center mr-6">
          <button
            @click="prevPage"
            :disabled="currentPage === 1 || isTransitioning"
            class="p-2 rounded-full bg-emerald-900/10 dark:bg-emerald-100/10 hover:bg-emerald-900/20 dark:hover:bg-emerald-100/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
  
        <!-- Blog Posts Grid -->
        <div class="flex-1">
          <h1 class="text-4xl font-bold text-primary mb-6">Blog Posts</h1>
          <TransitionGroup name="fade" tag="div" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="post in visiblePosts"
              v-show="isVisible"
              :key="post.id"
              class="card-backdrop card-border card-hover rounded-2xl p-6 transition-all duration-300"
            >
              <!-- Blog Post Card -->
              <div class="h-full flex flex-col">
                <!-- Blog Title -->
                <h2 class="text-xl font-bold text-emerald-900 dark:text-emerald-50 mb-4">
                  {{ post.title }}
                </h2>
  
                <!-- Blog Description -->
                <p class="text-sm text-emerald-800/80 dark:text-emerald-100/80 mb-4 line-clamp-3">
                  {{ post.description }}
                </p>
  
                <!-- Technologies -->
                <div class="flex flex-wrap gap-2 mb-6">
                  <span
                    v-for="tech in post.technologies"
                    :key="tech"
                    class="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs"
                  >
                    {{ tech }}
                  </span>
                </div>
  
                <!-- Read Now Button -->
                <router-link
                  :to="`/blogs/${post.id}`"
                  class="mt-auto p-2 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 transition-colors text-center"
                >
                  Read Now
                </router-link>
              </div>
            </div>
          </TransitionGroup>
        </div>
  
        <!-- Pagination Navigation (Right Side) -->
        <div class="flex items-center justify-center ml-6">
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages || isTransitioning"
            class="p-2 rounded-full bg-emerald-900/10 dark:bg-emerald-100/10 hover:bg-emerald-900/20 dark:hover:bg-emerald-100/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
  
      <!-- Bottom Bar -->
      <div class="fixed bottom-0 left-0 right-0 py-4  border-t border-emerald-700">
        <div class="flex items-center justify-center space-x-4">
          <button class="btn btn-ghost text-emerald-300" @click="goToHome">
            Home
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        posts: [], // List of all blog posts
        currentPage: 1, // Current page number
        itemsPerPage: 6, // Number of items to display per page
        isTransitioning: false, // Track if a transition is in progress
        visiblePosts: [], // Posts currently visible on the page
        isVisible: true, // Control visibility of the boxes
      };
    },
    computed: {
      // Calculate the total number of pages
      totalPages() {
        return Math.ceil(this.posts.length / this.itemsPerPage);
      },
      // Get the posts for the current page
      paginatedPosts() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.posts.slice(start, end);
      },
    },
    methods: {
      // Handle page navigation
      async nextPage() {
        if (this.currentPage < this.totalPages && !this.isTransitioning) {
          await this.changePage(() => this.currentPage++);
        }
      },
      // Handle previous page navigation
      async prevPage() {
        if (this.currentPage > 1 && !this.isTransitioning) {
          await this.changePage(() => this.currentPage--);
        }
      },
      // Change page with transition
      async changePage(updatePage) {
        this.isTransitioning = true;
  
        // Fade out current boxes
        this.isVisible = false;
        await this.waitForTransition(300); // Wait for fade-out to complete
  
        // Update the page
        updatePage();
        this.visiblePosts = this.paginatedPosts;
  
        // Fade in new boxes
        this.isVisible = true;
        await this.waitForTransition(300); // Wait for fade-in to complete
  
        this.isTransitioning = false;
      },
      // Wait for a specified duration
      waitForTransition(duration) {
        return new Promise((resolve) => setTimeout(resolve, duration));
      },
      // Navigate to Blog List
      goToBlogList() {
        this.$router.push('/blogs');
      },
      // Navigate to Home
      goToHome() {
        this.$router.push('/');
      },
    },
    async created() {
      // Fetch the list of blog posts (e.g., from an API or JSON file)
      try {
        const response = await fetch('/posts/blog-list.json'); // Adjust the path as needed
        if (!response.ok) throw new Error('Failed to fetch blog posts');
        this.posts = await response.json();
        this.visiblePosts = this.paginatedPosts; // Initialize visible posts
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    },
  };
  </script>
  
  <style scoped>
  /* Fade Transition */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
<template>
    <div class="min-h-screen bg-base-200 flex flex-col">
      <!-- Blog Post Content -->
      <div class="flex-1 flex items-center justify-center p-6">
        <div class="blog-post w-full max-w-4xl bg-base-100 rounded-box shadow-2xl overflow-hidden flex flex-col">
          <!-- Blog Header -->
          <div class="bg-gradient-to-r from-primary to-secondary p-6">
            <h1 class="text-4xl font-bold text-base-100 neon-text">{{ postTitle }}</h1>
            <p class="text-base-100/80 mt-2">Published on {{ postDate }}</p>
          </div>
  
          <!-- Blog Content -->
          <div class="p-6 flex-1 overflow-y-auto">
            <MarkdownRenderer :content="markdownContent" />
          </div>
        </div>
      </div>
  
      <!-- Bottom Bar -->
      <div class="w-full bg-base-100 py-4 shadow-lg">
        <div class="max-w-4xl mx-auto flex justify-between items-center px-6">
          <!-- Prev Post -->
          <button class="btn btn-ghost text-primary" @click="goToPrevPost" :disabled="!prevPostId">
            ← Prev Post
          </button>
  
          <!-- Center Buttons -->
          <div class="flex items-center space-x-4">
            <button class="btn btn-ghost text-primary" @click="goToBlogList">
              Blog List
            </button>
            <button class="btn btn-ghost text-primary" @click="goToHome">
              Home
            </button>
          </div>
  
          <!-- Next Post -->
          <button class="btn btn-ghost text-primary" @click="goToNextPost" :disabled="!nextPostId">
            Next Post →
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import MarkdownRenderer from '../components/MarkdownRenderer.vue';
  
  export default {
    components: {
      MarkdownRenderer,
    },
    data() {
      return {
        markdownContent: '',
        postTitle: '',
        postDate: '',
        posts: [], // List of blog posts
        currentPostId: null, // Current post ID
      };
    },
    computed: {
      // Get the index of the current post
      currentPostIndex() {
        return this.posts.findIndex(post => post.id === this.currentPostId);
      },
      // Get the previous post ID
      prevPostId() {
        if (this.currentPostIndex > 0) {
          return this.posts[this.currentPostIndex - 1].id;
        }
        return null;
      },
      // Get the next post ID
      nextPostId() {
        if (this.currentPostIndex < this.posts.length - 1) {
          return this.posts[this.currentPostIndex + 1].id;
        }
        return null;
      },
    },
    async created() {
      // Fetch the list of blog posts
      await this.fetchBlogPosts();
  
      // Get the current post ID from the route
      this.currentPostId = this.$route.params.id;
  
      // Load the current post content
      await this.loadPostContent();
    },
    methods: {
      // Fetch the list of blog posts
      async fetchBlogPosts() {
        try {
          const response = await fetch('/posts/blog-list.json'); // Adjust the path as needed
          if (!response.ok) throw new Error('Failed to fetch blog posts');
          this.posts = await response.json();
        } catch (error) {
          console.error('Error fetching blog posts:', error);
        }
      },
      // Load the current post content
      async loadPostContent() {
        try {
          const response = await fetch(`/posts/${this.currentPostId}.md`); // Load the Markdown file
          if (!response.ok) throw new Error('Post not found');
          this.markdownContent = await response.text();
  
          // Set the post title and date (you can fetch this dynamically or from the post list)
          const post = this.posts.find(post => post.id === this.currentPostId);
          if (post) {
            this.postTitle = post.title;
            this.postDate = post.date || 'Unknown Date';
          }
        } catch (error) {
          this.markdownContent = `# Error: ${error.message}`; // Show an error message
        }
      },
      // Navigate to the previous post
      goToPrevPost() {
        if (this.prevPostId) {
          this.$router.push(`/blogs/${this.prevPostId}`);
        }
      },
      // Navigate to the next post
      goToNextPost() {
        if (this.nextPostId) {
          this.$router.push(`/blogs/${this.nextPostId}`);
        }
      },
      // Navigate to the blog list
      goToBlogList() {
        this.$router.push('/blogs');
      },
      // Navigate to the home page
      goToHome() {
        this.$router.push('/');
      },
    },
    watch: {
      // Watch for changes in the route (e.g., when navigating between posts)
      '$route.params.id': {
        handler(newId) {
          this.currentPostId = newId;
          this.loadPostContent();
        },
        immediate: true,
      },
    },
  };
  </script>
  
  <style scoped>
  /* Neon text effect */
  .neon-text {
    text-shadow: 0 0 5px hsl(var(--p)), 0 0 10px hsl(var(--p)), 0 0 20px hsl(var(--p)), 0 0 40px hsl(var(--s)), 0 0 80px hsl(var(--s));
  }
  
  /* Blog post container */
  .blog-post {
    max-height: 80vh; /* Limit height to 80% of the viewport */
    display: flex;
    flex-direction: column;
  }
  
  /* Blog content area */
  .blog-post > div:nth-child(2) {
    flex: 1; /* Allow content area to grow and fill available space */
    overflow-y: auto; /* Enable vertical scrolling */
  }
  
  /* Custom styles for Markdown content */
  .blog-post :deep(h1) {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    color: hsl(var(--p)); /* Use primary color for headings */
    text-shadow: 0 0 5px hsl(var(--p)), 0 0 10px hsl(var(--p)), 0 0 20px hsl(var(--p));
  }
  
  .blog-post :deep(h2) {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1.25rem;
    color: hsl(var(--s)); /* Use secondary color for headings */
    text-shadow: 0 0 5px hsl(var(--s)), 0 0 10px hsl(var(--s)), 0 0 20px hsl(var(--s));
  }
  
  .blog-post :deep(h3) {
    font-size: 1.75rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: hsl(var(--a)); /* Use accent color for headings */
    text-shadow: 0 0 5px hsl(var(--a)), 0 0 10px hsl(var(--a)), 0 0 20px hsl(var(--a));
  }
  
  .blog-post :deep(p) {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    color: hsl(var(--bc)); /* Use base content color */
  }
  
  .blog-post :deep(a) {
    color: hsl(var(--p)); /* Use primary color for links */
    text-decoration: underline;
    transition: color 0.3s ease;
  }
  
  .blog-post :deep(a:hover) {
    color: hsl(var(--s)); /* Use secondary color on hover */
  }
  
  .blog-post :deep(ul),
  .blog-post :deep(ol) {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
  }
  
  .blog-post :deep(li) {
    margin-bottom: 0.5rem;
  }
  
  .blog-post :deep(code) {
    font-family: 'Courier New', Courier, monospace;
    background: hsl(var(--n)); /* Use neutral color for code background */
    color: hsl(var(--nc)); /* Use neutral content color for code text */
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
  }
  
  .blog-post :deep(pre) {
    background: hsl(var(--n)); /* Use neutral color for pre background */
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin-bottom: 1.5rem;
  }
  
  .blog-post :deep(pre code) {
    background: transparent;
    color: hsl(var(--nc)); /* Use neutral content color for pre text */
  }
  
  .blog-post :deep(blockquote) {
    border-left: 4px solid hsl(var(--p)); /* Use primary color for blockquote border */
    padding-left: 1rem;
    color: hsl(var(--bc)); /* Use base content color for blockquote text */
    margin-bottom: 1.5rem;
    background: hsl(var(--b1)); /* Use base-100 color for blockquote background */
    border-radius: 4px;
    padding: 1rem;
  }
  </style>
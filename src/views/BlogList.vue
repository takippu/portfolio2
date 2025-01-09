<template>
    <div class="p-6">
      <h1 class="text-4xl font-bold text-primary mb-6">Blog Posts</h1>
      <ul class="space-y-4">
        <li v-for="post in posts" :key="post.id">
          <router-link :to="`/blogs/${post.id}`" class="text-lg text-base-content hover:text-primary transition-colors">
            {{ post.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        posts: [], // List of blog posts
      };
    },
    async created() {
      // Fetch the list of blog posts (e.g., from an API or JSON file)
      try {
        const response = await fetch('/posts/blog-list.json'); // Adjust the path as needed
        if (!response.ok) throw new Error('Failed to fetch blog posts');
        this.posts = await response.json();
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
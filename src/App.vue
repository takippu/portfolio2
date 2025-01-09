<template>
  <div class="min-h-screen">
    <!-- <Navbar /> -->
    <router-view></router-view> <!-- Render the matched route component -->
  </div>
</template>

<script setup>
import Navbar from './components/layout/Navbar.vue'; // Import the Navbar component
</script>

<style>
/* Add global styles here if needed */
</style>
<template>
    <div v-html="compiledMarkdown"></div>
  </template>
  
  <script>
  import { marked } from 'marked';
  
  export default {
    props: {
      content: {
        type: String,
        required: true,
      },
    },
    computed: {
      compiledMarkdown() {
        return marked(this.content);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles for your Markdown content */
  </style>
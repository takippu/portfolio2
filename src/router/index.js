import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import BlogList from '../views/BlogList.vue'; // New component for listing blogs
import BlogPost from '../views/BlogPost.vue'; // New component for individual blog posts

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/blogs/', // Route for listing all blogs
    name: 'BlogList',
    component: BlogList,
  },
  {
    path: '/blogs/:id', // Route for individual blog posts
    name: 'BlogPost',
    component: BlogPost,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
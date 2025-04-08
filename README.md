# My Portfolio Website

This repository contains the source code for my personal portfolio website. It showcases my projects, skills, and includes a blog section.

## Project Overview

The website is built as a Single Page Application (SPA) using modern web technologies. It features different sections like a hero banner, project display, skills overview, and a blog powered by Markdown files. Animations are used to enhance the user experience.

## Technologies Used

*   **Frontend Framework:** [Vue 3](https://vuejs.org/) (using `<script setup>` SFCs)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Routing:** [Vue Router](https://router.vuejs.org/)
*   **Styling:**
    *   [Tailwind CSS](https://tailwindcss.com/)
    *   [DaisyUI](https://daisyui.com/) (Tailwind CSS component library)
*   **Markdown Rendering:** [Marked](https://marked.js.org/) (for blog posts)
*   **Animation:** [@vueuse/motion](https://motion.vueuse.org/), [Framer Motion](https://www.framer.com/motion/)
*   **Package Manager:** [npm](https://www.npmjs.com/)

## Setup and Development

Follow these steps to set up the project locally:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd my-portfolio
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    This will start a local server, usually at `http://localhost:5173`, with hot module replacement.
    ```bash
    npm run dev
    ```
4.  **Build for production:**
    This command compiles and bundles the application for deployment into the `dist` directory.
    ```bash
    npm run build
    ```
5.  **Preview the production build:**
    This command serves the contents of the `dist` directory locally to preview the production build.
    ```bash
    npm run preview
    ```

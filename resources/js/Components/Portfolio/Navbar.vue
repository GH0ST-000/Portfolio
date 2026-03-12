<template>
    <nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gray-900/70 border-b border-gray-800">
        <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <a href="#home" @click.prevent="smoothScrollTo('#home')" class="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                    Portfolio
                </a>
                
                <div class="hidden md:flex items-center space-x-8">
                    <a href="#about" @click.prevent="smoothScrollTo('#about')" class="text-gray-300 hover:text-indigo-400 transition-colors duration-300">About</a>
                    <a href="#skills" @click.prevent="smoothScrollTo('#skills')" class="text-gray-300 hover:text-indigo-400 transition-colors duration-300">Skills</a>
                    <a href="#projects" @click.prevent="smoothScrollTo('#projects')" class="text-gray-300 hover:text-indigo-400 transition-colors duration-300">Projects</a>
                    <a href="#experience" @click.prevent="smoothScrollTo('#experience')" class="text-gray-300 hover:text-indigo-400 transition-colors duration-300">Experience</a>
                    <a href="#pricing" @click.prevent="smoothScrollTo('#pricing')" class="text-gray-300 hover:text-indigo-400 transition-colors duration-300">Pricing</a>
                    <a href="#contact" @click.prevent="smoothScrollTo('#contact')" class="text-gray-300 hover:text-indigo-400 transition-colors duration-300">Contact</a>
                    <a :href="route('portfolio.3d')" class="relative group px-4 py-2 rounded-xl overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:scale-105 transition-transform"></div>
                        <span class="relative text-white font-semibold flex items-center gap-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"/>
                            </svg>
                            3D Experience
                        </span>
                    </a>
                </div>
                
                <button @click="toggleMenu" class="md:hidden text-gray-300 focus:outline-none">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path v-if="!menuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            
            <div v-show="menuOpen" class="md:hidden mt-4 space-y-2 pb-4">
                <a href="#about" @click.prevent="smoothScrollTo('#about'); menuOpen = false" class="block text-gray-300 hover:text-indigo-400 transition-colors duration-300">About</a>
                <a href="#skills" @click.prevent="smoothScrollTo('#skills'); menuOpen = false" class="block text-gray-300 hover:text-indigo-400 transition-colors duration-300">Skills</a>
                <a href="#projects" @click.prevent="smoothScrollTo('#projects'); menuOpen = false" class="block text-gray-300 hover:text-indigo-400 transition-colors duration-300">Projects</a>
                <a href="#experience" @click.prevent="smoothScrollTo('#experience'); menuOpen = false" class="block text-gray-300 hover:text-indigo-400 transition-colors duration-300">Experience</a>
                <a href="#pricing" @click.prevent="smoothScrollTo('#pricing'); menuOpen = false" class="block text-gray-300 hover:text-indigo-400 transition-colors duration-300">Pricing</a>
                <a href="#contact" @click.prevent="smoothScrollTo('#contact'); menuOpen = false" class="block text-gray-300 hover:text-indigo-400 transition-colors duration-300">Contact</a>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue';

const menuOpen = ref(false);

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
};

// Instant smooth scroll function
const smoothScrollTo = (targetId) => {
    const target = document.querySelector(targetId);
    if (!target) return;
    
    // Get the target position immediately
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800; // Smooth but responsive
    
    let startTime = null;
    
    // Smooth easing function
    const easeInOutCubic = (t) => {
        return t < 0.5 
            ? 4 * t * t * t 
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };
    
    const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * easeProgress);
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    };
    
    // Start animation immediately
    requestAnimationFrame(animation);
};
</script>

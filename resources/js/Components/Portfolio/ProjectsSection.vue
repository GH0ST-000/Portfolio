<template>
    <section id="projects" class="py-24 relative overflow-hidden">
        <!-- Animated gradient background with movement -->
        <div class="absolute inset-0">
            <div class="absolute inset-0 bg-gradient-to-b from-gray-950 via-purple-950/20 to-gray-950"></div>
            <div class="absolute inset-0 opacity-30">
                <div class="absolute top-1/4 -left-48 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl animate-blob"></div>
                <div class="absolute top-1/3 -right-48 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
                <div class="absolute -bottom-48 left-1/2 w-96 h-96 bg-pink-600/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
            </div>
        </div>
        
        <!-- Floating particles -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div v-for="i in 15" :key="i" 
                 class="absolute w-1 h-1 bg-purple-400 rounded-full animate-float-particle"
                 :style="getParticleStyle(i)"></div>
        </div>
        
        <div class="container mx-auto px-6 relative z-10">
            <!-- Header with reveal animation -->
            <div class="text-center mb-20 overflow-hidden">
                <div class="animate-slide-down">
                    <div class="inline-block mb-4">
                        <span class="text-sm font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 uppercase">
                            Portfolio
                        </span>
                    </div>
                    <h2 class="text-5xl md:text-7xl font-black mb-4 relative inline-block">
                        <span class="absolute inset-0 blur-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-50 animate-glow-pulse"></span>
                        <span class="relative bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-shimmer-text">
                            Featured Projects
                        </span>
                    </h2>
                    <p class="text-gray-400 text-lg">Innovative solutions with cutting-edge technology</p>
                </div>
            </div>
            
            <!-- Floating Cards Layout -->
            <div class="max-w-7xl mx-auto">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div v-for="(project, index) in projects" 
                         :key="project.id"
                         class="project-wrapper"
                         :style="{ animationDelay: `${index * 0.15}s` }">
                        
                        <div class="project-card-3d group"
                             @mouseenter="handleMouseEnter($event, index)"
                             @mousemove="handleMouseMove($event, index)"
                             @mouseleave="handleMouseLeave(index)">
                            
                            <!-- Animated glow border -->
                            <div class="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-1000 animate-rotate-gradient"></div>
                            
                            <!-- Main card with glassmorphism -->
                            <div class="relative h-full bg-gradient-to-br from-gray-900/40 via-purple-900/20 to-gray-900/40 rounded-3xl border border-gray-600/30 overflow-hidden backdrop-blur-2xl transform-gpu transition-all duration-700 group-hover:border-purple-400/60 hover:shadow-2xl hover:shadow-purple-500/30">
                                
                                <!-- Holographic overlay effect -->
                                <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-700"></div>
                                
                                <!-- Shimmer effect -->
                                <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-shimmer-slide"></div>
                                </div>
                                
                                <!-- Radial glow follows cursor -->
                                <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div class="absolute inset-0 bg-[radial-gradient(circle_600px_at_var(--mouse-x)_var(--mouse-y),rgba(139,92,246,0.15),transparent)]"></div>
                                </div>
                                
                                <div class="relative p-8 h-full flex flex-col">
                                    <!-- Image section with better styling -->
                                    <div class="relative mb-6 group/img">
                                        <!-- Floating shadow -->
                                        <div class="absolute -inset-4 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-3xl blur-2xl opacity-0 group-hover/img:opacity-100 transition-all duration-700"></div>
                                        
                                        <div class="relative aspect-video rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-gray-600/30">
                                            <!-- Featured badge -->
                                            <div v-if="project.featured" class="absolute top-4 left-4 z-20">
                                                <div class="relative group/badge">
                                                    <!-- Badge glow -->
                                                    <div class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-md opacity-75 group-hover/badge:opacity-100 transition-opacity animate-pulse-slow"></div>
                                                    
                                                    <!-- Badge content -->
                                                    <div class="relative px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/50 to-orange-500/50 border border-yellow-400/70 backdrop-blur-xl">
                                                        <span class="text-sm font-bold text-yellow-100 flex items-center gap-2">
                                                            <svg class="w-4 h-4 animate-pulse-scale" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                                            </svg>
                                                            Featured
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <!-- Image with white background for better visibility -->
                                            <div class="absolute inset-0 flex items-center justify-center p-8 bg-gradient-to-br from-white/90 to-gray-100/90 group-hover/img:from-white group-hover/img:to-gray-50 transition-all duration-700">
                                                <img v-if="project.image" 
                                                     :src="project.image" 
                                                     :alt="project.title"
                                                     class="w-full h-full object-contain transform-gpu transition-all duration-1000 ease-out group-hover/img:scale-110"
                                                     loading="lazy" />
                                            </div>
                                            
                                            <!-- Animated border -->
                                            <div class="absolute inset-0 rounded-2xl opacity-0 group-hover/img:opacity-100 transition-opacity duration-700">
                                                <div class="absolute inset-0 rounded-2xl border-2 border-purple-500/60 animate-border-flow"></div>
                                            </div>
                                            
                                            <!-- Subtle gradient overlay on edges only -->
                                            <div class="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent pointer-events-none"></div>
                                        </div>
                                    </div>
                                    
                                    <!-- Content with better spacing -->
                                    <div class="flex-1 flex flex-col space-y-4">
                                        <!-- Title with gradient on hover -->
                                        <h3 class="text-3xl font-black text-white leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:via-purple-300 group-hover:to-pink-300 group-hover:bg-clip-text transition-all duration-500">
                                            {{ project.title }}
                                        </h3>
                                        
                                        <!-- Description -->
                                        <p class="text-gray-400 leading-relaxed text-base group-hover:text-gray-300 transition-colors duration-500">
                                            {{ project.description }}
                                        </p>
                                        
                                        <!-- Tech Stack with beautiful badges -->
                                        <div class="flex-1 pt-4">
                                            <div class="flex flex-wrap gap-2">
                                                <span v-for="(tech, techIndex) in getTechnologies(project).slice(0, 5)" 
                                                      :key="techIndex"
                                                      class="tech-badge-float group/tech"
                                                      :style="{ animationDelay: `${techIndex * 0.05}s` }">
                                                    <!-- Badge glow -->
                                                    <div class="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur-md opacity-0 group-hover/tech:opacity-100 transition-all duration-300"></div>
                                                    
                                                    <!-- Badge content -->
                                                    <div class="relative px-4 py-2 rounded-lg bg-gradient-to-br from-indigo-500/30 to-purple-500/30 border border-indigo-400/50 backdrop-blur-sm hover:border-indigo-300/70 hover:scale-110 hover:from-indigo-500/40 hover:to-purple-500/40 transition-all duration-300">
                                                        <span class="text-sm font-bold text-indigo-200 group-hover/tech:text-indigo-100 transition-colors">{{ tech }}</span>
                                                    </div>
                                                </span>
                                                <span v-if="getTechnologies(project).length > 5" 
                                                      class="relative px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-400 text-sm font-bold">
                                                    +{{ getTechnologies(project).length - 5 }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Beautiful action buttons -->
                                    <div class="flex gap-4 mt-6 pt-6 border-t border-gray-700/30">
                                        <a v-if="project.live_url" 
                                           :href="project.live_url" 
                                           target="_blank"
                                           class="group/btn flex-1 relative overflow-hidden rounded-xl">
                                            <!-- Button background with gradient -->
                                            <div class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                                            <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                                            
                                            <!-- Shine effect -->
                                            <div class="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500">
                                                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover/btn:animate-shine"></div>
                                            </div>
                                            
                                            <!-- Button content -->
                                            <div class="relative px-6 py-3 flex items-center justify-center gap-2 text-white font-bold transform-gpu transition-transform duration-300 group-hover/btn:scale-105">
                                                <svg class="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                                                </svg>
                                                Live Demo
                                            </div>
                                        </a>
                                        
                                        <a v-if="project.github_url" 
                                           :href="project.github_url" 
                                           target="_blank"
                                           class="group/btn flex-1 relative overflow-hidden rounded-xl">
                                            <!-- Button border glow -->
                                            <div class="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover/btn:opacity-100 blur transition-opacity duration-500"></div>
                                            
                                            <!-- Button background -->
                                            <div class="relative px-6 py-3 rounded-xl border border-gray-600/50 bg-gray-800/50 hover:border-indigo-500/70 hover:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center gap-2 text-gray-300 hover:text-white font-bold transition-all duration-300 group-hover/btn:scale-105">
                                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                </svg>
                                                View Code
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
    projects: {
        type: Array,
        required: true
    }
});

const cardRefs = ref([]);

onMounted(() => {
    console.log('Projects data:', props.projects);
});

const getTechnologies = (project) => {
    if (project.technologies) {
        if (Array.isArray(project.technologies)) {
            return project.technologies;
        }
        if (typeof project.technologies === 'string') {
            return project.technologies.split(',').map(tech => tech.trim());
        }
    }
    return [];
};

const getParticleStyle = (index) => {
    return {
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 10 + 10}s`,
    };
};

const handleMouseEnter = (event, index) => {
    const card = event.currentTarget;
    card.style.transition = 'transform 0.1s ease-out';
};

const handleMouseMove = (event, index) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top();
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    
    // Update CSS variable for radial gradient
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
};

const handleMouseLeave = (index) => {
    const card = document.querySelectorAll('.project-card-3d')[index];
    if (card) {
        card.style.transition = 'transform 0.5s ease-out';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }
};
</script>

<style scoped>
/* Blob animation for background */
@keyframes blob {
    0%, 100% {
        transform: translate(0, 0) scale(1);
    }
    33% {
        transform: translate(30px, -50px) scale(1.1);
    }
    66% {
        transform: translate(-20px, 20px) scale(0.9);
    }
}

.animate-blob {
    animation: blob 7s ease-in-out infinite;
}

.animation-delay-2000 {
    animation-delay: 2s;
}

.animation-delay-4000 {
    animation-delay: 4s;
}

/* Floating particles */
@keyframes float-particle {
    0% {
        transform: translateY(100vh) translateX(0) scale(0);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateY(-100vh) translateX(100px) scale(1);
        opacity: 0;
    }
}

.animate-float-particle {
    animation: float-particle linear infinite;
}

/* Header animations */
@keyframes slide-down {
    from {
        opacity: 0;
        transform: translateY(-50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-slide-down {
    animation: slide-down 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes glow-pulse {
    0%, 100% {
        opacity: 0.5;
        transform: scale(1);
    }
    50% {
        opacity: 0.8;
        transform: scale(1.05);
    }
}

.animate-glow-pulse {
    animation: glow-pulse 2s ease-in-out infinite;
}

@keyframes shimmer-text {
    0% {
        background-position: -200% center;
    }
    100% {
        background-position: 200% center;
    }
}

.animate-shimmer-text {
    background-size: 200% auto;
    animation: shimmer-text 3s linear infinite;
}

/* Project card animations */
.project-wrapper {
    animation: float-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes float-in {
    0% {
        opacity: 0;
        transform: translateY(60px) scale(0.9);
    }
    100% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.project-card-3d {
    transform-style: preserve-3d;
    transition: transform 0.1s ease-out;
}

/* Rotating gradient border */
@keyframes rotate-gradient {
    0% {
        transform: rotate(0deg) scale(1);
    }
    50% {
        transform: rotate(180deg) scale(1.1);
    }
    100% {
        transform: rotate(360deg) scale(1);
    }
}

.animate-rotate-gradient {
    animation: rotate-gradient 8s linear infinite;
}

/* Shimmer slide effect */
@keyframes shimmer-slide {
    0% {
        transform: translateX(-100%) skewX(-12deg);
    }
    100% {
        transform: translateX(200%) skewX(-12deg);
    }
}

.animate-shimmer-slide {
    animation: shimmer-slide 3s ease-in-out infinite;
}

/* Border flow animation */
@keyframes border-flow {
    0%, 100% {
        border-color: rgba(139, 92, 246, 0.5);
        box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
    }
    50% {
        border-color: rgba(236, 72, 153, 0.5);
        box-shadow: 0 0 30px rgba(236, 72, 153, 0.5);
    }
}

.animate-border-flow {
    animation: border-flow 2s ease-in-out infinite;
}

/* Pulse scale for star */
@keyframes pulse-scale {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.2);
    }
}

.animate-pulse-scale {
    animation: pulse-scale 2s ease-in-out infinite;
}

/* Tech badge float */
.tech-badge-float {
    animation: badge-float 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;
}

@keyframes badge-float {
    0% {
        opacity: 0;
        transform: translateY(20px) scale(0.8) rotate(-5deg);
    }
    60% {
        transform: translateY(-5px) scale(1.05) rotate(2deg);
    }
    100% {
        opacity: 1;
        transform: translateY(0) scale(1) rotate(0deg);
    }
}

/* Smooth transforms */
.transform-gpu {
    transform: translateZ(0);
    will-change: transform;
    backface-visibility: hidden;
}

/* Group class for hover effects */
.group {
    position: relative;
}

.group:hover .group-hover\:opacity-100 {
    opacity: 1;
}

.group:hover .group-hover\:opacity-75 {
    opacity: 0.75;
}

.group:hover .group-hover\:scale-110 {
    transform: scale(1.1);
}

.group:hover .group-hover\:rotate-2 {
    transform: rotate(2deg);
}

.group:hover .group-hover\:text-transparent {
    color: transparent;
}

.group:hover .group-hover\:bg-gradient-to-r {
    background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

.group:hover .group-hover\:from-indigo-400 {
    --tw-gradient-from: #818cf8;
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgb(129 140 248 / 0));
}

.group:hover .group-hover\:via-purple-400 {
    --tw-gradient-stops: var(--tw-gradient-from), #c084fc, var(--tw-gradient-to, rgb(192 132 252 / 0));
}

.group:hover .group-hover\:to-pink-400 {
    --tw-gradient-to: #f472b6;
}

.group:hover .group-hover\:bg-clip-text {
    -webkit-background-clip: text;
    background-clip: text;
}

.group:hover .group-hover\:text-gray-300 {
    color: rgb(209 213 219);
}
</style>

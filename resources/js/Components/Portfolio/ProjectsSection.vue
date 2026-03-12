<template>
    <section id="projects" class="relative py-32 min-h-screen overflow-hidden bg-gradient-to-b from-gray-950 via-black to-gray-950">
        <!-- Enhanced animated background -->
        <div class="absolute inset-0">
            <!-- Mesh gradient overlay -->
            <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),transparent_50%),radial-gradient(ellipse_at_center,rgba(147,51,234,0.15),transparent_50%)]"></div>
            
            <!-- Dynamic gradient orbs -->
            <div class="absolute inset-0 opacity-40">
                <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/40 to-purple-600/40 rounded-full blur-[120px] animate-float-slow"></div>
                <div class="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/30 to-pink-600/30 rounded-full blur-[120px] animate-float-slow animation-delay-3000"></div>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-[100px] animate-pulse-slow"></div>
            </div>
            
            <!-- Grid pattern -->
            <div class="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
        </div>
        
        <!-- Floating particles with varied sizes -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div v-for="i in 20" :key="i" 
                 class="absolute rounded-full animate-float-particle"
                 :class="i % 3 === 0 ? 'w-2 h-2 bg-indigo-400/60' : i % 3 === 1 ? 'w-1.5 h-1.5 bg-purple-400/50' : 'w-1 h-1 bg-pink-400/40'"
                 :style="getParticleStyle(i)"></div>
        </div>
        
        <div class="container mx-auto px-6 lg:px-8 relative z-10">
            <!-- Beautiful minimalist header -->
            <div class="text-center mb-16">
                <div class="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 backdrop-blur-sm">
                    <span class="relative flex h-2 w-2">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    <span class="text-sm font-semibold tracking-wide text-indigo-300 uppercase">Featured Work</span>
                </div>
                
                <h2 class="text-5xl md:text-7xl font-black mb-6 relative">
                    <span class="absolute inset-0 blur-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30"></span>
                    <span class="relative bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight block">
                        Crafted With
                    </span>
                    <span class="relative bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight block mt-2">
                        Passion & Code
                    </span>
                </h2>
                
                <p class="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                    Click on any project to explore details
                </p>
            </div>
            
            <!-- Circular Rotating Carousel -->
            <div class="relative max-w-6xl mx-auto">
                <!-- Center Circle Container -->
                <div class="relative w-full aspect-square max-w-[800px] mx-auto">
                    
                    <!-- Rotating Circle -->
                    <div class="absolute inset-0 flex items-center justify-center"
                         :style="{ transform: `rotate(${rotation}deg)`, transition: isPaused ? 'transform 0.5s ease-out' : 'none' }">
                        
                        <!-- Project Items -->
                        <div v-for="(project, index) in projects" 
                             :key="project.id"
                             class="absolute w-40 h-40 md:w-48 md:h-48 cursor-pointer z-10"
                             :style="getProjectPosition(index)"
                             @click.stop="selectProject(project, index)">
                            
                            <!-- Project Circle -->
                            <div class="relative w-full h-full group"
                                 :class="{ 'selected-project': selectedProject?.id === project.id }">
                                
                                <!-- Rotating border -->
                                <svg class="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                     :class="{ '!opacity-100': selectedProject?.id === project.id }">
                                    <circle cx="50%" cy="50%" :r="radiusPercent" 
                                            fill="none" 
                                            stroke="url(#gradient)" 
                                            stroke-width="2"
                                            stroke-dasharray="10 5" />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" style="stop-color:rgb(99,102,241);stop-opacity:1" />
                                            <stop offset="50%" style="stop-color:rgb(168,85,247);stop-opacity:1" />
                                            <stop offset="100%" style="stop-color:rgb(236,72,153);stop-opacity:1" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                
                                <!-- Glow effect -->
                                <div class="absolute -inset-2 bg-gradient-to-br from-indigo-500/50 via-purple-500/50 to-pink-500/50 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"
                                     :class="{ '!opacity-100 !blur-2xl': selectedProject?.id === project.id }"></div>
                                
                                <!-- Project Image Circle -->
                                <div class="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 border-4 border-white/10 shadow-2xl transform-gpu transition-all duration-500 group-hover:scale-110 group-hover:border-purple-400/50"
                                     :class="{ '!scale-125 !border-purple-400': selectedProject?.id === project.id }">
                                    
                                    <!-- Featured badge -->
                                    <div v-if="project.featured" class="absolute top-2 right-2 z-20">
                                        <div class="relative">
                                            <div class="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full blur-md opacity-75 animate-pulse-glow"></div>
                                            <div class="relative w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                                                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <img v-if="project.image" 
                                         :src="project.image" 
                                         :alt="project.title"
                                         class="w-full h-full object-contain p-6 transform-gpu"
                                         :style="{ transform: `rotate(${-rotation}deg)` }"
                                         loading="lazy" />
                                    
                                    <!-- Hover overlay -->
                                    <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4"
                                         :style="{ transform: `rotate(${-rotation}deg)` }">
                                        <span class="text-white font-bold text-sm text-center px-2">{{ project.title }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Center Logo/Info -->
                    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div class="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 border-2 border-white/10 shadow-2xl flex items-center justify-center backdrop-blur-xl">
                            <div class="text-center">
                                <div class="text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    {{ projects.length }}
                                </div>
                                <div class="text-xs md:text-sm text-gray-400 font-semibold uppercase tracking-wider">
                                    Projects
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Control Buttons -->
                <div class="flex justify-center gap-4 mt-12">
                    <button @click="toggleRotation" 
                            class="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg">
                        <svg v-if="!isPaused" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M5 4a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1zm8 0a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1z"/>
                        </svg>
                        <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                        </svg>
                        {{ isPaused ? 'Resume Rotation' : 'Pause Rotation' }}
                    </button>
                </div>
            </div>
            
            <!-- Selected Project Details -->
            <Transition name="detail-fade">
                <div v-if="selectedProject" 
                     class="max-w-5xl mx-auto mt-20 relative z-50"
                     @click.stop>
                    
                    <!-- Close button -->
                    <button @click="closeProject"
                            class="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-red-600/90 hover:bg-red-500 border-2 border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 z-30 shadow-2xl">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                    
                    <div class="relative bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-gray-950/95 rounded-3xl border-2 border-purple-500/30 overflow-hidden backdrop-blur-xl p-8 md:p-12 shadow-2xl">
                        <!-- Animated background -->
                        <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10"></div>
                        
                        <!-- Glow effect -->
                        <div class="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-20 blur-2xl"></div>
                        
                        <div class="relative">
                            <!-- Project Image Preview -->
                            <div class="mb-8 rounded-2xl overflow-hidden bg-gradient-to-br from-white to-gray-100 p-8 shadow-xl">
                                <img v-if="selectedProject.image" 
                                     :src="selectedProject.image" 
                                     :alt="selectedProject.title"
                                     class="w-full max-w-md mx-auto object-contain"
                                     loading="lazy" />
                            </div>
                            
                            <!-- Title -->
                            <h3 class="text-4xl md:text-6xl font-black text-white mb-6 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                                {{ selectedProject.title }}
                            </h3>
                            
                            <!-- Featured Badge -->
                            <div v-if="selectedProject.featured" class="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30">
                                <svg class="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                <span class="text-sm font-bold text-amber-300 uppercase tracking-wide">Featured Project</span>
                            </div>
                            
                            <!-- Description -->
                            <p class="text-gray-300 text-lg md:text-xl leading-relaxed mb-10">
                                {{ selectedProject.description }}
                            </p>
                            
                            <!-- Tech stack -->
                            <div class="mb-10">
                                <h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-5 flex items-center gap-2">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                                    </svg>
                                    Technologies Used
                                </h4>
                                <div class="flex flex-wrap gap-3">
                                    <span v-for="(tech, techIndex) in getTechnologies(selectedProject)" 
                                          :key="techIndex"
                                          class="relative group/tech inline-flex items-center px-5 py-2.5 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/40 backdrop-blur-sm hover:border-indigo-400/60 hover:from-indigo-500/30 hover:to-purple-500/30 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                                        <span class="text-base font-semibold text-indigo-200 group-hover/tech:text-indigo-100">{{ tech }}</span>
                                    </span>
                                </div>
                            </div>
                            
                            <!-- Action buttons -->
                            <div class="flex flex-col sm:flex-row gap-4">
                                <a v-if="selectedProject.live_url" 
                                   :href="selectedProject.live_url" 
                                   target="_blank"
                                   class="flex-1 group/btn relative overflow-hidden rounded-xl">
                                    <div class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                                    <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                                    
                                    <div class="relative px-8 py-4 flex items-center justify-center gap-3 text-white font-bold text-lg transition-transform duration-300 group-hover/btn:scale-105">
                                        <svg class="w-6 h-6 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                                        </svg>
                                        <span>View Live Demo</span>
                                    </div>
                                </a>
                                
                                <a v-if="selectedProject.github_url" 
                                   :href="selectedProject.github_url" 
                                   target="_blank"
                                   class="flex-1 group/btn relative overflow-hidden rounded-xl">
                                    <div class="absolute -inset-px bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover/btn:opacity-100 blur-sm transition-opacity duration-500"></div>
                                    
                                    <div class="relative px-8 py-4 rounded-xl bg-gray-900/80 border-2 border-white/20 hover:border-indigo-400/50 backdrop-blur-sm flex items-center justify-center gap-3 text-gray-300 hover:text-white font-bold text-lg transition-all duration-300 group-hover/btn:scale-105">
                                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                        <span>View Source Code</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue';

const props = defineProps({
    projects: {
        type: Array,
        required: true
    }
});

const rotation = ref(0);
const isPaused = ref(false);
const selectedProject = ref(null);
const radiusPercent = computed(() => '48%');
let animationFrame = null;
let lastTimestamp = 0;

onMounted(() => {
    console.log('Projects data:', props.projects);
    startRotation();
});

onUnmounted(() => {
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
    }
});

const startRotation = () => {
    const animate = (timestamp) => {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const delta = timestamp - lastTimestamp;
        lastTimestamp = timestamp;
        
        if (!isPaused.value) {
            // Rotate smoothly based on time elapsed
            rotation.value += (delta / 1000) * 20; // 20 degrees per second
            if (rotation.value >= 360) {
                rotation.value -= 360;
            }
        }
        animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
};

const getProjectPosition = (index) => {
    const total = props.projects.length;
    const angle = (360 / total) * index;
    const radius = 45; // percentage
    
    // Calculate position
    const x = 50 + radius * Math.cos((angle - 90) * Math.PI / 180);
    const y = 50 + radius * Math.sin((angle - 90) * Math.PI / 180);
    
    return {
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) rotate(${-rotation.value}deg)`,
        transition: 'transform 0.1s linear'
    };
};

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

const selectProject = (project, index) => {
    console.log('Project selected:', project);
    selectedProject.value = project;
    isPaused.value = true;
    
    // Scroll to details smoothly
    setTimeout(() => {
        const detailsElement = document.querySelector('.detail-fade-enter-active, .detail-fade-enter-to');
        if (detailsElement) {
            detailsElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 100);
};

const closeProject = () => {
    selectedProject.value = null;
    // Auto resume rotation when closing
    setTimeout(() => {
        isPaused.value = false;
    }, 300);
};

const toggleRotation = () => {
    isPaused.value = !isPaused.value;
    if (!isPaused.value) {
        selectedProject.value = null;
    }
};

const pauseRotation = () => {
    isPaused.value = true;
};

const resumeRotation = () => {
    isPaused.value = false;
    selectedProject.value = null;
};
</script>

<style scoped>
/* Enhanced background animations */
@keyframes float-slow {
    0%, 100% {
        transform: translate(0, 0) scale(1);
    }
    33% {
        transform: translate(50px, -30px) scale(1.05);
    }
    66% {
        transform: translate(-30px, 40px) scale(0.95);
    }
}

.animate-float-slow {
    animation: float-slow 20s ease-in-out infinite;
}

.animation-delay-3000 {
    animation-delay: 3s;
}

@keyframes pulse-slow {
    0%, 100% {
        opacity: 0.2;
        transform: scale(1);
    }
    50% {
        opacity: 0.3;
        transform: scale(1.1);
    }
}

.animate-pulse-slow {
    animation: pulse-slow 8s ease-in-out infinite;
}

/* Floating particles */
@keyframes float-particle {
    0% {
        transform: translateY(100vh) translateX(0) rotate(0deg);
        opacity: 0;
    }
    10% {
        opacity: 0.8;
    }
    90% {
        opacity: 0.8;
    }
    100% {
        transform: translateY(-10vh) translateX(50px) rotate(180deg);
        opacity: 0;
    }
}

.animate-float-particle {
    animation: float-particle linear infinite;
}

/* Slow spin for border */
@keyframes spin-slow {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.animate-spin-slow {
    animation: spin-slow 4s linear infinite;
}

/* Pulse glow for featured badge */
@keyframes pulse-glow {
    0%, 100% {
        opacity: 0.6;
        transform: scale(1);
    }
    50% {
        opacity: 1;
        transform: scale(1.05);
    }
}

.animate-pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
}

/* Selected project styling */
.selected-project {
    z-index: 10;
}

/* Pause rotation */
.pause-rotation {
    animation-play-state: paused;
}

/* Detail fade transition */
.detail-fade-enter-active,
.detail-fade-leave-active {
    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.detail-fade-enter-from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
}

.detail-fade-leave-to {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
}

/* GPU acceleration */
.transform-gpu {
    transform: translateZ(0);
    will-change: transform;
    backface-visibility: hidden;
}

/* Responsive improvements */
@media (max-width: 768px) {
    .project-card {
        transform: none !important;
    }
}
</style>

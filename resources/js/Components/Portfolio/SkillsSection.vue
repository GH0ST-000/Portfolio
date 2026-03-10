<template>
    <section id="skills" class="py-32 relative">
        <!-- Animated particles background -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="skill-particle" v-for="i in 20" :key="i" :style="getParticleStyle(i)"></div>
        </div>
        
        <div class="container mx-auto px-6 relative z-10">
            <div class="text-center mb-20">
                <div class="inline-block mb-4">
                    <span class="text-sm font-semibold tracking-wider text-purple-400 uppercase">Expertise</span>
                </div>
                <h2 class="text-5xl md:text-7xl font-black mb-6 relative inline-block">
                    <span class="absolute inset-0 blur-2xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-30"></span>
                    <span class="relative bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Skills & Technologies
                    </span>
                </h2>
                <p class="text-xl text-gray-400 max-w-2xl mx-auto">
                    Mastering the tools that power tomorrow
                </p>
            </div>
            
            <div class="max-w-7xl mx-auto space-y-16">
                <div v-for="(categorySkills, category) in skills" :key="category" class="skill-category">
                    <div class="flex items-center gap-4 mb-8">
                        <div class="relative">
                            <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-xl opacity-50"></div>
                            <div class="relative w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                </svg>
                            </div>
                        </div>
                        <h3 class="text-3xl font-black capitalize bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            {{ category }}
                        </h3>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div v-for="(skill, index) in categorySkills" 
                             :key="skill.id" 
                             class="skill-item group"
                             :style="{ animationDelay: `${index * 0.1}s` }">
                            <div class="relative h-full p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-gray-700/50 group-hover:border-indigo-500/50 transition-all duration-500 overflow-hidden">
                                <!-- Animated background glow -->
                                <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500"></div>
                                
                                <!-- Holographic scan line -->
                                <div class="absolute inset-0 opacity-0 group-hover:opacity-100">
                                    <div class="absolute w-full h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-scan-horizontal"></div>
                                </div>
                                
                                <div class="relative space-y-4">
                                    <div class="flex items-center justify-between">
                                        <h4 class="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                                            {{ skill.name }}
                                        </h4>
                                        <div class="relative">
                                            <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur-lg opacity-0 group-hover:opacity-75 transition-opacity"></div>
                                            <div class="relative px-3 py-1 rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30">
                                                <span class="font-black text-lg bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                                    {{ skill.proficiency }}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Futuristic progress bar -->
                                    <div class="relative h-3 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-gray-700/50">
                                        <!-- Background grid -->
                                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/20 to-transparent bg-[length:20px_100%] animate-progress-grid"></div>
                                        
                                        <!-- Progress fill -->
                                        <div class="relative h-full rounded-full overflow-hidden transition-all duration-1000 ease-out"
                                             :style="{ width: inView ? skill.proficiency + '%' : '0%' }">
                                            <!-- Gradient fill -->
                                            <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                                            
                                            <!-- Shimmer effect -->
                                            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                                            
                                            <!-- Glow effect -->
                                            <div class="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 blur-md opacity-50"></div>
                                        </div>
                                        
                                        <!-- Progress indicator -->
                                        <div class="absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ease-out"
                                             :style="{ left: inView ? skill.proficiency + '%' : '0%' }">
                                            <div class="relative w-1 h-6 -translate-x-1/2">
                                                <div class="absolute inset-0 bg-gradient-to-b from-indigo-400 to-purple-400 rounded-full blur-sm"></div>
                                                <div class="absolute inset-0 bg-white rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Particle effects on hover -->
                                    <div class="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div class="skill-glow" v-for="j in 5" :key="j" :style="getGlowStyle(j)"></div>
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
import { ref, onMounted } from 'vue';

defineProps({
    skills: {
        type: Object,
        required: true
    }
});

const inView = ref(false);

onMounted(() => {
    setTimeout(() => {
        inView.value = true;
    }, 300);
});

const getParticleStyle = (index) => {
    const size = Math.random() * 4 + 2;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    return {
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
    };
};

const getGlowStyle = (index) => {
    const size = Math.random() * 6 + 3;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const duration = Math.random() * 2 + 1;
    const delay = Math.random() * 0.5;
    
    return {
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        top: `${top}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
    };
};
</script>

<style scoped>
.skill-particle {
    position: absolute;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.8), transparent);
    border-radius: 50%;
    animation: floatParticle linear infinite;
}

@keyframes floatParticle {
    0%, 100% {
        transform: translate(0, 0);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translate(calc(100vw - 100%), calc(100vh - 100%));
        opacity: 0;
    }
}

.skill-category {
    animation: fadeInScale 0.8s ease-out both;
}

@keyframes fadeInScale {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.skill-item {
    animation: slideInRight 0.6s ease-out both;
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes shimmer {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(100%);
    }
}

.animate-shimmer {
    animation: shimmer 3s ease-in-out infinite;
}

@keyframes progress-grid {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: 20px 0;
    }
}

.animate-progress-grid {
    animation: progress-grid 1s linear infinite;
}

@keyframes scan-horizontal {
    0% {
        top: 0%;
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        top: 100%;
        opacity: 0;
    }
}

.animate-scan-horizontal {
    animation: scan-horizontal 2s ease-in-out infinite;
}

.skill-glow {
    position: absolute;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.8), transparent);
    border-radius: 50%;
    animation: glowFloat 2s ease-in-out infinite;
}

@keyframes glowFloat {
    0%, 100% {
        transform: translateY(0) scale(1);
        opacity: 0;
    }
    50% {
        transform: translateY(-20px) scale(1.5);
        opacity: 1;
    }
}
</style>

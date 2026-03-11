<template>
    <section id="skills" class="py-20 relative overflow-hidden">
        <!-- Animated gradient background -->
        <div class="absolute inset-0 bg-gradient-to-b from-gray-950 via-purple-950/10 to-gray-950"></div>
        
        <!-- Floating particles -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="particle" v-for="i in 30" :key="i" :style="getParticleStyle(i)"></div>
        </div>
        
        <div class="container mx-auto px-6 relative z-10">
            <div class="text-center mb-16">
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
            
            <!-- Skills Grid -->
            <div class="max-w-6xl mx-auto space-y-12">
                <div v-for="(categorySkills, category) in skills" :key="category">
                    <!-- Category Header -->
                    <div class="flex items-center justify-center gap-3 mb-8">
                        <div class="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/50 to-purple-500/50"></div>
                        <div class="flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/40 backdrop-blur-sm">
                            <div class="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                </svg>
                            </div>
                            <h3 class="text-xl font-black capitalize bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                                {{ category }}
                            </h3>
                        </div>
                        <div class="h-px flex-1 bg-gradient-to-l from-transparent via-purple-500/50 to-purple-500/50"></div>
                    </div>
                    
                    <!-- Hexagonal Grid -->
                    <div class="hexagon-grid">
                        <div v-for="(skill, index) in categorySkills" 
                             :key="skill.id"
                             class="hexagon-wrapper"
                             :style="{ animationDelay: `${index * 0.05}s` }">
                            <div class="hexagon-container group"
                                 @mouseenter="hoveredSkill = skill.id"
                                 @mouseleave="hoveredSkill = null">
                                <!-- Hexagon shape -->
                                <div class="hexagon" :class="{ 'hovered': hoveredSkill === skill.id }">
                                    <!-- Background glow -->
                                    <div class="hexagon-glow" :style="{ background: getSkillColor(skill.proficiency) }"></div>
                                    
                                    <!-- Content -->
                                    <div class="hexagon-content">
                                        <!-- Skill name -->
                                        <div class="skill-name">{{ skill.name }}</div>
                                        
                                        <!-- Proficiency percentage -->
                                        <div class="skill-percentage" :style="{ color: getSkillTextColor(skill.proficiency) }">
                                            {{ skill.proficiency }}%
                                        </div>
                                        
                                        <!-- Circular progress -->
                                        <svg class="progress-circle" viewBox="0 0 120 120">
                                            <circle class="progress-bg" cx="60" cy="60" r="54"/>
                                            <circle class="progress-fill" 
                                                    cx="60" cy="60" r="54"
                                                    :style="{ 
                                                        strokeDashoffset: inView ? 339.292 - (339.292 * skill.proficiency / 100) : 339.292,
                                                        stroke: getSkillTextColor(skill.proficiency)
                                                    }"/>
                                        </svg>
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
const hoveredSkill = ref(null);

onMounted(() => {
    setTimeout(() => {
        inView.value = true;
    }, 300);
});

const getParticleStyle = (index) => {
    const size = Math.random() * 3 + 1;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 2;
    
    return {
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
    };
};

const getSkillColor = (proficiency) => {
    if (proficiency >= 90) return 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)';
    if (proficiency >= 80) return 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)';
    if (proficiency >= 70) return 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)';
    return 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)';
};

const getSkillTextColor = (proficiency) => {
    if (proficiency >= 90) return '#06b6d4';
    if (proficiency >= 80) return '#8b5cf6';
    if (proficiency >= 70) return '#ec4899';
    return '#f59e0b';
};
</script>

<style scoped>
/* Particle animation */
.particle {
    position: absolute;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.6), transparent);
    border-radius: 50%;
    animation: float linear infinite;
}

@keyframes float {
    0%, 100% {
        transform: translateY(0) scale(1);
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        transform: translateY(-100vh) scale(1.5);
        opacity: 0;
    }
}

/* Hexagonal Grid Layout */
.hexagon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1.5rem;
    justify-items: center;
    max-width: 1000px;
    margin: 0 auto;
}

.hexagon-wrapper {
    animation: fadeInUp 0.6s ease-out both;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.hexagon-container {
    width: 140px;
    height: 140px;
    position: relative;
    cursor: pointer;
}

/* Hexagon Shape using clip-path */
.hexagon {
    width: 100%;
    height: 100%;
    position: relative;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    background: linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(31, 41, 55, 0.8) 100%);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(139, 92, 246, 0.2);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.hexagon:hover,
.hexagon.hovered {
    transform: scale(1.1) translateY(-5px);
    border-color: rgba(139, 92, 246, 0.6);
    box-shadow: 0 10px 40px rgba(139, 92, 246, 0.4);
}

/* Hexagon glow effect */
.hexagon-glow {
    position: absolute;
    inset: -10px;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    opacity: 0;
    filter: blur(20px);
    transition: opacity 0.4s ease;
    z-index: -1;
}

.hexagon:hover .hexagon-glow,
.hexagon.hovered .hexagon-glow {
    opacity: 0.6;
}

/* Hexagon content */
.hexagon-content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    z-index: 1;
}

.skill-name {
    font-size: 0.875rem;
    font-weight: 700;
    color: white;
    text-align: center;
    margin-bottom: 0.5rem;
    line-height: 1.2;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.skill-percentage {
    font-size: 1.5rem;
    font-weight: 900;
    margin-top: 0.25rem;
    text-shadow: 0 0 20px currentColor;
}

/* Circular progress indicator */
.progress-circle {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
    pointer-events: none;
}

.progress-bg {
    fill: none;
    stroke: rgba(255, 255, 255, 0.05);
    stroke-width: 2;
}

.progress-fill {
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-dasharray: 339.292;
    transition: stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1);
    filter: drop-shadow(0 0 6px currentColor);
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .hexagon-grid {
        grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
        gap: 1rem;
    }
    
    .hexagon-container {
        width: 110px;
        height: 110px;
    }
    
    .skill-name {
        font-size: 0.75rem;
    }
    
    .skill-percentage {
        font-size: 1.25rem;
    }
}

@media (min-width: 769px) and (max-width: 1024px) {
    .hexagon-grid {
        grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    }
    
    .hexagon-container {
        width: 130px;
        height: 130px;
    }
}

/* Animation for section entrance */
section {
    animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>

<template>
    <div class="relative min-h-screen bg-black overflow-hidden">
        <!-- 3D Canvas -->
        <canvas ref="threeCanvas" class="fixed inset-0 w-full h-full"></canvas>
        
        <!-- Welcome Intro Screen -->
        <transition name="fade">
            <div v-if="showWelcome" class="fixed inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-xl">
                <div class="text-center space-y-8 animate-fade-in">
                    <!-- Greeting -->
                    <h1 class="text-7xl md:text-9xl font-black mb-6">
                        <span class="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
                            {{ welcomeMessage }}
                        </span>
                    </h1>
                    
                    <!-- Subtext -->
                    <p class="text-2xl md:text-3xl text-gray-300 mb-6 animate-slide-up">
                        {{ welcomeSubtext }}
                    </p>
                    
                    <!-- Instructions -->
                    <p class="text-lg text-gray-400 mb-12 animate-slide-up" style="animation-delay: 0.4s;">
                        {{ welcomeInstructions }}
                    </p>
                    
                    <!-- Start Button -->
                    <button @click="startJourney" 
                            class="group relative px-12 py-6 text-2xl font-bold text-white overflow-hidden rounded-2xl animate-pulse-slow">
                        <div class="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600"></div>
                        <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div class="relative flex items-center gap-3">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            Begin Journey
                        </div>
                    </button>
                </div>
            </div>
        </transition>
        
        <!-- Journey Progress HUD -->
        <transition name="slide-down">
            <div v-if="!showWelcome && isJourneyActive" class="fixed top-6 left-1/2 transform -translate-x-1/2 z-40">
                <div class="glass-hud px-8 py-4 rounded-2xl">
                    <div class="flex items-center gap-6">
                        <!-- Current Step -->
                        <div class="text-center">
                            <p class="text-gray-400 text-sm mb-1">Journey Progress</p>
                            <p class="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                {{ currentExperienceIndex + 1 }} / {{ experiences.length }}
                            </p>
                        </div>
                        
                        <!-- Progress Bar -->
                        <div class="w-64 h-3 bg-gray-700 rounded-full overflow-hidden">
                            <div class="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000"
                                 :style="{ width: `${((currentExperienceIndex + 1) / experiences.length) * 100}%` }"></div>
                        </div>
                        
                        <!-- Size Indicator -->
                        <div class="text-center">
                            <p class="text-gray-400 text-sm mb-1">Character Growth</p>
                            <p class="text-lg font-bold text-purple-400">
                                {{ Math.round(characterSize * 100) }}%
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        
        <!-- Music Status Indicator (Top) -->
        <div v-if="!showWelcome" class="fixed top-6 right-6 z-40">
            <div class="glass-hud px-4 py-3 rounded-full flex items-center gap-2">
                <div v-if="isMusicPlaying" class="flex gap-1">
                    <div class="w-1 h-4 bg-cyan-400 rounded-full animate-music-bar" style="animation-delay: 0ms"></div>
                    <div class="w-1 h-4 bg-cyan-400 rounded-full animate-music-bar" style="animation-delay: 150ms"></div>
                    <div class="w-1 h-4 bg-cyan-400 rounded-full animate-music-bar" style="animation-delay: 300ms"></div>
                </div>
                <div v-else class="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span class="text-white text-sm font-semibold">
                    {{ isMusicPlaying ? 'Playing' : 'Paused' }}
                </span>
            </div>
        </div>
        
        <!-- Experience Detail Modal (Auto-showing) -->
        <transition name="modal">
            <div v-if="showExperienceDetail && currentExperience" 
                 class="fixed inset-0 flex items-center justify-center z-50 p-6 pointer-events-auto"
                 style="background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(10px);">
                <div class="max-w-4xl w-full bg-gradient-to-br from-gray-900/98 to-gray-800/98 backdrop-blur-2xl rounded-3xl border border-cyan-500/50 overflow-hidden shadow-2xl shadow-cyan-500/30 animate-scale-in">
                    <!-- Header -->
                    <div class="relative p-8 bg-gradient-to-br from-cyan-600/30 via-blue-600/30 to-indigo-600/30">
                        <div class="flex items-start gap-6">
                            <div v-if="currentExperience.company_logo" class="w-20 h-20 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 p-2">
                                <img :src="currentExperience.company_logo" :alt="currentExperience.company" class="w-full h-full object-contain" />
                            </div>
                            <div v-else class="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                            </div>
                            <div class="flex-1">
                                <h2 class="text-5xl font-black mb-3 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                    {{ currentExperience.company }}
                                </h2>
                                <p class="text-3xl text-white font-semibold mb-3">{{ currentExperience.position }}</p>
                                <div class="flex items-center gap-4 text-gray-400 text-lg">
                                    <span class="flex items-center gap-2">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                        </svg>
                                        {{ formatPeriod(currentExperience) }}
                                    </span>
                                    <span v-if="currentExperience.location" class="flex items-center gap-2">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        </svg>
                                        {{ currentExperience.location }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Content -->
                    <div class="p-8 max-h-96 overflow-y-auto custom-scrollbar">
                        <div class="text-gray-300 text-xl leading-relaxed mb-6 description-content" v-html="currentExperience.description"></div>
                        
                        <!-- Achievements -->
                        <div v-if="currentExperience.achievements" class="mb-6">
                            <h3 class="text-white font-bold text-xl mb-4 flex items-center gap-2">
                                <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                Key Achievements & Technologies
                            </h3>
                            <div class="text-gray-300 text-lg leading-relaxed achievements-content" v-html="currentExperience.achievements"></div>
                        </div>
                    </div>
                    
                    <!-- Auto-progress indicator -->
                    <div class="px-8 pb-6">
                        <div class="flex items-center justify-center gap-3 text-gray-400">
                            <div class="animate-spin">
                                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                            <span class="text-sm">Moving to next experience soon...</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCinematicJourney } from '@/Composables/useCinematicJourney';

const props = defineProps({
    experiences: Array,
    projects: Array,
});

const threeCanvas = ref(null);

const {
    showWelcome,
    welcomeMessage,
    welcomeSubtext,
    welcomeInstructions,
    startJourney,
    showExperienceDetail,
    showProjectDetail,
    currentExperience,
    currentProject,
    closeExperienceDetail,
    closeProjectDetail,
    isMusicPlaying,
    toggleMusic,
    currentExperienceIndex,
    currentProjectIndex,
    characterSize,
    isJourneyActive,
    journeyPhase,
} = useCinematicJourney(threeCanvas, props.experiences, props.projects);

const formatPeriod = (exp) => {
    const start = new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const end = exp.is_current ? 'Present' : new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    return `${start} - ${end}`;
};
</script>

<style scoped>
.glass-hud {
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(99, 102, 241, 0.3);
}

/* Animations */
@keyframes gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}

.animate-gradient {
    background-size: 200% 200%;
    animation: gradient 3s ease infinite;
}

@keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
}

.animate-fade-in {
    animation: fade-in 1s ease-out;
}

@keyframes slide-up {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-slide-up {
    animation: slide-up 0.8s ease-out 0.3s both;
}

@keyframes pulse-slow {
    0%, 100% {
        transform: scale(1);
        box-shadow: 0 0 40px rgba(6, 182, 212, 0.4);
    }
    50% {
        transform: scale(1.05);
        box-shadow: 0 0 60px rgba(6, 182, 212, 0.6);
    }
}

.animate-pulse-slow {
    animation: pulse-slow 2s ease-in-out infinite;
}

@keyframes music-bar {
    0%, 100% { height: 1rem; }
    50% { height: 2rem; }
}

.animate-music-bar {
    animation: music-bar 0.6s ease-in-out infinite;
}

@keyframes scale-in {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.animate-scale-in {
    animation: scale-in 0.4s ease-out;
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

.slide-down-enter-active, .slide-down-leave-active {
    transition: all 0.3s ease;
}

.slide-down-enter-from {
    opacity: 0;
    transform: translate(-50%, -20px);
}

.modal-enter-active, .modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
    opacity: 0;
}

/* Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
    width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #06b6d4, #3b82f6);
    border-radius: 10px;
}

/* Rich text styling */
.description-content :deep(p),
.achievements-content :deep(p) {
    margin: 0.75rem 0;
}

.description-content :deep(ul),
.achievements-content :deep(ul) {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin: 0.5rem 0;
}

.description-content :deep(li),
.achievements-content :deep(li) {
    margin: 0.5rem 0;
}

.description-content :deep(strong),
.achievements-content :deep(strong) {
    color: #60a5fa;
    font-weight: 600;
}
</style>

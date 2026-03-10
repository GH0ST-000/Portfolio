<template>
    <div class="relative min-h-screen bg-black overflow-hidden">
        <!-- 3D Canvas -->
        <canvas ref="threeCanvas" class="fixed inset-0 w-full h-full"></canvas>
        
        <!-- UI Overlay -->
        <div class="fixed inset-0 pointer-events-none">
            <!-- Top HUD -->
            <div class="absolute top-0 left-0 right-0 p-6 pointer-events-auto">
                <div class="flex items-center justify-between">
                    <!-- Logo -->
                    <div class="glass-hud px-6 py-3 rounded-2xl">
                        <h1 class="text-2xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            3D Portfolio
                        </h1>
                    </div>
                    
                    <!-- Exit to normal view -->
                    <a :href="route('home')" class="glass-hud px-6 py-3 rounded-2xl hover:bg-white/10 transition-all">
                        <span class="text-white font-semibold flex items-center gap-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                            Exit 3D Mode
                        </span>
                    </a>
                </div>
                
                <!-- Progress and Music Controls -->
                <div class="mt-4 flex items-center gap-4">
                    <!-- Progress Indicator -->
                    <div class="glass-hud px-6 py-3 rounded-2xl flex items-center gap-4">
                        <div class="flex items-center gap-2">
                            <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span class="text-white font-semibold">Progress:</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                {{ visitedStations }}
                            </span>
                            <span class="text-gray-400">/</span>
                            <span class="text-gray-400">{{ experiences.length }}</span>
                        </div>
                        <div class="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div class="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                                 :style="{ width: `${(visitedStations / experiences.length) * 100}%` }"></div>
                        </div>
                    </div>
                    
                    <!-- Character Size Indicator -->
                    <div class="glass-hud px-6 py-3 rounded-2xl flex items-center gap-3">
                        <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                        <div class="flex items-center gap-2">
                            <span class="text-white font-semibold">Size:</span>
                            <span class="text-purple-400 font-bold">{{ Math.round(characterSize * 100) }}%</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Controls Guide -->
            <div class="absolute bottom-6 left-6 glass-hud p-6 rounded-2xl max-w-sm pointer-events-auto">
                <h3 class="text-white font-bold mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
                    </svg>
                    Controls
                </h3>
                <div class="space-y-2 text-sm text-gray-300">
                    <div class="flex items-center gap-3">
                        <kbd class="px-3 py-1 bg-gray-800 rounded-lg border border-gray-700 text-white font-mono">W ↑</kbd>
                        <span>Move Forward</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <kbd class="px-3 py-1 bg-gray-800 rounded-lg border border-gray-700 text-white font-mono">S ↓</kbd>
                        <span>Move Backward</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <kbd class="px-3 py-1 bg-gray-800 rounded-lg border border-gray-700 text-white font-mono">A ←</kbd>
                        <span>Turn Left</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <kbd class="px-3 py-1 bg-gray-800 rounded-lg border border-gray-700 text-white font-mono">D →</kbd>
                        <span>Turn Right</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <kbd class="px-3 py-1 bg-gray-800 rounded-lg border border-gray-700 text-white font-mono">E</kbd>
                        <span>Interact</span>
                    </div>
                </div>
            </div>
            
            <!-- Proximity Indicator -->
            <div v-if="currentStation" class="absolute bottom-6 right-6 glass-hud p-6 rounded-2xl animate-pulse-glow pointer-events-auto">
                <div class="flex items-center gap-4">
                    <div class="relative">
                        <div class="absolute inset-0 rounded-full blur-xl opacity-75"
                             :class="currentStation.type === 'experience' ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'"></div>
                        <div class="relative w-12 h-12 rounded-full flex items-center justify-center"
                             :class="currentStation.type === 'experience' ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'">
                            <svg v-if="currentStation.type === 'project'" class="w-6 h-6 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/>
                            </svg>
                            <svg v-else class="w-6 h-6 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                        </div>
                    </div>
                    <div>
                        <p class="text-white font-bold">
                            {{ currentStation.type === 'project' ? currentStation.project?.title : currentStation.experience?.company }}
                        </p>
                        <p class="text-gray-400 text-sm">
                            {{ currentStation.type === 'project' ? 'Project' : currentStation.experience?.position }}
                        </p>
                        <p class="text-gray-500 text-xs mt-1">Press <kbd class="px-2 py-1 bg-gray-800 rounded text-white font-mono text-xs">E</kbd> to view</p>
                    </div>
                </div>
            </div>
            
            <!-- Project Count -->
            <div class="absolute top-24 right-6 glass-hud px-4 py-3 rounded-xl pointer-events-auto">
                <div class="flex items-center gap-2">
                    <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span class="text-white text-sm font-medium">{{ projects.length }} Projects</span>
                </div>
            </div>
        </div>
        
        <!-- Project Detail Modal -->
        <transition name="modal">
            <div v-if="showProjectDetail && currentProject" 
                 class="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-6 pointer-events-auto"
                 @click="closeProjectDetail">
                <div class="max-w-4xl w-full bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-2xl rounded-3xl border border-indigo-500/50 overflow-hidden shadow-2xl shadow-indigo-500/20 animate-scale-in"
                     @click.stop>
                    <!-- Header -->
                    <div class="relative h-64 overflow-hidden bg-gradient-to-br from-indigo-600/30 via-purple-600/30 to-pink-600/30">
                        <img v-if="currentProject.image" 
                             :src="currentProject.image" 
                             :alt="currentProject.title"
                             class="w-full h-full object-cover" />
                        <div v-else class="w-full h-full flex items-center justify-center">
                            <svg class="w-32 h-32 text-indigo-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                            </svg>
                        </div>
                        <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                        
                        <!-- Close button -->
                        <button @click="closeProjectDetail" 
                                class="absolute top-4 right-4 w-12 h-12 bg-black/50 hover:bg-black/70 backdrop-blur-xl rounded-full flex items-center justify-center transition-all group">
                            <svg class="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                        
                        <!-- Featured badge -->
                        <div v-if="currentProject.featured" class="absolute top-4 left-4">
                            <div class="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 backdrop-blur-sm">
                                <span class="text-sm font-semibold text-yellow-400 flex items-center gap-2">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                    Featured
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Content -->
                    <div class="p-8">
                        <h2 class="text-4xl font-black mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            {{ currentProject.title }}
                        </h2>
                        
                        <p class="text-gray-300 text-lg leading-relaxed mb-6">
                            {{ currentProject.description }}
                        </p>
                        
                        <!-- Technologies -->
                        <div class="mb-6">
                            <h3 class="text-white font-bold mb-3 flex items-center gap-2">
                                <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                                </svg>
                                Technologies
                            </h3>
                            <div class="flex flex-wrap gap-2">
                                <span v-for="tech in currentProject.technologies" :key="tech"
                                      class="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-300 font-medium">
                                    {{ tech }}
                                </span>
                            </div>
                        </div>
                        
                        <!-- Actions -->
                        <div class="flex gap-4">
                            <a v-if="currentProject.github_url" 
                               :href="currentProject.github_url" 
                               target="_blank"
                               class="flex-1 group relative px-6 py-3 rounded-xl overflow-hidden">
                                <div class="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300"></div>
                                <div class="relative flex items-center justify-center gap-2 text-white font-semibold">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                    View Code
                                </div>
                            </a>
                            <a v-if="currentProject.live_url" 
                               :href="currentProject.live_url" 
                               target="_blank"
                               class="flex-1 group relative px-6 py-3 rounded-xl overflow-hidden">
                                <div class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                                <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div class="relative flex items-center justify-center gap-2 text-white font-semibold">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                                    </svg>
                                    Live Demo
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        
        <!-- Experience Detail Modal -->
        <transition name="modal">
            <div v-if="showExperienceDetail && currentExperience" 
                 class="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-6 pointer-events-auto"
                 @click="closeExperienceDetail">
                <div class="max-w-4xl w-full bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-2xl rounded-3xl border border-cyan-500/50 overflow-hidden shadow-2xl shadow-cyan-500/20 animate-scale-in"
                     @click.stop>
                    <!-- Header -->
                    <div class="relative p-8 bg-gradient-to-br from-cyan-600/20 via-blue-600/20 to-indigo-600/20">
                        <!-- Close button -->
                        <button @click="closeExperienceDetail" 
                                class="absolute top-4 right-4 w-12 h-12 bg-black/50 hover:bg-black/70 backdrop-blur-xl rounded-full flex items-center justify-center transition-all group">
                            <svg class="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                        
                        <div class="flex items-start gap-6">
                            <div v-if="currentExperience.company_logo" class="w-16 h-16 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 p-2">
                                <img :src="currentExperience.company_logo" :alt="currentExperience.company" class="w-full h-full object-contain" />
                            </div>
                            <div v-else class="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                            </div>
                            <div class="flex-1">
                                <h2 class="text-4xl font-black mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                    {{ currentExperience.company }}
                                </h2>
                                <p class="text-2xl text-white font-semibold mb-2">{{ currentExperience.position }}</p>
                                <div class="flex items-center gap-4 text-gray-400">
                                    <span class="flex items-center gap-2">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                        </svg>
                                        {{ currentExperience.period }}
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
                    <div class="p-8">
                        <div class="text-gray-300 text-lg leading-relaxed mb-6 description-content" v-html="currentExperience.description"></div>
                        
                        <!-- Achievements -->
                        <div v-if="currentExperience.achievements" class="mb-6">
                            <h3 class="text-white font-bold mb-3 flex items-center gap-2">
                                <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                Key Achievements & Technologies
                            </h3>
                            <div class="text-gray-300 leading-relaxed achievements-content" v-html="currentExperience.achievements"></div>
                        </div>
                        
                        <!-- Technologies -->
                        <div v-if="currentExperience.technologies && currentExperience.technologies.length" class="mb-6">
                            <h3 class="text-white font-bold mb-3 flex items-center gap-2">
                                <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                                </svg>
                                Technologies
                            </h3>
                            <div class="flex flex-wrap gap-2">
                                <span v-for="tech in currentExperience.technologies" :key="tech"
                                      class="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-300 font-medium">
                                    {{ tech }}
                                </span>
                            </div>
                        </div>
                        
                        <!-- Link -->
                        <div v-if="currentExperience.company_url" class="flex gap-4">
                            <a :href="currentExperience.company_url" 
                               target="_blank"
                               class="flex-1 group relative px-6 py-3 rounded-xl overflow-hidden">
                                <div class="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600"></div>
                                <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div class="relative flex items-center justify-center gap-2 text-white font-semibold">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                                    </svg>
                                    Visit Company Website
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { use3DWalkableWorld } from '@/Composables/use3DWalkableWorld';

const props = defineProps({
    projects: Array,
    experiences: Array,
});

const threeCanvas = ref(null);

const {
    currentStation,
    showProjectDetail,
    showExperienceDetail,
    currentProject,
    currentExperience,
    closeProjectDetail,
    closeExperienceDetail,
    toggleMusic,
    isMusicPlaying,
    visitedStations,
    characterSize,
} = use3DWalkableWorld(threeCanvas, props.projects, props.experiences);
</script>

<style scoped>
.glass-hud {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(99, 102, 241, 0.2);
}

.animate-pulse-glow {
    animation: pulseGlow 2s ease-in-out infinite;
}

@keyframes pulseGlow {
    0%, 100% {
        box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
    }
    50% {
        box-shadow: 0 0 40px rgba(99, 102, 241, 0.6);
    }
}

.animate-scale-in {
    animation: scaleIn 0.3s ease-out;
}

@keyframes scaleIn {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

kbd {
    font-size: 0.875rem;
}

/* Style for rich text content in description */
.description-content :deep(p) {
    margin: 0.75rem 0;
}

.description-content :deep(ul) {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin: 0.5rem 0;
}

.description-content :deep(ol) {
    list-style-type: decimal;
    padding-left: 1.5rem;
    margin: 0.5rem 0;
}

.description-content :deep(li) {
    margin: 0.5rem 0;
}

.description-content :deep(strong) {
    color: #60a5fa;
    font-weight: 600;
}

.description-content :deep(code) {
    background: rgba(99, 102, 241, 0.2);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-family: monospace;
}

.description-content :deep(a) {
    color: #60a5fa;
    text-decoration: underline;
}

/* Style for rich text content in achievements */
.achievements-content :deep(p) {
    margin: 0.75rem 0;
}

.achievements-content :deep(ul) {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin: 0.5rem 0;
}

.achievements-content :deep(ol) {
    list-style-type: decimal;
    padding-left: 1.5rem;
    margin: 0.5rem 0;
}

.achievements-content :deep(li) {
    margin: 0.5rem 0;
}

.achievements-content :deep(strong) {
    color: #60a5fa;
    font-weight: 600;
}

.achievements-content :deep(code) {
    background: rgba(99, 102, 241, 0.2);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-family: monospace;
}

.achievements-content :deep(a) {
    color: #60a5fa;
    text-decoration: underline;
}
</style>

<template>
    <section id="projects" class="py-32 relative overflow-hidden">
        <!-- Animated background grid -->
        <div class="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        <div class="container mx-auto px-6 relative z-10">
            <div class="text-center mb-20">
                <div class="inline-block mb-4">
                    <span class="text-sm font-semibold tracking-wider text-indigo-400 uppercase">Portfolio</span>
                </div>
                <h2 class="text-5xl md:text-7xl font-black mb-6 relative inline-block">
                    <span class="absolute inset-0 blur-2xl bg-gradient-to-r from-indigo-600 to-purple-600 opacity-30"></span>
                    <span class="relative bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Featured Projects
                    </span>
                </h2>
                <p class="text-xl text-gray-400 max-w-2xl mx-auto">
                    Innovative solutions built with cutting-edge technology
                </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                <div v-for="(project, index) in projects" :key="project.id" 
                     class="project-card group"
                     :style="{ animationDelay: `${index * 0.1}s` }">
                    <div class="relative h-full">
                        <!-- Holographic effect -->
                        <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <!-- Card content -->
                        <div class="relative h-full bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl border border-gray-700/50 group-hover:border-indigo-500/50 transition-all duration-500 overflow-hidden">
                            <!-- Badge for featured -->
                            <div v-if="project.featured" class="absolute top-4 right-4 z-10">
                                <div class="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 backdrop-blur-sm">
                                    <span class="text-xs font-semibold text-yellow-400">Featured</span>
                                </div>
                            </div>
                            
                            <!-- Image section with 3D hover effect -->
                            <div class="relative h-56 overflow-hidden group-hover:h-48 transition-all duration-500">
                                <div class="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-purple-600/30 to-pink-600/30 mix-blend-overlay"></div>
                                <img v-if="project.image" 
                                     :src="project.image" 
                                     :alt="project.title"
                                     class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
                                    <div class="relative">
                                        <div class="absolute inset-0 blur-2xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-50 animate-pulse"></div>
                                        <svg class="relative w-24 h-24 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                                        </svg>
                                    </div>
                                </div>
                                
                                <!-- Scan line effect -->
                                <div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan"></div>
                            </div>
                            
                            <div class="p-6 space-y-4">
                                <h3 class="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                                    {{ project.title }}
                                </h3>
                                <p class="text-gray-400 text-sm leading-relaxed line-clamp-3">
                                    {{ project.description }}
                                </p>
                                
                                <!-- Tech stack -->
                                <div class="flex flex-wrap gap-2">
                                    <span v-for="(tech, techIndex) in project.technologies?.slice(0, 3)" :key="techIndex"
                                          class="group/tech relative px-3 py-1 text-xs font-medium rounded-lg overflow-hidden">
                                        <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 group-hover/tech:from-indigo-500/20 group-hover/tech:to-purple-500/20 transition-colors"></div>
                                        <div class="absolute inset-0 border border-indigo-500/30 rounded-lg"></div>
                                        <span class="relative text-indigo-300">{{ tech }}</span>
                                    </span>
                                    <span v-if="project.technologies && project.technologies.length > 3" 
                                          class="px-3 py-1 text-xs font-medium text-gray-500">
                                        +{{ project.technologies.length - 3 }}
                                    </span>
                                </div>
                                
                                <!-- Action buttons -->
                                <div class="flex gap-3 pt-4">
                                    <a v-if="project.github_url" 
                                       :href="project.github_url" 
                                       target="_blank"
                                       class="flex-1 group/btn relative px-4 py-2.5 rounded-xl overflow-hidden">
                                        <div class="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 group-hover/btn:from-indigo-600 group-hover/btn:to-purple-600 transition-all duration-300"></div>
                                        <div class="relative flex items-center justify-center gap-2 text-sm font-medium text-gray-300 group-hover/btn:text-white">
                                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                            </svg>
                                            Code
                                        </div>
                                    </a>
                                    <a v-if="project.live_url" 
                                       :href="project.live_url" 
                                       target="_blank"
                                       class="flex-1 group/btn relative px-4 py-2.5 rounded-xl overflow-hidden">
                                        <div class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                                        <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                                        <div class="relative flex items-center justify-center gap-2 text-sm font-medium text-white">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                                            </svg>
                                            Live Demo
                                        </div>
                                    </a>
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
defineProps({
    projects: {
        type: Array,
        required: true
    }
});
</script>

<style scoped>
.bg-grid-pattern {
    background-image: 
        linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
    background-size: 40px 40px;
    animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
    0% { background-position: 0 0; }
    100% { background-position: 40px 40px; }
}

.project-card {
    animation: fadeInUp 0.8s ease-out both;
    transform-style: preserve-3d;
    perspective: 1000px;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(40px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.project-card:hover {
    transform: translateY(-8px) rotateX(2deg);
}

@keyframes scan {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
}

.group-hover\:animate-scan {
    animation: scan 2s ease-in-out;
}
</style>

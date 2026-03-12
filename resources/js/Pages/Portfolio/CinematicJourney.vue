<template>
    <div class="relative min-h-screen bg-black overflow-hidden">
        <!-- 3D Canvas -->
        <canvas ref="threeCanvas" class="fixed inset-0 w-full h-full"></canvas>
        
        <!-- Welcome Intro Screen with About Me -->
        <transition name="fade">
            <div v-if="showWelcome" 
                 @click="handleWelcomeClick"
                 class="fixed inset-0 flex items-center justify-center z-50 bg-black/90 backdrop-blur-xl cursor-pointer">
                <!-- Animated particles background -->
                <div class="absolute inset-0 overflow-hidden">
                    <div v-for="i in 30" :key="i" class="welcome-particle"
                         :style="{
                             left: `${Math.random() * 100}%`,
                             top: `${Math.random() * 100}%`,
                             animationDelay: `${Math.random() * 3}s`,
                             animationDuration: `${3 + Math.random() * 2}s`
                         }"></div>
                </div>
                
                <div class="text-center space-y-8 animate-fade-in max-w-6xl mx-auto px-6 relative z-10">
                    <!-- Greeting -->
                    <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-6">
                        <span class="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-flow">
                            About Me
                        </span>
                    </h1>
                    
                    <!-- Divider -->
                    <div class="w-64 h-1 mx-auto mb-8 rounded-full overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-slide-shine"></div>
                    </div>
                    
                    <!-- Highlight badges -->
                    <div class="flex flex-wrap justify-center gap-3 mb-8">
                        <div class="highlight-badge-welcome px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 backdrop-blur-sm">
                            <span class="text-sm font-semibold text-indigo-300">7+ Years Experience</span>
                        </div>
                        <div class="highlight-badge-welcome px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 backdrop-blur-sm" style="animation-delay: 0.1s;">
                            <span class="text-sm font-semibold text-cyan-300">System Architecture</span>
                        </div>
                        <div class="highlight-badge-welcome px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 backdrop-blur-sm" style="animation-delay: 0.2s;">
                            <span class="text-sm font-semibold text-purple-300">Team Leadership</span>
                        </div>
                        <div class="highlight-badge-welcome px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 backdrop-blur-sm" style="animation-delay: 0.3s;">
                            <span class="text-sm font-semibold text-green-300">Performance Optimization</span>
                        </div>
                    </div>
                    
                    <!-- Subtext -->
                    <div class="glass-panel-finale max-w-4xl mx-auto p-6 md:p-8 mb-6 md:mb-8 animate-fade-in-up" style="animation-delay: 0.4s;">
                        <p class="text-lg sm:text-xl md:text-2xl text-gray-200 leading-relaxed mb-4 md:mb-6">
                            Results-driven <span class="text-cyan-400 font-bold">Senior Software Engineer</span> with over 7 years of experience delivering scalable, high-performance solutions across diverse industries.
                        </p>
                        <p class="text-base sm:text-lg text-gray-300 leading-relaxed mb-3 md:mb-4">
                            Known for leading complex projects, mentoring teams, and driving seamless transitions from legacy systems to modern, scalable architectures.
                        </p>
                        <p class="text-sm sm:text-base text-gray-400 leading-relaxed">
                            Highly adaptable, collaborative, and committed to continuous learning and innovation to deliver solutions that balance technical excellence with business needs.
                        </p>
                    </div>
                    
                    <!-- Stats Grid -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto mb-8 md:mb-12 animate-fade-in-up" style="animation-delay: 0.6s;">
                        <div class="glass-panel-finale p-4 md:p-6">
                            <div class="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-1 md:mb-2">7+</div>
                            <div class="text-gray-400 text-xs sm:text-sm font-semibold uppercase tracking-wider">Years Exp</div>
                        </div>
                        <div class="glass-panel-finale p-4 md:p-6">
                            <div class="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-1 md:mb-2">50+</div>
                            <div class="text-gray-400 text-xs sm:text-sm font-semibold uppercase tracking-wider">Projects</div>
                        </div>
                        <div class="glass-panel-finale p-4 md:p-6">
                            <div class="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-1 md:mb-2">100K+</div>
                            <div class="text-gray-400 text-xs sm:text-sm font-semibold uppercase tracking-wider">Lines Code</div>
                        </div>
                        <div class="glass-panel-finale p-4 md:p-6">
                            <div class="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-1 md:mb-2">15+</div>
                            <div class="text-gray-400 text-xs sm:text-sm font-semibold uppercase tracking-wider">Team Members</div>
                        </div>
                    </div>
                    
                    <!-- Auto-start Countdown -->
                    <div class="animate-fade-in-up" style="animation-delay: 0.8s;">
                        <div class="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-2xl bg-gradient-to-r from-cyan-600/10 via-blue-600/10 to-purple-600/10 border border-cyan-400/30 backdrop-blur-xl">
                            <div class="relative">
                                <svg class="w-10 h-10 md:w-12 md:h-12 transform -rotate-90">
                                    <circle cx="20" cy="20" r="16" 
                                            stroke="rgba(99, 102, 241, 0.2)" 
                                            stroke-width="3" 
                                            fill="none"
                                            class="md:hidden" />
                                    <circle cx="20" cy="20" r="16" 
                                            stroke="url(#countdown-gradient)" 
                                            stroke-width="3" 
                                            fill="none"
                                            stroke-linecap="round"
                                            :stroke-dasharray="100.5"
                                            :stroke-dashoffset="100.5 * (countdown / 5)"
                                            class="transition-all duration-1000 md:hidden" />
                                    <circle cx="24" cy="24" r="20" 
                                            stroke="rgba(99, 102, 241, 0.2)" 
                                            stroke-width="4" 
                                            fill="none"
                                            class="hidden md:block" />
                                    <circle cx="24" cy="24" r="20" 
                                            stroke="url(#countdown-gradient)" 
                                            stroke-width="4" 
                                            fill="none"
                                            stroke-linecap="round"
                                            :stroke-dasharray="125.6"
                                            :stroke-dashoffset="125.6 * (countdown / 5)"
                                            class="transition-all duration-1000 hidden md:block" />
                                    <defs>
                                        <linearGradient id="countdown-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" style="stop-color:#06b6d4" />
                                            <stop offset="100%" style="stop-color:#8b5cf6" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div class="absolute inset-0 flex items-center justify-center">
                                    <span class="text-xl md:text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                        {{ countdown }}
                                    </span>
                                </div>
                            </div>
                            <div class="text-left">
                                <div class="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">Starting in</div>
                                <div class="text-base sm:text-lg md:text-xl font-bold text-white">{{ countdown }} seconds...</div>
                            </div>
                        </div>
                        <p class="text-gray-500 text-xs sm:text-sm mt-4">Or click anywhere to start now</p>
                    </div>
                </div>
            </div>
        </transition>
        
        <!-- Journey Progress HUD -->
        <transition name="slide-down">
            <div v-if="!showWelcome && isJourneyActive" class="fixed top-6 left-1/2 transform -translate-x-1/2 z-40">
                <div class="glass-hud px-8 py-4 rounded-2xl">
                    <div class="flex items-center gap-6">
                        <!-- Current Phase -->
                        <div class="text-center">
                            <p class="text-gray-400 text-sm mb-1">Current Phase</p>
                            <p class="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent capitalize">
                                {{ journeyPhase }}
                            </p>
                        </div>
                        
                        <!-- Progress Bar -->
                        <div class="w-64 h-3 bg-gray-700 rounded-full overflow-hidden">
                            <div class="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-1000"
                                 :style="{ width: `${journeyProgress}%` }"></div>
                        </div>
                        
                        <!-- Percentage -->
                        <div class="text-center">
                            <p class="text-gray-400 text-sm mb-1">Progress</p>
                            <p class="text-lg font-bold text-purple-400">
                                {{ Math.round(journeyProgress) }}%
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        
        <!-- Music Status Indicator (Top Right) -->
        <div v-if="!showWelcome" class="fixed top-6 right-6 z-40">
            <button @click="toggleMusic" class="glass-hud px-4 py-3 rounded-full flex items-center gap-2 hover:bg-white/10 transition-all">
                <div v-if="isMusicPlaying" class="flex gap-1">
                    <div class="w-1 h-4 bg-cyan-400 rounded-full animate-music-bar" style="animation-delay: 0ms"></div>
                    <div class="w-1 h-4 bg-cyan-400 rounded-full animate-music-bar" style="animation-delay: 150ms"></div>
                    <div class="w-1 h-4 bg-cyan-400 rounded-full animate-music-bar" style="animation-delay: 300ms"></div>
                </div>
                <div v-else class="w-5 h-5">
                    <svg fill="currentColor" viewBox="0 0 20 20" class="text-gray-500">
                        <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                </div>
                <span class="text-white text-sm font-semibold">
                    {{ isMusicPlaying ? 'Playing' : 'Paused' }}
                </span>
            </button>
        </div>
        
        <!-- Exit Button -->
        <div v-if="!showWelcome" class="fixed top-6 left-6 z-40">
            <a :href="route('home')" class="glass-hud px-6 py-3 rounded-2xl hover:bg-white/10 transition-all">
                <span class="text-white font-semibold flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    Exit 3D
                </span>
            </a>
        </div>
        
        <!-- Immersive Skill Display - Floating in 3D space -->
        <transition name="slide-left">
            <div v-if="showSkillsDetail && currentSkillCategory" 
                 class="fixed right-8 top-1/2 transform -translate-y-1/2 z-[60] max-w-md pointer-events-auto">
                <div class="holographic-panel animate-hologram-in" style="box-shadow: 0 0 60px rgba(6, 182, 212, 0.4);">
                    <!-- Holographic Header -->
                    <div class="panel-header">
                        <div class="flex items-center gap-3 mb-4">
                            <div class="hologram-icon">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
                                </svg>
                            </div>
                            <div>
                                <div class="text-xs text-cyan-400 font-mono uppercase tracking-wider">Skill Matrix</div>
                                <h3 class="text-2xl font-black text-white">
                                    {{ currentSkillCategory.category }}
                                </h3>
                            </div>
                        </div>
                        <div class="scanning-line"></div>
                    </div>
                    
                    <!-- Skills Grid -->
                    <div class="panel-content">
                        <div class="grid grid-cols-2 gap-3">
                            <div v-for="(skill, index) in currentSkillCategory.skills" 
                                 :key="skill.id || skill.name"
                                 class="skill-chip"
                                 :style="{ animationDelay: `${index * 0.05}s` }">
                                <div class="skill-chip-glow"></div>
                                <div class="skill-chip-content">
                                    <svg class="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                    </svg>
                                    <span class="font-semibold">{{ skill.name }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Corner Decorations -->
                    <div class="corner-decoration corner-tl"></div>
                    <div class="corner-decoration corner-tr"></div>
                    <div class="corner-decoration corner-bl"></div>
                    <div class="corner-decoration corner-br"></div>
                </div>
            </div>
        </transition>
        
        <!-- Immersive Experience Display -->
        <transition name="slide-left">
            <div v-if="showExperienceDetail && currentExperience" 
                 class="fixed right-8 top-1/2 transform -translate-y-1/2 z-[60] max-w-xl pointer-events-auto">
                <div class="holographic-panel-large animate-hologram-in" style="box-shadow: 0 0 60px rgba(6, 182, 212, 0.4);">
                    <!-- Header with Company Logo -->
                    <div class="panel-header-large">
                        <div class="flex items-start gap-4">
                            <div v-if="currentExperience.company_logo" 
                                 class="company-logo-container">
                                <img :src="currentExperience.company_logo" 
                                     :alt="currentExperience.company" 
                                     class="w-full h-full object-contain" />
                            </div>
                            <div v-else class="company-logo-placeholder">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="text-xs text-cyan-400 font-mono uppercase tracking-wider mb-1">Work Experience</div>
                                <h3 class="text-3xl font-black text-white mb-1 break-words">
                                    {{ currentExperience.company }}
                                </h3>
                                <p class="text-xl text-cyan-300 font-semibold mb-2 break-words">{{ currentExperience.position }}</p>
                                <div class="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                                    <span class="flex items-center gap-1">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                        </svg>
                                        {{ formatPeriod(currentExperience) }}
                                    </span>
                                    <span v-if="currentExperience.location" class="flex items-center gap-1">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                        </svg>
                                        {{ currentExperience.location }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="scanning-line mt-4"></div>
                    </div>
                    
                    <!-- Content -->
                    <div class="panel-content-large">
                        <div class="text-gray-300 leading-relaxed mb-4 experience-text" v-html="currentExperience.description"></div>
                        
                        <div v-if="currentExperience.achievements">
                            <div class="flex items-center gap-2 mb-3 text-cyan-400">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <span class="font-bold uppercase text-sm tracking-wider">Key Achievements</span>
                            </div>
                            <div class="text-gray-300 text-sm leading-relaxed achievements-text" v-html="currentExperience.achievements"></div>
                        </div>
                    </div>
                    
                    <!-- Progress Indicator -->
                    <div class="panel-footer">
                        <div class="flex items-center justify-between text-xs text-cyan-400 font-mono">
                            <span>LOADING NEXT STATION...</span>
                            <div class="loading-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Corner Decorations -->
                    <div class="corner-decoration corner-tl"></div>
                    <div class="corner-decoration corner-tr"></div>
                    <div class="corner-decoration corner-bl"></div>
                    <div class="corner-decoration corner-br"></div>
                </div>
            </div>
        </transition>
        
        <!-- Immersive Project Display -->
        <transition name="slide-left">
            <div v-if="showProjectDetail && currentProject" 
                 class="fixed right-8 top-1/2 transform -translate-y-1/2 z-[60] max-w-xl pointer-events-auto">
                <div class="holographic-panel-large holographic-panel-purple animate-hologram-in" style="box-shadow: 0 0 60px rgba(147, 51, 234, 0.4);">
                    <!-- Project Header -->
                    <div class="panel-header-large">
                        <div>
                            <div class="flex items-center gap-2 mb-2">
                                <div class="text-xs text-purple-400 font-mono uppercase tracking-wider">Featured Project</div>
                                <div v-if="currentProject.featured" class="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/50">
                                    <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                    <span class="text-xs text-yellow-400 font-bold">FEATURED</span>
                                </div>
                            </div>
                            <h3 class="text-3xl font-black text-white mb-3">
                                {{ currentProject.title }}
                            </h3>
                            <p class="text-gray-300 leading-relaxed mb-4">
                                {{ currentProject.description }}
                            </p>
                        </div>
                        <div class="scanning-line"></div>
                    </div>
                    
                    <!-- Technologies -->
                    <div class="panel-content-large">
                        <div class="flex items-center gap-2 mb-3 text-purple-400">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                            </svg>
                            <span class="font-bold uppercase text-sm tracking-wider">Tech Stack</span>
                        </div>
                        <div class="grid grid-cols-2 gap-2">
                            <div v-for="(tech, index) in getTechnologies(currentProject)" 
                                 :key="index"
                                 class="tech-chip"
                                 :style="{ animationDelay: `${index * 0.05}s` }">
                                <div class="tech-chip-glow"></div>
                                <span class="font-semibold text-sm">{{ tech }}</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Progress Indicator -->
                    <div class="panel-footer">
                        <div class="flex items-center justify-between text-xs text-purple-400 font-mono">
                            <span>LOADING NEXT PROJECT...</span>
                            <div class="loading-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Corner Decorations -->
                    <div class="corner-decoration corner-tl"></div>
                    <div class="corner-decoration corner-tr"></div>
                    <div class="corner-decoration corner-bl"></div>
                    <div class="corner-decoration corner-br"></div>
                </div>
            </div>
        </transition>
        <!-- Epic Finale Screen with Contact Form -->
        <transition name="fade">
            <div v-if="journeyPhase === 'finale'" 
                 class="fixed inset-0 z-[70] flex items-center justify-center pointer-events-auto overflow-y-auto"
                 style="background: radial-gradient(circle at center, rgba(99, 102, 241, 0.1) 0%, rgba(0, 0, 0, 0.9) 100%);">
                
                <!-- Animated particles background -->
                <div class="absolute inset-0 overflow-hidden pointer-events-none">
                    <div v-for="i in 50" :key="i" class="finale-particle"
                         :style="{
                             left: `${Math.random() * 100}%`,
                             top: `${Math.random() * 100}%`,
                             animationDelay: `${Math.random() * 3}s`,
                             animationDuration: `${3 + Math.random() * 2}s`
                         }"></div>
                </div>
                
                <!-- Main Finale Content - Scrollable Container -->
                <div class="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 max-h-screen overflow-y-auto">
                    <!-- Journey Complete Badge -->
                    <div class="animate-scale-bounce mb-4 sm:mb-6 text-center">
                        <div class="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2 border-green-400/50 bg-green-400/10 backdrop-blur-xl">
                            <svg class="w-6 h-6 sm:w-8 sm:h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span class="text-lg sm:text-2xl font-bold text-green-400">Journey Complete!</span>
                        </div>
                    </div>
                    
                    <!-- Main Title -->
                    <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 animate-text-reveal text-center">
                        <span class="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-flow">
                            Let's Work Together
                        </span>
                    </h1>
                    
                    <!-- Animated divider -->
                    <div class="w-32 sm:w-48 md:w-64 h-1 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-slide-shine"></div>
                    </div>
                    
                    <p class="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 text-center mb-4 sm:mb-6 animate-fade-in-up px-4">
                        Have a project in mind? Let's discuss how we can turn your ideas into reality.
                    </p>
                    
                    <!-- Contact Form -->
                    <div class="glass-panel-finale p-4 sm:p-6 md:p-8 lg:p-10 mb-4 sm:mb-6 md:mb-8 animate-fade-in-up" style="animation-delay: 0.2s;">
                        <form @submit.prevent="submitContact" class="space-y-3 sm:space-y-4 md:space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                                <div>
                                    <label class="block text-xs sm:text-sm font-semibold text-cyan-400 mb-1 sm:mb-2">Name</label>
                                    <input type="text" v-model="contactForm.name" required
                                           class="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm md:text-base bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
                                           placeholder="Your name">
                                </div>
                                <div>
                                    <label class="block text-xs sm:text-sm font-semibold text-cyan-400 mb-1 sm:mb-2">Email</label>
                                    <input type="email" v-model="contactForm.email" required
                                           class="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm md:text-base bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
                                           placeholder="your.email@example.com">
                                </div>
                            </div>
                            
                            <div>
                                <label class="block text-xs sm:text-sm font-semibold text-cyan-400 mb-1 sm:mb-2">Subject</label>
                                <input type="text" v-model="contactForm.subject" required
                                       class="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm md:text-base bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
                                       placeholder="What's this about?">
                            </div>
                            
                            <div>
                                <label class="block text-xs sm:text-sm font-semibold text-cyan-400 mb-1 sm:mb-2">Message</label>
                                <textarea v-model="contactForm.message" required rows="4"
                                          class="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm md:text-base bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
                                          placeholder="Tell me about your project..."></textarea>
                            </div>
                            
                            <!-- Submit Button -->
                            <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 pt-2">
                                <button type="submit" :disabled="isSubmitting"
                                        class="flex-1 group relative px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                                    <div class="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 animate-gradient-flow"></div>
                                    <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div class="relative flex items-center justify-center gap-2 text-white font-bold text-sm sm:text-base md:text-lg">
                                        <svg v-if="!isSubmitting" class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                                        </svg>
                                        <svg v-else class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                        </svg>
                                        <span>{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
                                    </div>
                                </button>
                                
                                <button type="button" @click="restartJourney"
                                        class="sm:flex-none group relative px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-xl border-2 border-purple-400/50 hover:border-purple-400 backdrop-blur-xl bg-purple-400/5 hover:bg-purple-400/10 transform hover:scale-105 transition-all duration-300">
                                    <div class="relative flex items-center justify-center gap-2 text-purple-400 font-bold text-sm sm:text-base md:text-lg">
                                        <svg class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                        </svg>
                                        <span class="hidden sm:inline">Restart Journey</span>
                                        <span class="sm:hidden">Restart</span>
                                    </div>
                                </button>
                            </div>
                            
                            <!-- Success/Error Message -->
                            <div v-if="contactMessage" 
                                 class="p-2.5 sm:p-3 md:p-4 rounded-xl border text-xs sm:text-sm md:text-base"
                                 :class="contactSuccess ? 'bg-green-400/10 border-green-400/50 text-green-400' : 'bg-red-400/10 border-red-400/50 text-red-400'">
                                {{ contactMessage }}
                            </div>
                        </form>
                    </div>
                    
                    <!-- Alternative: Back to Portfolio -->
                    <div class="text-center animate-fade-in-up pb-4" style="animation-delay: 0.4s;">
                        <a :href="route('home')" 
                           class="inline-flex items-center gap-2 text-sm sm:text-base text-cyan-400 hover:text-cyan-300 transition-colors group">
                            <svg class="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                            </svg>
                            <span class="font-semibold">Back to Portfolio</span>
                        </a>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useCinematicJourney } from '@/Composables/useCinematicJourney';

const props = defineProps({
    experiences: Array,
    projects: Array,
    skills: Object,
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
    showSkillsDetail,
    currentExperience,
    currentProject,
    currentSkillCategory,
    closeExperienceDetail,
    closeProjectDetail,
    closeSkillsDetail,
    isMusicPlaying,
    toggleMusic,
    currentExperienceIndex,
    currentProjectIndex,
    isJourneyActive,
    journeyPhase,
    journeyProgress,
} = useCinematicJourney(threeCanvas, props.experiences, props.projects, props.skills);

const formatPeriod = (exp) => {
    const start = new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const end = exp.is_current ? 'Present' : new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    return `${start} - ${end}`;
};

const getTechnologies = (project) => {
    if (!project || !project.technologies) return [];
    
    // If it's already an array, return it
    if (Array.isArray(project.technologies)) {
        return project.technologies;
    }
    
    // If it's a string, try to parse it as JSON
    if (typeof project.technologies === 'string') {
        try {
            const parsed = JSON.parse(project.technologies);
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            // If parsing fails, split by comma
            return project.technologies.split(',').map(tech => tech.trim());
        }
    }
    
    return [];
};

const restartJourney = () => {
    window.location.reload();
};

// Countdown and auto-start
const countdown = ref(5);
let autoStartTimer = null;
let countdownInterval = null;

const startCountdown = () => {
    countdownInterval = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
            clearInterval(countdownInterval);
        }
    }, 1000);
};

const handleWelcomeClick = () => {
    if (showWelcome.value) {
        if (autoStartTimer) clearTimeout(autoStartTimer);
        if (countdownInterval) clearInterval(countdownInterval);
        startJourney();
    }
};

onMounted(() => {
    // Start countdown display
    startCountdown();
    
    // Auto-start the journey after 5 seconds
    autoStartTimer = setTimeout(() => {
        if (showWelcome.value) {
            startJourney();
        }
    }, 5000);
});

onUnmounted(() => {
    if (autoStartTimer) clearTimeout(autoStartTimer);
    if (countdownInterval) clearInterval(countdownInterval);
});

// Contact form
const contactForm = ref({
    name: '',
    email: '',
    subject: '',
    message: ''
});

const isSubmitting = ref(false);
const contactMessage = ref('');
const contactSuccess = ref(false);

const submitContact = async () => {
    isSubmitting.value = true;
    contactMessage.value = '';
    
    try {
        await window.axios.post(route('portfolio.contact'), contactForm.value);
        contactSuccess.value = true;
        contactMessage.value = 'Thank you for your message! I will get back to you soon.';
        
        // Reset form
        contactForm.value = {
            name: '',
            email: '',
            subject: '',
            message: ''
        };
    } catch (error) {
        contactSuccess.value = false;
        contactMessage.value = error.response?.data?.message || 'Something went wrong. Please try again.';
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<style scoped>
.glass-hud {
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(99, 102, 241, 0.3);
}

/* Holographic Panel Styles */
.holographic-panel {
    background: linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 2px solid rgba(6, 182, 212, 0.3);
    border-radius: 8px;
    padding: 1.5rem;
    position: relative;
    box-shadow: 0 0 40px rgba(6, 182, 212, 0.2), inset 0 0 40px rgba(6, 182, 212, 0.05);
}

.holographic-panel-large {
    background: linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 2px solid rgba(6, 182, 212, 0.3);
    border-radius: 8px;
    padding: 0;
    position: relative;
    box-shadow: 0 0 40px rgba(6, 182, 212, 0.2), inset 0 0 40px rgba(6, 182, 212, 0.05);
    max-height: 85vh;
    overflow: hidden;
}

.holographic-panel-purple {
    background: linear-gradient(135deg, rgba(147, 51, 234, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%);
    border: 2px solid rgba(147, 51, 234, 0.3);
    box-shadow: 0 0 40px rgba(147, 51, 234, 0.2), inset 0 0 40px rgba(147, 51, 234, 0.05);
}

.panel-header {
    position: relative;
}

.panel-header-large {
    padding: 2rem;
    background: linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%);
    border-bottom: 1px solid rgba(6, 182, 212, 0.2);
}

.holographic-panel-purple .panel-header-large {
    background: linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%);
    border-bottom: 1px solid rgba(147, 51, 234, 0.2);
}

.panel-content {
    padding: 1rem 0;
}

.panel-content-large {
    padding: 2rem;
    max-height: 50vh;
    overflow-y: auto;
}

.panel-content-large::-webkit-scrollbar {
    width: 6px;
}

.panel-content-large::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
}

.panel-content-large::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #06b6d4, #3b82f6);
    border-radius: 10px;
}

.panel-footer {
    padding: 1rem 2rem;
    border-top: 1px solid rgba(6, 182, 212, 0.2);
}

.holographic-panel-purple .panel-footer {
    border-top: 1px solid rgba(147, 51, 234, 0.2);
}

.hologram-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(6, 182, 212, 0.2);
    border: 1px solid rgba(6, 182, 212, 0.4);
    border-radius: 8px;
    color: #06b6d4;
}

.company-logo-container {
    width: 60px;
    height: 60px;
    background: white;
    border-radius: 12px;
    padding: 8px;
    flex-shrink: 0;
    box-shadow: 0 4px 20px rgba(6, 182, 212, 0.3);
}

.company-logo-placeholder {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
    box-shadow: 0 4px 20px rgba(6, 182, 212, 0.4);
}

.scanning-line {
    height: 2px;
    background: linear-gradient(90deg, transparent 0%, #06b6d4 50%, transparent 100%);
    animation: scan 2s linear infinite;
}

.holographic-panel-purple .scanning-line {
    background: linear-gradient(90deg, transparent 0%, #9333ea 50%, transparent 100%);
}

@keyframes scan {
    0%, 100% { opacity: 0.3; transform: translateX(-100%); }
    50% { opacity: 1; transform: translateX(100%); }
}

.skill-chip, .tech-chip {
    position: relative;
    background: rgba(6, 182, 212, 0.1);
    border: 1px solid rgba(6, 182, 212, 0.3);
    border-radius: 8px;
    padding: 0.75rem;
    animation: chipSlideIn 0.3s ease-out both;
}

.tech-chip {
    background: rgba(147, 51, 234, 0.1);
    border: 1px solid rgba(147, 51, 234, 0.3);
}

.skill-chip-glow, .tech-chip-glow {
    position: absolute;
    inset: 0;
    border-radius: 8px;
    background: radial-gradient(circle at center, rgba(6, 182, 212, 0.2) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.tech-chip-glow {
    background: radial-gradient(circle at center, rgba(147, 51, 234, 0.2) 0%, transparent 70%);
}

.skill-chip:hover .skill-chip-glow,
.tech-chip:hover .tech-chip-glow {
    opacity: 1;
}

.skill-chip-content {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #67e8f9;
}

.tech-chip {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #c084fc;
}

@keyframes chipSlideIn {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.loading-dots {
    display: flex;
    gap: 4px;
}

.loading-dots span {
    width: 4px;
    height: 4px;
    background: currentColor;
    border-radius: 50%;
    animation: dotPulse 1.4s infinite ease-in-out both;
}

.loading-dots span:nth-child(1) { animation-delay: -0.32s; }
.loading-dots span:nth-child(2) { animation-delay: -0.16s; }

@keyframes dotPulse {
    0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
    40% { transform: scale(1); opacity: 1; }
}

/* Corner Decorations */
.corner-decoration {
    position: absolute;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(6, 182, 212, 0.5);
}

.holographic-panel-purple .corner-decoration {
    border-color: rgba(147, 51, 234, 0.5);
}

.corner-tl { top: -2px; left: -2px; border-right: none; border-bottom: none; }
.corner-tr { top: -2px; right: -2px; border-left: none; border-bottom: none; }
.corner-bl { bottom: -2px; left: -2px; border-right: none; border-top: none; }
.corner-br { bottom: -2px; right: -2px; border-left: none; border-top: none; }

/* Animations */
@keyframes hologram-in {
    from {
        opacity: 0;
        transform: translateX(50px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateX(0) scale(1);
    }
}

.animate-hologram-in {
    animation: hologram-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* Transitions */
.slide-left-enter-active, .slide-left-leave-active {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-left-enter-from {
    opacity: 0;
    transform: translateX(50px) translateY(-50%);
}

.slide-left-leave-to {
    opacity: 0;
    transform: translateX(20px) translateY(-50%);
}

/* Text content styling */
.experience-text :deep(p) { margin: 0.5rem 0; }
.experience-text :deep(ul) { list-style-type: disc; padding-left: 1.5rem; margin: 0.5rem 0; }
.experience-text :deep(li) { margin: 0.25rem 0; }
.experience-text :deep(strong) { color: #67e8f9; }

.achievements-text :deep(p) { margin: 0.5rem 0; }
.achievements-text :deep(ul) { list-style-type: disc; padding-left: 1.5rem; margin: 0.5rem 0; }
.achievements-text :deep(li) { margin: 0.25rem 0; }
.achievements-text :deep(strong) { color: #67e8f9; }

/* Legacy styles for compatibility */

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

/* Finale Screen Styles */
.glass-panel-finale {
    background: linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 2px solid rgba(99, 102, 241, 0.2);
    border-radius: 24px;
    transition: all 0.3s ease;
}

.glass-panel-finale:hover {
    border-color: rgba(99, 102, 241, 0.4);
    box-shadow: 0 0 40px rgba(99, 102, 241, 0.2);
}

.finale-particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: radial-gradient(circle, rgba(99, 102, 241, 1) 0%, transparent 70%);
    border-radius: 50%;
    animation: float-particle 5s infinite ease-in-out;
}

@keyframes float-particle {
    0%, 100% {
        transform: translateY(0) scale(1);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    50% {
        transform: translateY(-100vh) scale(1.5);
        opacity: 0.5;
    }
    90% {
        opacity: 0;
    }
}

@keyframes scale-bounce {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
}

.animate-scale-bounce {
    animation: scale-bounce 2s ease-in-out infinite;
}

@keyframes text-reveal {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-text-reveal {
    animation: text-reveal 1s ease-out;
}

@keyframes gradient-flow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

.animate-gradient-flow {
    background-size: 200% 200%;
    animation: gradient-flow 3s ease infinite;
}

@keyframes slide-shine {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(200%);
    }
}

.animate-slide-shine {
    animation: slide-shine 2s ease-in-out infinite;
}

@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out both;
}

.social-link-finale {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%);
    border: 2px solid rgba(99, 102, 241, 0.3);
    color: #a5b4fc;
    transition: all 0.3s ease;
}

.social-link-finale:hover {
    transform: scale(1.1) rotate(5deg);
    border-color: #6366f1;
    color: #6366f1;
    box-shadow: 0 0 30px rgba(99, 102, 241, 0.5);
}

/* Welcome screen particles */
.welcome-particle {
    position: absolute;
    width: 3px;
    height: 3px;
    background: radial-gradient(circle, rgba(6, 182, 212, 1) 0%, transparent 70%);
    border-radius: 50%;
    animation: float-welcome-particle 5s infinite ease-in-out;
}

@keyframes float-welcome-particle {
    0%, 100% {
        transform: translateY(0) scale(1);
        opacity: 0;
    }
    10% {
        opacity: 0.8;
    }
    50% {
        transform: translateY(-100vh) scale(1.3);
        opacity: 0.4;
    }
    90% {
        opacity: 0;
    }
}

.highlight-badge-welcome {
    animation: badge-pop 0.6s ease-out both;
}

@keyframes badge-pop {
    0% {
        opacity: 0;
        transform: translateY(-10px) scale(0.9);
    }
    50% {
        transform: translateY(5px) scale(1.05);
    }
    100% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}
</style>

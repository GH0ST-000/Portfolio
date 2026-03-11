<template>
    <section id="home" class="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
        <!-- Animated gradient orbs -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="orb orb-1"></div>
            <div class="orb orb-2"></div>
            <div class="orb orb-3"></div>
        </div>
        
        <div class="container mx-auto px-6 relative z-10">
            <div class="text-center">
                <!-- Glowing badge -->
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-500/20 mb-8 animate-float">
                    <span class="relative flex h-3 w-3">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span class="text-sm font-medium bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        Available for opportunities
                    </span>
                </div>
                
                <div class="mb-8 animate-fade-in">
                    <h1 class="text-6xl md:text-8xl lg:text-9xl font-black mb-6 relative inline-block">
                        <span class="absolute inset-0 blur-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-50 animate-pulse-slow"></span>
                        <span class="relative bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                            Hi, I'm Luka
                        </span>
                    </h1>
                    <div class="text-3xl md:text-5xl lg:text-6xl mb-6 font-light relative">
                        <div class="glass-morphism inline-block px-8 py-4 rounded-2xl">
                            <span class="typing-effect bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">{{ typedText }}</span>
                            <span class="cursor text-indigo-400">|</span>
                        </div>
                    </div>
                </div>
                
                <p class="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 animate-slide-up leading-relaxed font-light">
                    Crafting <span class="text-indigo-400 font-semibold">next-generation</span> digital experiences with 
                    <span class="text-purple-400 font-semibold">cutting-edge</span> technology and 
                    <span class="text-pink-400 font-semibold">stunning</span> design
                </p>
                
                <div class="flex flex-col sm:flex-row items-center justify-center gap-6 animate-slide-up mb-16">
                    <a href="#projects" class="group relative px-10 py-4 overflow-hidden rounded-2xl">
                        <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 group-hover:scale-105"></div>
                        <div class="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span class="relative text-white font-semibold text-lg flex items-center gap-2">
                            View My Work
                            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                            </svg>
                        </span>
                        <div class="absolute inset-0 rounded-2xl ring-2 ring-indigo-400/50 group-hover:ring-4 group-hover:ring-indigo-400/30 transition-all duration-300"></div>
                    </a>
                    <a href="#contact" class="group relative px-10 py-4 rounded-2xl glass-morphism border-2 border-indigo-400/30 hover:border-indigo-400 transition-all duration-300 hover:scale-105">
                        <span class="relative text-lg font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            Get In Touch
                        </span>
                    </a>
                </div>
                
                <!-- Enhanced social links -->
                <div class="flex justify-center gap-6 mt-20">
                    <a href="https://github.com" target="_blank" class="social-link group">
                        <div class="relative">
                            <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                            <div class="relative w-14 h-14 flex items-center justify-center rounded-full glass-morphism border border-indigo-500/30 group-hover:border-indigo-400 transition-all duration-300 group-hover:scale-110">
                                <svg class="w-7 h-7 text-gray-300 group-hover:text-indigo-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </div>
                        </div>
                    </a>
                    <a href="https://linkedin.com" target="_blank" class="social-link group">
                        <div class="relative">
                            <div class="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                            <div class="relative w-14 h-14 flex items-center justify-center rounded-full glass-morphism border border-indigo-500/30 group-hover:border-purple-400 transition-all duration-300 group-hover:scale-110">
                                <svg class="w-7 h-7 text-gray-300 group-hover:text-purple-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                            </div>
                        </div>
                    </a>
                    <a href="https://twitter.com" target="_blank" class="social-link group">
                        <div class="relative">
                            <div class="absolute inset-0 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                            <div class="relative w-14 h-14 flex items-center justify-center rounded-full glass-morphism border border-indigo-500/30 group-hover:border-pink-400 transition-all duration-300 group-hover:scale-110">
                                <svg class="w-7 h-7 text-gray-300 group-hover:text-pink-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                                </svg>
                            </div>
                        </div>
                    </a>
                </div>
                
                <!-- Scroll indicator -->
                <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div class="w-6 h-10 border-2 border-indigo-400/50 rounded-full flex items-start justify-center p-2">
                        <div class="w-1 h-3 bg-gradient-to-b from-indigo-400 to-transparent rounded-full animate-scroll"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const typedText = ref('');
const phrases = ['Full Stack Developer', 'UI/UX Enthusiast', 'Creative Problem Solver'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typedText.value = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedText.value = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
};

// Optimized smooth scroll - starts instantly
const smoothScrollTo = (targetId) => {
    const target = document.querySelector(targetId);
    if (!target) return;
    
    const startPosition = window.pageYOffset;
    const targetPosition = target.getBoundingClientRect().top + startPosition;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    const startTime = performance.now();
    
    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    
    const scroll = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * easeProgress);
        
        if (progress < 1) {
            requestAnimationFrame(scroll);
        }
    };
    
    requestAnimationFrame(scroll);
};

// Handle click with immediate response
const handleNavClick = (event) => {
    const href = event.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
        event.preventDefault();
        event.stopPropagation();
        smoothScrollTo(href);
    }
};

onMounted(() => {
    typeEffect();
    
    // Attach listeners for instant response
    const heroLinks = document.querySelectorAll('#home a[href^="#"]');
    heroLinks.forEach(link => {
        link.addEventListener('click', handleNavClick, { passive: false });
    });
});
</script>

<style scoped>
.glass-morphism {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 8px 32px 0 rgba(99, 102, 241, 0.1);
}

.orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.4;
    animation: float 20s ease-in-out infinite;
}

.orb-1 {
    width: 500px;
    height: 500px;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    top: -250px;
    left: -250px;
    animation-delay: 0s;
}

.orb-2 {
    width: 400px;
    height: 400px;
    background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
    top: 50%;
    right: -200px;
    animation-delay: 5s;
}

.orb-3 {
    width: 350px;
    height: 350px;
    background: linear-gradient(135deg, #ec4899 0%, #6366f1 100%);
    bottom: -175px;
    left: 50%;
    animation-delay: 10s;
}

@keyframes float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(50px, -50px) scale(1.1); }
    50% { transform: translate(-30px, 30px) scale(0.9); }
    75% { transform: translate(30px, 50px) scale(1.05); }
}

.animate-float {
    animation: floatBadge 3s ease-in-out infinite;
}

@keyframes floatBadge {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

.cursor {
    animation: blink 1s infinite;
}

@keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
}

.animate-fade-in {
    animation: fadeIn 1.5s ease-out;
}

.animate-slide-up {
    animation: slideUp 1.2s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-gradient {
    background-size: 200% 200%;
    animation: gradientShift 8s ease infinite;
}

@keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}

.animate-pulse-slow {
    animation: pulseSlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulseSlow {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.7; }
}

@keyframes scroll {
    0% { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(16px); opacity: 0; }
}

.animate-scroll {
    animation: scroll 1.5s ease-in-out infinite;
}
</style>

<template>
    <section id="about" class="py-24 relative overflow-hidden">
        <!-- Animated gradient background -->
        <div class="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"></div>
        
        <!-- Animated mesh gradient -->
        <div class="absolute inset-0 opacity-30">
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 animate-gradient-shift"></div>
        </div>
        
        <!-- Floating code symbols -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div v-for="i in 15" :key="i" class="code-symbol" :style="getCodeSymbolStyle(i)">
                {{ getCodeSymbol(i) }}
            </div>
        </div>
        
        <div class="container mx-auto px-6 relative z-10">
            <!-- Header -->
            <div class="text-center mb-16">
                <div class="inline-block mb-4">
                    <span class="text-sm font-semibold tracking-wider text-purple-400 uppercase">Who I Am</span>
                </div>
                <h2 class="text-5xl md:text-7xl font-black mb-6 relative inline-block">
                    <span class="absolute inset-0 blur-2xl bg-gradient-to-r from-indigo-600 to-purple-600 opacity-30"></span>
                    <span class="relative bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        About Me
                    </span>
                </h2>
            </div>
            
            <!-- Main content -->
            <div class="max-w-6xl mx-auto">
                <div class="relative">
                    <!-- Glowing border effect -->
                    <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-20 animate-pulse-slow"></div>
                    
                    <!-- Content card -->
                    <div class="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl border border-gray-700/50 overflow-hidden">
                        <!-- Animated grid background -->
                        <div class="absolute inset-0 opacity-5">
                            <div class="absolute inset-0" style="background-image: linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px); background-size: 30px 30px;"></div>
                        </div>
                        
                        <div class="relative p-8 md:p-12 lg:p-16">
                            <!-- Highlight badges -->
                            <div class="flex flex-wrap gap-3 mb-8">
                                <div v-for="(highlight, index) in highlights" 
                                     :key="highlight.text"
                                     class="highlight-badge"
                                     :style="{ animationDelay: `${index * 0.1}s` }">
                                    <div class="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 backdrop-blur-sm hover:border-indigo-400/50 transition-all duration-300 group">
                                        <component :is="highlight.icon" class="w-4 h-4 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                                        <span class="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">{{ highlight.text }}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Main description with typing effect -->
                            <div class="space-y-6">
                                <p v-for="(paragraph, index) in paragraphs" 
                                   :key="index"
                                   class="text-paragraph"
                                   :style="{ animationDelay: `${0.5 + index * 0.2}s` }">
                                    <span v-for="(word, wordIndex) in paragraph.split(' ')" 
                                          :key="wordIndex"
                                          class="word-fade-in"
                                          :style="{ animationDelay: `${0.5 + index * 0.2 + wordIndex * 0.03}s` }">
                                        {{ word }}&nbsp;
                                    </span>
                                </p>
                            </div>
                            
                            <!-- Stats grid -->
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-gray-700/50">
                                <div v-for="(stat, index) in stats" 
                                     :key="stat.label"
                                     class="stat-card"
                                     :style="{ animationDelay: `${1 + index * 0.1}s` }">
                                    <div class="text-center group cursor-default">
                                        <div class="relative inline-block mb-3">
                                            <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                                            <div class="relative text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                                {{ stat.value }}
                                            </div>
                                        </div>
                                        <div class="text-sm text-gray-400 font-medium uppercase tracking-wider">{{ stat.label }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Decorative corner elements -->
                        <div class="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-br-full"></div>
                        <div class="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-tl-full"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';

const highlights = ref([
    { text: '7+ Years Experience', icon: 'IconBriefcase' },
    { text: 'System Architecture', icon: 'IconCpu' },
    { text: 'Team Leadership', icon: 'IconUsers' },
    { text: 'Performance Optimization', icon: 'IconZap' },
]);

const paragraphs = ref([
    'Results-driven Senior Software Engineer with over 7 years of experience delivering scalable, high-performance solutions across diverse industries. Skilled in system architecture design, end-to-end application development, and optimizing performance and cost-efficiency.',
    'Known for leading complex projects, mentoring teams, and driving seamless transitions from legacy systems to modern, scalable architectures.',
    'Highly adaptable, collaborative, and committed to continuous learning and innovation to deliver solutions that balance technical excellence with business needs.'
]);

const stats = ref([
    { value: '7+', label: 'Years Exp' },
    { value: '50+', label: 'Projects' },
    { value: '100K+', label: 'Lines Code' },
    { value: '15+', label: 'Team Members' },
]);

const codeSymbols = ['{', '}', '<', '>', '/', '(', ')', '[', ']', ';', '=', '+', '*'];

const getCodeSymbol = (index) => {
    return codeSymbols[index % codeSymbols.length];
};

const getCodeSymbolStyle = (index) => {
    const size = Math.random() * 40 + 20;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 5;
    
    return {
        fontSize: `${size}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
    };
};

const IconBriefcase = {
    template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`
};

const IconCpu = {
    template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/></svg>`
};

const IconUsers = {
    template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`
};

const IconZap = {
    template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`
};
</script>

<style scoped>
/* Gradient animation */
@keyframes gradient-shift {
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

.animate-gradient-shift {
    animation: gradient-shift 15s ease-in-out infinite;
}

/* Pulse animation */
@keyframes pulse-slow {
    0%, 100% {
        opacity: 0.2;
    }
    50% {
        opacity: 0.4;
    }
}

.animate-pulse-slow {
    animation: pulse-slow 4s ease-in-out infinite;
}

/* Code symbols floating */
.code-symbol {
    position: absolute;
    font-weight: bold;
    color: rgba(139, 92, 246, 0.15);
    animation: float-code linear infinite;
    pointer-events: none;
}

@keyframes float-code {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 0;
    }
    10% {
        opacity: 0.3;
    }
    90% {
        opacity: 0.3;
    }
    100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
    }
}

/* Highlight badges */
.highlight-badge {
    animation: slideInDown 0.6s ease-out both;
}

@keyframes slideInDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Text paragraphs */
.text-paragraph {
    font-size: 1.125rem;
    line-height: 1.8;
    color: rgb(209, 213, 219);
    animation: fadeIn 0.8s ease-out both;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

/* Word fade-in effect */
.word-fade-in {
    display: inline-block;
    animation: wordFadeIn 0.4s ease-out both;
}

@keyframes wordFadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Stats cards */
.stat-card {
    animation: scaleIn 0.6s ease-out both;
}

@keyframes scaleIn {
    from {
        opacity: 0;
        transform: scale(0.8);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .text-paragraph {
        font-size: 1rem;
    }
}
</style>

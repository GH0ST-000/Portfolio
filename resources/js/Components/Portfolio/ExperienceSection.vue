<template>
    <section id="experience" class="py-24 relative overflow-hidden">
        <!-- Animated background -->
        <div class="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/50 to-gray-950"></div>
        
        <!-- Animated circuit lines -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <svg class="absolute w-full h-full">
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#a855f7;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <path v-for="i in 5" :key="i" 
                      :d="getCircuitPath(i)" 
                      stroke="url(#lineGradient)" 
                      stroke-width="2" 
                      fill="none"
                      class="circuit-line"
                      :style="{ animationDelay: `${i * 0.5}s` }"/>
            </svg>
        </div>
        
        <div class="container mx-auto px-6 relative z-10">
            <!-- Header -->
            <div class="text-center mb-20">
                <div class="inline-block mb-4">
                    <span class="text-sm font-semibold tracking-wider text-purple-400 uppercase">Professional Journey</span>
                </div>
                <h2 class="text-5xl md:text-7xl font-black mb-6 relative inline-block">
                    <span class="absolute inset-0 blur-2xl bg-gradient-to-r from-indigo-600 to-purple-600 opacity-30"></span>
                    <span class="relative bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Work Experience
                    </span>
                </h2>
            </div>
            
            <div class="max-w-6xl mx-auto">
                <!-- Timeline -->
                <div class="relative">
                    <!-- Central timeline line with gradient -->
                    <div class="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 transform md:-translate-x-1/2 rounded-full shadow-lg shadow-purple-500/50"></div>
                    
                    <!-- Timeline items -->
                    <div v-for="(exp, index) in experiences" :key="exp.id" 
                         class="relative mb-16 md:mb-24">
                        
                        <!-- Desktop: Alternating layout -->
                        <div class="hidden md:block">
                            <div v-if="index % 2 === 0" class="flex items-start">
                                <!-- Left content -->
                                <div class="w-1/2 pr-12 text-right">
                                    <div class="experience-card experience-card-left"
                                         :style="{ animationDelay: `${index * 0.2}s` }">
                                        <ExperienceContent :exp="exp" :index="index" align="right" />
                                    </div>
                                </div>
                                
                                <!-- Center icon -->
                                <div class="absolute left-1/2 transform -translate-x-1/2">
                                    <TimelineIcon :exp="exp" :index="index" />
                                </div>
                                
                                <!-- Right: Info panel with date & tech stack -->
                                <div class="w-1/2 pl-12">
                                    <div class="space-y-6">
                                        <DateBadge :exp="exp" :index="index" align="left" />
                                        <TechStackCard :exp="exp" :index="index" align="left" />
                                    </div>
                                </div>
                            </div>
                            
                            <div v-else class="flex items-start">
                                <!-- Left: Info panel with date & tech stack -->
                                <div class="w-1/2 pr-12 text-right">
                                    <div class="space-y-6">
                                        <DateBadge :exp="exp" :index="index" align="right" />
                                        <TechStackCard :exp="exp" :index="index" align="right" />
                                    </div>
                                </div>
                                
                                <!-- Center icon -->
                                <div class="absolute left-1/2 transform -translate-x-1/2">
                                    <TimelineIcon :exp="exp" :index="index" />
                                </div>
                                
                                <!-- Right content -->
                                <div class="w-1/2 pl-12">
                                    <div class="experience-card experience-card-right"
                                         :style="{ animationDelay: `${index * 0.2}s` }">
                                        <ExperienceContent :exp="exp" :index="index" align="left" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Mobile: Single column layout -->
                        <div class="md:hidden pl-20">
                            <!-- Icon -->
                            <div class="absolute left-0">
                                <TimelineIcon :exp="exp" :index="index" />
                            </div>
                            
                            <!-- Content -->
                            <div class="experience-card experience-card-mobile"
                                 :style="{ animationDelay: `${index * 0.2}s` }">
                                <DateBadge :exp="exp" :index="index" align="left" class="mb-4" />
                                <ExperienceContent :exp="exp" :index="index" align="left" />
                                <TechStackCard :exp="exp" :index="index" align="left" class="mt-4" />
                            </div>
                        </div>
                    </div>
                    
                    <!-- End marker -->
                    <div class="relative text-center">
                        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-2xl shadow-purple-500/50 animate-pulse-glow">
                            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { defineComponent, h } from 'vue';

defineProps({
    experiences: {
        type: Array,
        required: true
    }
});

const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const getCircuitPath = (index) => {
    const paths = [
        'M 0 100 Q 200 50, 400 100 T 800 100',
        'M 1200 200 Q 1000 150, 800 200 T 400 200',
        'M 200 400 Q 400 350, 600 400 T 1000 400',
        'M 1000 600 Q 800 550, 600 600 T 200 600',
        'M 100 800 Q 300 750, 500 800 T 900 800',
    ];
    return paths[index % paths.length];
};

// Timeline Icon Component
const TimelineIcon = defineComponent({
    props: ['exp', 'index'],
    setup(props) {
        return () => h('div', { 
            class: 'timeline-icon-wrapper',
            style: { animationDelay: `${props.index * 0.2}s` }
        }, [
            // Pulsing rings
            h('div', { class: 'absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-ping-slow opacity-75' }),
            h('div', { class: 'absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 blur-xl opacity-50' }),
            
            // Icon container
            props.exp.company_logo 
                ? h('div', { class: 'relative w-20 h-20 rounded-full bg-white flex items-center justify-center border-4 border-gray-900 shadow-2xl overflow-hidden p-2 z-10' }, [
                    h('img', { 
                        src: props.exp.company_logo, 
                        alt: props.exp.company,
                        class: 'w-full h-full object-contain'
                    })
                ])
                : h('div', { class: 'relative w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center border-4 border-gray-900 shadow-2xl z-10' }, [
                    h('svg', { 
                        class: 'w-10 h-10 text-white',
                        fill: 'none',
                        stroke: 'currentColor',
                        viewBox: '0 0 24 24'
                    }, [
                        h('path', {
                            'stroke-linecap': 'round',
                            'stroke-linejoin': 'round',
                            'stroke-width': '2',
                            d: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                        })
                    ])
                ])
        ]);
    }
});

// Date Badge Component
const DateBadge = defineComponent({
    props: ['exp', 'index', 'align'],
    setup(props) {
        const formatDate = (date) => {
            if (!date) return '';
            const d = new Date(date);
            return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        };
        
        return () => h('div', { 
            class: `date-badge ${props.align === 'right' ? 'text-right' : 'text-left'}`,
            style: { animationDelay: `${props.index * 0.2 + 0.1}s` }
        }, [
            h('div', { class: 'inline-flex flex-col gap-2 px-6 py-3 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 backdrop-blur-sm' }, [
                h('div', { class: 'flex items-center gap-2 text-indigo-300' }, [
                    h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
                        h('path', { 
                            'stroke-linecap': 'round', 
                            'stroke-linejoin': 'round', 
                            'stroke-width': '2',
                            d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                        })
                    ]),
                    h('span', { class: 'font-semibold text-sm' }, `${formatDate(props.exp.start_date)} - ${props.exp.is_current ? 'Present' : formatDate(props.exp.end_date)}`)
                ]),
                props.exp.location && h('div', { class: 'flex items-center gap-2 text-purple-300' }, [
                    h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
                        h('path', { 
                            'stroke-linecap': 'round', 
                            'stroke-linejoin': 'round', 
                            'stroke-width': '2',
                            d: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                        }),
                        h('path', { 
                            'stroke-linecap': 'round', 
                            'stroke-linejoin': 'round', 
                            'stroke-width': '2',
                            d: 'M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                        })
                    ]),
                    h('span', { class: 'font-medium text-sm' }, props.exp.location)
                ])
            ])
        ]);
    }
});

// Tech Stack Card Component
const TechStackCard = defineComponent({
    props: ['exp', 'index', 'align'],
    setup(props) {
        // Extract technologies from the experience data
        const getTechnologies = () => {
            // If technologies array exists, use it
            if (props.exp.technologies && Array.isArray(props.exp.technologies)) {
                return props.exp.technologies;
            }
            
            // Otherwise, try to extract from achievements or description
            const text = (props.exp.achievements || props.exp.description || '').toLowerCase();
            const techKeywords = [
                'php', 'laravel', 'vue.js', 'vue', 'react', 'node.js', 'python', 'django',
                'aws', 'docker', 'kubernetes', 'redis', 'mysql', 'postgresql', 'mongodb',
                'typescript', 'javascript', 'tailwind', 'sass', 'webpack', 'vite',
                'api', 'rest', 'graphql', 'microservices', 'ci/cd', 'jenkins', 'github actions',
                'terraform', 'nginx', 'apache', 'elasticsearch', 'rabbitmq', 'kafka',
                'three.js', 'webgl', 'd3.js', 'socket.io', 'websocket'
            ];
            
            const foundTechs = techKeywords.filter(tech => {
                const pattern = new RegExp(`\\b${tech.replace('.', '\\.')}\\b`, 'i');
                return pattern.test(text);
            });
            
            return foundTechs.length > 0 ? foundTechs.slice(0, 8) : [];
        };
        
        const technologies = getTechnologies();
        
        if (technologies.length === 0) return () => null;
        
        return () => h('div', { 
            class: `tech-stack-card ${props.align === 'right' ? 'text-right' : 'text-left'}`,
            style: { animationDelay: `${props.index * 0.2 + 0.15}s` }
        }, [
            h('div', { class: 'relative group' }, [
                // Holographic glow effect
                h('div', { class: 'absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 rounded-2xl blur-xl transition-all duration-500' }),
                
                // Card
                h('div', { class: 'relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 group-hover:border-cyan-500/50 transition-all duration-500 shadow-lg' }, [
                    // Header
                    h('div', { class: 'flex items-center gap-2 mb-4' }, [
                        h('svg', { class: 'w-5 h-5 text-cyan-400', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
                            h('path', {
                                'stroke-linecap': 'round',
                                'stroke-linejoin': 'round',
                                'stroke-width': '2',
                                d: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
                            })
                        ]),
                        h('h4', { class: 'text-sm font-bold text-gray-300 uppercase tracking-wider' }, 'Tech Stack')
                    ]),
                    
                    // Tech badges
                    h('div', { class: `flex flex-wrap gap-2 ${props.align === 'right' ? 'justify-end' : 'justify-start'}` }, 
                        technologies.map((tech, techIndex) => 
                            h('div', { 
                                key: tech,
                                class: 'tech-badge',
                                style: { animationDelay: `${props.index * 0.2 + 0.15 + techIndex * 0.05}s` }
                            }, [
                                h('div', { class: 'relative group/badge' }, [
                                    // Badge glow
                                    h('div', { class: 'absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-0 group-hover/badge:opacity-50 transition-opacity duration-300' }),
                                    
                                    // Badge content
                                    h('div', { class: 'relative px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 backdrop-blur-sm hover:border-cyan-400/60 transition-all duration-300 hover:scale-105' }, [
                                        h('span', { class: 'text-xs font-semibold text-cyan-300 group-hover/badge:text-cyan-200 transition-colors' }, tech)
                                    ])
                                ])
                            ])
                        )
                    )
                ])
            ])
        ]);
    }
});

// Experience Content Component
const ExperienceContent = defineComponent({
    props: ['exp', 'index', 'align'],
    setup(props) {
        return () => h('div', { class: 'relative group' }, [
            // Hover glow effect
            h('div', { class: 'absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 rounded-2xl blur-xl transition-all duration-500' }),
            
            // Card content - always left-aligned
            h('div', { class: 'relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 group-hover:border-indigo-500/50 transition-all duration-500 shadow-xl text-left' }, [
                // Header
                h('div', { class: 'mb-6' }, [
                    h('h3', { class: 'text-3xl font-black text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300' }, props.exp.position),
                    props.exp.company_url
                        ? h('a', { 
                            href: props.exp.company_url,
                            target: '_blank',
                            class: 'text-xl text-indigo-400 hover:text-indigo-300 transition-colors duration-300 inline-flex items-center gap-2 font-semibold'
                        }, [
                            props.exp.company,
                            h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
                                h('path', { 
                                    'stroke-linecap': 'round',
                                    'stroke-linejoin': 'round',
                                    'stroke-width': '2',
                                    d: 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                                })
                            ])
                        ])
                        : h('p', { class: 'text-xl text-indigo-400 font-semibold' }, props.exp.company)
                ]),
                
                // Description
                h('div', { 
                    class: 'text-gray-300 text-lg leading-relaxed mb-6 description-content',
                    innerHTML: props.exp.description
                }),
                
                // Achievements
                props.exp.achievements && h('div', { class: 'mt-6 pt-6 border-t border-gray-700/50' }, [
                    h('h4', { class: 'text-white font-bold mb-4 flex items-center gap-2 text-lg' }, [
                        h('svg', { class: 'w-6 h-6 text-indigo-400', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
                            h('path', { 
                                'stroke-linecap': 'round',
                                'stroke-linejoin': 'round',
                                'stroke-width': '2',
                                d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                            })
                        ]),
                        'Key Achievements & Technologies'
                    ]),
                    h('div', { 
                        class: 'text-gray-300 text-lg leading-relaxed achievements-content',
                        innerHTML: props.exp.achievements
                    })
                ])
            ])
        ]);
    }
});
</script>

<style scoped>
/* Circuit line animation */
.circuit-line {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: drawLine 3s ease-in-out infinite;
}

@keyframes drawLine {
    0%, 100% {
        stroke-dashoffset: 1000;
        opacity: 0.3;
    }
    50% {
        stroke-dashoffset: 0;
        opacity: 1;
    }
}

/* Timeline icon wrapper */
.timeline-icon-wrapper {
    position: relative;
    width: 80px;
    height: 80px;
    animation: iconFadeIn 0.8s ease-out both;
}

@keyframes iconFadeIn {
    from {
        opacity: 0;
        transform: scale(0) rotate(-180deg);
    }
    to {
        opacity: 1;
        transform: scale(1) rotate(0deg);
    }
}

/* Ping animation for timeline icons */
@keyframes ping-slow {
    0%, 100% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.5);
        opacity: 0;
    }
}

.animate-ping-slow {
    animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* Experience cards animations */
.experience-card {
    animation: fadeInScale 0.8s ease-out both;
}

.experience-card-left {
    animation: slideInLeft 0.8s ease-out both;
}

.experience-card-right {
    animation: slideInRight 0.8s ease-out both;
}

.experience-card-mobile {
    animation: slideInUp 0.8s ease-out both;
}

@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(-50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
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

/* Date badge animation */
.date-badge {
    animation: fadeInDown 0.6s ease-out both;
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Tech stack card animation */
.tech-stack-card {
    animation: fadeInScale 0.8s ease-out both;
}

/* Tech badge animation */
.tech-badge {
    animation: techBadgePop 0.5s ease-out both;
}

@keyframes techBadgePop {
    0% {
        opacity: 0;
        transform: scale(0) rotate(-5deg);
    }
    70% {
        transform: scale(1.1) rotate(2deg);
    }
    100% {
        opacity: 1;
        transform: scale(1) rotate(0deg);
    }
}

/* Pulse glow animation for end marker */
@keyframes pulse-glow {
    0%, 100% {
        box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
        transform: scale(1);
    }
    50% {
        box-shadow: 0 0 40px rgba(139, 92, 246, 0.8);
        transform: scale(1.05);
    }
}

.animate-pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
}

/* Description content styling */
.description-content :deep(p) {
    margin: 0.75rem 0;
}

.description-content :deep(ul) {
    list-style-type: none;
    padding-left: 0;
    margin: 0.75rem 0;
}

.description-content :deep(ul li) {
    position: relative;
    padding-left: 1.75rem;
    margin: 0.75rem 0;
}

.description-content :deep(ul li:before) {
    content: "▸";
    position: absolute;
    left: 0;
    color: #818cf8;
    font-weight: bold;
    font-size: 1.2em;
}

.description-content :deep(ol) {
    list-style-type: decimal;
    padding-left: 1.5rem;
    margin: 0.75rem 0;
}

.description-content :deep(li) {
    margin: 0.75rem 0;
}

.description-content :deep(strong) {
    color: #a78bfa;
    font-weight: 700;
}

.description-content :deep(code) {
    background: rgba(139, 92, 246, 0.15);
    padding: 0.25rem 0.5rem;
    border-radius: 0.375rem;
    font-family: 'Fira Code', monospace;
    font-size: 0.9em;
    color: #c4b5fd;
    border: 1px solid rgba(139, 92, 246, 0.3);
}

.description-content :deep(a) {
    color: #818cf8;
    text-decoration: underline;
    transition: color 0.3s;
}

.description-content :deep(a:hover) {
    color: #a78bfa;
}

/* Achievements content styling */
.achievements-content :deep(p) {
    margin: 0.75rem 0;
}

.achievements-content :deep(ul) {
    list-style-type: none;
    padding-left: 0;
    margin: 0.75rem 0;
}

.achievements-content :deep(ul li) {
    position: relative;
    padding-left: 1.75rem;
    margin: 0.75rem 0;
}

.achievements-content :deep(ul li:before) {
    content: "✓";
    position: absolute;
    left: 0;
    color: #10b981;
    font-weight: bold;
    font-size: 1.2em;
}

.achievements-content :deep(ol) {
    list-style-type: decimal;
    padding-left: 1.5rem;
    margin: 0.75rem 0;
}

.achievements-content :deep(li) {
    margin: 0.75rem 0;
}

.achievements-content :deep(strong) {
    color: #a78bfa;
    font-weight: 700;
}

.achievements-content :deep(code) {
    background: rgba(139, 92, 246, 0.15);
    padding: 0.25rem 0.5rem;
    border-radius: 0.375rem;
    font-family: 'Fira Code', monospace;
    font-size: 0.9em;
    color: #c4b5fd;
    border: 1px solid rgba(139, 92, 246, 0.3);
}

.achievements-content :deep(a) {
    color: #818cf8;
    text-decoration: underline;
    transition: color 0.3s;
}

.achievements-content :deep(a:hover) {
    color: #a78bfa;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .timeline-icon-wrapper {
        width: 64px;
        height: 64px;
    }
}
</style>

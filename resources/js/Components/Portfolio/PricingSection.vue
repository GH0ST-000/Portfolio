<template>
    <section id="pricing" class="relative py-32 overflow-hidden bg-gradient-to-b from-gray-950 via-black to-gray-950">
        <!-- Animated background -->
        <div class="absolute inset-0">
            <!-- Mesh gradient overlay -->
            <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),transparent_50%),radial-gradient(ellipse_at_center,rgba(147,51,234,0.15),transparent_50%)]"></div>
            
            <!-- Dynamic gradient orbs -->
            <div class="absolute inset-0 opacity-40">
                <div class="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/40 to-purple-600/40 rounded-full blur-[120px] animate-float-slow"></div>
                <div class="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/30 to-pink-600/30 rounded-full blur-[120px] animate-float-slow animation-delay-3000"></div>
            </div>
            
            <!-- Grid pattern -->
            <div class="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
        </div>
        
        <!-- Floating particles -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div v-for="i in 15" :key="i" 
                 class="absolute rounded-full animate-float-particle"
                 :class="i % 3 === 0 ? 'w-2 h-2 bg-indigo-400/60' : i % 3 === 1 ? 'w-1.5 h-1.5 bg-purple-400/50' : 'w-1 h-1 bg-pink-400/40'"
                 :style="getParticleStyle(i)"></div>
        </div>
        
        <div class="container mx-auto px-6 lg:px-8 relative z-10">
            <!-- Header -->
            <div class="text-center mb-20">
                <div class="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-pink-500/20 bg-pink-500/5 backdrop-blur-sm">
                    <span class="relative flex h-2 w-2">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                    </span>
                    <span class="text-sm font-semibold tracking-wide text-pink-300 uppercase">Pricing Plans</span>
                </div>
                
                <h2 class="text-5xl md:text-7xl font-black mb-6 relative">
                    <span class="absolute inset-0 blur-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30"></span>
                    <span class="relative bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight block">
                        My Pricing
                    </span>
                </h2>
                
                <p class="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
                    Flexible pricing options tailored to your project needs
                </p>
            </div>
            
            <!-- Pricing Cards -->
            <div class="max-w-7xl mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <article v-for="(pricing, index) in pricings" 
                             :key="pricing.id"
                             class="pricing-card-reveal"
                             :style="{ animationDelay: `${index * 0.15}s` }">
                        
                        <div class="pricing-card group relative h-full"
                             :class="{ 'recommended-card': pricing.recommended }">
                            
                            <!-- Recommended Badge -->
                            <div v-if="pricing.recommended" 
                                 class="absolute -top-4 left-1/2 -translate-x-1/2 z-30">
                                <div class="relative">
                                    <div class="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-lg opacity-75 animate-pulse-glow"></div>
                                    <div class="relative px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 border-2 border-amber-300/50 shadow-2xl">
                                        <span class="text-sm font-black text-white uppercase tracking-wide">Recommended</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Glow effect -->
                            <div class="absolute -inset-[2px] bg-gradient-to-br from-indigo-500/50 via-purple-500/50 to-pink-500/50 rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700"
                                 :class="{ '!opacity-100': pricing.recommended }"></div>
                            
                            <!-- Card container -->
                            <div class="relative h-full bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-gray-950/95 rounded-3xl border overflow-hidden backdrop-blur-xl transition-all duration-500"
                                 :class="pricing.recommended ? 'border-purple-500/40' : 'border-white/10 group-hover:border-purple-400/30'">
                                
                                <!-- Cursor following spotlight -->
                                <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                    <div class="absolute inset-0 bg-[radial-gradient(circle_400px_at_50%_50%,rgba(139,92,246,0.1),transparent_60%)]"></div>
                                </div>
                                
                                <!-- Animated shine -->
                                <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                    <div class="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 animate-shine-sweep"></div>
                                </div>
                                
                                <div class="relative p-8 h-full flex flex-col">
                                    <!-- Header -->
                                    <div class="text-center mb-8">
                                        <h3 class="text-3xl font-black text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-200 group-hover:via-purple-200 group-hover:to-pink-200 group-hover:bg-clip-text transition-all duration-500">
                                            {{ pricing.title }}
                                        </h3>
                                        <p v-if="pricing.subtitle" class="text-gray-400 text-sm">
                                            {{ pricing.subtitle }}
                                        </p>
                                    </div>
                                    
                                    <!-- Price -->
                                    <div class="text-center mb-8">
                                        <div class="flex items-baseline justify-center gap-2 mb-2">
                                            <span class="text-6xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                                {{ formatPrice(pricing.price) }}
                                            </span>
                                            <span class="text-xl text-gray-400 font-semibold">
                                                / {{ pricing.period }}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <!-- Description -->
                                    <p v-if="pricing.description" class="text-gray-400 text-center mb-8 leading-relaxed">
                                        {{ pricing.description }}
                                    </p>
                                    
                                    <!-- Features -->
                                    <div class="flex-1 mb-8">
                                        <ul class="space-y-4">
                                            <li v-for="(feature, fIndex) in pricing.features" 
                                                :key="fIndex"
                                                class="flex items-start gap-3 text-gray-300"
                                                :style="{ animationDelay: `${index * 0.15 + fIndex * 0.05}s` }">
                                                <span class="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/40 flex items-center justify-center mt-0.5">
                                                    <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                                                    </svg>
                                                </span>
                                                <span class="text-sm leading-relaxed">{{ feature }}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    
                                    <!-- CTA Button -->
                                    <a :href="getContactUrl(pricing)" 
                                       @click="handlePricingClick(pricing, $event)"
                                       class="group/btn relative overflow-hidden rounded-xl block">
                                        <div class="absolute inset-0 transition-opacity duration-300"
                                             :class="pricing.recommended ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : 'bg-gray-800/80'"></div>
                                        <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                                        
                                        <div class="relative px-6 py-4 flex items-center justify-center gap-2 font-bold text-lg transition-transform duration-300 group-hover/btn:scale-105"
                                             :class="pricing.recommended ? 'text-white' : 'text-gray-300 group-hover/btn:text-white'">
                                            <span>{{ pricing.button_text }}</span>
                                            <svg class="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                            </svg>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
            
            <!-- Additional Info -->
            <div class="mt-16 text-center">
                <p class="text-gray-400 text-lg">
                    Need a custom solution? 
                    <a href="#contact" class="text-indigo-400 hover:text-indigo-300 font-bold transition-colors duration-300">
                        Let's talk about your project
                    </a>
                </p>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    pricings: {
        type: Array,
        required: true
    }
});

const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
};

const getParticleStyle = (index) => {
    return {
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 10 + 10}s`,
    };
};

const getContactUrl = (pricing) => {
    // If custom URL is set, use it
    if (pricing.button_url && pricing.button_url !== '#contact') {
        return pricing.button_url;
    }
    // Otherwise, link to contact with plan parameter
    return `#contact?plan=${encodeURIComponent(pricing.title)}`;
};

const handlePricingClick = (pricing, event) => {
    // Only handle internal #contact links
    const url = pricing.button_url || '#contact';
    
    if (url === '#contact' || url.startsWith('#contact')) {
        event.preventDefault();
        
        // Update URL with plan parameter
        const newUrl = `${window.location.pathname}#contact?plan=${encodeURIComponent(pricing.title)}`;
        window.history.pushState({}, '', newUrl);
        
        // Scroll to contact section
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        // Trigger a custom event that ContactSection can listen to
        window.dispatchEvent(new CustomEvent('pricing-selected', { 
            detail: { 
                plan: pricing.title,
                price: pricing.price,
                period: pricing.period
            } 
        }));
    }
};
</script>

<style scoped>
/* Background animations */
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

/* Card reveal animation */
@keyframes reveal-pricing {
    0% {
        opacity: 0;
        transform: translateY(60px) scale(0.9);
        filter: blur(10px);
    }
    100% {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0);
    }
}

.pricing-card-reveal {
    animation: reveal-pricing 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* Recommended card */
.recommended-card {
    transform: scale(1.05);
}

@media (max-width: 1024px) {
    .recommended-card {
        transform: scale(1);
    }
}

/* Shine sweep effect */
@keyframes shine-sweep {
    0% {
        transform: translateX(-100%) translateY(-100%) rotate(45deg);
    }
    100% {
        transform: translateX(100%) translateY(100%) rotate(45deg);
    }
}

.animate-shine-sweep {
    animation: shine-sweep 2s ease-in-out;
}

/* Pulse glow */
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
</style>

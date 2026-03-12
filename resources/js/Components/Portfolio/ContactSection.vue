<template>
    <section id="contact" class="py-24 relative overflow-hidden">
        <!-- Animated background -->
        <div class="absolute inset-0 bg-gradient-to-b from-gray-950 via-purple-950/10 to-gray-950"></div>
        
        <!-- Floating gradient orbs -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-float-slow"></div>
            <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-float-slow" style="animation-delay: 1s;"></div>
        </div>
        
        <div class="container mx-auto px-6 relative z-10">
            <!-- Header with stagger animation -->
            <div class="text-center mb-16 animate-fade-in-up">
                <div class="inline-block mb-4 overflow-hidden">
                    <span class="block text-sm font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 uppercase animate-slide-down">
                        Let's Connect
                    </span>
                </div>
                <h2 class="text-5xl md:text-7xl font-black mb-4 relative inline-block">
                    <span class="absolute inset-0 blur-2xl bg-gradient-to-r from-indigo-600 to-purple-600 opacity-50 animate-glow-pulse"></span>
                    <span class="relative bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Get In Touch
                    </span>
                </h2>
                <p class="text-gray-400 text-lg max-w-2xl mx-auto">
                    Have a project in mind? Let's create something amazing together!
                </p>
            </div>
            
            <div class="max-w-3xl mx-auto">
                <!-- Success message with slide animation -->
                <div v-if="form.recentlySuccessful" 
                     class="mb-8 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-2xl text-green-300 backdrop-blur-xl animate-slide-in-right">
                    <div class="flex items-center gap-3">
                        <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span class="font-semibold">Thank you for your message! I'll get back to you soon.</span>
                    </div>
                </div>
                
                <!-- Form with glassmorphism -->
                <form @submit.prevent="submitForm" class="form-container animate-fade-in-up" style="animation-delay: 0.2s;">
                    <!-- Animated border glow -->
                    <div class="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-1000"></div>
                    
                    <!-- Form content -->
                    <div class="relative bg-gradient-to-br from-gray-900/40 via-purple-900/20 to-gray-900/40 rounded-3xl border border-gray-600/30 overflow-hidden backdrop-blur-2xl p-8 md:p-12">
                        <!-- Holographic overlay -->
                        <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 hover:from-indigo-500/5 hover:via-purple-500/5 hover:to-pink-500/5 transition-all duration-700 pointer-events-none"></div>
                        
                        <div class="relative space-y-6">
                            <!-- Name field -->
                            <div class="form-field" style="animation-delay: 0.3s;">
                                <label for="name" class="block text-gray-300 mb-2 font-semibold flex items-center gap-2">
                                    <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                    </svg>
                                    Name
                                </label>
                                <div class="relative group/input">
                                    <input 
                                        type="text" 
                                        id="name"
                                        v-model="form.name"
                                        required
                                        class="input-field"
                                        placeholder="Your name"
                                    />
                                    <div class="input-glow"></div>
                                </div>
                                <div v-if="form.errors.name" class="text-red-400 text-sm mt-2 flex items-center gap-1 animate-shake">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    {{ form.errors.name }}
                                </div>
                            </div>
                            
                            <!-- Email field -->
                            <div class="form-field" style="animation-delay: 0.4s;">
                                <label for="email" class="block text-gray-300 mb-2 font-semibold flex items-center gap-2">
                                    <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                    </svg>
                                    Email
                                </label>
                                <div class="relative group/input">
                                    <input 
                                        type="email" 
                                        id="email"
                                        v-model="form.email"
                                        required
                                        class="input-field"
                                        placeholder="your.email@example.com"
                                    />
                                    <div class="input-glow"></div>
                                </div>
                                <div v-if="form.errors.email" class="text-red-400 text-sm mt-2 flex items-center gap-1 animate-shake">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    {{ form.errors.email }}
                                </div>
                            </div>
                            
                            <!-- Subject field -->
                            <div class="form-field" style="animation-delay: 0.5s;">
                                <label for="subject" class="block text-gray-300 mb-2 font-semibold flex items-center gap-2">
                                    <svg class="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                                    </svg>
                                    Subject
                                </label>
                                <div class="relative group/input">
                                    <input 
                                        type="text" 
                                        id="subject"
                                        v-model="form.subject"
                                        class="input-field"
                                        placeholder="What's this about?"
                                    />
                                    <div class="input-glow"></div>
                                </div>
                                <div v-if="form.errors.subject" class="text-red-400 text-sm mt-2 flex items-center gap-1 animate-shake">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    {{ form.errors.subject }}
                                </div>
                            </div>
                            
                            <!-- Message field -->
                            <div class="form-field" style="animation-delay: 0.6s;">
                                <label for="message" class="block text-gray-300 mb-2 font-semibold flex items-center gap-2">
                                    <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                                    </svg>
                                    Message
                                </label>
                                <div class="relative group/input">
                                    <textarea 
                                        id="message"
                                        v-model="form.message"
                                        required
                                        rows="6"
                                        class="input-field resize-none"
                                        placeholder="Tell me about your project..."
                                    ></textarea>
                                    <div class="input-glow"></div>
                                </div>
                                <div v-if="form.errors.message" class="text-red-400 text-sm mt-2 flex items-center gap-1 animate-shake">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    {{ form.errors.message }}
                                </div>
                            </div>
                            
                            <!-- Submit button with animation -->
                            <button 
                                type="submit"
                                :disabled="form.processing"
                                class="submit-button"
                                style="animation-delay: 0.7s;">
                                <div class="button-glow"></div>
                                <div class="button-bg"></div>
                                <div class="button-shine"></div>
                                <span class="button-content">
                                    <svg v-if="!form.processing" class="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                                    </svg>
                                    <svg v-else class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                    </svg>
                                    <span v-if="!form.processing">Send Message</span>
                                    <span v-else">Sending...</span>
                                </span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useForm } from '@inertiajs/vue3';
import { onMounted, onUnmounted } from 'vue';

const form = useForm({
    name: '',
    email: '',
    subject: '',
    message: '',
});

const handlePricingSelected = (event) => {
    const { plan, price, period } = event.detail;
    form.subject = `Interested in ${plan} Plan ($${price}/${period})`;
    
    // Optional: Also pre-fill message
    if (!form.message) {
        form.message = `Hi! I'm interested in the ${plan} pricing plan. Please provide more details about getting started.`;
    }
};

onMounted(() => {
    // Check for URL parameters to auto-fill subject
    const urlParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash;
    
    // Check if hash contains query parameters
    if (hash.includes('?')) {
        const hashParams = new URLSearchParams(hash.split('?')[1]);
        const pricingPlan = hashParams.get('plan');
        
        if (pricingPlan) {
            form.subject = `Interested in ${pricingPlan} Plan`;
        }
    } else {
        // Check regular URL parameters
        const pricingPlan = urlParams.get('plan');
        if (pricingPlan) {
            form.subject = `Interested in ${pricingPlan} Plan`;
        }
    }
    
    // Listen for pricing selection event
    window.addEventListener('pricing-selected', handlePricingSelected);
});

onUnmounted(() => {
    window.removeEventListener('pricing-selected', handlePricingSelected);
});

const submitForm = () => {
    form.post(route('contact.store'), {
        preserveScroll: true,
        onSuccess: () => {
            form.reset();
            // Clear URL parameters after successful submission
            if (window.history.replaceState) {
                window.history.replaceState({}, document.title, window.location.pathname + window.location.hash.split('?')[0]);
            }
        },
    });
};
</script>

<style scoped>
/* Smooth animations */
@keyframes float-slow {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(30px, -30px) rotate(120deg); }
    66% { transform: translate(-20px, 20px) rotate(240deg); }
}

@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slide-down {
    from {
        transform: translateY(-20px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes slide-in-right {
    from {
        transform: translateX(50px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes glow-pulse {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.05); }
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}

@keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

@keyframes border-flow {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}

.animate-float-slow {
    animation: float-slow 20s ease-in-out infinite;
}

.animate-fade-in-up {
    animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
}

.animate-slide-down {
    animation: slide-down 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-slide-in-right {
    animation: slide-in-right 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-glow-pulse {
    animation: glow-pulse 3s ease-in-out infinite;
}

.animate-shake {
    animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97);
}

/* Form container */
.form-container {
    position: relative;
    opacity: 0;
    animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.form-container:hover .absolute {
    opacity: 0.3;
}

/* Form fields with stagger */
.form-field {
    opacity: 0;
    animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Input fields */
.input-field {
    width: 100%;
    padding: 1rem 1.25rem;
    background: linear-gradient(135deg, rgba(17, 24, 39, 0.6) 0%, rgba(31, 41, 55, 0.6) 100%);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(107, 114, 128, 0.3);
    border-radius: 1rem;
    color: white;
    font-size: 1rem;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    z-index: 1;
}

.input-field::placeholder {
    color: rgba(156, 163, 175, 0.5);
}

.input-field:focus {
    outline: none;
    border-color: rgba(139, 92, 246, 0.6);
    background: linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(31, 41, 55, 0.8) 100%);
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1),
                0 10px 30px -10px rgba(139, 92, 246, 0.3);
    transform: translateY(-2px);
}

.group\/input:hover .input-field {
    border-color: rgba(139, 92, 246, 0.4);
}

/* Input glow effect */
.input-glow {
    position: absolute;
    inset: -2px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6, #d946ef);
    border-radius: 1rem;
    opacity: 0;
    filter: blur(8px);
    transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 0;
    pointer-events: none;
}

.group\/input:hover .input-glow {
    opacity: 0.2;
}

.input-field:focus ~ .input-glow {
    opacity: 0.4;
    animation: glow-pulse 2s ease-in-out infinite;
}

/* Submit button */
.submit-button {
    width: 100%;
    position: relative;
    padding: 1.25rem 2rem;
    font-weight: 700;
    font-size: 1.125rem;
    color: white;
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
    animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    transform-style: preserve-3d;
    perspective: 1000px;
}

.submit-button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

.submit-button:not(:disabled):hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 20px 40px -12px rgba(99, 102, 241, 0.5),
                0 10px 20px -8px rgba(139, 92, 246, 0.3);
}

.submit-button:not(:disabled):active {
    transform: translateY(-2px) scale(1.01);
}

/* Button background */
.button-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 0;
}

.submit-button:not(:disabled):hover .button-bg {
    background: linear-gradient(135deg, #818cf8 0%, #a78bfa 50%, #e879f9 100%);
}

/* Button glow */
.button-glow {
    position: absolute;
    inset: -3px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6, #d946ef);
    border-radius: 1rem;
    opacity: 0;
    filter: blur(20px);
    transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
    animation: glow-pulse 3s ease-in-out infinite;
}

.submit-button:not(:disabled):hover .button-glow {
    opacity: 0.8;
}

/* Button shine effect */
.button-shine {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.7s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 2;
    pointer-events: none;
}

.submit-button:not(:disabled):hover .button-shine {
    left: 100%;
}

/* Button content */
.button-content {
    position: relative;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.025em;
}

/* Smooth transitions for all interactive elements */
* {
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>

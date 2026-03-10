<template>
    <section id="contact" class="py-20 bg-gray-900/50 backdrop-blur-sm">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Get In Touch</h2>
                <div class="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto"></div>
            </div>
            
            <div class="max-w-2xl mx-auto">
                <div v-if="form.recentlySuccessful" class="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-300">
                    Thank you for your message! I'll get back to you soon.
                </div>
                
                <form @submit.prevent="submitForm" class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                    <div class="mb-6">
                        <label for="name" class="block text-gray-300 mb-2 font-medium">Name</label>
                        <input 
                            type="text" 
                            id="name"
                            v-model="form.name"
                            required
                            class="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                            placeholder="Your name"
                        />
                        <div v-if="form.errors.name" class="text-red-400 text-sm mt-1">{{ form.errors.name }}</div>
                    </div>
                    
                    <div class="mb-6">
                        <label for="email" class="block text-gray-300 mb-2 font-medium">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            v-model="form.email"
                            required
                            class="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                            placeholder="your.email@example.com"
                        />
                        <div v-if="form.errors.email" class="text-red-400 text-sm mt-1">{{ form.errors.email }}</div>
                    </div>
                    
                    <div class="mb-6">
                        <label for="subject" class="block text-gray-300 mb-2 font-medium">Subject</label>
                        <input 
                            type="text" 
                            id="subject"
                            v-model="form.subject"
                            class="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                            placeholder="What's this about?"
                        />
                        <div v-if="form.errors.subject" class="text-red-400 text-sm mt-1">{{ form.errors.subject }}</div>
                    </div>
                    
                    <div class="mb-6">
                        <label for="message" class="block text-gray-300 mb-2 font-medium">Message</label>
                        <textarea 
                            id="message"
                            v-model="form.message"
                            required
                            rows="6"
                            class="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors duration-300 resize-none"
                            placeholder="Your message..."
                        ></textarea>
                        <div v-if="form.errors.message" class="text-red-400 text-sm mt-1">{{ form.errors.message }}</div>
                    </div>
                    
                    <button 
                        type="submit"
                        :disabled="form.processing"
                        class="w-full px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        <span v-if="!form.processing">Send Message</span>
                        <span v-else>Sending...</span>
                    </button>
                </form>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useForm } from '@inertiajs/vue3';

const form = useForm({
    name: '',
    email: '',
    subject: '',
    message: '',
});

const submitForm = () => {
    form.post(route('contact.store'), {
        preserveScroll: true,
        onSuccess: () => {
            form.reset();
        },
    });
};
</script>

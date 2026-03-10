<template>
    <section id="experience" class="py-20">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Work Experience</h2>
                <div class="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto"></div>
            </div>
            
            <div class="max-w-4xl mx-auto">
                <div class="relative">
                    <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-600"></div>
                    
                    <div v-for="(exp, index) in experiences" :key="exp.id" class="relative mb-12 pl-20">
                        <div v-if="exp.company_logo" class="absolute left-0 w-16 h-16 rounded-full flex items-center justify-center border-4 border-gray-900 shadow-lg shadow-indigo-500/50 bg-white p-2 overflow-hidden">
                            <img :src="exp.company_logo" :alt="exp.company" class="w-full h-full object-contain" />
                        </div>
                        <div v-else class="absolute left-0 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center border-4 border-gray-900 shadow-lg shadow-indigo-500/50">
                            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                        </div>
                        
                        <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-indigo-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20">
                            <div class="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                                <div>
                                    <h3 class="text-2xl font-bold text-white mb-1">{{ exp.position }}</h3>
                                    <a v-if="exp.company_url" 
                                       :href="exp.company_url" 
                                       target="_blank"
                                       class="text-indigo-400 hover:text-indigo-300 transition-colors duration-300 text-lg">
                                        {{ exp.company }}
                                    </a>
                                    <p v-else class="text-indigo-400 text-lg">{{ exp.company }}</p>
                                </div>
                                <div class="mt-2 md:mt-0 text-gray-400">
                                    <p class="flex items-center gap-2">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                        </svg>
                                        {{ formatDate(exp.start_date) }} - {{ exp.is_current ? 'Present' : formatDate(exp.end_date) }}
                                    </p>
                                    <p v-if="exp.location" class="flex items-center gap-2 mt-1">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        </svg>
                                        {{ exp.location }}
                                    </p>
                                </div>
                            </div>
                            
                            <div class="text-gray-300 leading-relaxed mb-4 description-content" v-html="exp.description"></div>
                            
                            <div v-if="exp.achievements" class="mt-4 pt-4 border-t border-gray-700">
                                <h4 class="text-white font-semibold mb-2 flex items-center gap-2">
                                    <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    Key Achievements & Technologies
                                </h4>
                                <div class="text-gray-300 leading-relaxed achievements-content" v-html="exp.achievements"></div>
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
</script>

<style scoped>
/* Description content styling */
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
    color: #818cf8;
    font-weight: 600;
}

.description-content :deep(code) {
    background: rgba(99, 102, 241, 0.2);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-family: monospace;
}

.description-content :deep(a) {
    color: #818cf8;
    text-decoration: underline;
}

/* Achievements content styling */
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
    color: #818cf8;
    font-weight: 600;
}

.achievements-content :deep(code) {
    background: rgba(99, 102, 241, 0.2);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-family: monospace;
}

.achievements-content :deep(a) {
    color: #818cf8;
    text-decoration: underline;
}
</style>

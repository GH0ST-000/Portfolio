<template>
    <div class="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 scroll-smooth">
        <canvas ref="threeCanvas" class="fixed inset-0 w-full h-full -z-10"></canvas>
        
        <div class="relative z-10">
            <Navbar />
            
            <HeroSection />
            
            <AboutSection />
            
            <SkillsSection :skills="skills" />
            
            <ProjectsSection :projects="projects" />
            
            <ExperienceSection :experiences="experiences" />
            
            <PricingSection :pricings="pricings" />
            
            <ContactSection />
            
            <Footer />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useThreeBackground } from '@/Composables/useThreeBackground';
import Navbar from '@/Components/Portfolio/Navbar.vue';
import HeroSection from '@/Components/Portfolio/HeroSection.vue';
import AboutSection from '@/Components/Portfolio/AboutSection.vue';
import SkillsSection from '@/Components/Portfolio/SkillsSection.vue';
import ProjectsSection from '@/Components/Portfolio/ProjectsSection.vue';
import ExperienceSection from '@/Components/Portfolio/ExperienceSection.vue';
import PricingSection from '@/Components/Portfolio/PricingSection.vue';
import ContactSection from '@/Components/Portfolio/ContactSection.vue';
import Footer from '@/Components/Portfolio/Footer.vue';

const props = defineProps({
    projects: Array,
    skills: Object,
    experiences: Array,
    pricings: Array,
});

const threeCanvas = ref(null);

onMounted(() => {
    useThreeBackground(threeCanvas);
});
</script>

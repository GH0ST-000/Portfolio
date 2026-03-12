<template>
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Create Pricing Plan
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 bg-white border-b border-gray-200">
                        <form @submit.prevent="submit">
                            <!-- Title -->
                            <div class="mb-6">
                                <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
                                    Title <span class="text-red-500">*</span>
                                </label>
                                <input v-model="form.title" 
                                       id="title" 
                                       type="text" 
                                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                       required>
                                <div v-if="form.errors.title" class="text-red-600 text-sm mt-1">{{ form.errors.title }}</div>
                            </div>

                            <!-- Subtitle -->
                            <div class="mb-6">
                                <label for="subtitle" class="block text-sm font-medium text-gray-700 mb-2">
                                    Subtitle
                                </label>
                                <input v-model="form.subtitle" 
                                       id="subtitle" 
                                       type="text" 
                                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                <div v-if="form.errors.subtitle" class="text-red-600 text-sm mt-1">{{ form.errors.subtitle }}</div>
                            </div>

                            <!-- Price and Period -->
                            <div class="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label for="price" class="block text-sm font-medium text-gray-700 mb-2">
                                        Price <span class="text-red-500">*</span>
                                    </label>
                                    <input v-model="form.price" 
                                           id="price" 
                                           type="number" 
                                           step="0.01"
                                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                           required>
                                    <div v-if="form.errors.price" class="text-red-600 text-sm mt-1">{{ form.errors.price }}</div>
                                </div>

                                <div>
                                    <label for="period" class="block text-sm font-medium text-gray-700 mb-2">
                                        Period <span class="text-red-500">*</span>
                                    </label>
                                    <select v-model="form.period" 
                                            id="period" 
                                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required>
                                        <option value="hour">Hour</option>
                                        <option value="week">Week</option>
                                        <option value="month">Month</option>
                                        <option value="project">Project</option>
                                    </select>
                                    <div v-if="form.errors.period" class="text-red-600 text-sm mt-1">{{ form.errors.period }}</div>
                                </div>
                            </div>

                            <!-- Description -->
                            <div class="mb-6">
                                <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea v-model="form.description" 
                                          id="description" 
                                          rows="3"
                                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
                                <div v-if="form.errors.description" class="text-red-600 text-sm mt-1">{{ form.errors.description }}</div>
                            </div>

                            <!-- Features -->
                            <div class="mb-6">
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    Features
                                </label>
                                <div v-for="(feature, index) in form.features" :key="index" class="flex gap-2 mb-2">
                                    <input v-model="form.features[index]" 
                                           type="text" 
                                           class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                           placeholder="Enter feature">
                                    <button type="button" 
                                            @click="removeFeature(index)"
                                            class="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                                        Remove
                                    </button>
                                </div>
                                <button type="button" 
                                        @click="addFeature"
                                        class="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                                    + Add Feature
                                </button>
                            </div>

                            <!-- Button Text and URL -->
                            <div class="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label for="button_text" class="block text-sm font-medium text-gray-700 mb-2">
                                        Button Text <span class="text-red-500">*</span>
                                    </label>
                                    <input v-model="form.button_text" 
                                           id="button_text" 
                                           type="text" 
                                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                           required>
                                    <div v-if="form.errors.button_text" class="text-red-600 text-sm mt-1">{{ form.errors.button_text }}</div>
                                </div>

                                <div>
                                    <label for="button_url" class="block text-sm font-medium text-gray-700 mb-2">
                                        Button URL
                                    </label>
                                    <input v-model="form.button_url" 
                                           id="button_url" 
                                           type="text" 
                                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                           placeholder="#contact">
                                    <div v-if="form.errors.button_url" class="text-red-600 text-sm mt-1">{{ form.errors.button_url }}</div>
                                </div>
                            </div>

                            <!-- Order -->
                            <div class="mb-6">
                                <label for="order" class="block text-sm font-medium text-gray-700 mb-2">
                                    Display Order
                                </label>
                                <input v-model="form.order" 
                                       id="order" 
                                       type="number" 
                                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                <div v-if="form.errors.order" class="text-red-600 text-sm mt-1">{{ form.errors.order }}</div>
                            </div>

                            <!-- Checkboxes -->
                            <div class="mb-6 space-y-4">
                                <div class="flex items-center">
                                    <input v-model="form.recommended" 
                                           id="recommended" 
                                           type="checkbox" 
                                           class="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500">
                                    <label for="recommended" class="ml-2 text-sm text-gray-700">
                                        Mark as Recommended
                                    </label>
                                </div>

                                <div class="flex items-center">
                                    <input v-model="form.active" 
                                           id="active" 
                                           type="checkbox" 
                                           class="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500">
                                    <label for="active" class="ml-2 text-sm text-gray-700">
                                        Active (visible on site)
                                    </label>
                                </div>
                            </div>

                            <!-- Submit Buttons -->
                            <div class="flex items-center justify-end gap-4">
                                <Link :href="route('admin.pricing.index')" 
                                      class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                                    Cancel
                                </Link>
                                <button type="submit" 
                                        :disabled="form.processing"
                                        class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50">
                                    {{ form.processing ? 'Creating...' : 'Create Pricing Plan' }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<script setup>
import { Link, useForm } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

const form = useForm({
    title: '',
    subtitle: '',
    price: 0,
    period: 'week',
    description: '',
    features: [''],
    button_text: 'Order Now',
    button_url: '#contact',
    recommended: false,
    active: true,
    order: 0,
});

const addFeature = () => {
    form.features.push('');
};

const removeFeature = (index) => {
    form.features.splice(index, 1);
};

const submit = () => {
    // Filter out empty features
    form.features = form.features.filter(f => f.trim() !== '');
    
    form.post(route('admin.pricing.store'));
};
</script>

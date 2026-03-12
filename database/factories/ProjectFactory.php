<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'image' => $this->faker->optional()->imageUrl(800, 600, 'projects'),
            'technologies' => ['Laravel', 'Vue.js', 'Tailwind CSS'],
            'github_url' => $this->faker->optional()->url(),
            'live_url' => $this->faker->optional()->url(),
            'featured' => $this->faker->boolean(30),
            'order' => $this->faker->numberBetween(1, 100),
            'is_published' => true,
        ];
    }
}

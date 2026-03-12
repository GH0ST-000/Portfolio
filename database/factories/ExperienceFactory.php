<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Experience>
 */
class ExperienceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'company' => $this->faker->company(),
            'company_logo' => $this->faker->optional()->imageUrl(200, 200, 'company'),
            'position' => $this->faker->jobTitle(),
            'description' => $this->faker->paragraph(),
            'achievements' => $this->faker->optional()->sentences(3, true),
            'start_date' => $this->faker->date(),
            'end_date' => $this->faker->optional()->date(),
            'is_current' => $this->faker->boolean(20),
            'location' => $this->faker->optional()->city(),
            'company_url' => $this->faker->optional()->url(),
            'order' => $this->faker->numberBetween(1, 100),
            'is_published' => true,
        ];
    }
}

<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Skill>
 */
class SkillFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'category' => $this->faker->randomElement(['Backend', 'Frontend', 'DevOps', 'Database']),
            'proficiency' => $this->faker->numberBetween(1, 100),
            'icon' => $this->faker->optional()->word(),
            'order' => $this->faker->numberBetween(1, 100),
            'is_published' => true,
        ];
    }
}

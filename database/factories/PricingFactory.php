<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pricing>
 */
class PricingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $periods = ['hour', 'week', 'month', 'project'];
        $period = $this->faker->randomElement($periods);
        
        return [
            'title' => $this->faker->randomElement(['Hourly', 'Freelancing', 'Full Time', 'Project Based']),
            'subtitle' => $this->faker->sentence(3),
            'price' => $this->faker->randomFloat(2, 50, 500),
            'period' => $period,
            'description' => $this->faker->paragraph(),
            'features' => [
                'Up to ' . $this->faker->numberBetween(10, 50) . ' hours per week',
                'WordPress and web updates',
                'Site backups and security',
                'SEO optimizations',
                'Content creation',
                'Priority support',
            ],
            'button_text' => 'Order Now',
            'button_url' => '#contact',
            'recommended' => $this->faker->boolean(30),
            'active' => true,
            'order' => $this->faker->numberBetween(0, 10),
        ];
    }
}

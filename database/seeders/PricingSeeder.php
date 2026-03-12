<?php

namespace Database\Seeders;

use App\Models\Pricing;
use Illuminate\Database\Seeder;

class PricingSeeder extends Seeder
{
    public function run(): void
    {
        $pricings = [
            [
                'title' => 'Hourly',
                'subtitle' => 'Perfect for small tasks',
                'price' => 75.00,
                'period' => 'hour',
                'description' => 'Ideal for quick fixes, consultations, and small updates.',
                'features' => [
                    'On-demand availability',
                    'No minimum hours',
                    'Perfect for urgent fixes',
                    'Code reviews',
                    'Consultations',
                ],
                'button_text' => 'Get Started',
                'button_url' => '#contact',
                'recommended' => false,
                'active' => true,
                'order' => 1,
            ],
            [
                'title' => 'Freelancing',
                'subtitle' => 'Ongoing projects',
                'price' => 225.00,
                'period' => 'week',
                'description' => 'Ongoing part-time work at a monthly retainer rate. Perfect for regular maintenance and incremental improvements.',
                'features' => [
                    'Up to 15 hours per week',
                    'Site backups and security',
                    'WordPress and web updates',
                    'SEO optimizations',
                    'Content creation',
                    'Priority support',
                ],
                'button_text' => 'Order Now',
                'button_url' => '#contact',
                'recommended' => true,
                'active' => true,
                'order' => 2,
            ],
            [
                'title' => 'Full Time',
                'subtitle' => 'Dedicated development',
                'price' => 4500.00,
                'period' => 'month',
                'description' => 'Full-time dedicated development for your project with complete focus and commitment.',
                'features' => [
                    '40 hours per week',
                    'Dedicated developer',
                    'Daily stand-ups',
                    'Complete project ownership',
                    'All maintenance included',
                    '24/7 priority support',
                    'Regular progress updates',
                ],
                'button_text' => 'Hire Me',
                'button_url' => '#contact',
                'recommended' => false,
                'active' => true,
                'order' => 3,
            ],
        ];

        foreach ($pricings as $pricing) {
            Pricing::create($pricing);
        }
    }
}

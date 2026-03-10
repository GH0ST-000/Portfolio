<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Skill;
use App\Models\Experience;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        // Sample Projects
        Project::create([
            'title' => 'E-Commerce Platform',
            'description' => 'A full-featured e-commerce platform with payment integration, inventory management, and real-time analytics. Built with modern technologies to provide seamless shopping experience.',
            'technologies' => ['Laravel', 'Vue.js', 'Tailwind CSS', 'Stripe', 'Redis'],
            'github_url' => 'https://github.com/username/ecommerce',
            'live_url' => 'https://demo-ecommerce.com',
            'featured' => true,
            'order' => 1,
            'is_published' => true,
        ]);

        Project::create([
            'title' => 'Task Management System',
            'description' => 'A collaborative task management application with real-time updates, team collaboration features, and advanced reporting capabilities.',
            'technologies' => ['Laravel', 'Livewire', 'Alpine.js', 'MySQL'],
            'github_url' => 'https://github.com/username/task-manager',
            'live_url' => 'https://demo-tasks.com',
            'featured' => true,
            'order' => 2,
            'is_published' => true,
        ]);

        Project::create([
            'title' => 'Social Media Dashboard',
            'description' => 'A comprehensive social media analytics dashboard that aggregates data from multiple platforms and provides actionable insights.',
            'technologies' => ['React', 'Node.js', 'MongoDB', 'Chart.js'],
            'github_url' => 'https://github.com/username/social-dashboard',
            'featured' => false,
            'order' => 3,
            'is_published' => true,
        ]);

        // Sample Skills - Frontend
        Skill::create([
            'name' => 'Vue.js',
            'category' => 'Frontend',
            'proficiency' => 90,
            'order' => 1,
            'is_published' => true,
        ]);

        Skill::create([
            'name' => 'React',
            'category' => 'Frontend',
            'proficiency' => 85,
            'order' => 2,
            'is_published' => true,
        ]);

        Skill::create([
            'name' => 'Tailwind CSS',
            'category' => 'Frontend',
            'proficiency' => 95,
            'order' => 3,
            'is_published' => true,
        ]);

        Skill::create([
            'name' => 'Three.js',
            'category' => 'Frontend',
            'proficiency' => 75,
            'order' => 4,
            'is_published' => true,
        ]);

        // Sample Skills - Backend
        Skill::create([
            'name' => 'Laravel',
            'category' => 'Backend',
            'proficiency' => 95,
            'order' => 1,
            'is_published' => true,
        ]);

        Skill::create([
            'name' => 'Node.js',
            'category' => 'Backend',
            'proficiency' => 80,
            'order' => 2,
            'is_published' => true,
        ]);

        Skill::create([
            'name' => 'PHP',
            'category' => 'Backend',
            'proficiency' => 90,
            'order' => 3,
            'is_published' => true,
        ]);

        Skill::create([
            'name' => 'MySQL',
            'category' => 'Backend',
            'proficiency' => 85,
            'order' => 4,
            'is_published' => true,
        ]);

        // Sample Skills - Tools
        Skill::create([
            'name' => 'Git',
            'category' => 'Tools',
            'proficiency' => 90,
            'order' => 1,
            'is_published' => true,
        ]);

        Skill::create([
            'name' => 'Docker',
            'category' => 'Tools',
            'proficiency' => 75,
            'order' => 2,
            'is_published' => true,
        ]);

        Skill::create([
            'name' => 'AWS',
            'category' => 'Tools',
            'proficiency' => 70,
            'order' => 3,
            'is_published' => true,
        ]);

        // Sample Experiences
        Experience::create([
            'company' => 'Tech Solutions Inc.',
            'position' => 'Senior Full Stack Developer',
            'description' => 'Led development of multiple high-traffic web applications. Mentored junior developers and established best practices for the development team. Implemented CI/CD pipelines and improved deployment processes.',
            'start_date' => '2022-01-01',
            'end_date' => null,
            'is_current' => true,
            'location' => 'San Francisco, CA',
            'company_url' => 'https://techsolutions.com',
            'order' => 1,
            'is_published' => true,
        ]);

        Experience::create([
            'company' => 'Digital Innovations LLC',
            'position' => 'Full Stack Developer',
            'description' => 'Developed and maintained e-commerce platforms serving thousands of daily users. Collaborated with cross-functional teams to deliver projects on time and within budget.',
            'start_date' => '2020-03-01',
            'end_date' => '2021-12-31',
            'is_current' => false,
            'location' => 'Remote',
            'company_url' => 'https://digitalinnovations.com',
            'order' => 2,
            'is_published' => true,
        ]);

        Experience::create([
            'company' => 'StartUp Ventures',
            'position' => 'Junior Developer',
            'description' => 'Worked on various web development projects, gaining experience in modern frameworks and technologies. Contributed to both frontend and backend development.',
            'start_date' => '2018-06-01',
            'end_date' => '2020-02-28',
            'is_current' => false,
            'location' => 'New York, NY',
            'order' => 3,
            'is_published' => true,
        ]);
    }
}

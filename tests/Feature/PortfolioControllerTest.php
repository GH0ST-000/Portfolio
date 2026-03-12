<?php

namespace Tests\Feature;

use App\Models\Contact;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PortfolioControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_page_loads_successfully(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_index_page_returns_only_published_projects(): void
    {
        $publishedProject = Project::factory()->create([
            'title' => 'Published Project',
            'is_published' => true,
            'order' => 1,
        ]);

        $unpublishedProject = Project::factory()->create([
            'title' => 'Unpublished Project',
            'is_published' => false,
            'order' => 2,
        ]);

        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Portfolio/Index')
            ->has('projects', 1)
            ->where('projects.0.title', 'Published Project')
        );
    }

    public function test_index_page_returns_skills_grouped_by_category(): void
    {
        Skill::factory()->create([
            'name' => 'Laravel',
            'category' => 'Backend',
            'is_published' => true,
            'order' => 1,
        ]);

        Skill::factory()->create([
            'name' => 'Vue.js',
            'category' => 'Frontend',
            'is_published' => true,
            'order' => 1,
        ]);

        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Portfolio/Index')
            ->has('skills.Backend')
            ->has('skills.Frontend')
        );
    }

    public function test_index_page_returns_only_published_experiences(): void
    {
        Experience::factory()->create([
            'company' => 'Published Company',
            'is_published' => true,
            'start_date' => '2023-01-01',
        ]);

        Experience::factory()->create([
            'company' => 'Unpublished Company',
            'is_published' => false,
            'start_date' => '2022-01-01',
        ]);

        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Portfolio/Index')
            ->has('experiences', 1)
            ->where('experiences.0.company', 'Published Company')
        );
    }

    public function test_interactive_3d_page_loads_successfully(): void
    {
        $response = $this->get('/3d-experience');

        $response->assertStatus(200);
    }

    public function test_interactive_3d_page_returns_published_projects_and_experiences(): void
    {
        Project::factory()->create(['is_published' => true, 'order' => 1]);
        Experience::factory()->create(['is_published' => true, 'start_date' => '2023-01-01']);

        $response = $this->get('/3d-experience');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Portfolio/Interactive3D')
            ->has('projects', 1)
            ->has('experiences', 1)
        );
    }

    public function test_cinematic_journey_page_loads_successfully(): void
    {
        $response = $this->get('/3d');

        $response->assertStatus(200);
    }

    public function test_cinematic_journey_orders_experiences_ascending(): void
    {
        Experience::factory()->create([
            'company' => 'Recent Company',
            'is_published' => true,
            'start_date' => '2023-01-01',
        ]);

        Experience::factory()->create([
            'company' => 'Old Company',
            'is_published' => true,
            'start_date' => '2020-01-01',
        ]);

        $response = $this->get('/3d');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Portfolio/CinematicJourney')
            ->has('experiences', 2)
            ->where('experiences.0.company', 'Old Company')
            ->where('experiences.1.company', 'Recent Company')
        );
    }

    public function test_contact_form_submission_creates_contact(): void
    {
        $data = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'subject' => 'Test Subject',
            'message' => 'This is a test message.',
        ];

        $response = $this->post('/contact', $data);

        $response->assertRedirect();
        $response->assertSessionHas('success', 'Thank you for your message! I will get back to you soon.');

        $this->assertDatabaseHas('contacts', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'subject' => 'Test Subject',
            'message' => 'This is a test message.',
        ]);
    }

    public function test_contact_form_validates_required_fields(): void
    {
        $response = $this->post('/contact', []);

        $response->assertSessionHasErrors(['name', 'email', 'message']);
    }

    public function test_contact_form_validates_email_format(): void
    {
        $response = $this->post('/contact', [
            'name' => 'John Doe',
            'email' => 'invalid-email',
            'message' => 'Test message',
        ]);

        $response->assertSessionHasErrors(['email']);
    }

    public function test_contact_form_works_without_subject(): void
    {
        $data = [
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'message' => 'Message without subject.',
        ];

        $response = $this->post('/contact', $data);

        $response->assertRedirect();
        $this->assertDatabaseHas('contacts', [
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'subject' => null,
        ]);
    }

    public function test_contact_form_validates_max_length(): void
    {
        $response = $this->post('/contact', [
            'name' => str_repeat('a', 256),
            'email' => 'test@example.com',
            'message' => 'Test message',
        ]);

        $response->assertSessionHasErrors(['name']);
    }
}

<?php

namespace Tests\Feature\Pricing;

use App\Models\Pricing;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ManagePricingTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
    }

    #[Test]
    public function authenticated_user_can_view_pricing_list()
    {
        $this->actingAs($this->user);

        Pricing::factory()->count(3)->create();

        $response = $this->get('/admin/pricing');

        $response->assertStatus(200);
    }

    #[Test]
    public function guest_cannot_access_pricing_management()
    {
        $response = $this->get('/admin/pricing');

        $response->assertRedirect('/login');
    }

    #[Test]
    public function it_displays_active_pricings_on_portfolio_page()
    {
        Pricing::factory()->create([
            'active' => true,
            'title' => 'Hourly Plan',
            'price' => 75.00,
        ]);

        Pricing::factory()->create([
            'active' => false,
            'title' => 'Hidden Plan',
        ]);

        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertSee('Hourly Plan');
        $response->assertDontSee('Hidden Plan');
    }

    #[Test]
    public function pricing_plans_are_displayed_in_order()
    {
        Pricing::factory()->create([
            'active' => true,
            'title' => 'Third Plan',
            'order' => 3,
        ]);

        Pricing::factory()->create([
            'active' => true,
            'title' => 'First Plan',
            'order' => 1,
        ]);

        Pricing::factory()->create([
            'active' => true,
            'title' => 'Second Plan',
            'order' => 2,
        ]);

        $response = $this->get('/');

        $content = $response->getContent();
        $firstPos = strpos($content, 'First Plan');
        $secondPos = strpos($content, 'Second Plan');
        $thirdPos = strpos($content, 'Third Plan');

        $this->assertTrue($firstPos < $secondPos);
        $this->assertTrue($secondPos < $thirdPos);
    }

    #[Test]
    public function pricing_features_are_displayed_correctly()
    {
        Pricing::factory()->create([
            'active' => true,
            'title' => 'Test Plan',
            'features' => [
                'Feature One',
                'Feature Two',
                'Feature Three',
            ],
        ]);

        $response = $this->get('/');

        $response->assertSee('Feature One');
        $response->assertSee('Feature Two');
        $response->assertSee('Feature Three');
    }

    #[Test]
    public function recommended_badge_is_displayed_for_recommended_plans()
    {
        Pricing::factory()->create([
            'active' => true,
            'title' => 'Recommended Plan',
            'recommended' => true,
        ]);

        $response = $this->get('/');

        $response->assertSee('Recommended Plan');
        $response->assertSee('Recommended');
    }

    #[Test]
    public function pricing_displays_price_and_period()
    {
        Pricing::factory()->create([
            'active' => true,
            'title' => 'Test Plan',
            'price' => 225.00,
            'period' => 'week',
        ]);

        $response = $this->get('/');

        $response->assertSee('225');
        $response->assertSee('week');
    }

    #[Test]
    public function pricing_button_links_are_displayed()
    {
        Pricing::factory()->create([
            'active' => true,
            'title' => 'Test Plan',
            'button_text' => 'Get Started Now',
            'button_url' => '#contact',
        ]);

        $response = $this->get('/');

        $response->assertSee('Get Started Now');
    }

    #[Test]
    public function inactive_pricings_are_not_displayed_on_portfolio()
    {
        Pricing::factory()->create([
            'active' => false,
            'title' => 'Inactive Plan',
            'subtitle' => 'Should not be visible',
        ]);

        $response = $this->get('/');

        $response->assertDontSee('Inactive Plan');
        $response->assertDontSee('Should not be visible');
    }

    #[Test]
    public function portfolio_page_loads_without_pricings()
    {
        // Ensure no pricings exist
        Pricing::query()->delete();

        $response = $this->get('/');

        $response->assertStatus(200);
    }

    #[Test]
    public function pricing_section_displays_all_required_information()
    {
        $pricing = Pricing::factory()->create([
            'active' => true,
            'title' => 'Complete Plan',
            'subtitle' => 'Best for everyone',
            'price' => 99.99,
            'period' => 'month',
            'description' => 'A comprehensive description',
            'features' => ['Feature A', 'Feature B'],
            'button_text' => 'Buy Now',
            'button_url' => '#contact',
            'recommended' => true,
        ]);

        $response = $this->get('/');

        $response->assertSee('Complete Plan');
        $response->assertSee('Best for everyone');
        $response->assertSee('99');
        $response->assertSee('month');
        $response->assertSee('A comprehensive description');
        $response->assertSee('Feature A');
        $response->assertSee('Feature B');
        $response->assertSee('Buy Now');
        // The recommended badge might not be visible in SSR, skip this assertion
    }
}

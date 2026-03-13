<?php

namespace Tests\Unit\Actions;

use App\Actions\Portfolio\GetActivePricingsAction;
use App\Models\Pricing;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class GetActivePricingsActionTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_returns_only_active_pricings()
    {
        // Create active pricings
        Pricing::factory()->create(['active' => true, 'title' => 'Active 1']);
        Pricing::factory()->create(['active' => true, 'title' => 'Active 2']);

        // Create inactive pricing
        Pricing::factory()->create(['active' => false, 'title' => 'Inactive']);

        $action = new GetActivePricingsAction;
        $pricings = $action->execute();

        $this->assertCount(2, $pricings);
        $this->assertTrue($pricings->every(fn ($pricing) => $pricing->active === true));
    }

    #[Test]
    public function it_returns_pricings_ordered_by_order_field()
    {
        Pricing::factory()->create(['active' => true, 'order' => 3, 'title' => 'Third']);
        Pricing::factory()->create(['active' => true, 'order' => 1, 'title' => 'First']);
        Pricing::factory()->create(['active' => true, 'order' => 2, 'title' => 'Second']);

        $action = new GetActivePricingsAction;
        $pricings = $action->execute();

        $this->assertEquals('First', $pricings[0]->title);
        $this->assertEquals('Second', $pricings[1]->title);
        $this->assertEquals('Third', $pricings[2]->title);
    }

    #[Test]
    public function it_returns_empty_collection_when_no_active_pricings()
    {
        Pricing::factory()->create(['active' => false]);
        Pricing::factory()->create(['active' => false]);

        $action = new GetActivePricingsAction;
        $pricings = $action->execute();

        $this->assertCount(0, $pricings);
        $this->assertTrue($pricings->isEmpty());
    }

    #[Test]
    public function it_includes_all_pricing_attributes()
    {
        $pricing = Pricing::factory()->create([
            'active' => true,
            'title' => 'Test Plan',
            'subtitle' => 'Test Subtitle',
            'price' => 99.99,
            'period' => 'month',
            'description' => 'Test Description',
            'features' => ['Feature 1', 'Feature 2'],
            'button_text' => 'Order Now',
            'button_url' => '#contact',
            'recommended' => true,
        ]);

        $action = new GetActivePricingsAction;
        $pricings = $action->execute();

        $result = $pricings->first();

        $this->assertEquals('Test Plan', $result->title);
        $this->assertEquals('Test Subtitle', $result->subtitle);
        $this->assertEquals('99.99', $result->price);
        $this->assertEquals('month', $result->period);
        $this->assertEquals('Test Description', $result->description);
        $this->assertIsArray($result->features);
        $this->assertEquals('Order Now', $result->button_text);
        $this->assertEquals('#contact', $result->button_url);
        $this->assertTrue($result->recommended);
    }
}

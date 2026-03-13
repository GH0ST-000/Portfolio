<?php

namespace Tests\Unit\Models;

use App\Models\Pricing;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class PricingTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_can_create_a_pricing_plan()
    {
        $pricing = Pricing::factory()->create([
            'title' => 'Test Plan',
            'price' => 99.99,
            'period' => 'month',
        ]);

        $this->assertDatabaseHas('pricings', [
            'title' => 'Test Plan',
            'price' => '99.99',
            'period' => 'month',
        ]);
    }

    #[Test]
    public function it_casts_features_to_array()
    {
        $pricing = Pricing::factory()->create([
            'features' => ['Feature 1', 'Feature 2', 'Feature 3'],
        ]);

        $this->assertIsArray($pricing->features);
        $this->assertCount(3, $pricing->features);
        $this->assertEquals('Feature 1', $pricing->features[0]);
    }

    #[Test]
    public function it_casts_recommended_to_boolean()
    {
        $pricing = Pricing::factory()->create([
            'recommended' => true,
        ]);

        $this->assertTrue($pricing->recommended);
        $this->assertIsBool($pricing->recommended);
    }

    #[Test]
    public function it_casts_active_to_boolean()
    {
        $pricing = Pricing::factory()->create([
            'active' => false,
        ]);

        $this->assertFalse($pricing->active);
        $this->assertIsBool($pricing->active);
    }

    #[Test]
    public function it_casts_price_to_decimal()
    {
        $pricing = Pricing::factory()->create([
            'price' => 99.99,
        ]);

        $this->assertEquals('99.99', $pricing->price);
    }

    #[Test]
    public function it_can_scope_active_pricings()
    {
        Pricing::factory()->create(['active' => true, 'title' => 'Active']);
        Pricing::factory()->create(['active' => false, 'title' => 'Inactive']);

        $activePricings = Pricing::active()->get();

        $this->assertCount(1, $activePricings);
        $this->assertEquals('Active', $activePricings->first()->title);
    }

    #[Test]
    public function it_can_scope_ordered_pricings()
    {
        Pricing::factory()->create(['order' => 3, 'title' => 'Third']);
        Pricing::factory()->create(['order' => 1, 'title' => 'First']);
        Pricing::factory()->create(['order' => 2, 'title' => 'Second']);

        $orderedPricings = Pricing::ordered()->get();

        $this->assertEquals('First', $orderedPricings[0]->title);
        $this->assertEquals('Second', $orderedPricings[1]->title);
        $this->assertEquals('Third', $orderedPricings[2]->title);
    }

    #[Test]
    public function it_has_fillable_attributes()
    {
        $fillable = [
            'title',
            'subtitle',
            'price',
            'period',
            'description',
            'features',
            'button_text',
            'button_url',
            'recommended',
            'active',
            'order',
        ];

        $pricing = new Pricing;

        $this->assertEquals($fillable, $pricing->getFillable());
    }

    #[Test]
    public function it_stores_features_as_json_in_database()
    {
        $features = ['Feature 1', 'Feature 2', 'Feature 3'];

        $pricing = Pricing::factory()->create([
            'features' => $features,
        ]);

        $this->assertDatabaseHas('pricings', [
            'id' => $pricing->id,
            'features' => json_encode($features),
        ]);
    }

    #[Test]
    public function it_can_retrieve_all_pricing_attributes()
    {
        $pricing = Pricing::factory()->create([
            'title' => 'Premium Plan',
            'subtitle' => 'Best value',
            'price' => 199.99,
            'period' => 'month',
            'description' => 'A great plan',
            'features' => ['Feature 1', 'Feature 2'],
            'button_text' => 'Get Started',
            'button_url' => '#contact',
            'recommended' => true,
            'active' => true,
            'order' => 1,
        ]);

        $this->assertEquals('Premium Plan', $pricing->title);
        $this->assertEquals('Best value', $pricing->subtitle);
        $this->assertEquals('199.99', $pricing->price);
        $this->assertEquals('month', $pricing->period);
        $this->assertEquals('A great plan', $pricing->description);
        $this->assertCount(2, $pricing->features);
        $this->assertEquals('Get Started', $pricing->button_text);
        $this->assertEquals('#contact', $pricing->button_url);
        $this->assertTrue($pricing->recommended);
        $this->assertTrue($pricing->active);
        $this->assertEquals(1, $pricing->order);
    }
}

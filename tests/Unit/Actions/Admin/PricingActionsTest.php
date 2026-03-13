<?php

namespace Tests\Unit\Actions\Admin;

use App\Actions\Admin\Pricing\DeletePricingAction;
use App\Actions\Admin\Pricing\GetAllPricingsAction;
use App\Actions\Admin\Pricing\StorePricingAction;
use App\Actions\Admin\Pricing\UpdatePricingAction;
use App\Models\Pricing;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class PricingActionsTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function get_all_pricings_action_returns_all_pricings_ordered()
    {
        Pricing::factory()->create(['order' => 3, 'title' => 'Third']);
        Pricing::factory()->create(['order' => 1, 'title' => 'First']);
        Pricing::factory()->create(['order' => 2, 'title' => 'Second']);

        $action = new GetAllPricingsAction;
        $pricings = $action->execute();

        $this->assertCount(3, $pricings);
        $this->assertEquals('First', $pricings[0]->title);
        $this->assertEquals('Second', $pricings[1]->title);
        $this->assertEquals('Third', $pricings[2]->title);
    }

    #[Test]
    public function get_all_pricings_action_includes_inactive_pricings()
    {
        Pricing::factory()->create(['active' => true, 'title' => 'Active']);
        Pricing::factory()->create(['active' => false, 'title' => 'Inactive']);

        $action = new GetAllPricingsAction;
        $pricings = $action->execute();

        $this->assertCount(2, $pricings);
        $titles = $pricings->pluck('title')->toArray();
        $this->assertContains('Active', $titles);
        $this->assertContains('Inactive', $titles);
    }

    #[Test]
    public function store_pricing_action_creates_new_pricing()
    {
        $data = [
            'title' => 'New Plan',
            'subtitle' => 'Great plan',
            'price' => 149.99,
            'period' => 'month',
            'description' => 'Description here',
            'features' => ['Feature 1', 'Feature 2'],
            'button_text' => 'Buy Now',
            'button_url' => '#contact',
            'recommended' => true,
            'active' => true,
            'order' => 1,
        ];

        $action = new StorePricingAction;
        $pricing = $action->execute($data);

        $this->assertInstanceOf(Pricing::class, $pricing);
        $this->assertEquals('New Plan', $pricing->title);
        $this->assertEquals('149.99', $pricing->price);
        $this->assertTrue($pricing->recommended);

        $this->assertDatabaseHas('pricings', [
            'title' => 'New Plan',
            'price' => '149.99',
        ]);
    }

    #[Test]
    public function update_pricing_action_updates_existing_pricing()
    {
        $pricing = Pricing::factory()->create([
            'title' => 'Old Title',
            'price' => 99.99,
        ]);

        $data = [
            'title' => 'Updated Title',
            'subtitle' => 'Updated subtitle',
            'price' => 199.99,
            'period' => 'month',
            'description' => 'Updated description',
            'features' => ['Updated Feature'],
            'button_text' => 'Updated Button',
            'button_url' => '#updated',
            'recommended' => false,
            'active' => true,
            'order' => 2,
        ];

        $action = new UpdatePricingAction;
        $updatedPricing = $action->execute($pricing, $data);

        $this->assertEquals('Updated Title', $updatedPricing->title);
        $this->assertEquals('199.99', $updatedPricing->price);
        $this->assertEquals('Updated subtitle', $updatedPricing->subtitle);

        $this->assertDatabaseHas('pricings', [
            'id' => $pricing->id,
            'title' => 'Updated Title',
            'price' => '199.99',
        ]);
    }

    #[Test]
    public function update_pricing_action_returns_fresh_model()
    {
        $pricing = Pricing::factory()->create(['title' => 'Old Title']);

        $data = [
            'title' => 'New Title',
            'subtitle' => 'Subtitle',
            'price' => 99.99,
            'period' => 'month',
            'description' => 'Description',
            'features' => ['Feature'],
            'button_text' => 'Button',
            'button_url' => '#url',
            'recommended' => false,
            'active' => true,
            'order' => 1,
        ];

        $action = new UpdatePricingAction;
        $updatedPricing = $action->execute($pricing, $data);

        $this->assertEquals('New Title', $updatedPricing->title);
        $this->assertNotSame($pricing, $updatedPricing);
    }

    #[Test]
    public function delete_pricing_action_deletes_pricing()
    {
        $pricing = Pricing::factory()->create(['title' => 'To Delete']);

        $this->assertDatabaseHas('pricings', ['title' => 'To Delete']);

        $action = new DeletePricingAction;
        $result = $action->execute($pricing);

        $this->assertTrue($result);
        $this->assertDatabaseMissing('pricings', ['title' => 'To Delete']);
    }

    #[Test]
    public function store_pricing_action_handles_array_features()
    {
        $data = [
            'title' => 'Test Plan',
            'subtitle' => 'Test',
            'price' => 50.00,
            'period' => 'hour',
            'description' => 'Test description',
            'features' => [
                'First feature',
                'Second feature',
                'Third feature',
            ],
            'button_text' => 'Test Button',
            'button_url' => '#test',
            'recommended' => false,
            'active' => true,
            'order' => 0,
        ];

        $action = new StorePricingAction;
        $pricing = $action->execute($data);

        $this->assertIsArray($pricing->features);
        $this->assertCount(3, $pricing->features);
        $this->assertEquals('First feature', $pricing->features[0]);
    }

    #[Test]
    public function update_pricing_action_can_change_active_status()
    {
        $pricing = Pricing::factory()->create(['active' => true]);

        $data = array_merge($pricing->toArray(), ['active' => false]);

        $action = new UpdatePricingAction;
        $updatedPricing = $action->execute($pricing, $data);

        $this->assertFalse($updatedPricing->active);
        $this->assertDatabaseHas('pricings', [
            'id' => $pricing->id,
            'active' => false,
        ]);
    }

    #[Test]
    public function update_pricing_action_can_change_recommended_status()
    {
        $pricing = Pricing::factory()->create(['recommended' => false]);

        $data = array_merge($pricing->toArray(), ['recommended' => true]);

        $action = new UpdatePricingAction;
        $updatedPricing = $action->execute($pricing, $data);

        $this->assertTrue($updatedPricing->recommended);
        $this->assertDatabaseHas('pricings', [
            'id' => $pricing->id,
            'recommended' => true,
        ]);
    }
}

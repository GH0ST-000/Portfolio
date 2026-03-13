<?php

namespace Tests\Unit\Actions\Portfolio;

use App\Actions\Portfolio\GetPublishedExperiencesAction;
use App\Models\Experience;
use Tests\TestCase;

class GetPublishedExperiencesActionTest extends TestCase
{
    public function test_it_returns_only_published_experiences(): void
    {
        Experience::factory()->create([
            'company' => 'Published Company',
            'is_published' => true,
        ]);

        Experience::factory()->create([
            'company' => 'Unpublished Company',
            'is_published' => false,
        ]);

        $action = new GetPublishedExperiencesAction;
        $experiences = $action->execute();

        $this->assertCount(1, $experiences);
        $this->assertEquals('Published Company', $experiences->first()->company);
    }

    public function test_it_orders_experiences_by_start_date_descending_by_default(): void
    {
        Experience::factory()->create([
            'company' => 'Old Company',
            'is_published' => true,
            'start_date' => '2020-01-01',
        ]);

        Experience::factory()->create([
            'company' => 'Recent Company',
            'is_published' => true,
            'start_date' => '2023-01-01',
        ]);

        Experience::factory()->create([
            'company' => 'Middle Company',
            'is_published' => true,
            'start_date' => '2021-01-01',
        ]);

        $action = new GetPublishedExperiencesAction;
        $experiences = $action->execute();

        $this->assertEquals('Recent Company', $experiences->first()->company);
        $this->assertEquals('Old Company', $experiences->last()->company);
    }

    public function test_it_can_order_experiences_ascending(): void
    {
        Experience::factory()->create([
            'company' => 'Old Company',
            'is_published' => true,
            'start_date' => '2020-01-01',
        ]);

        Experience::factory()->create([
            'company' => 'Recent Company',
            'is_published' => true,
            'start_date' => '2023-01-01',
        ]);

        $action = new GetPublishedExperiencesAction;
        $experiences = $action->execute('start_date', 'asc');

        $this->assertEquals('Old Company', $experiences->first()->company);
        $this->assertEquals('Recent Company', $experiences->last()->company);
    }

    public function test_it_transforms_company_logo_paths_to_storage_urls(): void
    {
        Experience::factory()->create([
            'company' => 'Company With Logo',
            'is_published' => true,
            'company_logo' => 'logos/company-logo.jpg',
        ]);

        $action = new GetPublishedExperiencesAction;
        $experiences = $action->execute();

        $this->assertStringContainsString('storage/logos/company-logo.jpg', $experiences->first()->company_logo);
    }

    public function test_it_handles_experiences_without_logos(): void
    {
        Experience::factory()->create([
            'company' => 'Company Without Logo',
            'is_published' => true,
            'company_logo' => null,
        ]);

        $action = new GetPublishedExperiencesAction;
        $experiences = $action->execute();

        $this->assertNull($experiences->first()->company_logo);
    }

    public function test_it_returns_empty_collection_when_no_published_experiences(): void
    {
        Experience::factory()->count(3)->create(['is_published' => false]);

        $action = new GetPublishedExperiencesAction;
        $experiences = $action->execute();

        $this->assertCount(0, $experiences);
    }
}

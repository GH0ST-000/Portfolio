<?php

namespace Tests\Unit\Actions\Portfolio;

use App\Actions\Portfolio\GetPublishedProjectsAction;
use App\Models\Project;
use Tests\TestCase;

class GetPublishedProjectsActionTest extends TestCase
{
    public function test_it_returns_only_published_projects(): void
    {
        Project::factory()->create([
            'title' => 'Published Project',
            'is_published' => true,
            'order' => 1,
        ]);

        Project::factory()->create([
            'title' => 'Unpublished Project',
            'is_published' => false,
            'order' => 2,
        ]);

        $action = new GetPublishedProjectsAction;
        $projects = $action->execute();

        $this->assertCount(1, $projects);
        $this->assertEquals('Published Project', $projects->first()->title);
    }

    public function test_it_orders_projects_by_default_order_field(): void
    {
        Project::factory()->create(['title' => 'Project C', 'is_published' => true, 'order' => 3]);
        Project::factory()->create(['title' => 'Project A', 'is_published' => true, 'order' => 1]);
        Project::factory()->create(['title' => 'Project B', 'is_published' => true, 'order' => 2]);

        $action = new GetPublishedProjectsAction;
        $projects = $action->execute();

        $this->assertEquals('Project A', $projects->first()->title);
        $this->assertEquals('Project C', $projects->last()->title);
    }

    public function test_it_can_order_projects_by_custom_field(): void
    {
        Project::factory()->create(['title' => 'Z Project', 'is_published' => true, 'order' => 1]);
        Project::factory()->create(['title' => 'A Project', 'is_published' => true, 'order' => 2]);

        $action = new GetPublishedProjectsAction;
        $projects = $action->execute('title', 'asc');

        $this->assertEquals('A Project', $projects->first()->title);
        $this->assertEquals('Z Project', $projects->last()->title);
    }

    public function test_it_transforms_image_paths_to_storage_urls(): void
    {
        Project::factory()->create([
            'title' => 'Project With Image',
            'is_published' => true,
            'image' => 'projects/test-image.jpg',
        ]);

        $action = new GetPublishedProjectsAction;
        $projects = $action->execute();

        $this->assertStringContainsString('storage/projects/test-image.jpg', $projects->first()->image);
    }

    public function test_it_handles_projects_without_images(): void
    {
        Project::factory()->create([
            'title' => 'Project Without Image',
            'is_published' => true,
            'image' => null,
        ]);

        $action = new GetPublishedProjectsAction;
        $projects = $action->execute();

        $this->assertNull($projects->first()->image);
    }

    public function test_it_returns_empty_collection_when_no_published_projects(): void
    {
        Project::factory()->count(3)->create(['is_published' => false]);

        $action = new GetPublishedProjectsAction;
        $projects = $action->execute();

        $this->assertCount(0, $projects);
    }
}

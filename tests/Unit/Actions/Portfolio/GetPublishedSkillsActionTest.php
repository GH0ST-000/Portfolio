<?php

namespace Tests\Unit\Actions\Portfolio;

use App\Actions\Portfolio\GetPublishedSkillsAction;
use App\Models\Skill;
use Tests\TestCase;

class GetPublishedSkillsActionTest extends TestCase
{
    public function test_it_returns_only_published_skills(): void
    {
        Skill::factory()->create([
            'name' => 'Published Skill',
            'is_published' => true,
            'category' => 'Backend',
        ]);

        Skill::factory()->create([
            'name' => 'Unpublished Skill',
            'is_published' => false,
            'category' => 'Backend',
        ]);

        $action = new GetPublishedSkillsAction;
        $skills = $action->execute();

        $this->assertCount(1, $skills);
        $this->assertEquals('Published Skill', $skills['Backend']->first()->name);
    }

    public function test_it_groups_skills_by_category(): void
    {
        Skill::factory()->create(['name' => 'Laravel', 'is_published' => true, 'category' => 'Backend']);
        Skill::factory()->create(['name' => 'PHP', 'is_published' => true, 'category' => 'Backend']);
        Skill::factory()->create(['name' => 'Vue.js', 'is_published' => true, 'category' => 'Frontend']);
        Skill::factory()->create(['name' => 'React', 'is_published' => true, 'category' => 'Frontend']);

        $action = new GetPublishedSkillsAction;
        $skills = $action->execute();

        $this->assertCount(2, $skills);
        $this->assertTrue($skills->has('Backend'));
        $this->assertTrue($skills->has('Frontend'));
        $this->assertCount(2, $skills['Backend']);
        $this->assertCount(2, $skills['Frontend']);
    }

    public function test_it_orders_skills_by_order_field(): void
    {
        Skill::factory()->create(['name' => 'Skill C', 'is_published' => true, 'category' => 'Test', 'order' => 3]);
        Skill::factory()->create(['name' => 'Skill A', 'is_published' => true, 'category' => 'Test', 'order' => 1]);
        Skill::factory()->create(['name' => 'Skill B', 'is_published' => true, 'category' => 'Test', 'order' => 2]);

        $action = new GetPublishedSkillsAction;
        $skills = $action->execute();

        $testSkills = $skills['Test'];
        $this->assertEquals('Skill A', $testSkills->first()->name);
        $this->assertEquals('Skill C', $testSkills->last()->name);
    }

    public function test_it_returns_empty_collection_when_no_published_skills(): void
    {
        Skill::factory()->count(5)->create(['is_published' => false]);

        $action = new GetPublishedSkillsAction;
        $skills = $action->execute();

        $this->assertCount(0, $skills);
    }
}

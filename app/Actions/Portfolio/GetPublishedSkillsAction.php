<?php

namespace App\Actions\Portfolio;

use App\Models\Skill;
use Illuminate\Support\Collection;

class GetPublishedSkillsAction
{
    public function execute(): Collection
    {
        return Skill::where('is_published', true)
            ->orderBy('order')
            ->get()
            ->groupBy('category');
    }
}

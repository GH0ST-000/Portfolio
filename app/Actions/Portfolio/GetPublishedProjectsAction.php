<?php

namespace App\Actions\Portfolio;

use App\Models\Project;
use Illuminate\Support\Collection;

class GetPublishedProjectsAction
{
    public function execute(string $orderBy = 'order', string $direction = 'asc'): Collection
    {
        return Project::where('is_published', true)
            ->orderBy($orderBy, $direction)
            ->get()
            ->map(function ($project) {
                if ($project->image) {
                    $project->image = asset('storage/' . $project->image);
                }
                return $project;
            });
    }
}

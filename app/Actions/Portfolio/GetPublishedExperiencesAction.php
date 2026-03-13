<?php

namespace App\Actions\Portfolio;

use App\Models\Experience;
use Illuminate\Support\Collection;

class GetPublishedExperiencesAction
{
    public function execute(string $orderBy = 'start_date', string $direction = 'desc'): Collection
    {
        return Experience::where('is_published', true)
            ->orderBy($orderBy, $direction)
            ->get()
            ->map(function ($experience) {
                if ($experience->company_logo) {
                    $experience->company_logo = asset('storage/'.$experience->company_logo);
                }

                return $experience;
            });
    }
}

<?php

namespace App\Actions\Portfolio;

use App\Models\Pricing;
use Illuminate\Support\Collection;

class GetActivePricingsAction
{
    public function execute(): Collection
    {
        return Pricing::active()
            ->ordered()
            ->get();
    }
}

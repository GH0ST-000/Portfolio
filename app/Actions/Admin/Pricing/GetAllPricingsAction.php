<?php

namespace App\Actions\Admin\Pricing;

use App\Models\Pricing;
use Illuminate\Database\Eloquent\Collection;

class GetAllPricingsAction
{
    public function execute(): Collection
    {
        return Pricing::orderBy('order')->get();
    }
}

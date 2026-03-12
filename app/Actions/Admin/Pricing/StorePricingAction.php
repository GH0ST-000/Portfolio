<?php

namespace App\Actions\Admin\Pricing;

use App\Models\Pricing;

class StorePricingAction
{
    public function execute(array $data): Pricing
    {
        return Pricing::create($data);
    }
}

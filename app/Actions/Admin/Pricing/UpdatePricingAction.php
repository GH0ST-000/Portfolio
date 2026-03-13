<?php

namespace App\Actions\Admin\Pricing;

use App\Models\Pricing;

class UpdatePricingAction
{
    public function execute(Pricing $pricing, array $data): Pricing
    {
        $pricing->update($data);

        return $pricing->fresh();
    }
}

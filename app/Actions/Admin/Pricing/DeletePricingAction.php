<?php

namespace App\Actions\Admin\Pricing;

use App\Models\Pricing;

class DeletePricingAction
{
    public function execute(Pricing $pricing): bool
    {
        return $pricing->delete();
    }
}

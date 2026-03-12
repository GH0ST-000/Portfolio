<?php

namespace App\Actions\Portfolio;

use App\Models\Contact;

class StoreContactAction
{
    public function execute(array $data): Contact
    {
        return Contact::create($data);
    }
}

<?php

namespace Tests\Feature\Feature\Pricing;

use Tests\TestCase;

class ManagePricingTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}

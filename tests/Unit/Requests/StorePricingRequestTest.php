<?php

namespace Tests\Unit\Requests;

use App\Http\Requests\Admin\StorePricingRequest;
use PHPUnit\Framework\Attributes\Test;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class StorePricingRequestTest extends TestCase
{
    #[Test]
    public function it_validates_required_fields()
    {
        $request = new StorePricingRequest();
        $rules = $request->rules();

        $data = [];

        $validator = Validator::make($data, $rules);

        $this->assertFalse($validator->passes());
        $this->assertArrayHasKey('title', $validator->errors()->toArray());
        $this->assertArrayHasKey('price', $validator->errors()->toArray());
        $this->assertArrayHasKey('period', $validator->errors()->toArray());
        $this->assertArrayHasKey('button_text', $validator->errors()->toArray());
    }

    #[Test]
    public function it_passes_with_valid_data()
    {
        $request = new StorePricingRequest();
        $rules = $request->rules();

        $data = [
            'title' => 'Test Plan',
            'subtitle' => 'Optional subtitle',
            'price' => 99.99,
            'period' => 'month',
            'description' => 'Optional description',
            'features' => ['Feature 1', 'Feature 2'],
            'button_text' => 'Order Now',
            'button_url' => '#contact',
            'recommended' => false,
            'active' => true,
            'order' => 1,
        ];

        $validator = Validator::make($data, $rules);

        $this->assertTrue($validator->passes());
    }

    #[Test]
    public function title_is_required_and_string()
    {
        $request = new StorePricingRequest();
        $rules = $request->rules();

        // Test missing title
        $validator = Validator::make(['price' => 99, 'period' => 'month', 'button_text' => 'Test'], $rules);
        $this->assertFalse($validator->passes());
        $this->assertArrayHasKey('title', $validator->errors()->toArray());

        // Test title too long
        $validator = Validator::make([
            'title' => str_repeat('a', 256),
            'price' => 99,
            'period' => 'month',
            'button_text' => 'Test',
        ], $rules);
        $this->assertFalse($validator->passes());
    }

    #[Test]
    public function price_is_required_and_numeric()
    {
        $request = new StorePricingRequest();
        $rules = $request->rules();

        // Test non-numeric price
        $validator = Validator::make([
            'title' => 'Test',
            'price' => 'not-a-number',
            'period' => 'month',
            'button_text' => 'Test',
        ], $rules);
        $this->assertFalse($validator->passes());

        // Test negative price
        $validator = Validator::make([
            'title' => 'Test',
            'price' => -10,
            'period' => 'month',
            'button_text' => 'Test',
        ], $rules);
        $this->assertFalse($validator->passes());
    }

    #[Test]
    public function period_must_be_valid_value()
    {
        $request = new StorePricingRequest();
        $rules = $request->rules();

        // Test invalid period
        $validator = Validator::make([
            'title' => 'Test',
            'price' => 99,
            'period' => 'invalid-period',
            'button_text' => 'Test',
        ], $rules);
        $this->assertFalse($validator->passes());

        // Test valid periods
        $validPeriods = ['hour', 'week', 'month', 'project'];
        foreach ($validPeriods as $period) {
            $validator = Validator::make([
                'title' => 'Test',
                'price' => 99,
                'period' => $period,
                'button_text' => 'Test',
                'order' => 0,
            ], $rules);
            $this->assertTrue($validator->passes(), "Period '{$period}' should be valid");
        }
    }

    #[Test]
    public function features_must_be_array_of_strings()
    {
        $request = new StorePricingRequest();
        $rules = $request->rules();

        // Test non-array features
        $validator = Validator::make([
            'title' => 'Test',
            'price' => 99,
            'period' => 'month',
            'button_text' => 'Test',
            'features' => 'not-an-array',
            'order' => 0,
        ], $rules);
        $this->assertFalse($validator->passes());

        // Test array with non-string values
        $validator = Validator::make([
            'title' => 'Test',
            'price' => 99,
            'period' => 'month',
            'button_text' => 'Test',
            'features' => ['valid', 123, 'another'],
            'order' => 0,
        ], $rules);
        $this->assertFalse($validator->passes());

        // Test valid array of strings
        $validator = Validator::make([
            'title' => 'Test',
            'price' => 99,
            'period' => 'month',
            'button_text' => 'Test',
            'features' => ['Feature 1', 'Feature 2'],
            'order' => 0,
        ], $rules);
        $this->assertTrue($validator->passes());
    }

    #[Test]
    public function optional_fields_can_be_null()
    {
        $request = new StorePricingRequest();
        $rules = $request->rules();

        $data = [
            'title' => 'Test Plan',
            'subtitle' => null,
            'price' => 99.99,
            'period' => 'month',
            'description' => null,
            'features' => null,
            'button_text' => 'Order Now',
            'button_url' => null,
            'order' => 0,
        ];

        $validator = Validator::make($data, $rules);

        $this->assertTrue($validator->passes());
    }

    #[Test]
    public function recommended_must_be_boolean()
    {
        $request = new StorePricingRequest();
        $rules = $request->rules();

        // Test with boolean values
        $validator = Validator::make([
            'title' => 'Test',
            'price' => 99,
            'period' => 'month',
            'button_text' => 'Test',
            'recommended' => true,
            'order' => 0,
        ], $rules);
        $this->assertTrue($validator->passes());

        $validator = Validator::make([
            'title' => 'Test',
            'price' => 99,
            'period' => 'month',
            'button_text' => 'Test',
            'recommended' => false,
            'order' => 0,
        ], $rules);
        $this->assertTrue($validator->passes());
    }

    #[Test]
    public function active_must_be_boolean()
    {
        $request = new StorePricingRequest();
        $rules = $request->rules();

        $validator = Validator::make([
            'title' => 'Test',
            'price' => 99,
            'period' => 'month',
            'button_text' => 'Test',
            'active' => true,
            'order' => 0,
        ], $rules);
        $this->assertTrue($validator->passes());
    }

    #[Test]
    public function order_must_be_integer_and_non_negative()
    {
        $request = new StorePricingRequest();
        $rules = $request->rules();

        // Test negative order
        $validator = Validator::make([
            'title' => 'Test',
            'price' => 99,
            'period' => 'month',
            'button_text' => 'Test',
            'order' => -1,
        ], $rules);
        $this->assertFalse($validator->passes());

        // Test non-integer order
        $validator = Validator::make([
            'title' => 'Test',
            'price' => 99,
            'period' => 'month',
            'button_text' => 'Test',
            'order' => 'not-a-number',
        ], $rules);
        $this->assertFalse($validator->passes());

        // Test valid order
        $validator = Validator::make([
            'title' => 'Test',
            'price' => 99,
            'period' => 'month',
            'button_text' => 'Test',
            'order' => 5,
        ], $rules);
        $this->assertTrue($validator->passes());
    }

    #[Test]
    public function it_has_custom_attribute_names()
    {
        $request = new StorePricingRequest();
        $attributes = $request->attributes();

        $this->assertArrayHasKey('title', $attributes);
        $this->assertArrayHasKey('price', $attributes);
        $this->assertArrayHasKey('period', $attributes);
        $this->assertArrayHasKey('button_text', $attributes);
        
        $this->assertEquals('pricing title', $attributes['title']);
        $this->assertEquals('price', $attributes['price']);
    }
}

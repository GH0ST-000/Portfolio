<?php

namespace Tests\Unit\Requests;

use App\Http\Requests\StoreContactRequest;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class StoreContactRequestTest extends TestCase
{
    public function test_it_authorizes_all_users(): void
    {
        $request = new StoreContactRequest();

        $this->assertTrue($request->authorize());
    }

    public function test_it_validates_required_fields(): void
    {
        $request = new StoreContactRequest();
        $validator = Validator::make([], $request->rules());

        $this->assertFalse($validator->passes());
        $this->assertTrue($validator->errors()->has('name'));
        $this->assertTrue($validator->errors()->has('email'));
        $this->assertTrue($validator->errors()->has('message'));
    }

    public function test_it_passes_validation_with_valid_data(): void
    {
        $request = new StoreContactRequest();
        $data = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'subject' => 'Test Subject',
            'message' => 'This is a test message.',
        ];

        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->passes());
    }

    public function test_it_passes_validation_without_subject(): void
    {
        $request = new StoreContactRequest();
        $data = [
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'message' => 'Message without subject.',
        ];

        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->passes());
    }

    public function test_it_validates_email_format(): void
    {
        $request = new StoreContactRequest();
        $data = [
            'name' => 'John Doe',
            'email' => 'invalid-email',
            'message' => 'Test message.',
        ];

        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->passes());
        $this->assertTrue($validator->errors()->has('email'));
    }

    public function test_it_validates_name_max_length(): void
    {
        $request = new StoreContactRequest();
        $data = [
            'name' => str_repeat('a', 256),
            'email' => 'test@example.com',
            'message' => 'Test message.',
        ];

        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->passes());
        $this->assertTrue($validator->errors()->has('name'));
    }

    public function test_it_validates_email_max_length(): void
    {
        $request = new StoreContactRequest();
        $data = [
            'name' => 'John Doe',
            'email' => str_repeat('a', 250) . '@test.com',
            'message' => 'Test message.',
        ];

        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->passes());
        $this->assertTrue($validator->errors()->has('email'));
    }

    public function test_it_validates_subject_max_length(): void
    {
        $request = new StoreContactRequest();
        $data = [
            'name' => 'John Doe',
            'email' => 'test@example.com',
            'subject' => str_repeat('a', 256),
            'message' => 'Test message.',
        ];

        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->passes());
        $this->assertTrue($validator->errors()->has('subject'));
    }

    public function test_it_validates_name_is_string(): void
    {
        $request = new StoreContactRequest();
        $data = [
            'name' => 12345,
            'email' => 'test@example.com',
            'message' => 'Test message.',
        ];

        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->passes());
        $this->assertTrue($validator->errors()->has('name'));
    }

    public function test_it_has_custom_error_messages(): void
    {
        $request = new StoreContactRequest();
        $messages = $request->messages();

        $this->assertArrayHasKey('name.required', $messages);
        $this->assertArrayHasKey('email.required', $messages);
        $this->assertArrayHasKey('email.email', $messages);
        $this->assertArrayHasKey('message.required', $messages);
        $this->assertEquals('Please provide your name.', $messages['name.required']);
        $this->assertEquals('Please provide your email address.', $messages['email.required']);
    }
}

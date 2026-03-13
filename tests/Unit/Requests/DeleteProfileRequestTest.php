<?php

namespace Tests\Unit\Requests;

use App\Http\Requests\DeleteProfileRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class DeleteProfileRequestTest extends TestCase
{
    public function test_it_authorizes_all_users(): void
    {
        $request = new DeleteProfileRequest;

        $this->assertTrue($request->authorize());
    }

    public function test_it_validates_password_is_required(): void
    {
        $request = new DeleteProfileRequest;
        $validator = Validator::make([], $request->rules());

        $this->assertFalse($validator->passes());
        $this->assertTrue($validator->errors()->has('password'));
    }

    public function test_it_passes_validation_with_valid_password(): void
    {
        $user = User::factory()->create([
            'password' => Hash::make('password123'),
        ]);

        $this->actingAs($user);

        $request = new DeleteProfileRequest;
        $data = ['password' => 'password123'];

        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->passes());
    }

    public function test_it_fails_validation_with_wrong_password(): void
    {
        $user = User::factory()->create([
            'password' => Hash::make('password123'),
        ]);

        $this->actingAs($user);

        $request = new DeleteProfileRequest;
        $data = ['password' => 'wrong-password'];

        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->passes());
        $this->assertTrue($validator->errors()->has('password'));
    }

    public function test_it_validates_password_is_string(): void
    {
        $request = new DeleteProfileRequest;
        $data = ['password' => 12345];

        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->passes());
    }

    public function test_it_has_custom_error_messages(): void
    {
        $request = new DeleteProfileRequest;
        $messages = $request->messages();

        $this->assertArrayHasKey('password.required', $messages);
        $this->assertArrayHasKey('password.current_password', $messages);
        $this->assertEquals('Please provide your password to confirm account deletion.', $messages['password.required']);
        $this->assertEquals('The provided password is incorrect.', $messages['password.current_password']);
    }

    public function test_it_requires_current_password_validation_rule(): void
    {
        $request = new DeleteProfileRequest;
        $rules = $request->rules();

        $this->assertArrayHasKey('password', $rules);
        $this->assertContains('required', $rules['password']);
        $this->assertContains('current_password', $rules['password']);
    }
}

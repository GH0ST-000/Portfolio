<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DeleteProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'password' => ['required', 'current_password'],
        ];
    }

    public function messages(): array
    {
        return [
            'password.required' => 'Please provide your password to confirm account deletion.',
            'password.current_password' => 'The provided password is incorrect.',
        ];
    }
}

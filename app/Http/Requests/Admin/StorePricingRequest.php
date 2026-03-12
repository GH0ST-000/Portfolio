<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StorePricingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'period' => ['required', 'string', 'in:hour,week,month,project'],
            'description' => ['nullable', 'string'],
            'features' => ['nullable', 'array'],
            'features.*' => ['string'],
            'button_text' => ['required', 'string', 'max:255'],
            'button_url' => ['nullable', 'string', 'max:255'],
            'recommended' => ['boolean'],
            'active' => ['boolean'],
            'order' => ['integer', 'min:0'],
        ];
    }

    public function attributes(): array
    {
        return [
            'title' => 'pricing title',
            'subtitle' => 'subtitle',
            'price' => 'price',
            'period' => 'period',
            'description' => 'description',
            'features' => 'features',
            'button_text' => 'button text',
            'button_url' => 'button URL',
            'recommended' => 'recommended status',
            'active' => 'active status',
            'order' => 'display order',
        ];
    }
}

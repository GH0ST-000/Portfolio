<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = [
        'company',
        'company_logo',
        'position',
        'description',
        'achievements',
        'start_date',
        'end_date',
        'is_current',
        'location',
        'company_url',
        'order',
        'is_published',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_current' => 'boolean',
        'is_published' => 'boolean',
    ];
}

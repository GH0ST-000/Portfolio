<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'image',
        'technologies',
        'github_url',
        'live_url',
        'featured',
        'order',
        'is_published',
    ];

    protected $casts = [
        'technologies' => 'array',
        'featured' => 'boolean',
        'is_published' => 'boolean',
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class blogs_categories extends Model
{
    use HasFactory;
    protected $fillabel = [
        'category_id',
        'blog_id',
    ];
}

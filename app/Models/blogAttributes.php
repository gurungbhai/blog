<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class blogAttributes extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'category_id',
        'tags',
        'author_id',
    ];

    public function category(){
        return $this->belongstoMany(blogAttributes::class,'blogs_categories','category_id','blog_id');
    }
    public function author(){
        return $this->belongsto('App\Models\authorAttributes','author_id');
    }

   
}

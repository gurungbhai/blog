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
        return $this->belongstoMany(categoryAttributes::class,'blogs_categories','blog_id','category_id');
    }
    public function author(){
        return $this->belongsto('App\Models\authorAttributes','author_id');
    }

   
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'avatar',
        'status'
    ];

    public function users()
    {
        return $this->belongsToMany(Shop::class, 'shop_users', 'shop_id', 'user_id');
    }

}

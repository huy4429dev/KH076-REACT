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

    public function shops()
    {
        return $this->belongsToMany(Shop::class, 'shop_users', 'user_id', 'shop_id');
    }

}

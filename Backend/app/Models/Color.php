<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Color extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
    ];

    public function products(){
        return $this->belongsToMany(Color::class, 'products_colors', 'product_id', 'color_id');
    }

    public function order_item(){
        return $this->belongsTo(OrderItem::class);
    }
}

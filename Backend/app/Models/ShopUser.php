<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShopUser extends Model
{
    use HasFactory;

    protected $table = 'shop_users';

    public $timestamps = true;
     
    // public function user(){
    //     return $this->belongsTo(User ::class);
    // }

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;
    
    protected $table = 'contact';

    public $timestamps = true;
     
    public function user(){
        return $this->belongsTo(User::class);
    }
}

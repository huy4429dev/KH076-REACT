<?php

namespace App\Http\Controllers\Address;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Blog;
use App\Models\User;
use App\Models\Province;
use App\Models\District;
use App\Models\Ward;
use Validator;
use App\Http\Controllers\BaseController as BaseController;
use Illuminate\Support\Facades\Auth;

class AddressController extends BaseController
{
    public function province(Request $request){
       
            $province = Province::orderBy('id','asc')
            ->get();
        
        return $this->sendResponse( 
            $province 
          );
    }
    public function district($id ,Request $request){
       
            $district = District::orderBy('id','asc')
            ->where("province_id",$id)
            ->get();
        return $this->sendResponse( 
            $district ,
          );
    }
     public function ward($id ,Request $request){
       
            $ward = Ward::orderBy('id','asc')
            ->where("district_id",$id)
            ->get();
        return $this->sendResponse( 
            $ward ,
          );
    }
}

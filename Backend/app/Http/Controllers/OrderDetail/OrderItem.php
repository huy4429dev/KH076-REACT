<?php

namespace App\Http\Controllers\OrderItem;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseController as BaseController;
use App\Models\OrderItem;
use App\Models\Role;
use App\Models\Profile;
use Validator;
use Illuminate\Support\Facades\Auth;

class OrderItemController extends BaseController
{
    public function index(Request $request){
        return 'index';
    }
    public function search(Request $request){
        return 'search';
    }
    public function show($id,Request $request){
        return 'show';
    }
    public function update($id,Request $request){

        $role = $request->user()->roles()->OrderItemBy('role_id','desc')->first();

        return 'update'.$role;
    }
    public function create(Request $request){

        $role = $request->user()->roles()->OrderItemBy('role_id','desc')->first();

        return 'create'.$role;
    }
    public function delete($id,Request $request){

        $role = $request->user()->roles()->OrderItemBy('role_id','desc')->first();

        return 'delete'.$role;
    }
  
}

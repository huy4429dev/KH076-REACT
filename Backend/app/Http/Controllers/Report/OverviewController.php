<?php

namespace App\Http\Controllers\Report;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseController as BaseController;
use App\Models\Order;
use App\Models\Role;
use App\Models\Profile;
use Validator;
use Illuminate\Support\Facades\Auth;

class OverViewReportController extends BaseController
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

        $role = $request->user()->roles()->orderBy('role_id','desc')->first();

        return 'update'.$role;
    }
    public function create(Request $request){

        $role = $request->user()->roles()->orderBy('role_id','desc')->first();

        return 'create'.$role;
    }
    public function delete($id,Request $request){

        $role = $request->user()->roles()->orderBy('role_id','desc')->first();

        return 'delete'.$role;
    }
  
}

<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseController as BaseController;
use App\Models\User;
use App\Models\Role;
use Validator;
use Illuminate\Support\Facades\Auth;


class AdminController extends BaseController
{

    public function makeAdmin(Request $request)
    {
   
        $admin = User::where('username','admin')->first();
        if($admin == null){
            $admin = User::create([ 
                'username' => 'admin',
                'password' => bcrypt('admin@123'),
                'email' => 'admin@gmail.com'
            ]);
            
            $admin->roles()->attach(['role_id' => Role::where('name','admin')->first()->id]);
            
            return $this->sendResponse('empty', 'Admin created success');
        }
        return $this->sendResponse('empty','Admin created !');
    }


    public function createUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|unique:users',
            'email' => 'required|email|unique:users',
            'role' => 'required',
            'password' => 'required',
            'c_password' => 'required|same:password'
        ]);

        if($validator->fails()){

            return $this->sendError('Validation Error.', $validator->errors());       

        }

        $foundRole = Role::where('name',$request->role)->first();
        if($foundRole == null){
            return $this->sendError('Role Error.', 'Role not found');  
        }

           
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
   

        $user = User::create($input);
        $user->roles()->attach(['role_id' => $foundRole->id]);

        return $this->sendResponse($user,'user success !');
    }




}

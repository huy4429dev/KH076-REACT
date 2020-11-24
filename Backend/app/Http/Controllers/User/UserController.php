<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseController as BaseController;
use App\Models\User;
use App\Models\Role;
use App\Models\Profile;
use Validator;
use Illuminate\Support\Facades\Auth;


class UserController extends BaseController
{

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'c_password' => 'required|same:password'
        ]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
   
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);

        $user = User::create($input);
        $user->roles()->attach(['role_id' => Role::where('name','user')->first()->id]);
        
        $success['token'] =  $user->createToken('MyApp')->accessToken;
        $success['name'] =  $user->name;
   
        return $this->sendResponse($success, 'User register successfully.');
    }


    public function login(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'email' => 'required|email|exists:users,email',
            'password' => 'required'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
    
        if( Auth::attempt(['email'=>$request->email, 'password'=>$request->password]) ) {
            $user = Auth::user();
            $userRole = $user->roles()->orderBy('role_id','desc')->first();

            if ($userRole) {
                $this->scope = $userRole->name;
            }

            $token = $user->createToken($user->email.'-'.now(), [$this->scope]);
    
            return response()->json([
                'token' => $token->accessToken
            ]);
        }
        else {

            return $this->sendError('Account Errors.',['error' => 'Email or password incorrect !']);    
        }
    }

    public function index(Request $request){
        
        // get role
        
        $role = $request->user()->roles()->orderBy('role_id','desc')->first();
        
        // get value paginate 

        $page = $request->query('page') ?? 1;
        $pageSize = $request->query('pageSize') ?? 25;

        if($role->name === 'admin'){

            $users = User::orderBy('id','desc')
                           ->skip( ($page - 1) * $pageSize )
                           ->take($pageSize)
                           ->get();
            
        }
        else {

            $users = User::whereHas('roles', function($q){
                $q->where('name','user');
            })->orderBy('id','desc')
              ->skip( ($page - 1) * $pageSize )
              ->take($pageSize)
              ->get();
            
        }

        
        return $this->sendResponse(
                                    $data = [
                                             'items' => $users , 
                                             'total' => $users-> count()
                                            ]
                                  );
    }

    public function search(Request $request){
        
         // get role 

         $role = $request->user()->roles()->orderBy('role_id','desc')->first();
        
         // get value paginate 
 
         $page = $request->query('page') ?? 1;
         $pageSize = $request->query('pageSize') ?? 25;
        
         $query = User::query();

        // search by key word

         $searchKey = $request->query('q');

         if($searchKey != null){
            
            $query = $query->join('profiles','profiles.user_id','=','users.id')
                           ->where('username','like','%'.$searchKey.'%')
                           ->orWhere('name','like','%'.$searchKey.'%')
                           ->orWhere('email','like','%'.$searchKey.'%')
                           ->orWhere('address','like','%'.$searchKey.'%')
                           ->orWhere('phone','like','%'.$searchKey.'%')
                           ->orWhere('facebook','like','%'.$searchKey.'%');
                           
         }

         // filter 


         if($role->name === 'admin'){
 
             $users = $query
                            ->orderBy('users.id','desc')
                            ->skip( ($page - 1) * $pageSize )
                            ->take($pageSize)
                            ->get();
             
         }
         else {
 
             $users = $query->whereHas('roles', function($q){
                 $q->where('name','user');
             })->orderBy('users.id','desc')
               ->skip( ($page - 1) * $pageSize )
               ->take($pageSize)
               ->get();
             
         }
 
         
         return $this->sendResponse(
                                     $data = [
                                              'items' => $users , 
                                              'total' => $users-> count()
                                             ]
                                   );
    }

    public function show($id){

        $found = User::where('id',$id)->with('profile')->first();

        return $this->sendResponse(
            $data = $found
          );
    }

    public function update($id, Request $request){

            // Shop update user

            $validator = Validator::make($request->all(), [

                'username' => 'required',
                'email' => 'required|email',
                'name' => 'required',
                'c_password' => 'same:password'
            ]);
    
            if($validator->fails()){
                return $this->sendError('Validation Error.', $validator->errors());       
            }

            $user = User::where('id',$id)->with('profile')->first();

            if($user != null ){

                $input = $request->all();
                $user->username = $request->username;
                $user->email = $request->email;

                if($request->password != null && !empty($request->password) ){
                    $user->password =  bcrypt($input['password']);
                }

                $user->profile->name = $request->name; 
                $user->profile->avatar = $request->avatar; 
                $user->profile->birthday = $request->birthday; 
                $user->profile->gender = $request->gender; 
                $user->profile->address = $request->address; 
                $user->profile->phone = $request->phone; 
                $user->profile->facebook = $request->facebook; 
                $user->save();
    
            }
            else 
            {
                return $this->sendError('Account Errors.',['error' => 'User not found !']);
            }
           
            return $this->sendResponse($user, 'Update user successfully.');
    }

    public function delete($id,Request $request){

        $found = User::find($id);
        $found->delete();

        if($found == null){
            
            return $this->sendError('Category Errors.',['error' => 'Category not found !']);
        }

        return $this->sendResponse(
            $found, 
            'Delete user successfully'
          );
    }

    public function create(Request $request){

        // Shop create user

        $validator = Validator::make($request->all(), [

            'username' => 'required|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'name' => 'required',
            'c_password' => 'required|same:password'
        ]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
   
        $input = $request->all();
        $account['username'] = $request->username;
        $account['email'] = $request->email;
        $account['password'] = bcrypt($input['password']);

        $user = User::create($account);
        $user->roles()->attach(['role_id' => Role::where('name','user')->first()->id]);

        $profile['name'] = $request->name; 
        $profile['avatar'] = $request->avatar; 
        $profile['birthday'] = $request->birthday; 
        $profile['gender'] = $request->gender; 
        $profile['address'] = $request->address; 
        $profile['phone'] = $request->phone; 
        $profile['facebook'] = $request->facebook; 
        $profile['user_id'] = $user->id; 

        $profile = Profile::create($profile);

        $user['profile'] = $profile;

        return $this->sendResponse($user, 'User create successfully.');

    }

}

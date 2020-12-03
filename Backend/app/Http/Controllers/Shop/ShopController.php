<?php

namespace App\Http\Controllers\Shop;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseController as BaseController;
use App\Models\Shop;
use App\Models\Role;
use App\Models\Us;
use App\Models\Profile;
use App\Models\User;
use Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class ShopController extends BaseController
{


    public function initDataTest(){

        $data = [
            [
                'name' => 'shop  1',
                'description' => 'shop  description 1',
                'avatar' => '404',
                'status' => true
            ],
            [
                'name' => 'shop  1.1',
                'description' => 'shop  description 1.1',
                'avatar' => '404',
                'status' => true
            ],
            [
                'name' => 'shop  1.2',
                'description' => 'shop  description 1.2',
                'avatar' => '404',
                'status' => true
            ],
            [
                'name' => 'shop  2',
                'description' => 'shop  description 2',
                'avatar' => '404',
                'status' => true
            ],
            [
                'name' => 'shop  3',
                'description' => 'shop  description 3',
                'avatar' => '404',
                'status' => true
            ]
           ];

            
        foreach($data as $item) {
            
            DB::table('shops')->insert([
                'name' => $item['name'],
                'description' => $item['description'],
                'status' => $item['status'],
                'avatar' => $item['avatar'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }

        $data = [
            [
                "email" => "shoptest1@gmail.com",
                "username" => "shoptest1",
                "password" => bcrypt("123456"),
            ],
            [
                "email" => "shoptest2@gmail.com",
                "username" => "shoptest2",
                "password" => bcrypt("123456"),
            ],
            [
                "email" => "shoptest3@gmail.com",
                "username" => "shoptest3",
                "password" => bcrypt("123456"),
            ]
       
           ];

                   
        foreach($data as $item) {
            

           DB::table('users')->insert([
            'username' => $item['username'],
            'email' => $item['email'],
            'password' => $item['password'],
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
           ]); 
            
        }

            User::where('username','shoptest1')->first()->roles()->attach(['role_id' => Role::where('name','shop')->first()->id]);
            User::where('username','shoptest2')->first()->roles()->attach(['role_id' => Role::where('name','shop')->first()->id]);
            User::where('username','shoptest3')->first()->roles()->attach(['role_id' => Role::where('name','shop')->first()->id]);

        Shop::where('name','shop  1')->first()->users()->attach(['user_id' =>  User::where('username','shoptest1')->first()->id]);
        Shop::where('name','shop  2')->first()->users()->attach(['user_id' =>  User::where('username','shoptest2')->first()->id]);
        Shop::where('name','shop  3')->first()->users()->attach(['user_id' =>  User::where('username','shoptest3')->first()->id]);
      
        return 'init data test success';
    }
    
    public function index(Request $request){

        $page = $request->query('page') ?? 1;
        $pageShop = $request->query('pageShop') ?? 25;

        $Shops = Shop::ShopBy('id','desc')
        ->skip( ($page - 1) * $pageShop )
        ->take($pageShop)
        ->get();

        return $this->sendResponse(
            $data = [
                     'items' => $Shops , 
                     'total' => $Shops->count()
                    ]
          );
    }
    public function search(Request $request){

        $page = $request->query('page') ?? 1;
        $pageShop = $request->query('pageShop') ?? 25;

        $query = Shop::query();

        $searchKey = $request->query('q');

        if($searchKey != null){
            
            $query = $query
                           ->where('name','like','%'.$searchKey.'%');
                           
        }

        $Shops = $query
        ->ShopBy('id','desc')
        ->skip( ($page - 1) * $pageShop )
        ->take($pageShop)
        ->get();

        return $this->sendResponse(
            $data = [
                     'items' => $Shops , 
                     'total' => $Shops->count()
                    ]
          );
    }

    
    public function show($id){

        $found = Shop::find($id);

        if($found == null){
            
            return $this->sendError('Shop Errors.',['error' => 'Shop not found !']);
        }

        return $this->sendResponse(
            $data = $found
        );

    }

    public function update($id,Request $request){

        $validator = Validator::make($request->all(), [

            'name' => 'required'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }

        $Shop = Shop::where('id',$id)->first();
        
        if($Shop != null){

            $Shop->name = $request->name;
            $Shop->Shop = $request->Shop;
            $Shop->user_id = $request->user()->id;
            $Shop->save();

            return $this->sendResponse(
                $data = $Shop,
                'Update Shop successfully.'
            );
        }

        return $this->sendError('Shop Errors.',['error' => 'Shop not found !']);
    }

    public function create(Request $request){

        $validator = Validator::make($request->all(), [

            'name' => 'required|unique:Shops'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }

        $Shop = new Shop();

        $Shop->name = $request->name;
        $Shop->user_id = $request->user()->id;
        $Shop->save();

        return $this->sendResponse(
            $data = $Shop,
            'Create Shop successfully.'
        );

    }

    public function delete($id,Request $request){

        $found = Shop::find($id); 

        if($found == null){
            
            return $this->sendError('Shop Errors.',['error' => 'Shop not found !']);
        }

        $found->delete();

        return $this->sendResponse(
            $found, 
            'Delete Shop successfully'
          );
    }
  
}

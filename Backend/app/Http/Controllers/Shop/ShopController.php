<?php

namespace App\Http\Controllers\Shop;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseController as BaseController;
use App\Models\Shop;
use App\Models\Role;
use App\Models\Product;
use App\Models\Profile;
use App\Models\Comment;
use App\Models\User;
use App\Models\ShopUser;
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



  public function newProducts(Request $request){


        //  $shopId = $shopId;
        // $userIdsOfShop = Shop::find($shopId)->users->pluck('id');

        $Products = Product::orderBy('created_at','desc')
        ->with('user')
        ->with('images')
        ->with('colors')
        ->with('sizes')
        ->take(6)
        ->get();

        return $this->sendResponse(
            $data = [
                     'items' => $Products ,
                    ]
          );
    }



     public function manProducts(Request $request){

        // $shopId = $request->query('shopid');
        // $shopId = $shopId;
        // $userIdsOfShop = Shop::find($shopId)->users->pluck('id');

        $Products = Product::orderBy('created_at','desc')
        ->with('user')
        ->with('images')
        ->with('colors')
        ->with('sizes')
        ->take(6)
        ->get();

        return $this->sendResponse(
            $data = [
                     'items' => $Products ,
                    ]
          );
    }
     public function womanProducts(Request $request){
        // $shopId = $shopId;
        // $userIdsOfShop = Shop::find($shopId)->users->pluck('id');

        $Products = Product::orderBy('created_at','desc')
        ->with('user')
        ->with('images')
        ->with('colors')
        ->with('sizes')
        ->take(6)
        ->get();

        return $this->sendResponse(
            $data = [
                     'items' => $Products ,
                    ]
          );
    }
    public function topProduct(Request $request){
        // $shopId = $shopId;
        // $userIdsOfShop = Shop::find($shopId)->users->pluck('id');

        $Products = Product::orderBy('created_at','desc')
        ->with('user')
        ->with('images')
        ->with('colors')
        ->with('sizes')
        ->take(8)
        ->get();

        return $this->sendResponse(
            $data = [
                        'items' => $Products ,
                    ]
            );
    }
    public function saleMen(Request $request){
        //      $shopId = $shopId;
        // $userIdsOfShop = Shop::find($shopId)->users->pluck('id');

        $Products = Product::orderBy('created_at','desc')
            ->with('user')
            ->with('images')
            ->with('colors')
            ->with('sizes')
            ->take(1)
            ->get();

        return $this->sendResponse(
            $data = [
                        'items' => $Products ,
                    ]
            );
    }
    public function saleWomen(Request $request){
        //     $shopId = $shopId;
        // $userIdsOfShop = Shop::find($shopId)->users->pluck('id');

        $Products = Product::orderBy('created_at','desc')
        ->with('user')
        ->with('images')
        ->with('colors')
        ->with('sizes')
        ->take(1)
        ->get();

    return $this->sendResponse(
        $data = [
                    'items' => $Products ,
                ]
        );
    }
    public function index(Request $request){
        $page = $request->query('page') ? $request->query('page') : 1;
        $pageSize = $request->query('pageSize') ? $request->query('pageSize') : 25;

        $query = Product::query();
           $min = $request->query('min');
           $max = $request->query('max');
           $color = $request->query('color');
           $barnd = $request->query('barnd');

            if($min != null){
                $query = $query->whereBetween('price',[$min, $max]);
            }
            // if($color != null){
            //     $query = $query->whereHas('colors', function($color){
            //                     $color->where('name', '=', 'user');
            //                 });
            // }


            $Products = $query
            ->orderBy('id','desc')
            ->with('user')
            ->with('images')
            ->with('colors')
            ->with('sizes')
            ->with('category')
            ->skip( ($page - 1) * $pageSize )
            ->take($pageSize)
            ->get();
        
        $total = Product::get();
        return $this->sendResponse(
            $data = [
                     'items' => $Products , 
                     'total' => $total->count()
                    ]
          );
    }

    public function all(Request $request){

        $page = $request->query('page') ?  $request->query('page') : 1 ;
        $pageShop = $request->query('pageShop') ? $request->query('pageShop') :25 ;

        $Shops = Shop::orderBy('id','desc')
        ->with('users')
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
        $found = Product::where('id', $id)
                        ->with('user')
                        ->with('images')
                        ->with('colors')
                        ->with('sizes')
                        ->first();

        if($found == null){

            return $this->sendError('Product Errors.',['error' => 'Product not found !']);
        }

        return $this->sendResponse(
            $data = $found
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


    // public function show($id){

    //     $found = Shop::find($id);

    //     if($found == null){

    //         return $this->sendError('Shop Errors.',['error' => 'Shop not found !']);
    //     }

    //     return $this->sendResponse(
    //         $data = $found
    //     );

    // }

    public function update($id,Request $request){

        $validator = Validator::make($request->all(), [

            'name' => 'required',
            'avatar' => 'required',
            'disception' => 'required',
            'user_id' => 'required',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $Shop = Shop::where('id',$id)->first();

        if($Shop != null){

            $Shop->name = $request->name;
            $Shop->description = $request->disception;
            $Shop->avatar = $request->avatar;
            $Shop->save();

            $newShop = Shop::where('id',$Shop->id)->with('users')->first();
            return $this->sendResponse(
                $newShop,
                'Update Shop successfully.'
            );
        }

        return $this->sendError('Shop Errors.',['error' => 'Shop not found !']);
    }

    public function create(Request $request){

        $validator = Validator::make($request->all(), [

            'name' => 'required|unique:Shops',
            'avatar' => 'required',
            'disception' => 'required',
            'user_id' => 'required',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }


        $Shop = new Shop();

        $Shop->name = $request->name;
        $Shop->avatar = $request->avatar;
        $Shop->description = $request->disception;
        $Shop->save();
        $ShopUser = new ShopUser();
        $ShopUser->user_id = $request->user_id;
        $ShopUser->shop_id = $Shop->id;
        $ShopUser->save();

        $newShop = Shop::where('id',$Shop->id)->with('users')->get();
        return $this->sendResponse(
            $data = $newShop,
            'Create Shop successfully.'
        );

    }

    public function delete($id ,$userId,Request $request){
        $shopUser = ShopUser::where('user_id',$userId)->where('shop_id',$id)->first();
        if($shopUser == null){
            return $this->sendError('Shop Errors.',['error' => 'Shop not found !']);
        }
        $shopUser->delete();

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
        public function productsCategory($categoryId ,Request $request){

        $page = $request->query('page') ? $request->query('page') : 1;
        $pageSize = $request->query('pageSize') ? $request->query('pageSize') : 25;

        $query = Product::query()->where('category_id',$categoryId);
           $min = $request->query('min');
           $max = $request->query('max');
           $color = $request->query('color');
           $barnd = $request->query('brand');

            if($min != null){
                $query = $query->whereBetween('price',[$min, $max]);
            }
            // if($color != null){
            //     $query = $query->whereHas('colors', function($color){
            //                     $color->where('name', '=', 'user');
            //                 });
            // }


            $Products = $query
            ->orderBy('id','desc')
            ->with('user')
            ->with('images')
            ->with('colors')
            ->with('sizes')
            ->with('category')
            ->skip( ($page - 1) * $pageSize )
            ->take($pageSize)
            ->get();
        
            // $total = $query
            //     ->orderBy('id','desc')
            //     ->with('user')
            //     ->with('images')
            //     ->with('colors')
            //     ->with('sizes')
            //     ->with('category')->get();

        return $this->sendResponse(
            $data = [
                     'items' => $Products , 
                     'total' => Product::where('category_id',$categoryId)->count()
                    ]
          );
    }
    
}

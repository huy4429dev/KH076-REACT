<?php

namespace App\Http\Controllers\Product;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseController as BaseController;
use App\Models\Product;
use App\Models\Role;
use App\Models\Profile;
use App\Models\Comment;
use App\Models\User;
use App\Models\Shop;
use App\Models\OrderItem;
use App\Models\Order;
use Validator;
use Illuminate\Support\Facades\Auth;

class ProductController extends BaseController
{
    public function index(Request $request){

        $user = $request->user();
        $page = $request->query('page') ?? 1;
        $pageSize = $request->query('pageSize') ?? 25;

        if($user->roles->contains('name', 'admin')){

            $Products = Product::orderBy('id','desc')
            ->with('user')
            ->with('images')
            ->with('colors')
            ->with('sizes')
            ->with('category')
            ->skip( ($page - 1) * $pageSize )
            ->take($pageSize)
            ->get();

        }

        else if($user->roles->contains('name', 'shop')){
            $shopId = $user->shops()->first()->id; 
            $userIdsOfShop = Shop::find($shopId)->users->pluck('id');

            $Products = Product::whereIn('user_id',$userIdsOfShop)
            ->orderBy('id','desc')
            ->with('user')
            ->with('images')
            ->with('colors')
            ->with('sizes')
            ->with('category')
            ->skip( ($page - 1) * $pageSize )
            ->take($pageSize)
            ->get();

        }

        return $this->sendResponse(
            $data = [
                     'items' => $Products , 
                     'total' => $Products->count()
                    ]
          );
    }


    public function search(Request $request){

        $page = $request->query('page') ?? 1;
        $pageSize = $request->query('pageSize') ?? 25;

        $query = Product::query();

        $searchKey = $request->query('q');

        if($searchKey != null){
            
            $query = $query
                           ->where('name','like','%'.$searchKey.'%');
        }

        $Products = $query
        ->orderBy('id','desc')
        ->with('images')
        ->skip( ($page - 1) * $pageSize )
        ->take($pageSize)
        ->get();

        return $this->sendResponse(
            $data = [
                     'items' => $Products , 
                     'total' => $Products->count()
                    ]
          );
    }

   
    public function searchAdmin(Request $request){

        $user = $request->user();
        $page = $request->query('page') ?? 1;
        $pageSize = $request->query('pageSize') ?? 25;

        $query = Product::query();

        $searchKey = $request->query('q');

        if($searchKey != null){
            
            $query = $query
                           ->where('name','like','%'.$searchKey.'%');
        }

        if($user->roles->contains('name', 'admin')){

            $Products = $query->orderBy('id','desc')
            ->with('user')
            ->with('images')
            ->with('colors')
            ->with('sizes')
            ->with('category')
            ->skip( ($page - 1) * $pageSize )
            ->take($pageSize)
            ->get();

        }

        else if($user->roles->contains('name', 'shop')){


            $shopId = $user->shops()->first()->id; 
            $userIdsOfShop = Shop::find($shopId)->users->pluck('id');
            $Products = $query->whereIn('user_id',$userIdsOfShop)
            ->orderBy('id','desc')
            ->with('user')
            ->with('images')
            ->with('colors')
            ->with('sizes')
            ->with('category')
            ->skip( ($page - 1) * $pageSize )
            ->take($pageSize)
            ->get();

        }

        return $this->sendResponse(
            $data = [
                     'items' => $Products , 
                     'total' => $Products->count()
                    ]
          );
    }
    
    public function show($id){

        $user = $request->user();

        if($user->roles->contains('name', 'admin')){
            $found = Product::where('id', $id)
            ->where('id', $id)
            ->with('user')
            ->with('images')
            ->with('colors')
            ->with('sizes')
            ->with('category')
            ->with('ratings')
            ->first();
        }
        else if($user->roles->contains('name', 'shop')){

            $shopId = $user->shops()->first()->id; 
            $userIdsOfShop = Shop::find($shopId)->users->pluck('id');

            $found = Product::whereIn('user_id',$userIdsOfShop)
            ->where('id', $id)
            ->with('user')
            ->with('images')
            ->with('colors')
            ->with('sizes')
            ->with('category')
            ->with('ratings')
            ->first();
        }


        if($found == null){
            
            return $this->sendError('Product Errors.',['error' => 'Product not found !']);
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

        $Product = Product::where('id',$id)->first();
        
        if($Product != null){

                
            $Product->name = $request->name;
            $Product->description = $request->description;
            $Product->price = $request->price;
            $Product->bought = $request->bought;
            $Product->quantity = $request->quantity;
            $Product->trend_count = $request->trend_count ?? 0;
            $Product->category_id = $request->categoryId;
            $Product->discount = $request->discount;
            $Product->user_id = $request->user()->id;
            $Product->save();
            $Product->images()->createMany($request->images);
            $Product->colors()->attach($request->colors);
            $Product->sizes()->attach($request->sizes);

            return $this->sendResponse(
                $data = $Product,
                'Update Product successfully.'
            );
        }

        return $this->sendError('Product Errors.',['error' => 'Product not found !']);
    }

    public function create(Request $request){


        $validator = Validator::make($request->all(), [

            // 'total' => 'required'
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
        $colors = [];
        foreach($request->colors as $item)
        {
            $colors['color_id'] = $item['id'];
        }

        $sizes = [];
        foreach($request->sizes as $item)
        {
            $sizes['color_id'] = $item['id'];
        }

        $Product = new Product();
        $Product->name = $request->name;
        $Product->description = $request->description;
        $Product->price = $request->price;
        $Product->bought = $request->bought;
        $Product->quantity = $request->quantity;
        $Product->trend_count = $request->trend_count ?? 0;
        $Product->category_id = $request->categoryId;
        $Product->discount = $request->discount;
        $Product->user_id = $request->user()->id;
        $Product->save();
        $Product->images()->createMany($request->images);
        $Product->colors()->attach($colors);
        $Product->sizes()->attach($sizes);

        return $this->sendResponse(
            $data = $Product,
            'Create Product successfully.'
        );

    }

    public function delete($id,Request $request){

        $found = Product::find($id); 

        if($found == null){
            
            return $this->sendError('Product Errors.',['error' => 'Product not found !']);
        }

        $found->delete();

        return $this->sendResponse(
            $found, 
            'Delete Product successfully'
          );
    }

    // public function newProducts(Request $request){
    //     $Products = Product::orderBy('created_at','desc')
    //     ->with('user')
    //     ->with('images')
    //     ->with('colors')
    //     ->with('sizes')
    //     ->take(6)
    //     ->get();

    //     return $this->sendResponse(
    //         $data = [
    //                  'items' => $Products , 
    //                 ]
    //       );
    // }
    //  public function manProducts(Request $request){
    //     $Products = Product::orderBy('created_at','desc')
    //     ->with('user')
    //     ->with('images')
    //     ->with('colors')
    //     ->with('sizes')
    //     ->take(6)
    //     ->get();

    //     return $this->sendResponse(
    //         $data = [
    //                  'items' => $Products , 
    //                 ]
    //       );
    // }
    //  public function womanProducts(Request $request){
    //     $Products = Product::orderBy('created_at','desc')
    //     ->with('user')
    //     ->with('images')
    //     ->with('colors')
    //     ->with('sizes')
    //     ->take(6)
    //     ->get();

    //     return $this->sendResponse(
    //         $data = [
    //                  'items' => $Products , 
    //                 ]
    //       );
    // }
    // public function topProduct(Request $request){
    // $Orders = Product::orderBy('created_at','desc')
    // ->with('user')
    // ->with('images')
    // ->with('colors')
    // ->with('sizes')
    // ->take(8)
    // ->get();

    // return $this->sendResponse(
    //     $data = [
    //                 'items' => $Orders , 
    //             ]
    //     );
    // }
    // public function saleMen(Request $request){
    //     $Orders = Product::orderBy('created_at','desc')
    //     ->with('user')
    //     ->with('images')
    //     ->with('colors')
    //     ->with('sizes')
    //     ->take(1)
    //     ->get();

    // return $this->sendResponse(
    //     $data = [
    //                 'items' => $Orders , 
    //             ]
    //     );
    // }
    // public function saleWomen(Request $request){
    //     $Orders = Product::orderBy('created_at','desc')
    //     ->with('user')
    //     ->with('images')
    //     ->with('colors')
    //     ->with('sizes')
    //     ->take(1)
    //     ->get();

    // return $this->sendResponse(
    //     $data = [
    //                 'items' => $Orders , 
    //             ]
    //     );
    // }
     public function comment(Request $request){

        $validator = Validator::make($request->all(), [

            'username' => 'required',
            'email' => 'required|email',
            'title' => 'required',
            'content' => 'required',
            'productId' => 'required',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }

        $comment = new Comment();

        $comment->title = $request->title;
        $comment->content = $request->content;
        $comment->product_id = $request->productId;
        if($request->userId != null){
            $user = User::where('id',$request->userId)->first();
            $user->username = $request->username;
            $user->email = $request->email;
            $user->save();
            $comment->user_id = $request->userId;
        }else{
            $user = new User();
            $user->username = $request->username;
            $user->email = $request->email;
            $user->password = "123456";
            $user->save();
            $comment->user_id = $user->id;
        }
        $comment->save();
        $newComment =  Comment::where('id',$comment->id)
        ->with('user')
        ->first();
        return $this->sendResponse(
            $data = $newComment,
            'Create contact successfully.'
        );

    }
    public function getComment($id,Request $request){

        $user = $request->user();
        $page = $request->query('page') ? $request->query('page') :  1;
        $pageSize = $request->query('pageSize') ?  $request->query('pageSize') : 25;

        $comment = Comment::where('product_id',$id)
            ->orderBy('id','desc')
            ->with('user')
            ->skip( ($page - 1) * $pageSize )
            ->take($pageSize)
            ->get();


        return $this->sendResponse(
            $data = [
                     'items' => $comment , 
                     'total' => Comment::where('product_id',$id)->count()
                    ]
          );
    }
    public function checkOrder($id , $userId,Request $request){
        
        $orders = Order::where('user_id',$userId)->whereHas('orderItems', function ($q)  use ($id) {
            $q->where('product_id', $id);
        })->get();
        $check = $orders->count() > 0 ? true : false ;
        return $this->sendResponse(
            $data = [
                     'check' => $check , 
                    ]
          );
    }
}

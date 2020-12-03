<?php

namespace App\Http\Controllers\Product;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseController as BaseController;
use App\Models\Product;
use App\Models\Role;
use App\Models\Profile;
use Validator;
use Illuminate\Support\Facades\Auth;

class ProductController extends BaseController
{
    public function index(Request $request){

        $page = $request->query('page') ?? 1;
        $pageOrder = $request->query('pageOrder') ?? 25;

        $Orders = Product::orderBy('id','asc')
        ->with('user')
        ->with('images')
        ->with('colors')
        ->with('sizes')
        ->skip( ($page - 1) * $pageOrder )
        ->take($pageOrder)
        ->get();

        return $this->sendResponse(
            $data = [
                     'items' => $Orders , 
                     'total' => $Orders->count()
                    ]
          );
    }


    public function search(Request $request){

        $page = $request->query('page') ?? 1;
        $pageOrder = $request->query('pageOrder') ?? 25;

        $query = Product::query();

        $searchKey = $request->query('q');

        if($searchKey != null){
            
            $query = $query
                           ->where('name','like','%'.$searchKey.'%');
                           
        }

        $Orders = $query
        ->orderBy('id','desc')
        ->skip( ($page - 1) * $pageOrder )
        ->take($pageOrder)
        ->get();

        return $this->sendResponse(
            $data = [
                     'items' => $Orders , 
                     'total' => $Orders->count()
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
            $Product->trend_count = $request->trend_count;
            $Product->category_id = $request->category_id;
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

        $Product = new Product();

        $Product->name = $request->name;
        $Product->description = $request->description;
        $Product->price = $request->price;
        $Product->bought = $request->bought;
        $Product->quantity = $request->quantity;
        $Product->trend_count = $request->trend_count;
        $Product->category_id = $request->category_id;
        $Product->user_id = $request->user()->id;
        $Product->save();

        $Product->images()->createMany($request->images);
        $Product->colors()->attach($request->colors);
        $Product->sizes()->attach($request->sizes);

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

    public function newProducts(Request $request){
        $Orders = Product::orderBy('id','asc')
        ->with('user')
        ->with('images')
        ->with('colors')
        ->with('sizes')
        ->take(6)
        ->get();

        return $this->sendResponse(
            $data = [
                     'items' => $Orders , 
                    ]
          );
    }
     public function manProducts(Request $request){
        $Orders = Product::orderBy('id','asc')
        ->with('user')
        ->with('images')
        ->with('colors')
        ->with('sizes')
        ->take(6)
        ->get();

        return $this->sendResponse(
            $data = [
                     'items' => $Orders , 
                    ]
          );
    }
     public function womanProducts(Request $request){
        $Orders = Product::orderBy('id','asc')
        ->with('user')
        ->with('images')
        ->with('colors')
        ->with('sizes')
        ->take(6)
        ->get();

        return $this->sendResponse(
            $data = [
                     'items' => $Orders , 
                    ]
          );
    }
  
}

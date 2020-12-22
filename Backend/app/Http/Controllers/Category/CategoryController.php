<?php

namespace App\Http\Controllers\Category;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseController as BaseController;
use App\Models\Category;
use App\Models\Role;
use App\Models\Shop;
use App\Models\Profile;
use Validator;
use Illuminate\Support\Facades\Auth;

class CategoryController extends BaseController
{
    public function index(Request $request){
        
        $user = $request->user();
        $page = $request->query('page') ?? 1;
        $pageSize = $request->query('pageSize') ?? 25;
        $hasChild = $request->query('children') ?? false;

        if($user->roles->contains('name', 'admin')){

            $categories = Category::has('children')
            ->orderBy('id','desc')
            ->skip( ($page - 1) * $pageSize )
            ->take($pageSize)
            ->get();

            $total = Category::has('children')->count();
           
        }

        else if($user->roles->contains('name', 'shop')){

            $shopId = $user->shops()->first()->id; 
            $userIdsOfShop = Shop::find($shopId)->users->pluck('id');

            if($hasChild){

                $categories = Category::whereIn('user_id',$userIdsOfShop)
                ->with('children')
                ->orderBy('id','desc')
                ->skip( ($page - 1) * $pageSize )
                ->take($pageSize)
                ->get();

                $total = Category::whereIn('user_id',$userIdsOfShop)->has('children')->count();
            } 
            else{

                $categories = Category::whereIn('user_id',$userIdsOfShop)
                ->has('children')
                ->orderBy('id','desc')
                ->skip( ($page - 1) * $pageSize )
                ->take($pageSize)
                ->get();

                $total = Category::whereIn('user_id',$userIdsOfShop)->has('children')->count();
            }
           
        }
        return $this->sendResponse(
            $data = [
                     'items' => $categories , 
                     'total' => $total
                    ]
          );
    }



    public function search(Request $request){

        $page = $request->query('page') ?? 1;
        $pageSize = $request->query('pageSize') ?? 25;

        $query = Category::query();

        $searchKey = $request->query('q');
        $price = $request->query('price');

        if($searchKey != null){
            
            $query = $query
                           ->orWhere('name','like','%'.$searchKey.'%')
                           ->orWhere('description','like','%'.$searchKey.'%');
                           
        }

        if($price != null)
        {
            $query = $query->Where('price' , '>' , $price);
        }

        $categories = $query
        ->orderBy('id','desc')
        ->skip( ($page - 1) * $pageSize )
        ->take($pageSize)
        ->get();

        return $this->sendResponse(
            $data = [
                     'items' => $categories , 
                     'total' => $categories-> count()
                    ]
          );
    }

    
    public function showChildren($id){

        $found = Category::where('id',$id)->with('children')->first();

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

        $category = Category::find($id);
        
        if($category != null){

            $category->name = $request->name;
            $category->description = $request->description;
            $category->save();

            return $this->sendResponse(
                $data = $category,
                'Update category successfully.'
            );
        }

        return $this->sendError('Category Errors.',['error' => 'Category not found !']);
    }
    public function create(Request $request){



        $validator = Validator::make($request->all(), [

            'name' => 'required|unique:categories'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
        $user = $request->user();

        $parentId = $request->parentId;
        $parentCategory = Category::find($parentId);
        $category = new Category();
        if($parentCategory == null ){
                $category->name = $request->name;
                $category->description = $request->description;
                $category->user_id = $user->id;
                $category->save();
        }

        else {
                $category->name = $request->name;
                $category->description = $request->description;
                $category->parent_id = $parentId;
                $category->user_id = $user->id;

                $category->save();
        }

            return $this->sendResponse(
                $data = $category,
                'Create category successfully.'
            );

    }
    public function delete($id,Request $request){

        $found = Category::find($id); 

        if($found == null){
            
            return $this->sendError('Category Errors.',['error' => 'Category not found !']);
        }

        $found->delete();

        return $this->sendResponse(
            $found, 
            'Delete category successfully'
          );
    }
  
}

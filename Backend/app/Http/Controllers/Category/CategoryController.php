<?php

namespace App\Http\Controllers\Category;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseController as BaseController;
use App\Models\Category;
use App\Models\Role;
use App\Models\Profile;
use Validator;
use Illuminate\Support\Facades\Auth;

class CategoryController extends BaseController
{
    public function index(Request $request){

        $page = $request->query('page') ?? 1;
        $pageSize = $request->query('pageSize') ?? 25;

        $categories = Category::orderBy('id','desc')
        ->skip( ($page - 1) * $pageSize )
        ->take($pageSize)
        ->get();

        return $this->sendResponse(
            $data = [
                     'items' => $categories , 
                     'total' => $categories->count()
                    ]
          );
    }
    public function search(Request $request){

        $page = $request->query('page') ?? 1;
        $pageSize = $request->query('pageSize') ?? 25;

        $query = Category::query();

        $searchKey = $request->query('q');

        if($searchKey != null){
            
            $query = $query
                           ->orWhere('name','like','%'.$searchKey.'%')
                           ->orWhere('description','like','%'.$searchKey.'%');
                           
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

    
    public function show($id){

        $found = Category::where('id',$id)->first();

        return $this->sendResponse(
            $data = $found
        );

    }
    public function update($id,Request $request){

        $validator = Validator::make($request->all(), [

            'name' => 'required|unique:categories'
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

        $category = new Category();
        

            $category->name = $request->name;
            $category->description = $request->description;
            $category->save();

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

<?php

namespace App\Http\Controllers\Shop;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseController as BaseController;
use App\Models\Shop;
use App\Models\Role;
use App\Models\Profile;
use Validator;
use Illuminate\Support\Facades\Auth;

class ShopController extends BaseController
{
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

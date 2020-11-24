<?php

namespace App\Http\Controllers\Order;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseController as BaseController;
use App\Models\OrderItem;
use App\Models\Role;
use App\Models\Profile;
use Validator;
use Illuminate\Support\Facades\Auth;

class OrderItemController extends BaseController
{
    public function index(Request $request){

        $page = $request->query('page') ?? 1;
        $pageOrderItem = $request->query('pageOrderItem') ?? 25;

        $OrderItems = OrderItem::OrderItemBy('id','desc')
        ->skip( ($page - 1) * $pageOrderItem )
        ->take($pageOrderItem)
        ->get();

        return $this->sendResponse(
            $data = [
                     'items' => $OrderItems , 
                     'total' => $OrderItems->count()
                    ]
          );
    }
    public function search(Request $request){

        $page = $request->query('page') ?? 1;
        $pageOrderItem = $request->query('pageOrderItem') ?? 25;

        $query = OrderItem::query();

        $searchKey = $request->query('q');

        if($searchKey != null){
            
            $query = $query
                           ->where('name','like','%'.$searchKey.'%');
                           
        }

        $OrderItems = $query
        ->OrderItemBy('id','desc')
        ->skip( ($page - 1) * $pageOrderItem )
        ->take($pageOrderItem)
        ->get();

        return $this->sendResponse(
            $data = [
                     'items' => $OrderItems , 
                     'total' => $OrderItems->count()
                    ]
          );
    }

    
    public function show($id){

        $found = OrderItem::find($id);

        if($found == null){
            
            return $this->sendError('OrderItem Errors.',['error' => 'OrderItem not found !']);
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

        $OrderItem = OrderItem::where('id',$id)->first();
        
        if($OrderItem != null){

            $OrderItem->order_id = $request->order_id;
            $OrderItem->product_id = $request->product_id;
            $OrderItem->quantity = $request->quantity;
            $OrderItem->total = $request->total;
            $OrderItem->user_id = $request->user()->id;
            $OrderItem->save();

            return $this->sendResponse(
                $data = $OrderItem,
                'Update OrderItem successfully.'
            );
        }

        return $this->sendError('OrderItem Errors.',['error' => 'OrderItem not found !']);
    }

    public function create(Request $request){

        $validator = Validator::make($request->all(), [

            'name' => 'required|unique:OrderItems'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }

        $OrderItem = new OrderItem();

        $OrderItem->order_id = $request->order_id;
        $OrderItem->product_id = $request->product_id;
        $OrderItem->quantity = $request->quantity;
        $OrderItem->total = $request->total;
        $OrderItem->user_id = $request->user()->id;
        $OrderItem->save();

        return $this->sendResponse(
            $data = $OrderItem,
            'Create OrderItem successfully.'
        );

    }

    public function delete($id,Request $request){

        $found = OrderItem::find($id); 

        if($found == null){
            
            return $this->sendError('OrderItem Errors.',['error' => 'OrderItem not found !']);
        }

        $found->delete();

        return $this->sendResponse(
            $found, 
            'Delete OrderItem successfully'
          );
    }
  
}

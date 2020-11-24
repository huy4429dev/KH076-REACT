<?php

namespace App\Http\Controllers\Order;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseController as BaseController;
use App\Models\Order;
use App\Models\Role;
use App\Models\Profile;
use Validator;
use Illuminate\Support\Facades\Auth;

class OrderController extends BaseController
{
    public function index(Request $request){

        $page = $request->query('page') ?? 1;
        $pageOrder = $request->query('pageOrder') ?? 25;

        $Orders = Order::orderBy('id','desc')
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

        $query = Order::query();

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

        $found = Order::find($id);

        if($found == null){
            
            return $this->sendError('Order Errors.',['error' => 'Order not found !']);
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

        $Order = Order::where('id',$id)->first();
        
        if($Order != null){

            $Order->status = $request->status;
            $Order->ship_address = $request->ship_address;
            $Order->total = $request->total;
            $Order->user_id = $request->user()->id;
            $Order->save();

            return $this->sendResponse(
                $data = $Order,
                'Update Order successfully.'
            );
        }

        return $this->sendError('Order Errors.',['error' => 'Order not found !']);
    }

    public function create(Request $request){

        $validator = Validator::make($request->all(), [

            'total' => 'required'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }

        $Order = new Order();

        $Order->status = $request->status;
        $Order->ship_address = $request->ship_address;
        $Order->total = $request->total;
        $Order->user_id = $request->user()->id;
        $Order->save();
        $Order->orderItems()->createMany($request->orderItems);



        // $OrderItem->product_id = $request->product_id;
        // $OrderItem->quantity = $request->quantity;
        // $OrderItem->total = $request->total;
        // $OrderItem->user_id = $request->user()->id;
        // $OrderItem->save();

        return $this->sendResponse(
            $data = $Order,
            'Create Order successfully.'
        );

    }

    public function delete($id,Request $request){

        $found = Order::find($id); 

        if($found == null){
            
            return $this->sendError('Order Errors.',['error' => 'Order not found !']);
        }

        $found->delete();

        return $this->sendResponse(
            $found, 
            'Delete Order successfully'
          );
    }
  
}

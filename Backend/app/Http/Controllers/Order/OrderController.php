<?php

namespace App\Http\Controllers\Order;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseController as BaseController;
use App\Models\Order;
use App\Models\Role;
use App\Models\Profile;
use App\Models\OrderItem;
use App\Models\User;
use Validator;
use Illuminate\Support\Facades\Auth;

class OrderController extends BaseController
{
    public function index(Request $request){

        $user = $request->user();
        $page = $request->query('page') ?? 1;
        $pageOrder = $request->query('pageOrder') ?? 25;

        $Orders = Order::orderBy('id','desc')
        ->where('creator_id', $user->id)
        ->with('user')
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

      
        $user = $request->user();

        $found = Order::where('creator_id',$user->id)->where('id', $request->id)->first(); 

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

            'total' => 'required',
            'username' => 'required',
            'email' => 'email|email',
            'phone' => 'required',
            'username' => 'required',
            'address' => 'required',
            'detailt' => 'required',
            'status' => 'required'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }

        $Order = new Order();

        $Order->status = $request->status;
        $Order->ship_address = $request->ship_address;
        $Order->total = $request->total;
        if($request->user_id != null){
            $user = User::where('id',$request->user_id)->first();
            $user->email = $request->email;
            $user->phone = $request->phone;
            $user->address = $request->address;
            $user->save();
            $Order->user_id = $user->id;
        }else{
            $user = new User();
            $user->username = $request->username;
            $user->email = $request->email;
            $user->phone = $request->phone;
            $user->address = $request->address;
            $user->password = "123456";
            $user->save();
            $Order->user_id  = $user->id;
        }
        $Order->save();

        foreach ($request->detailt as $key => $value) {
            $OrderItem = new OrderItem();
            $OrderItem->product_id = $value['product']['id'];
            $OrderItem->quantity = $value['quantity'];
            $OrderItem->total = $request->total;
            $OrderItem->order_id = $Order->id;
            $OrderItem->save();
        }
        $data['order'] = $Order;
        $data['user'] = $user;
        $data['orderDetail'] = $OrderItem;
        $data['products'] = $request->detailt;

        return $this->sendResponse(
            $data,
            'Create Order successfully.'
        );

    }

    public function delete($id,Request $request){

        $user = $request->user();

        $found = Order::where('creator_id',$user->id)->where('id', $request->id)->first(); 

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

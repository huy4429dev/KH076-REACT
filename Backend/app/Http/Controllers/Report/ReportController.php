<?php

namespace App\Http\Controllers\Report;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseController as BaseController;
use App\Models\Order;
use App\Models\Role;
use App\Models\Profile;
use App\Models\User;
use App\Models\Product;
use App\Models\Contact;
use Validator;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon; 
use Illuminate\Support\Facades\DB;

class ReportController extends BaseController
{
    public function index(Request $request){

        $user = $request->user();

        // check role shop 
    

        $fromDate =  new Carbon('first day of December 2020', 'UTC +7');
        $toDate = Carbon::now();

        $totalDiscount = Order::whereBetween('created_at',[$fromDate,$toDate])->sum('total');

        $countNewCustomer = User::whereBetween('created_at',[$fromDate,$toDate])->whereHas('roles', function($q){
                                $q->where('name', '=', 'user');
                            })->count();

        $countContact = Contact::whereBetween('created_at',[$fromDate,$toDate])->count();
        $countNewOrder =  Order::whereBetween('created_at',[$fromDate,$toDate])->count();
        $productHots = Product::orderBy('bought','desc')->take(6)->get() ;


        $totalAmount = DB::select("select Date(created_at) date, sum(total) total 
                                   from `orders` where `created_at` between '$fromDate' and '$toDate' 
                                   and status = 1
                                   group by Date(created_at)
                                   order by date
                                   ");
        // fill total amount

        $totalAmountFill = [];
        $dayStart = $fromDate->day;
        $dayEnd = $toDate->day;
         
        while($dayStart <= $dayEnd) 
        {
            $dayStart ++; 
            $set = false;
            
            foreach($totalAmount as $item){
                $itemDate = new Carbon($item->date);
                if($itemDate->day == $dayStart - 1){
                    $totalAmountFill[] = ['day' => $dayStart - 1, 'total' => $item->total];  
                    $set = true;
                }
            }
            if($set) continue;            
            $totalAmountFill[] = ['day' => $dayStart - 1 , 'total' => 0];  
        }


        
        $success['totalDiscount'] = $totalDiscount;
        $success['countNewCustomer'] = $countNewCustomer;
        $success['countContact'] =  $countContact;
        $success['countNewOrder'] = $countNewOrder;
        $success['productHots'] = $productHots;
        $success['totalAmount'] = $totalAmountFill;

        

        return $this->sendResponse($success, 'Get data successfully.');             


    }
    public function search(Request $request){
        return 'search';
    }
    public function show($id,Request $request){
        return 'show';
    }
    public function update($id,Request $request){

        $role = $request->user()->roles()->orderBy('role_id','desc')->first();

        return 'update'.$role;
    }
    public function create(Request $request){

        $role = $request->user()->roles()->orderBy('role_id','desc')->first();

        return 'create'.$role;
    }
    public function delete($id,Request $request){

        $role = $request->user()->roles()->orderBy('role_id','desc')->first();

        return 'delete'.$role;
    }
  
}

<?php

namespace App\Http\Controllers\Contact;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Contact;
use App\Models\User;
use Validator;
use App\Http\Controllers\BaseController as BaseController;
use Illuminate\Support\Facades\Auth;

class ContactController extends BaseController
{
      public function create(Request $request){

        $validator = Validator::make($request->all(), [

            'username' => 'required',
            'email' => 'required|email',
            'phone' => 'required|numeric',
            'address' => 'required',
            'message' => 'required',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }

        $contact = new Contact();

        $contact->message = $request->message;
        if($request->idUser != null){
            $user = User::where('id',$request->idUser)->first();
            $user->phone = $request->phone;
            $user->address = $request->address;
            $user->save();
            $contact->user_id = $request->idUser;
        }else{
            $user = new User();
            $user->username = $request->username;
            $user->email = $request->email;
            $user->phone = $request->phone;
            $user->address = $request->address;
            $user->password = "123456";
            $user->save();
            $contact->user_id = $user->id;
        }
        $contact->save();
        return $this->sendResponse(
            $data = $contact,
            'Create contact successfully.'
        );

    }
}

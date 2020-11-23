<?php

namespace App\Http\Controllers\Upload;

use Illuminate\Http\Request;
use Validator,Redirect,Response,File;
use App\Document;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\BaseController as BaseController;

class UploadController extends BaseController
{


    public function store(Request $request)
    {

       $validator = Validator::make($request->all(), 
              [ 
              'file' => 'required|mimes:doc,docx,pdf,txt,jpg,png,jpeg|max:2048',
             ]);   

     	if ($validator->fails()) {          
            return response()->json(['error'=>$validator->errors()], 401);                        
         }  

 
        if ($files = $request->file('file')) {

            $path = $request->any;
            $file = $request->file->store($path);
            $urlFile = Storage::url($file); 

            $success['url'] = $urlFile;
 
            return $this->sendResponse($success,'Upload file successfully');
 
        }

 
    }
}
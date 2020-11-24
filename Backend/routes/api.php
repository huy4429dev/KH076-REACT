<?php

use App\Http\Controllers\Admin\AdminController as AdminController;
use App\Http\Controllers\User\UserController as UserController;
use App\Http\Controllers\Upload\UploadController as UploadController;
use App\Http\Controllers\Category\CategoryController as CategoryController;
use App\Http\Controllers\Product\ProductController as ProductController;
use App\Http\Controllers\Order\OrderController as OrderController;
use App\Http\Controllers\OrderItem\OrderItemController as OrderItemController;
use App\Http\Controllers\Rating\RatingController as RatingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

//================================== Admin

Route::prefix('admins')->group(function(){

    Route::get('/make-admin', [AdminController::class,'makeAdmin'] );

    Route::middleware(['auth:api', 'role'])->group(function() {

        Route::post('/user', [AdminController::class,'createUser'] );

    });
});

//=================

//================================== User 

Route::prefix('users')->group(function(){

    Route::get('/test',function(){
       return 'testtttttt'; 
    });
    
    Route::post('/register', [UserController::class,'register'] );
    Route::post('/login', [UserController::class,'login'] );
    
    Route::middleware(['auth:api', 'role'])->group(function() {
         
        Route::middleware(['scope:admin,shop'])->get('/', [UserController::class,'index'] );
        Route::get('/search', [UserController::class,'search'] );
        Route::get('/{id}', [UserController::class,'show'] );
        Route::post('/', [UserController::class,'create'] );
        Route::put('/{id}', [UserController::class,'update'] );
        Route::delete('/{id}', [UserController::class,'delete'] );

    });

});

//=================

//================================== Upload file 

Route::prefix('uploads')->group(function(){

    Route::post('/{any}', [UploadController::class,'store'] )->where('any', '.*');

});


//=================

//================================== Category 


Route::prefix('categories')->group(function(){
    
    Route::middleware(['auth:api', 'role'])->group(function() {
         
        Route::middleware(['scope:admin,shop,user'])->get('/', [CategoryController::class,'index'] );
    
        Route::middleware(['scope:admin,shop,user'])->get('/search', [CategoryController::class,'search'] );
        Route::middleware(['scope:admin,shop,user'])->get('/{id}', [CategoryController::class,'show'] );
        
        Route::middleware(['scope:admin,shop,user'])->post('/', [CategoryController::class,'create'] );
        Route::middleware(['scope:admin,shop,user'])->put('/{id}', [CategoryController::class,'update'] );
        Route::middleware(['scope:admin,shop,user'])->delete('/{id}', [CategoryController::class,'delete'] );
    });

});

//=================


//================================== Product 


Route::prefix('products')->group(function(){
    
    Route::middleware(['auth:api', 'role'])->group(function() {
         
        Route::middleware(['scope:admin,shop,user'])->get('/', [ProductController::class,'index'] );
        Route::middleware(['scope:admin,shop,user'])->get('/search', [ProductController::class,'search'] );
        Route::middleware(['scope:admin,shop,user'])->get('/{id}', [ProductController::class,'show'] );
        Route::middleware(['scope:admin,shop,user'])->post('/', [ProductController::class,'create'] );
        Route::middleware(['scope:admin,shop,user'])->put('/{id}', [ProductController::class,'update'] );
        Route::middleware(['scope:admin,shop,user'])->delete('/{id}', [ProductController::class,'delete'] );
    });

});

//=================


//================================== Order 


Route::prefix('orders')->group(function(){
    
    Route::middleware(['auth:api', 'role'])->group(function() {
         
        Route::middleware(['scope:admin,shop,user'])->get('/', [OrderController::class,'index'] );
        Route::middleware(['scope:admin,shop,user'])->get('/search', [OrderController::class,'search'] );
        Route::middleware(['scope:admin,shop,user'])->get('/{id}', [OrderController::class,'show'] );
        Route::middleware(['scope:admin,shop,user'])->post('/', [OrderController::class,'create'] );
        Route::middleware(['scope:admin,shop,user'])->put('/{id}', [OrderController::class,'update'] );
        Route::middleware(['scope:admin,shop,user'])->delete('/{id}', [OrderController::class,'delete'] );
    });

});

//=================

//================================== OrderItem 


Route::prefix('order-items')->group(function(){
    
    Route::middleware(['auth:api', 'role'])->group(function() {
         
        Route::middleware(['scope:admin,shop,user'])->get('/', [OrderItemController::class,'index'] );
        Route::middleware(['scope:admin,shop,user'])->get('/search', [OrderItemController::class,'search'] );
        Route::middleware(['scope:admin,shop,user'])->get('/{id}', [OrderItemController::class,'show'] );
        Route::middleware(['scope:admin,shop,user'])->post('/', [OrderItemController::class,'create'] );
        Route::middleware(['scope:admin,shop,user'])->put('/{id}', [OrderItemController::class,'update'] );
        Route::middleware(['scope:admin,shop,user'])->delete('/{id}', [OrderItemController::class,'delete'] );
    });

});

//=================


//================================== Rating 


Route::prefix('rates')->group(function(){
    
    Route::middleware(['auth:api', 'role'])->group(function() {
         
        Route::middleware(['scope:admin,shop,user'])->get('/', [RatingController::class,'index'] );
        Route::middleware(['scope:admin,shop,user'])->get('/search', [RatingController::class,'search'] );
        Route::middleware(['scope:admin,shop,user'])->get('/{id}', [RatingController::class,'show'] );
        Route::middleware(['scope:admin,shop,user'])->post('/', [RatingController::class,'create'] );
        Route::middleware(['scope:admin,shop,user'])->put('/{id}', [RatingController::class,'update'] );
        Route::middleware(['scope:admin,shop,user'])->delete('/{id}', [RatingController::class,'delete'] );
    });

});

//=================
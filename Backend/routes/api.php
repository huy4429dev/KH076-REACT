<?php

use App\Http\Controllers\Admin\AdminController as AdminController;
use App\Http\Controllers\Shop\ShopController as ShopController;
use App\Http\Controllers\User\UserController as UserController;
use App\Http\Controllers\Upload\UploadController as UploadController;
use App\Http\Controllers\Category\CategoryController as CategoryController;
use App\Http\Controllers\Product\ProductController as ProductController;
use App\Http\Controllers\Product\ColorController as ColorController;
use App\Http\Controllers\Product\SizeController as SizeController;
use App\Http\Controllers\Order\OrderController as OrderController;
use App\Http\Controllers\Order\OrderItemController as OrderItemController;
use App\Http\Controllers\Rating\RatingController as RatingController;
use App\Http\Controllers\Contact\ContactController as ContactController;
use App\Http\Controllers\Customer\CustomerController as CustomerController;
use App\Http\Controllers\Report\ReportController as ReportController;
use App\Http\Controllers\Blog\BlogController as BlogController;
use App\Http\Controllers\Address\AddressController as AddressController;
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


//================================== Admin

Route::prefix('admins')->group(function(){

    Route::get('/make-admin', [AdminController::class,'makeAdmin'] );

    Route::middleware(['auth:api', 'role'])->group(function() {

        Route::post('/user', [AdminController::class,'createUser'] );

    });
});

//=================

//================================== Shop 


Route::prefix('shops')->group(function(){
    // Route::get('/', [ShopController::class,'index'] );
    // Route::get('/sale-men', [ShopController::class,'saleMen'] );
    // Route::get('/sale-women', [ShopController::class,'saleWomen'] );
    // Route::get('/search', [ShopController::class,'search'] );

    // Route::get('/new-products', [ShopController::class,'newProducts'] );
    // Route::get('/man-products', [ShopController::class,'manProducts'] );
    // Route::get('/women-products', [ShopController::class,'womanProducts'] );
    // Route::get('/top-product', [ShopController::class,'topProduct'] );

    Route::get('/init', [ShopController::class,'initDataTest'] );

    Route::middleware(['auth:api', 'role'])->group(function() {
         
        Route::middleware(['scope:admin,shop,user'])->get('/', [ShopController::class,'all'] );
        Route::middleware(['scope:admin,shop,user'])->get('/search', [ShopController::class,'search'] );
        Route::middleware(['scope:admin,shop,user'])->get('/{id}', [ShopController::class,'show'] );
        Route::middleware(['scope:admin,shop,user'])->post('/', [ShopController::class,'create'] );
        Route::middleware(['scope:admin,shop,user'])->put('/{id}', [ShopController::class,'update'] );
        Route::middleware(['scope:admin,shop,user'])->delete('/{id}/{userId}', [ShopController::class,'delete'] );
    });

});

//=================


//================================== User 

Route::prefix('users')->group(function(){

    Route::get('/test',function(){
       return 'testtttttt'; 
    });
    Route::get('/all', [UserController::class,'all'] );
    Route::post('/register', [UserController::class,'register'] );
    Route::put('/profile/{id}', [UserController::class,'profile'] );
    Route::post('/login', [UserController::class,'login'] );
    Route::post('/facebook', [UserController::class,'loginFacebook'] );
    Route::get('/{id}', [UserController::class,'show'] );
    Route::put('/avatar/{id}', [UserController::class,'updateAvatar'] );
    Route::middleware(['auth:api', 'role'])->group(function() {
         
        Route::middleware(['scope:admin,shop'])->get('/', [UserController::class,'index'] );
        Route::get('/search', [UserController::class,'search'] );
        // Route::get('/{id}', [UserController::class,'show'] );
        Route::post('/', [UserController::class,'create'] );
        Route::put('/{id}', [UserController::class,'update'] );
        Route::delete('/{id}', [UserController::class,'delete'] );

    });

});

//=================

//================================== Customer 

Route::prefix('customer')->group(function(){
       Route::get('/', [UserController::class,'index'] );
         Route::get('/search', [UserController::class,'search'] );
        Route::get('/{id}', [UserController::class,'show'] );
        Route::post('/', [UserController::class,'create'] );
        Route::put('/{id}', [UserController::class,'update'] );
        Route::delete('/{id}', [UserController::class,'delete'] );


    // Route::middleware(['auth:api', 'role'])->group(function() {
         
    //     Route::middleware(['scope:shop'])->get('/', [CustomerController::class,'index'] );
        
   
    // });

});

//=================

//================================== Upload file 

Route::prefix('uploads')->group(function(){

    Route::post('/{any}', [UploadController::class,'store'] )->where('any', '.*');

});


//=================

//================================== Category 


Route::prefix('categories')->group(function(){
     Route::get('/list', [CategoryController::class,'home'] );
    Route::middleware(['auth:api', 'role'])->group(function() {
        
        Route::get('/', [CategoryController::class,'index'] );
        Route::get('/search', [CategoryController::class,'search'] );
        Route::get('/{id}', [CategoryController::class,'showChildren'] );
        Route::middleware(['scope:admin,shop,user'])->post('/', [CategoryController::class,'create'] );
        Route::middleware(['scope:admin,shop,user'])->put('/{id}', [CategoryController::class,'update'] );
        Route::middleware(['scope:admin,shop,user'])->delete('/{id}', [CategoryController::class,'delete'] );
    });

});

//=================


//==================================Product 


Route::prefix('products')->group(function(){
    

    Route::middleware(['auth:api', 'role'])->group(function() {
        Route::get('/', [ProductController::class,'index'] );
        Route::get('/search-admin', [ProductController::class,'searchAdmin'] );
     
        Route::middleware(['scope:admin,shop,user'])->post('/', [ProductController::class,'create'] );
        Route::middleware(['scope:admin,shop,user'])->put('/{id}', [ProductController::class,'update'] );
        Route::middleware(['scope:admin,shop,user'])->delete('/{id}', [ProductController::class,'delete'] );
    });
    Route::get('/check/{id}/{userId}', [ProductController::class,'checkOrder'] );
    Route::get('/comment/{id}', [ProductController::class,'getComment'] );
    Route::get('/sale-men', [ShopController::class,'saleMen'] );
    Route::get('/sale-women', [ShopController::class,'saleWomen'] );
    Route::get('/search', [ProductController::class,'search'] );

    Route::get('/new-products', [ShopController::class,'newProducts'] );
    Route::get('/man-products', [ShopController::class,'manProducts'] );
    Route::get('/women-products', [ShopController::class,'womanProducts'] );
    Route::get('/shops', [ShopController::class,'index'] );
    Route::get('/top-product', [ShopController::class,'topProduct'] );
    Route::post('/comment', [ProductController::class,'comment'] );
    Route::get('/{id}', [ShopController::class,'show'] );
    Route::get('/search', [ProductController::class,'search'] );
    Route::get('/products-category/{categoryId}', [ShopController::class,'productsCategory'] );


});

//=================


//================================== Order 


Route::prefix('orders')->group(function(){
    Route::post('/', [OrderController::class,'create'] );
    Route::get('/export/{userId}', [OrderController::class,'export'] );
    Route::middleware(['auth:api', 'role'])->group(function() {
        
        Route::middleware(['scope:admin,shop,user'])->get('/', [OrderController::class,'index'] );
        Route::middleware(['scope:admin,shop,user'])->get('/search', [OrderController::class,'search'] );
        Route::middleware(['scope:admin,shop,user'])->get('/{id}', [OrderController::class,'show'] );
        // Route::middleware(['scope:admin,shop,user'])->post('/', [OrderController::class,'create'] );
        Route::middleware(['scope:admin,shop,user'])->put('/{id}', [OrderController::class,'update'] );
        Route::middleware(['scope:admin,shop,user'])->delete('/{id}', [OrderController::class,'delete'] );
        Route::middleware(['scope:admin,shop,user'])->put('/status/{id}/{status}', [OrderController::class,'updateStatus'] );
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


//================================== Color 


Route::prefix('colors')->group(function(){
    
    Route::get('/all', [ColorController::class,'getAll'] );
    Route::middleware(['auth:api', 'role'])->group(function() {
        Route::get('/', [ColorController::class,'index'] );
        Route::get('/search', [ColorController::class,'search'] );
        Route::get('/{id}', [ColorController::class,'show'] );
        Route::middleware(['scope:admin,shop'])->post('/', [ColorController::class,'create'] );
        Route::middleware(['scope:admin,shop'])->put('/{id}', [ColorController::class,'update'] );
        Route::middleware(['scope:admin,shop'])->delete('/{id}', [ColorController::class,'delete'] );
    });

});

//=================

//================================== Size 


Route::prefix('sizes')->group(function(){
    
    Route::middleware(['auth:api', 'role'])->group(function() {

        Route::get('/', [SizeController::class,'index'] );
        Route::get('/search', [SizeController::class,'search'] );
        Route::get('/{id}', [SizeController::class,'show'] );
        Route::middleware(['scope:admin,shop'])->post('/', [SizeController::class,'create'] );
        Route::middleware(['scope:admin,shop'])->put('/{id}', [SizeController::class,'update'] );
        Route::middleware(['scope:admin,shop'])->delete('/{id}', [SizeController::class,'delete'] );
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


//=================

//================================== Contact 


Route::prefix('contact')->group(function(){
      Route::post('/create', [ContactController::class,'create'] );
    Route::get('/', [ContactController::class,'index'] );
      Route::delete('/{id}', [ContactController::class,'delete'] );
    // Route::middleware(['auth:api', 'role'])->group(function() {
         
    //     Route::middleware(['scope:admin,shop,user'])->get('/', [ShopController::class,'index'] );
    //     Route::middleware(['scope:admin,shop,user'])->get('/search', [ShopController::class,'search'] );
    //     Route::middleware(['scope:admin,shop,user'])->get('/{id}', [ShopController::class,'show'] );
    //     Route::middleware(['scope:admin,shop,user'])->post('/', [ShopController::class,'create'] );
    //     Route::middleware(['scope:admin,shop,user'])->put('/{id}', [ShopController::class,'update'] );
    //     Route::middleware(['scope:admin,shop,user'])->delete('/{id}', [ShopController::class,'delete'] );
    // });

});


//================================== REPORT 


Route::prefix('report')->group(function(){
    
    Route::middleware(['auth:api', 'role'])->group(function() {
         
        Route::middleware(['scope:admin,shop'])->get('/', [ReportController::class,'index'] );
        Route::middleware(['scope:admin,shop'])->get('/revenue', [ReportController::class,'revenue'] );
        Route::middleware(['scope:admin,shop'])->get('/employee', [ReportController::class,'employee'] );
        Route::middleware(['scope:admin,shop'])->get('/customer', [ReportController::class,'customer'] );
        // Route::middleware(['scope:admin,shop,user'])->post('/', [RatingController::class,'create'] );
        // Route::middleware(['scope:admin,shop,user'])->put('/{id}', [RatingController::class,'update'] );
        // Route::middleware(['scope:admin,shop,user'])->delete('/{id}', [RatingController::class,'delete'] );
    });

});

//================================== BLOGS 

Route::prefix('blogs')->group(function(){
        Route::get('/home', [BlogController::class,'home'] );
        Route::get('/recent', [BlogController::class,'recent'] );
        Route::get('/', [BlogController::class,'index'] );
        Route::get('/{id}', [BlogController::class,'show'] );
        Route::post('/', [BlogController::class,'create'] );
        Route::put('/{id}', [BlogController::class,'update'] );
        Route::delete('/{id}', [BlogController::class,'delete'] );
    Route::middleware(['auth:api', 'role'])->group(function() {

        // Route::middleware(['scope:shop'])->post('/', [BlogController::class,'create'] );
        // Route::middleware(['scope:admin,shop'])->put('/{id}', [BlogController::class,'update'] );
        // Route::middleware(['scope:admin,shop'])->delete('/{id}', [BlogController::class,'delete'] );
    });

});
//=================
//=================

//================================== address 


Route::prefix('address')->group(function(){
     Route::get('/province', [AddressController::class,'province'] );
     Route::get('/district/{id}', [AddressController::class,'district'] );
     Route::get('/ward/{id}', [AddressController::class,'ward'] );
 
});

//=================

Route::get('/test',function(){
    return 'test1';
 });
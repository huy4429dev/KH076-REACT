<?php

use App\Http\Controllers\Admin\AdminController as AdminController;
use App\Http\Controllers\User\UserController as UserController;
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

//================================== USER 


Route::prefix('users')->group(function(){

    
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



// Route::post('/register', [AuthController::class,'register'] );


// Route::middleware(['auth:api', 'role'])->group(function() {

//     // List users
//     Route::middleware(['scope:user'])->get('/users', function (Request $request) {

//         return "OK VAO !";
//     });

//     // Add/Edit User
//     Route::middleware(['scope:admin,moderator'])->post('/user', function(Request $request) {
//         return User::create($request->all());
//     });

//     Route::middleware(['scope:admin,moderator'])->put('/user/{userId}', function(Request $request, $userId) {

//         try {
//             $user = User::findOrFail($userId);
//         } catch (ModelNotFoundException $e) {
//             return response()->json([
//                 'message' => 'User not found.'
//             ], 403);
//         }

//         $user->update($request->all());

//         return response()->json(['message'=>'User updated successfully.']);
//     });

//     // Delete User
//     Route::middleware(['scope:admin'])->delete('/user/{userId}', function(Request $request, $userId) {

//         try {
//             $user = User::findOfFail($userId);
//         } catch (ModelNotFoundException $e) {
//             return response()->json([
//                 'message' => 'User not found.'
//             ], 403);
//         }

//         $user->delete();

//         return response()->json(['message'=>'User deleted successfully.']);
//     });
// });
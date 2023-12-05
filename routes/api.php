<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::post('/signup', [AuthController::class, 'signUp']);
Route::post('/login', [AuthController::class, 'logIn']);


Route::middleware('auth:sanctum')->group(function() {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']); // logout sekogas treba da e ovde 
    // poso tokenot koga e null e za samo tie so se avtenticirani korisnici so ReactJs

    Route::apiResource('/users', UserController::class);
 
});




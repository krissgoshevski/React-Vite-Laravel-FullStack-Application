<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignUpRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;



class AuthController extends Controller
{

   
   public function signUp(SignUpRequest $request)
   {
      $data = $request->validated();
      /**\App\Models\User */

      $user = User::create([
         'name' => $data['name'],
         'email'=> $data['email'],
         'password'=> bcrypt($data['password']),

      ]);

      $token = $user->createToken('main')->plainTextToken;

      return response(compact('user', 'token')); // moze i vaka vo json format 

      // return response()->json([ 
      //    'user' => $user,
      //    'token' => $token,

      // ]);
      // ovaa niza od json objekti ke se predade na SignUp.jsx od REact 


   }

   public function logIn(LoginRequest $request)
   {
      $credentials = $request->validated();

      // ako nema credentials // ako pw ili email e razlicen od toj so e registriran u baza 
      if(!Auth::attempt($credentials)) {
         return response([
            'message'=> 'Provided email address or password is incorrect',
         ], 422);
      }

      $user = Auth::user();


      $token = $user->createToken('main')->plainTextToken; // plainTextToken -> e dostapen samo za kreiraniot token vo momentot

      return response(compact('user','token'));

   }

   public function logout(Request $request)
   {
       $user = $request->user();
       
       // Fix the typo here
       if( $user->currentAccessToken()->delete()){
         return response('', 204); // successful logout, nothing to return 
       }

   }
   
}

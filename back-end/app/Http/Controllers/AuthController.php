<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use \App\Http\Requests\StoreUserRequest;
use \App\Http\Requests\LoginUserRequest;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    use HttpResponses;

    public function login(LoginUserRequest $request)
    {

        // Request Vaidatation
        $email = $request->email;
        $password = $request->password;

        // if (!Auth::attempt($request->only(['email', 'password']))) {
        //     return $this->error("", "Email & Password does not match with our record", Response::HTTP_NOT_FOUND);
        // }

        $user = User::where('email', $email)->first();

        if ($user) {
            if (Hash::check($password, $user->password)) {
                $token = $user->createToken('API token of ' . $user->username)->plainTextToken;
                $response = ['token' => $token];
                return $this->success(['user' => $user, 'token' => $response], "Login successful", Response::HTTP_OK);
            } else {
                $response = ["message" => "Password mismatch"];
                return $this->error($response, "Cannot Login", Response::HTTP_BAD_REQUEST);
            }
        } else {
            $response = ["message" => 'User does not exist'];
            return $this->error($response, "User not found", Response::HTTP_NOT_FOUND);
        }
    }
    public function register(StoreUserRequest $request)
    {
        // Request Vaidatation
        $validated = $request->validated();

        // create a new user from the request data sent through api
        $user = new User();

        $user->firstname = $validated['firstname'];
        $user->lastname = $validated['lastname'];
        $user->username = $validated['username'];
        $user->email = $validated['email'];
        $user->type = $validated['type'];
        $user->password = Hash::make($validated['password']);


        if ($user->save()) {
            return $this->success([
                'user' => $user,
            ]);
        } else {
            return $this->error("", "Error has occured, please try again", Response::HTTP_CONFLICT);
        }


    }

    public function logout(Request $request)
    {
        $token = $request->user()->currentAccessToken();
        $token->delete();
        return $this->success("", 'logout successful!', Response::HTTP_CREATED);
    }

}
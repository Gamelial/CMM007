<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'firstname' => ['required', 'string', 'max: 225'],
            'lastname' => ['required', 'string', 'max: 225'],
            'username' => ['required', 'string', 'max: 225', 'unique:users'],
            'email' => ['required', 'string', 'max: 225', 'unique:users'],
            'type' => ['required', 'string', 'max: 225'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }
}
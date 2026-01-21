<?php

namespace App\Http\Controllers\User;

use App\Http\Requests\User\StoreRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Routing\Controller;

class StoreController extends Controller
{
    public function __invoke(StoreRequest $request)
    {
        $data = $request->validated();

        // Явно хешируем пароль — надёжнее, чем полагаться на кастинг
        $data['password'] = Hash::make($data['password']);
        $user = User::where('email', $data['email'])->first();
        if($user) return response(['error' => 'User already exists.'], 409);
        $user = User::create($data);
        $token = auth()->tokenById($user->id);
        return response(['access_token' => $token]);
    }
}

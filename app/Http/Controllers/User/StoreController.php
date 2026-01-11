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

        $user = User::firstOrCreate(
            ['email' => $data['email']],
            $data
        );

        return response()->json([
            'message' => $user->wasRecentlyCreated ? 'User created' : 'User already exists',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ]
        ], $user->wasRecentlyCreated ? 201 : 200);
    }
}

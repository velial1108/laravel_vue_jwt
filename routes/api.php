<?php

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Fruit\IndexController;
use App\Http\Controllers\User\StoreController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::prefix('users')->group(function () {
    Route::post('/', StoreController::class); // ← Ключевое исправление!
});
Route::prefix('fruits')->group(function () {
    Route::get('/', IndexController::class); // ← Ключевое исправление!
});

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IndexController;

Auth::routes();

// SPA fallback: отдаём Vue-приложение для всех НЕ-API путей
Route::get('/{page?}', IndexController::class)
    ->where('page', '^(?!api).*$') // ← исключаем /api/*
    ->name('spa.fallback');

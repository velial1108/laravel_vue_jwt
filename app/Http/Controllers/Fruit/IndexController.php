<?php

namespace App\Http\Controllers\Fruit;

use App\Http\Requests\User\StoreRequest;
use App\Http\Resources\Fruit\FruitResource;
use App\Models\Fruit;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Routing\Controller;

class IndexController extends Controller
{
    public function __invoke()
    {
        $fruits = Fruit::all();
        return FruitResource::collection($fruits);
    }
}

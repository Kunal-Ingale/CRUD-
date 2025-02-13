<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/students', [StudentController::class,'index']);

Route::post('/students', [StudentController::class,'store']);
Route::get('/students/{id}', [StudentController::class,'show']);

Route::get('/students/edit/{id}', [StudentController::class,'edit']);
Route::put('/students/edit/{id}', [StudentController::class,'update']);
Route::delete('/students/delete/{id}', [StudentController::class,'destroy']);
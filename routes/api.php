<?php

use App\Http\Controllers\Api\TodoController;
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

Route::get('/todos', [TodoController::class, 'index'])->name('api.todo.findAll');
Route::get('/todos/{id}', [TodoController::class, 'show'])->name('api.todo.findById');
Route::post('/todos/create', [TodoController::class, 'store'])->name('api.todo.create');
Route::put('/todos/update/{id}', [TodoController::class, 'update'])->name('api.todo.update');
Route::delete('/todos/delete/{id}', [TodoController::class, 'destroy'])->name('api.todo.destroy');

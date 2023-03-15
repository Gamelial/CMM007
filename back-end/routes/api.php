<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('/stories', [StoryController::class, 'index']);

// Route::post('/stories', [StoryController::class, 'store']);


Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// Story Endpoints
Route::get('/stories', [StoryController::class, 'index']);
Route::get('/stories/count', [StoryController::class, 'count']);
Route::get('/stories/category', [StoryController::class, 'categories']);
Route::middleware('auth:sanctum')->get('/stories/category/authed', [StoryController::class, 'categories']);
Route::get('/stories/{id}', [StoryController::class, 'show']);
Route::middleware('auth:sanctum')->get('/stories/category/authed/{id}', [StoryController::class, 'categorized_stories']);
Route::get('/stories/category/{id}', [StoryController::class, 'categorized_stories']);
Route::middleware('auth:sanctum')->patch('/stories/{id}', [StoryController::class, 'update']);
Route::middleware('auth:sanctum')->post('/stories', [StoryController::class, 'store']);
Route::middleware('auth:sanctum')->delete('/stories/{id}', [StoryController::class, 'destroy']);


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users/writers', [UserController::class, 'show_writers']);
    Route::get('/users/writers/count', [UserController::class, 'show_writers_count']);
    Route::get('/users/writers/{id}', [UserController::class, 'show_writer_details']);
    Route::delete('/users/writers/{id}', [UserController::class, 'destroy_writers']);
    Route::get('/users/stories/all', [UserController::class, 'show_all_stories']);
    Route::get('/users/stories/mine', [UserController::class, 'fetch_own_stories']);
    Route::get('/users/stories/others', [UserController::class, 'fetch_other_stories']);
    Route::get('/users/stories/mine/{id}', [UserController::class, 'show_own_story']);
    Route::get('/users/stories/others/{id}', [UserController::class, 'show_other_story']);
    Route::resource('/users', UserController::class);
});
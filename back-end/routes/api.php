<?php

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

Route::get('/stories', [StoryController::class, 'index']);

Route::post('/stories', [StoryController::class, 'store']);

$routes = [

    '/stories => create_a_story',
    [
        'id' => 'integer',
        'title' => 'string',
        'exerpts' => 'string',
        'body' => 'string',
        'location' => 'string',
        'views' => 'integer',
        'image' => 'files',
        'use_id' => 'foreign_key'
    ],

    '/stories => view_all_stories',
    [
        'id' => 'integer',
        'title' => 'string',
        'exerpts' => 'string',
        'body' => 'string',
        'location' => 'string',
        'views' => 'integer',
        'image' => 'files',
        'use_id' => 'primary_key'
    ],

    '/story/{id} => view_a_single_story',
    [
        'id' => 'integer',
        'title' => 'string',
        'exerpts' => 'string',
        'body' => 'string',
        'location' => 'string',
        'views' => 'integer',
        'image' => 'files',
        'use_id' => 'primary_key'
    ],

    '/story/{id} => update_a_story',

    '/story/{id} => delete_a_story',

];
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Story;

class StoryController extends Controller
{
    //
    public function index()
    {
        // $pizzas = Pizza::all();
        // $pizzas = Pizza::orderBy('name', 'desc')->get();
        // $pizzas = Pizza::where('type', 'hawaiian')->get();
        $stories = Story::latest()->get();

        return [
            'stories' => $stories,

        ];
    }

    public function show($id)
    {
        $story = Story::findOrFail($id);

        return ['story' => $story];
    }
    public function create()
    {

        return view('pizzas.create');
    }
    public function store(Request $request)
    {

        $story = new Story();
        $story->title = request('title');
        $story->body = request('body');
        $story->location = request('location');
        $story->views = request('views');
        $story->body = request('body');

        error_log($story);

        $story->save();

        return ['story' => $story];
    }

}
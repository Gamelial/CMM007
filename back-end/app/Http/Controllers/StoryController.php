<?php

namespace App\Http\Controllers;

use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

use App\Models\Story;
use App\Models\User;
use App\Models\Category;

class StoryController extends Controller
{
    //
    use HttpResponses;
    public function index(Request $request)
    {

        $stories = Story::query();
        if ($request->has('category')) {
            $stories->where('category_id', $request->category);

            $stories = $stories->get();
            error_log("CAT"."". $stories);
            return $this->success($stories, "Successfull");
        } else {
            $stories = Story::latest()->get();
            return $this->success($stories, "Successfull");
        }

    }

    public function show($id)
    {
        Story::latest()->get();
        $count = Story::count();

        error_log("SHow count" . $count);
        if ($id <= 0) {
            return $this->error("Not Found Error", "Story does not exist", Response::HTTP_NOT_FOUND);
        }
        $story = Story::find($id);
        if (!$story) {
            return $this->error("Not Found Error", "Story does not exist", Response::HTTP_NOT_FOUND);
        } else {
            $story = Story::findOrFail($id);
            $user = User::findOrFail($story->user_id);

            if ($user->id !== $id || $user->type !== 'admin') {
                error_log("First" . $story->views);
                $story->views = $story->views + 1;
                error_log("second" . $story->views);

                $story->save();

            }
            $host = request()->getHost();
            $port = request()->getPort();
            $protocol = request()->getScheme();

            $user->user_id = $user->firstname . " " . $user->lastname;
            $story->name = $user->user_id;
            $filename = basename($story->image);
            $image = $protocol . '://' . $host . ':' . $port . '/storage/' . $filename;
            $story->image = $image;

            return $this->success(['story' => $story], "Successful");
        }
    }

    public function store(Request $request)
    {
        if ($request->user()->can('write-story')) {
            $story = new Story();
            error_log("Got here");

            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('public/images');

                $story->title = request('title');
                $story->body = request('body');
                $story->location = request('location');
                $story->views = request('views');
                $story->user_id = $request->user()->id;
                $story->image = $path;
                $story->save();

                return $this->success($story, "Story published successfully", Response::HTTP_CREATED);
            } else {
                $story->title = request('title');
                $story->body = request('body');
                $story->location = request('location');
                $story->views = request('views');
                $story->user_id = $request->user()->id;
                $story->save();

                return $this->success("", "Story published successfully", Response::HTTP_CREATED);
            }

        } else {
            return $this->error("", "You are not authorized to publish a story", Response::HTTP_UNAUTHORIZED);
        }
    }
    public function update(Request $request)
    {
        $story = Story::find($request->id);
        if ($story->user_id == $request->user()->id) {

            if ($request->hasFile('image')) {

                if (Storage::exists('/images/' . $story->image)) {

                    dd('exists');

                } else {

                    dd('not exists');

                }


                dd($storage);
                if ($storage->exists($story->image)) {
                    $storage->delete($story->image);
                }
                $path = $request->file('image')->store('public/images');
                $story->image = $path;
            }

            $story->title = $request->input('title');
            $story->body = $request->input('body');
            $story->location = $request->input('location');

            $story->save();

            return $this->success($story, "Story updated successfully", Response::HTTP_CREATED);
        }
    }
    public function destroy($id, Request $request)
    {

        if ($request->user()->can('write-story')) {
            $story = Story::find($id);
            error_log($story);
            if (!$story) {
                return $this->error("", "Story Not Found", Response::HTTP_NOT_FOUND);
            }
            if ($story->user_id == $request->user()->id || $request->user()->type == 'admin') {
                $story->delete();
                return $this->success("", "Story deleted successfully", Response::HTTP_OK);
            } else {
                return $this->error("", "You are not authorized to delete this story", Response::HTTP_UNAUTHORIZED);
            }
        } else {
            return $this->error("", "You are not authorized to delete this story", Response::HTTP_UNAUTHORIZED);
        }


    }

    public function categories()
    {
        $categories = Category::all();
        if ($categories) {
            error_log("Categoriy". " ". $categories);
            return $this->success($categories, "Successfull");
        } else {
            return $this->success("", "Cannot Get Categories", Response::HTTP_INTERNAL_SERVER_ERROR);

        }

    }
    public function categorized_stories(Request $request)
    {
        $stories = Story::all();
        if ($request->id == 0) {
            return $this->success($stories, "Successfull");
        }
        if ($request->id) {
            $stories = Story::where('category_id', $request->id)->get();
            error_log("Stories" . " " . $stories);
            return $this->success($stories, "Successfull");
        } else {
            return $this->error("", "No Story Found", Response::HTTP_NOT_FOUND);
        }

    }


    public function count()
    {
        $count = Story::count();
        return $this->success($count, "Successfull");

    }
}
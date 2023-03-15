<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Traits\HttpResponses;

use App\Models\User;
use App\Models\Story;

class UserController extends Controller
{
    use HttpResponses;
    //
    public function index()
    {
        $users = User::latest()->get();

        return [
            'users' => $users,

        ];
    }

    public function show($id)
    {
        $user = User::findOrFail($id);

        return ['user' => $user];
    }
    public function show_writers()
    {
        // $users = User::latest()->get();
        $users = User::where('type', 'writer')->get();


        return [
            'users' => $users,
        ];

    }
    public function show_writer_details(Request $request)
    {
        if ($request->user()->type == 'admin' || $request->user()->id == $request->id) {
            $user = User::where('id', $request->id)->first();
        }

        $user->get();

        //  get all stories by user
        $stories = Story::where('user_id', $request->id)->count();

        $user = [
            'user' => $user,
            'numberOfStories' => $stories,
        ];
        error_log("Storis" . $stories);
        if ($user) {

            return $this->success($user, "successfull", Response::HTTP_OK);
        } else {
            return $this->error("", "Cannot Fetch User", Response::HTTP_NOT_FOUND);
        }

    }
    public function destroy_writers(Request $request)
    {
        if ($request->user()->can('write-story') || $request->user()->type == 'admin') {

            // $users = User::latest()->get();
            // $users = User::where('type', 'writer')->get();
            if ($request->id <= 0) {
                return $this->error("", "Account Not Found", Response::HTTP_NOT_FOUND);
            }
            $user = User::find($request->id);

            // return [
            //     'users' => $users,
            // ];
            if (!$user) {
                return $this->error("", "Account Not Found", Response::HTTP_NOT_FOUND);
            }
            if ($user->user_id == $request->user()->id || $request->user()->type == 'admin') {
                $user->delete();
                return $this->success("", "Account deleted successfully", Response::HTTP_OK);
            } else {
                return $this->error("", "You are not authorized to delete this account", Response::HTTP_UNAUTHORIZED);
            }
        } else {
            return $this->error("", "You are not authorized to delete this account", Response::HTTP_UNAUTHORIZED);
        }

    }
    public function show_writers_count(Request $request)
    {

        if ($request->user()->type == ('admin')) {
            $storytellers = User::where('type', 'writer')->count();


            if ($storytellers) {
                return [
                    'users' => $storytellers,
                ];
            } else {
                return $this->error("", "Cannot get storytellers count");
            }
        }

    }
    public function show_all_stories(Request $request)
    {
        error_log("got here 1");

        if ($request->user()->type == ('admin')) {
            error_log("got here 2");
            $stories = Story::latest();
            if (!$stories) {
                return $this->error("", "Story Not Found", Response::HTTP_NOT_FOUND);
            }
            $stories->get();
            if ($stories) {
                error_log("got here 3");
                error_log("got here");
                error_log("got here" . $stories);
                return $this->success($stories, "Story deleted successfully", Response::HTTP_OK);
            } else {
                return $this->error("", "Theres no story", Response::HTTP_NO_CONTENT);
            }
        } else {
            return $this->error("", "You are not authorized to delete this story", Response::HTTP_UNAUTHORIZED);
        }


    }
    public function show_readers()
    {

        $users = User::latest()->get();
        $users = User::where('type', 'reader')->get();


        return [
            'users' => $users,
        ];

    }

    public function fetch_own_stories(Request $request)
    {
        $stories = Story::where('user_id', $request->user()->id)->orderBy('created_at', 'desc')->get();

        if ($stories) {

            return $this->success(['story' => $stories], "Successful");
        } else {
            return $this->error("", "No stories found", Response::HTTP_NOT_FOUND);
        }
    }

    public function fetch_other_stories(Request $request)
    {
        if ($request->has('category')) {
            $stories = Story::query()->where('category_id', $request->category);
            $stories = $stories->where('user_id', '!=', $request->user()->id)->orderBy('created_at', 'desc');
            $stories = $stories->get();

            return $this->success($stories, "Successfull");
        } else {
            $stories = Story::query()->where('user_id', '!=', $request->user()->id)->orderBy('created_at', 'desc');
            $stories = $stories->get();
            return $this->success($stories, "Successfull");
        }
    }

    public function show_own_story(Request $request)
    {
        $stories = Story::where('user_id', $request->user()->id)->orderBy('created_at', 'desc')->get();
        $story = $stories->find($request->id);
        error_log("ID" . $request->id);
        error_log("User ID" . $request->user()->id);
        if ($story) {
            return $this->success(['story' => $story], "Successful");
        } else {
            return $this->error("", "story not found", Response::HTTP_NOT_FOUND);
        }
    }
    public function show_other_story(Request $request)
    {
        $stories = Story::where('user_id', '!=', $request->user()->id)->orderBy('created_at', 'desc')->get();
        $story = $stories->find($request->id);
        error_log("ID" . $request->id);
        error_log("User ID" . $request->user()->id);
        if ($story) {
            return $this->success(['story' => $story], "Successful");
        } else {
            return $this->error("", "story not found", Response::HTTP_NOT_FOUND);
        }
    }

}
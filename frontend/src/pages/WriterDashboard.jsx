import React, { useState, useEffect } from "react";
import {
  UilMapMarkerAlt,
  UilEditAlt,
  UilTrashAlt,
  UilEye,
} from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";

const api = import.meta.env.VITE_APP_BACKEND_URL;

const WriterDashBoard = () => {
  const authHeader = useAuthHeader();

  const [storyList, setStoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Fetct own stories
  const fetchOwnStories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${api}/users/stories/mine`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: authHeader(),
        },
      });
      setLoading(false);
      let story = data.data.story;
      setStoryList(story);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
      setInterval(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  useEffect(() => {
    fetchOwnStories();
  }, []);

  // Delete own story
  const handleDelete = async (id) => {
    let accept = confirm("Do you want to Delete this Story?");
    if (accept) {
      try {
        setLoading(true);
        let { data } = await axios.delete(`${api}/stories/${id}`, {
          headers: {
            Accept: "*/*",
            "Content-Type": "multipart/form-data",
            Authorization: authHeader(),
          },
        });
        setLoading(false);
        setSuccessMessage(data.message);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
        fetchOwnStories();
      } catch (error) {
        setLoading(false);
        setErrorMessage(error.message);
        setInterval(() => {
          setErrorMessage(null);
        }, 3000);
      }
    }
  };
  return (
    <div className="flex items-center justify-center bg-white shadow-sm rounded-lg w-[90%] lg:w-3/4 m-auto mt-10 min-h-40">
      <div className="font-poppins w-full">
        <div className="flex flex-col space-y-4 p-4 px-6 w-full">
          {loading && <h1>Loading...</h1>}
          {errorMessage && (
            <div className="text-red-500 bg-red-50 rounded-lg p-2 text-center mb-5">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="text-emerald-500 bg-emerald-50 rounded-lg p-2 text-center mb-5">
              {successMessage}
            </div>
          )}

          <div className="text-xl lg:text-2xl font-semibold">
            <h2 className="text-slate-900">My Stories</h2>{" "}
            <div className="flex gap:2 lg:gap-4 items-center font-light mt-10">
              {storyList.length === 0 ? (
                <div className="flex items-center gap-2">
                  <p className="text-sm ">No stories yet!</p>
                  <Link
                    className="py-2 px-5 bg-yellow-100 hover:bg-indigo-100 rounded-full text-sm"
                    to="/writer/stories/add"
                  >
                    write your first
                  </Link>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          {storyList &&
            storyList.map((story) => (
              <div
                key={story.id}
                className="flex flex-col justify-between gap-2 p-2 bg-slate-50 min-h-36 border-[1px] rounded-md mt-10"
              >
                <div className="space-y-2">
                  <Link
                    to={`/writer/stories/${story?.id}`}
                    className="font-light font-ubuntu text-sm lg:text-xl"
                  >
                    {story.title}
                  </Link>
                  <p className="text-sm text-slate-500 whitespace-normal truncate">
                    {story?.body.slice(0, 100)}...
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1">
                      <UilMapMarkerAlt className="h-4 w-4 text-slate-400" />
                      <p className="text-xs">{story?.location}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <UilEye className="h-4 w-4 text-slate-400" />
                      <p className="text-xs">{story?.views}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 lg:gap-4">
                    <a
                      href={`/writer/stories/${story?.id}`}
                      target="_blank"
                      className="flex items-center gap-1 cursor-pointer"
                    >
                      <UilEye className="h-4 w-4 text-slate-400" />
                    </a>
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => {
                        let accept = confirm("Do you want to Edit this Story?");
                        if (accept) {
                          window.location.href = `/writer/stories/edit/${story?.id}`;
                        }
                      }}
                    >
                      <UilEditAlt className="h-4 w-4 text-slate-400" />
                    </div>
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => handleDelete(story?.id)}
                    >
                      <UilTrashAlt className="h-4 w-4 text-slate-400" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WriterDashBoard;

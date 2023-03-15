import React, { useEffect, useState } from "react";
import { UilMapMarkerAlt, UilEye } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import axios from "axios";

const api = import.meta.env.VITE_APP_BACKEND_URL;

const StoryList = ({ category }) => {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getStory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${api}/stories/${category ? category : ""}`
      );
      setLoading(false);
      const { data } = response.data;

      setStory(data);
    } catch (error) {
      setLoading(false);
      setError(error.message);

      setInterval(() => {
        setError(null);
      }, 3000);
    }
  };

  useEffect(() => {
    getStory();
  }, [category]);

  return (
    <div className="p-4">
      <div>
        <div className="flex items-center justify-center col-span-2">
          {loading && <div className="text-center">Loading...</div>}
          {error && (
            <div className=" text-center bg-red-50 text-red-500 w-[90%] lg:w-1/2 rounded-md py-3">
              {error}
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {story !== null
            ? story?.map((story) => (
                <div
                  key={story?.id}
                  className="gap-4 bg-gradient-to-br from-yellow-50 to-yellow-100  p-4 flex flex-col space-y-3  rounded-lg  shadow-sm"
                >
                  <Link
                    to={`/${story?.id}`}
                    className="font-light font-ubuntu text-2xl"
                  >
                    {story?.title}
                  </Link>
                  <p className="text-sm text-slate-500 truncate">
                    {story?.body}
                  </p>

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
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default StoryList;

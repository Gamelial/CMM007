import React, { useEffect, useState } from "react";
import { UilMapMarkerAlt, UilEye } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";

const api = import.meta.env.VITE_APP_BACKEND_URL;

const WriterStoryList = ({ category, setCategory }) => {
  const authHeader = useAuthHeader();

  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getStory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${api}/users/stories/others${category ? category : ""}`,
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: authHeader(),
          },
        }
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
      <div className="">
        <div className="flex items-center justify-center col-span-2">
          {loading && <div className="text-center">Loading...</div>}
          {error && (
            <div className=" text-center bg-red-50 text-red-500 w-[90%] lg:w-1/2 rounded-md py-3">
              {error}
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {story !== null ? (
            story?.map((gist) => (
              <div
                key={gist?.id}
                className="gap-4 bg-slate-50 p-4 flex flex-col space-y-3  rounded-lg"
              >
                <Link
                  to={`/writer/stories/${gist?.id}`}
                  className="font-light font-ubuntu text-2xl"
                >
                  {gist?.title}
                </Link>
                <p className="text-sm text-slate-500 truncate">{gist?.body}</p>

                <div className="flex gap-2">
                  <div className="flex items-center gap-1">
                    <UilMapMarkerAlt className="h-4 w-4 text-slate-400" />
                    <p className="text-xs">{gist?.location}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <UilEye className="h-4 w-4 text-slate-400" />
                    <p className="text-xs">{gist?.views}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center col-span-2">
              <div className="text-center"> No stories yet</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WriterStoryList;

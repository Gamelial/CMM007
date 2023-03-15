import React, { useEffect } from "react";
import { UilEye } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

const WriterStory = () => {
  let navigate = useNavigate();
  const { id } = useParams();

  const [story, setStory] = React.useState([]);

  const getStory = async (idx) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/stories/${idx}`
      );
      let data = response.data.data;

      setStory(data.story);
    } catch (error) {}
  };

  useEffect(() => {
    getStory(id);
  }, []);
  return (
    <div className="flex items-center justify-center bg-white shadow-sm rounded-lg w-[90%] lg:w-3/4 m-auto mt-10">
      <div className="font-poppins w-full">
        <div className="px-2 py-2 ">
          <button className="btn" onClick={() => navigate(-1)}>
            {"<<"} go back
          </button>
        </div>
        {story && (
          <>
            <div className="flex justify-between items-start p-4 px-6">
              <div>
                <h2 className="text-xl lg:text-2xl font-semibold">
                  {story?.title}
                </h2>
                <div className="flex flex-col space-y-2 mt-2">
                  <div className="flex gap-2 items-center text-xs text-slate-400">
                    <p>Author:</p> <p>{story?.name}</p>
                  </div>
                  <div className="flex gap-2 items-center text-xs text-slate-400">
                    <p>Location:</p>
                    <p>{story?.location}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <UilEye className="h-5 w-5 text-slate-400" />
                <p className="text-slate-400 text-xs">{story?.views}</p>
              </div>
            </div>
            <div className="flex flex-col space-y-4 p-4 px-6 w-full lg:w-4/5">
              <div className="w-full">
                <p className="capitalize ">{story?.body}</p>
              </div>

              <img
                src={story?.image}
                alt="Photo by Keira Burton"
                className="max-h-[450px] w-full object-cover object-center rounded-md"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WriterStory;

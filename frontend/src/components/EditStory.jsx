import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";
import { useParams } from "react-router-dom";

const api = import.meta.env.VITE_APP_BACKEND_URL;

const EditStory = () => {
  let { id } = useParams();

  const authHeader = useAuthHeader();

  const [wordCount, setWordCount] = useState(null);
  const [charCount, setCharCount] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [story, setStory] = useState(null);

  const getStory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${api}/stories/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: authHeader(),
        },
      });
      setLoading(false);
      setStory(data.data);
      setSuccessMessage(data.message);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
      setInterval(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  useEffect(() => {
    getStory();
  }, []);

  let data = {
    title: title,
    body: body,
    location: location,
    image: image,
  };

  let config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: authHeader(),
    },
  };

  const editStory = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.patch(`${api}/stories/${id}`, data, config);
      setLoading(false);
      setStory(response.data.story);
      setSuccessMessage(response.data.message);

      setTimeout(() => {
        setSuccessMessage(null);
        window.location.reload();
      }, 3000);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
      setInterval(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  function countWords(evt) {
    // Word Count
    let words = evt.target.value;
    let count = words.split(" ").length;
    setWordCount(count);

    // Character Count
    let len = evt.target.value.length;
    setCharCount(len);

    if (evt.target.value === "") {
      setWordCount(null);
      setCharCount(null);
    }
    return;
  }
  return (
    <div className="flex items-center justify-center bg-white shadow-sm rounded-lg w-[90%] lg:w-3/4 m-auto mt-10 p-4 px-6">
      <div className="font-poppins w-full">
        <div className="text-xl lg:text-2xl font-semibold">
          <div className="flex gap:2 lg:gap-4 items-center">
            <h2 className="text-slate-900">Edit Story</h2>{" "}
            {errorMessage && (
              <h2 className="text-red-500 text-xl">{errorMessage}</h2>
            )}{" "}
            {successMessage && (
              <h2 className="text-green-500 text-xl">{successMessage}</h2>
            )}
          </div>
        </div>
        {story && (
          <form
            className="flex flex-col gap-2 lg:gap-4 p-4"
            encType="multipart/form-data"
            onSubmit={editStory}
          >
            <input type="hidden" name="_method" value="PATCH" />
            <div className="flex flex-col gap-2 lg:gap-4">
              <input
                type="text"
                name="title"
                placeholder={`Story Title: ${story?.story?.title}`}
                className="p-2 rounded-md border-[1px] w-full lg:w-[100%] outline-none"
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                name="location"
                placeholder={`Location: ${story?.story?.location}`}
                className="p-2 rounded-md border-[1px] w-full lg:w-[100%] outline-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <div>
                <input
                  type="file"
                  accept="image/*"
                  className="p-2 rounded-md border-[1px] w-full lg:w-[100%] outline-none"
                  name="image"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />
                <div className="h-14 w-20 rounded-md my-2">
                  <img
                    alt={story?.story?.title}
                    className="h-14 w-20 rounded-md"
                    src={story?.story?.image}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 lg:gap-4">
              <div>
                <textarea
                  name="body"
                  id=""
                  cols="10"
                  rows="9"
                  placeholder={`Update Story: ${story?.story?.body}`}
                  className="p-2 rounded-md border-[1px] w-full lg:w-[100%] outline-none"
                  value={body}
                  onChange={(e) => {
                    countWords(e);
                    setBody(e.target.value);
                  }}
                ></textarea>
                <div className="flex items-center gap-4">
                  {wordCount && (
                    <span className="text-sm text-slate-500">
                      Words: {wordCount}
                    </span>
                  )}

                  {charCount && (
                    <span className="text-sm text-slate-500">
                      Characters: {charCount}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <button className="rounded-full px-3 py-1 flex items-center gap-2 text-sm bg-slate-800 text-slate-100 hover:bg-slate-100 hover:text-slate-800">
                  {!loading ? "Update Story" : "Updating..."}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditStory;

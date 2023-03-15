import React, { useEffect, useState } from "react";
import {
  UilMapMarkerAlt,
  UilTrashAlt,
  UilEye,
  UilSort,
} from "@iconscout/react-unicons";
import { AdminNav } from "@/components";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";

const api = import.meta.env.VITE_APP_BACKEND_URL;

const AdminStories = () => {
  const authHeader = useAuthHeader();

  const [story, setStory] = React.useState(null);
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(null);
  const [categoriesError, setCategoriesError] = useState(null);
  const [categoryID, setCategoryID] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const fetchCategories = async () => {
    try {
      let { data } = await axios.get(`${api}/stories/category`);
      setCategories(data.data);
    } catch (error) {
      setCategoriesError(error.message);
      setTimeout(() => {
        setCategoriesError(null);
      }, 3000);
    }
  };

  let getAllWriters = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${api}/users/stories/others${categoryID ? categoryID : ""}`,
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
    getAllWriters();
  }, [categoryID]);

  const handleFilter = async (id) => {
    console.log(id);
    setCategoryID(id);
  };

  useEffect(() => {
    fetchCategories();
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
    <div className="flex items-center justify-center bg-white shadow-sm rounded-lg w-[90%] lg:w-3/4 m-auto mt-10 py-10">
      <div className="font-poppins w-full">
        <div className="px-6 py-3">{loading && <h1>Loading...</h1>}</div>
        {errorMessage && (
          <div className="text-red-500 bg-red-50 rounded-lg p-6 text-center mb-5">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="text-emerald-500 bg-emerald-50 rounded-lg p-6 text-center mb-5">
            {successMessage}
          </div>
        )}
        <div className="flex justify-between items-start p-4 px-6 h-14">
          <AdminNav />
          <div>
            <div className="flex items-center">
              <UilSort className="h-5 w-5 text-slate-900" />
              <div>
                <select
                  className="border-[2px] border-black"
                  onChange={(e) => handleFilter(e.target.value)}
                >
                  <option value="" selected>
                    All Categories
                  </option>
                  {categories &&
                    categories.map((group) => (
                      <option key={group.id} value={"?category=" + group.id}>
                        {group.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 px-6 text-xl lg:text-2xl font-semibold">
          <h3 className="text-xl lg:text-2xl font-bold">All Stories</h3>
        </div>
        <div className="flex flex-col gap-4 p-4 px-6">
          {story &&
            story?.map((story, index) => (
              <div
                key={index + 1}
                className="flex flex-col space-y-4 p-4 px-6 w-full lg:w-4/5 bg-slate-50 border-[1px] rounded-md"
              >
                <div className="space-y-4 h-18  text-xl lg:text-2xl">
                  <a
                    href={`/admin/stories/${story.id}`}
                    className="font-light font-ubuntu text-xl lg:text-2xl"
                  >
                    {story.title}
                  </a>
                  <p className="text-sm truncate">{story.story}</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <a
                      href={`/writer/stories/${story?.id}`}
                      target="_blank"
                      className="font-poppins text-sm flex items-center gap-1 text-slate-500"
                    >
                      <UilEye className="h-5 w-5" /> {story.views}
                    </a>
                    <p className="font-poppins text-sm flex items-center gap-1 text-slate-500">
                      <UilMapMarkerAlt className="h-5 w-5" /> {story.location}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p
                      className="font-poppins text-sm flex items-center gap-1 text-slate-500 cursor-pointer"
                      onClick={() => handleDelete(story?.id)}
                    >
                      <UilTrashAlt className="h-5 w-5" /> delete
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminStories;

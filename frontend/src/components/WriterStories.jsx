import React, { useState, useEffect, Fragment } from "react";
import { UilSort } from "@iconscout/react-unicons";
import { WriterStoryList } from "../components";
import axios from "axios";

const api = import.meta.env.VITE_APP_BACKEND_URL;

const WriterStories = () => {
  const [categories, setCategories] = useState(null);
  const [, setCategoriesError] = useState(null);
  const [categoryID, setCategoryID] = useState(null);

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

  const handleFilter = async (id) => {
    setCategoryID(id);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex items-center justify-center bg-white shadow-sm rounded-lg w-[90%] lg:w-3/4 m-auto mt-10">
      <div className="font-poppins w-full">
        <div className="flex justify-between items-center p-4 px-6">
          <h2 className="font-black text-3xl">Other Stories</h2>
          <div className="flex items-center">
            <UilSort className="h-5 lg:h-8 w-5 text-slate-900" />
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
        <WriterStoryList category={categoryID} />
      </div>
    </div>
  );
};

export default WriterStories;

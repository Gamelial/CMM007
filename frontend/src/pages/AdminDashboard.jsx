import React, { useState, useEffect } from "react";
import { AdminNav } from "@/components";
import axios from "axios";
import { useAuthHeader, useAuthUser } from "react-auth-kit";

const api = import.meta.env.VITE_APP_BACKEND_URL;

const AdminDashboard = () => {
  const auth = useAuthUser();
  const authHeader = useAuthHeader();
  const checkIfAdmin = () => {
    if (auth().type !== "admin") {
      console.log("Admin", true);
      window.location = "/";
      return;
    }
  };

  useEffect(() => {
    checkIfAdmin();
  }, []);

  const [countStory, setCountStory] = useState(0);
  const [countStorytellers, setCountStorytellers] = useState(0);

  const [loading, setLoading] = useState(false);

  const storiesCount = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${api}/stories/count`);
      setLoading(false);
      const { data } = response.data;
      setCountStory(data);
    } catch (error) {
      setLoading(false);
      setError(error.message);

      setInterval(() => {
        setError(null);
      }, 3000);
      console.log(error);
    }
  };

  useEffect(() => {
    storiesCount();
  }, []);

  const storyTellersCount = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${api}/users/writers/count`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: authHeader(),
        },
      });
      setLoading(false);
      setCountStorytellers(data.users);
    } catch (error) {
      setLoading(false);
      setError(error.message);

      setInterval(() => {
        setError(null);
      }, 3000);
    }
  };

  useEffect(() => {
    storyTellersCount();
  }, []);

  return (
    <div className="flex items-center justify-center bg-white shadow-sm rounded-lg w-[90%] lg:w-3/4 m-auto mt-10 py-10">
      <div className="font-poppins w-full">
        <div className="flex justify-between items-start p-4 px-6 h-14">
          <AdminNav />
        </div>
        <div className="p-4 px-6 text-xl lg:text-2xl font-semibold flex justify-between items-center">
          <h3 className="text-xl lg:text-2xl font-bold">Stats</h3>
          <p className="text-sm lg:text-xl font-bold text-indigo-500">
            {loading && "Loading data..."}
          </p>
        </div>
        <div className="flex flex-col space-y-4 p-4 px-6 w-full lg:w-4/5">
          <div className="flex justify-between items-center gap-2 px-2 lg:px-4 bg-slate-50 h-24 border-[1px] rounded-md text-xl lg:text-2xl">
            <a href="#" className="font-light font-ubuntu text-xl lg:text-2xl">
              Stories
            </a>
            <p className="font-poppins">
              {countStory ? countStory : countStory}
            </p>
          </div>
        </div>

        <div className="flex flex-col space-y-4 p-4 px-6 w-full lg:w-4/5">
          <div className="flex justify-between items-center gap-2 px-2 lg:px-4 bg-slate-50 h-24 border-[1px] rounded-md text-xl lg:text-2xl">
            <a href="#" className="font-light font-ubuntu text-xl lg:text-2xl">
              Story Tellers
            </a>
            <p className="font-poppins">
              {countStorytellers ? countStorytellers : countStorytellers}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

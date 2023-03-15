import React, { useEffect, useState } from "react";
import { UilEye } from "@iconscout/react-unicons";
import { AdminNav } from "@/components";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";

const api = import.meta.env.VITE_APP_BACKEND_URL;

const AdminWriterList = () => {
  const authHeader = useAuthHeader();

  const [writers, setWriters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(false);

  const getAllWriter = async () => {
    try {
      setLoading(true);

      let { data } = await axios.get(`${api}/users/writers`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: authHeader(),
        },
      });
      setLoading(false);
      setSuccessMessage("Successful");
      setWriters(data.users);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  useEffect(() => {
    getAllWriter();
  }, []);

  return (
    <div className="flex items-center justify-center bg-white shadow-sm rounded-lg w-[90%] lg:w-3/4 m-auto mt-10 py-10">
      <div className="font-poppins w-full">
        <div className="flex justify-between items-start p-4 px-6 h-14">
          <AdminNav />
        </div>
        <div className="p-4 px-6 text-xl lg:text-2xl font-semibold">
          <h3 className="text-xl lg:text-2xl font-bold">All Writers</h3>
        </div>
        <div className="w-[80%] md:w-[60] lg:w-1/2 m-auto">
          {loading && <h1>Loading...</h1>}
          {error && (
            <div className="text-red-500 bg-red-50 rounded-lg p-2 text-center mb-5">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="text-emerald-500 bg-emerald-50 rounded-lg p-2 text-center mb-5">
              {successMessage}
            </div>
          )}
        </div>
        {writers &&
          writers.map((user) => (
            <div
              key={user.id}
              className="flex flex-col space-y-4 p-4 px-6 w-full lg:w-4/5"
            >
              <div className="flex justify-between items-center gap-2 bg-slate-50 h-24 border-[1px] rounded-md text-xl lg:text-2xl">
                <div className="p-2 lg:p-4">
                  <a href="#" className="font-poppins">
                    Name: {user.firstname} {user.lastname}
                  </a>
                  <p className="font-thin text-sm lg:text-md flex gap-3 items-center">
                    Username: {user.username}
                  </p>
                </div>
                <a
                  href={`/admin/writers/${user.id}`}
                  className="w-24 h-full bg-white border-[1px] flex items-center justify-center hover:bg-slate-100"
                >
                  <UilEye className="h-4 w-4 md:w-5 md:h-5 lg:w-8 lg:h-8 text-gray-500" />
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminWriterList;

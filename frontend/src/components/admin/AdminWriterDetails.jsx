import React, { useEffect, useState } from "react";
import { UilTrashAlt } from "@iconscout/react-unicons";
import { AdminNav } from "@/components";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";
import { useParams } from "react-router-dom";

const api = import.meta.env.VITE_APP_BACKEND_URL;

const AdminWriterDetails = () => {
  const authHeader = useAuthHeader();
  let { id } = useParams();

  const [writer, setWriter] = useState(null);
  const [numberOfStories, setNumberOfStories] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const getWriter = async () => {
    try {
      setLoading(true);
      let { data } = await axios.get(`${api}/users/writers/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: authHeader(),
        },
      });
      setLoading(false);
      setSuccessMessage(data.message);
      setWriter(data.data.user);
      setNumberOfStories(data.data.numberOfStories);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  useEffect(() => {
    getWriter();
  }, []);

  const handleDeleteWriter = async () => {
    let accept = confirm("Do you want to Delete this Writer?");
    if (accept) {
      try {
        setLoading(true);
        let response = await axios.delete(
          `${api}/users/writers/${writer ? writer.id : 0}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: authHeader(),
            },
          }
        );
        setLoading(false);
        setSuccessMessage(response.data.message);
        setTimeout(() => {
          setSuccessMessage(null);
          window.location = "/admin/writers/";
        }, 3000);
      } catch (error) {
        setLoading(false);
        setError(error.message);
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-white shadow-sm rounded-lg w-[90%] lg:w-3/4 m-auto mt-10 py-10">
      <div className="font-poppins w-full">
        <div className="flex justify-between items-start p-4 px-6 h-14">
          <AdminNav />
        </div>
        <div className="p-4 px-6 text-xl lg:text-2xl font-semibold">
          <h3 className="text-xl lg:text-2xl font-bold">Writer Details</h3>
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
        {writer && (
          <div className="flex flex-col space-y-4 p-4 px-6 w-full lg:w-4/5 m-auto rounded-lg shadow-sm bg-slate-50">
            <div className="p-2 flex gap-5 border-b-[2px]">
              <span>First Name</span>:{" "}
              <span className="font-bold">{writer?.firstname}</span>
            </div>
            <div className="p-2 flex gap-5 border-b-[2px]">
              <span>Last Name</span>:{" "}
              <span className="font-bold">{writer?.lastname}</span>
            </div>
            <div className="p-2 flex gap-5 border-b-[2px]">
              <span>Username</span>:{" "}
              <span className="font-bold">{writer?.username}</span>
            </div>
            <div className="p-2 flex gap-5 border-b-[2px]">
              <span>Email</span>:{" "}
              <span className="font-bold">{writer?.email}</span>
            </div>
            <div className="p-2 flex gap-5 border-b-[2px]">
              <span>Type</span>:{" "}
              <span className="font-bold">{writer?.type}</span>
            </div>
            <div className="p-2 flex gap-5 border-b-[2px]">
              <span>Number of Published Stories</span>:{" "}
              <span className="font-bold">
                {numberOfStories ? numberOfStories : 0}
              </span>
            </div>
            <div className="flex items-center gap-2">
              Delete Writer{" "}
              <UilTrashAlt
                className="text-red-500 hover:text-red-600 cursor-pointer"
                onClick={handleDeleteWriter}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminWriterDetails;

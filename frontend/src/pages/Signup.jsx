import React from "react";
import signupImage from "@/assets/images/pexels-amina-filkins-5561161-2.jpg";

const Signup = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-slate-50 justify-between w-full min-h-[100vh] lg:max-h-screen">
      <div className="m-auto w-[90%] lg:w-2/5 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-ubuntu font-black text-center  mb-5">
          Sign Up
        </h2>
        <form action="" className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="p-3 rounded-md border-[1px] w-full lg:w-[100%] outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-md border-[1px] w-full lg:w-[100%] outline-none"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="p-3 rounded-md border-[1px] w-full lg:w-[100%] outline-none"
          />

          <select className="p-3 rounded-md border-[1px] w-full lg:w-[100%] outline-none">
            <option value="" selected>
              I want to sign up as a
            </option>
            <option value="reader">Reader</option>
            <option value="writer">Writer</option>
          </select>

          <div>
            <button className="rounded-full py-2 px-6 flex items-center font-semibold gap-2 text-sm bg-slate-800 text-slate-100 hover:bg-slate-100 hover:text-slate-800">
              Signup
            </button>
          </div>
          <p className="text-sm text-slate-600">
            Already registered? Login{" "}
            <a href={"/login"} className="underline">
              here
            </a>
          </p>
        </form>
      </div>
      <div className="hidden lg:block">
        <img src={signupImage} alt="" className="max-h-screen" />
      </div>
    </div>
  );
};

export default Signup;

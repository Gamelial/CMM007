import React from "react";
import loginImage from "@/assets/images/pexels-amina-filkins-5561161-2.jpg";

const Login = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-slate-50 justify-between w-full min-h-[100vh] lg:max-h-screen">
      <div className="m-auto w-[90%] lg:w-2/5 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-ubuntu font-black text-center  mb-5">
          Login
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

          <div>
            <button className="rounded-full py-2 px-6 flex items-center font-semibold gap-2 text-sm bg-slate-800 text-slate-100 hover:bg-slate-100 hover:text-slate-800">
              Login
            </button>
          </div>
          <p className="text-sm text-slate-600">
            Please register{" "}
            <a href={"/register"} className="underline">
              here
            </a>
          </p>
        </form>
      </div>
      <div className="hidden lg:block">
        <img src={loginImage} alt="" className="max-h-screen" />
      </div>
    </div>
  );
};

export default Login;

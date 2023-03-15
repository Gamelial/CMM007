import { useEffect, useState } from "react";
import { useAuthHeader, useIsAuthenticated } from "react-auth-kit";
import axios from "axios";

const api = import.meta.env.VITE_APP_BACKEND_URL;

import signupImage from "@/assets/images/pexels-amina-filkins-5561161-2.jpg";

const Signup = () => {
  const isAuthenticated = useIsAuthenticated();
  const authHeader = useAuthHeader();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (isAuthenticated()) {
      if (authHeader.type == "writer") {
        window.location.href("/writer");
      }
      if (authHeader.type == "admin") {
        window.location.href("/admin");
      }
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== password_confirmation) {
      console.log("Password does not match");
      setErrorMessage("Password does not match");

      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return;
    }

    try {
      setLoading(true);
      let { data } = await axios.post(
        `${api}/register/`,
        {
          firstname,
          lastname,
          username,
          type: "writer",
          email,
          password,
          password_confirmation,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      setLoading(false);
      setSuccessMessage("Sigup successful, Please Login!");
      setTimeout(() => {
        setSuccessMessage(null);
        window.location = "/login";
      }, 3000);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-slate-50 justify-between w-full min-h-[100vh] lg:max-h-screen">
      <div className="m-auto w-[90%] lg:w-2/5 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-ubuntu font-black text-center  mb-5">
          Sign Up
        </h2>
        {errorMessage && (
          <div className="text-red-500 bg-red-50 rounded-lg p-2 text-center mb-5">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="text-emerald-500 bg-emerald-50 rounded-lg p-2 text-center mb-5">
            {successMessage}
          </div>
        )}
        <form
          action=""
          className="flex flex-col gap-4"
          onSubmit={handleRegister}
        >
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            className="p-3 rounded-md border-[1px] w-full lg:w-[100%] outline-none"
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            className="p-3 rounded-md border-[1px] w-full lg:w-[100%] outline-none"
            onChange={(e) => setLastname(e.target.value)}
          />
          <input
            type="text"
            name="username"
            placeholder="User Name"
            className="p-3 rounded-md border-[1px] w-full lg:w-[100%] outline-none"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-3 rounded-md border-[1px] w-full lg:w-[100%] outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="p-3 rounded-md border-[1px] w-full lg:w-[100%] outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            className="p-3 rounded-md border-[1px] w-full lg:w-[100%] outline-none"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <div>
            <button
              type="submit"
              className="rounded-full py-2 px-6 flex items-center font-semibold gap-2 text-sm bg-slate-800 text-slate-100 hover:bg-slate-100 hover:text-slate-800"
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
          </div>
          <p className="text-sm text-slate-600">
            Already registered? Login{" "}
            <a href={"/login"} className="underline">
              here
            </a>
          </p>
          <p className="text-sm text-slate-600 mt-2">
            Back to{" "}
            <a href={"/"} className="underline">
              Home
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

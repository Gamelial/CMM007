import { useEffect, useState, useRef } from "react";
import loginImage from "@/assets/images/pexels-amina-filkins-5561161-2.jpg";
import { useSignIn, useAuthHeader, useIsAuthenticated } from "react-auth-kit";
import axios from "axios";

const api = import.meta.env.VITE_APP_BACKEND_URL;

const Login = () => {
  const isAuthenticated = useIsAuthenticated();
  const authHeader = useAuthHeader();

  const signIn = useSignIn();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loginEmail, setEmail] = useState("");
  const [loginPassword, setPassword] = useState("");

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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      let { data } = await axios.post(
        `${api}/login/`,
        {
          email: loginEmail,
          password: loginPassword,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      let { token } = data.data;
      let { message } = data;
      let { user } = data.data;
      let { id, firstname, lastname, username, email, type } = user;

      setLoading(false);
      setSuccessMessage(message + "...");

      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);

      if (
        signIn({
          token: token.token,
          expiresIn: 60 * 60 * 24 * 7,
          tokenType: "Bearer",
          authState: {
            id,
            username,
            firstname,
            lastname,
            email,
            type,
          },
        })
      ) {
        if (type === "writer") {
          setInterval(() => {
            window.location = "/writer";
          }, 4000);
        }
        if (type === "admin") {
          setInterval(() => {
            window.location = "/admin";
          }, 4000);
        }
      }
    } catch (error) {
      if (!error.response) {
      }
      if (error.response?.status === 400) {
      }
      if (error.response?.status === 401) {
        setErrorMessage(error.response?.data.message);
      }
      if (error.response?.status === 404) {
        setErrorMessage(error.response?.data.message);
      } else {
        setErrorMessage(error.response?.data.message);
      }
      setLoading(false);
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-slate-50 justify-between w-full min-h-[100vh] lg:max-h-screen">
      <div className="m-auto w-[90%] lg:w-2/5 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-ubuntu font-black text-center  mb-5">
          Login
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

        <form action="" className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="p-3 rounded-md border-[1px] w-full lg:w-[100%] outline-none"
            value={loginEmail}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-md border-[1px] w-full lg:w-[100%] outline-none"
            name="password"
            value={loginPassword}
            required
            onChange={(e) => {
              setPassword(e.target.value);
              console.log(e.target.value);
            }}
          />

          <div>
            <button
              type="submit"
              className="rounded-full py-2 px-6 flex items-center font-semibold gap-2 text-sm bg-slate-800 text-slate-100 hover:bg-slate-100 hover:text-slate-800"
            >
              {loading ? "Loging in..." : "Login"}
            </button>
          </div>
        </form>
        <p className="text-sm text-slate-600 mt-5">
          Please register{" "}
          <a href={"/register"} className="underline">
            here
          </a>
        </p>
        <p className="text-sm text-slate-600 mt-5">
          Back to{" "}
          <a href={"/"} className="underline">
            Home
          </a>
        </p>
      </div>
      <div className="hidden lg:block">
        <img src={loginImage} alt="" className="max-h-screen" />
      </div>
    </div>
  );
};

export default Login;

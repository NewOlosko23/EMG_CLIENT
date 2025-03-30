import React from "react";
import Bg from "../assets/emg1.jpg";
import { Link } from "react-router-dom";

const Login = ({ theme }) => {
  return (
    <section
      className={`flex min-h-screen px-5 md:px-0 transition-all ${
        theme === "dark"
          ? "bg-gray-900 text-gray-300"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Image section - Hidden on small screens */}
      <div className="hidden lg:flex w-1/2 h-screen">
        <img src={Bg} alt="login" className="w-full h-full object-cover" />
      </div>

      {/* Login form section - Full width on small screens, half on large screens */}
      <div className="flex justify-center items-center w-full lg:w-1/2">
        <div className="max-w-md px-5 w-full bg-purple-500 p-8 rounded-lg shadow-lg text-white">
          <h2 className="text-3xl font-bold text-center mb-6">
            Login to EMG Music
          </h2>

          <form>
            <div className="mb-4">
              <label className="block text-lg mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-md bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg mb-2">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-md bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center text-sm">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <a href="#" className="text-sm text-gray-200 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-black text-white rounded-full text-lg font-semibold hover:bg-gray-800 transition duration-300"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center">
            Don't have an account?{" "}
            <Link
              to="/Signup"
              className="text-gray-200 cursor-pointer hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;

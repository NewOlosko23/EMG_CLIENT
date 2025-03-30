import React from "react";
import Bg from "../assets/emg1.jpg";
import { Link } from "react-router-dom";

const Signup = ({ theme }) => {
  return (
    <section
      className={`flex min-h-screen mt-10 pt-10 px-5 md:px-0 transition-all ${
        theme === "dark"
          ? "bg-gray-900 text-gray-300"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Image section - Hidden on small screens */}
      <div className="hidden lg:flex w-1/2 h-screen">
        <img src={Bg} alt="signup" className="w-full h-full object-cover" />
      </div>

      {/* Signup form section - Full width on small screens, half on large screens */}
      <div className="flex justify-center items-center w-full lg:w-1/2">
        <div className="max-w-md w-full bg-purple-500 p-8 rounded-lg shadow-lg text-white">
          <h2 className="text-3xl font-bold text-center mb-6">
            Create an Account
          </h2>

          <form>
            <div className="mb-4">
              <label className="block text-lg mb-2">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Enter your full name"
                required
              />
            </div>

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
                placeholder="Create a password"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg mb-2">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-md bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Confirm your password"
                required
              />
            </div>

            <div className="flex items-center mb-6">
              <input type="checkbox" className="mr-2" required />
              <label className="text-sm">
                I agree to the{" "}
                <a href="#" className="text-gray-200 hover:underline">
                  Terms & Conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 cursor-pointer bg-black text-white rounded-full text-lg font-semibold hover:bg-gray-800 transition duration-300"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center">
            Already have an account?{" "}
            <Link to="/Login" className="text-gray-200 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;

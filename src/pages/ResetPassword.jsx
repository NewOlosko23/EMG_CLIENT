import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Lock, ArrowLeft, Music, CheckCircle } from "lucide-react";
import Bg from "../assets/emg2.jpg";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate password reset
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      console.log("Password reset successful");
    }, 2000);
  };

  return (
    <div 
      className="h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${Bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-500/10 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-blue-500/10 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-cyan-500/10 rounded-full animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>

      {/* Back to Login Link */}
      <Link 
        to="/login" 
        className="absolute top-6 left-6 z-20 flex items-center text-white/80 hover:text-white transition-colors duration-300 group"
      >
        <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Login</span>
      </Link>

      {/* Reset Password Form Container */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl">
          {/* Logo and Title */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-4">
              <Music size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
            <p className="text-white/70 text-sm">
              {isSuccess 
                ? "Your password has been successfully reset" 
                : "Enter your new password below"
              }
            </p>
          </div>

          {!isSuccess ? (
            /* Reset Password Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* New Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-white/90">
                  New Password
                </label>
                <div className="relative">
                  <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-12 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/90">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-12 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Confirm your new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors duration-300"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <p className="text-white/70 text-xs font-medium mb-2">Password Requirements:</p>
                <ul className="text-white/60 text-xs space-y-1">
                  <li className="flex items-center">
                    <div className={`w-1.5 h-1.5 rounded-full mr-2 ${formData.password.length >= 8 ? 'bg-green-400' : 'bg-white/30'}`}></div>
                    At least 8 characters
                  </li>
                  <li className="flex items-center">
                    <div className={`w-1.5 h-1.5 rounded-full mr-2 ${/[A-Z]/.test(formData.password) ? 'bg-green-400' : 'bg-white/30'}`}></div>
                    One uppercase letter
                  </li>
                  <li className="flex items-center">
                    <div className={`w-1.5 h-1.5 rounded-full mr-2 ${/[0-9]/.test(formData.password) ? 'bg-green-400' : 'bg-white/30'}`}></div>
                    One number
                  </li>
                  <li className="flex items-center">
                    <div className={`w-1.5 h-1.5 rounded-full mr-2 ${formData.password === formData.confirmPassword && formData.password.length > 0 ? 'bg-green-400' : 'bg-white/30'}`}></div>
                    Passwords match
                  </li>
                </ul>
              </div>

              {/* Reset Button */}
              <button
                type="submit"
                disabled={isLoading || formData.password !== formData.confirmPassword || formData.password.length < 8}
                className="w-full py-2.5 px-6 bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:via-purple-800 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Resetting Password...
                  </div>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          ) : (
            /* Success Message */
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Password Reset Successful!</h3>
              <p className="text-white/70 text-sm">
                Your password has been successfully updated. You can now sign in with your new password.
              </p>
              
              <Link 
                to="/login"
                className="block w-full py-2.5 px-6 bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:via-purple-800 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg text-center mt-6"
              >
                Continue to Login
              </Link>
            </div>
          )}

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-white/70 text-sm">
              Remember your password?{" "}
              <Link to="/login" className="text-purple-300 hover:text-purple-200 font-medium transition-colors duration-300">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

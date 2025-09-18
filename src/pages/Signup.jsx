import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Music } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import Bg from "../assets/emg2.jpg";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signUp, isAuthenticated, isAdmin, isUser } = useAuth();
  const { showSuccess, showError, showLoading, dismiss } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      if (isAdmin()) {
        navigate("/admin", { replace: true });
      } else if (isUser()) {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [isAuthenticated, isAdmin, isUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      showError("Passwords do not match", "Please make sure both password fields are identical");
      setIsLoading(false);
      return;
    }
    
    // Validate password length
    if (formData.password.length < 6) {
      showError("Password too short", "Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }
    
    const loadingToast = showLoading("Creating your account...");
    
    try {
      const result = await signUp(formData.email, formData.password, {
        username: formData.username
      });
      
      dismiss(loadingToast);
      
      if (result.success) {
        showSuccess(
          "Welcome to EMG! 🎵", 
          "Account created successfully! Check your email for verification link.",
          { duration: 6000 }
        );
        
        // Clear form data after successful signup
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        showError("Signup failed", result.error || "Please try again");
      }
    } catch (err) {
      dismiss(loadingToast);
      showError("Unexpected error", "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
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

      {/* Back to Home Link */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 z-20 flex items-center text-white/80 hover:text-white transition-colors duration-300 group"
      >
        <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Home</span>
      </Link>

      {/* Signup Form Container */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-4 sm:p-6 border border-white/20 shadow-2xl">
          {/* Logo and Title */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-2">
              <Music size={24} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-white mb-1">Create Account</h1>
            <p className="text-white/70 text-xs">Join EMG and start your music journey</p>
          </div>


          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Username Field */}
            <div className="space-y-1">
              <label htmlFor="username" className="block text-xs font-medium text-white/90">
                Username
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Choose a username"
                />
              </div>
            </div>


            {/* Email Field */}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-xs font-medium text-white/90">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label htmlFor="password" className="block text-xs font-medium text-white/90">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-10 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors duration-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="block text-xs font-medium text-white/90">
                Confirm Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-10 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors duration-300"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                required
                disabled={isLoading}
                className="w-3 h-3 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2 mt-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <label htmlFor="terms" className="ml-2 text-xs text-white/70">
                I agree to the{" "}
                <Link to="#" className="text-purple-300 hover:text-purple-200 transition-colors duration-300">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="#" className="text-purple-300 hover:text-purple-200 transition-colors duration-300">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-6 bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:via-purple-800 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-3">
            <p className="text-white/70 text-xs">
              Already have an account?{" "}
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

export default Signup;

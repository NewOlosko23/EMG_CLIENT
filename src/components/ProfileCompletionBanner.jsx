import React from "react";
import { useNavigate } from "react-router-dom";
import { User, ArrowRight, X, CheckCircle } from "lucide-react";

const ProfileCompletionBanner = ({ userProfile, onDismiss }) => {
  const navigate = useNavigate();
  
  // Don't show banner if completion is 80% or higher
  if (!userProfile || userProfile.profile_completion_percentage >= 80) {
    return null;
  }

  const completionPercentage = userProfile.profile_completion_percentage || 0;
  
  const getCompletionMessage = () => {
    if (completionPercentage < 30) {
      return "Complete your profile to get started!";
    } else if (completionPercentage < 60) {
      return "You're making great progress!";
    } else {
      return "Almost there! Just a few more details.";
    }
  };

  const getCompletionColor = () => {
    if (completionPercentage < 30) {
      return "from-red-500 to-red-600";
    } else if (completionPercentage < 60) {
      return "from-yellow-500 to-yellow-600";
    } else {
      return "from-green-500 to-green-600";
    }
  };

  const getProgressColor = () => {
    if (completionPercentage < 30) {
      return "bg-red-500";
    } else if (completionPercentage < 60) {
      return "bg-yellow-500";
    } else {
      return "bg-green-500";
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 rounded-xl p-4 mb-6 shadow-lg border border-purple-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              {completionPercentage >= 60 ? (
                <CheckCircle className="h-6 w-6 text-white" />
              ) : (
                <User className="h-6 w-6 text-white" />
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-white font-semibold text-sm">
                Profile Completion
              </h3>
              <span className="text-white/80 text-xs">
                {completionPercentage}%
              </span>
            </div>
            <p className="text-purple-100 text-sm mb-2">
              {getCompletionMessage()}
            </p>
            
            {/* Progress Bar */}
            <div className="w-full bg-white/20 rounded-full h-2 mb-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${getProgressColor()}`}
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            
            <p className="text-purple-100 text-xs">
              Complete your profile to unlock all features and improve your visibility
            </p>
          </div>

          {/* Action Button */}
          <div className="flex-shrink-0">
            <button
              onClick={() => navigate('/dashboard/profile')}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 text-sm font-medium"
            >
              Complete Profile
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={onDismiss}
          className="flex-shrink-0 ml-3 p-1 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
          title="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ProfileCompletionBanner;

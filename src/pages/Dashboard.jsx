import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { authHelpers } from "../lib/supabaseClient";
import {
  LayoutDashboard,
  Music,
  TrendingUp,
  Menu,
  X,
  BarChart3,
  Calendar,
  HelpCircle,
  Upload,
  Mic,
  LogOut,
  User
} from "lucide-react";
import NotificationCenter from "../components/NotificationCenter";
import BackToTop from "../components/BackToTop";
import UserProfileModal from "../components/UserProfileModal";
import Logo from "../assets/logo.png";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, getUserName, getUserEmail, user } = useAuth();
  const { showSuccess, showError } = useToast();

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user?.id) {
        setProfileLoading(false);
        return;
      }

      try {
        setProfileLoading(true);
        const { data, error } = await authHelpers.getUserProfile(user.id);
        
        if (error) {
          console.error('Error fetching user profile:', error);
          setUserProfile(null);
        } else {
          setUserProfile(data);
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setUserProfile(null);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchUserProfile();
  }, [user?.id]);

  const handleLogout = async () => {
    const result = await signOut();
    if (result.success) {
      showSuccess("Signed out successfully", "You have been logged out of your account");
      navigate("/", { replace: true });
    } else {
      showError("Logout failed", "There was an error signing you out. Please try again.");
    }
  };

  const handleAvatarClick = () => {
    setIsProfileModalOpen(true);
  };


  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Music", href: "/dashboard/music", icon: Music },
    { name: "Upload Track", href: "/dashboard/upload", icon: Upload },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Promotion", href: "/dashboard/promotion", icon: TrendingUp },
    { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: User },
    { name: "Help", href: "/dashboard/help", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 flex w-72 sm:w-64 flex-col bg-white shadow-xl border-r border-gray-200">
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-white">
            <div className="flex items-center justify-center w-full">
              <img
                src={Logo}
                alt="EMG Music"
                className="h-12 w-auto object-contain"
              />
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  location.pathname === item.href
                    ? "bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 shadow-sm border border-purple-200"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm"
                }`}
              >
                <item.icon className={`h-5 w-5 transition-colors ${
                  location.pathname === item.href ? "text-purple-600" : "text-gray-500 group-hover:text-gray-700"
                }`} />
                <span className="flex-1">{item.name}</span>
                {location.pathname === item.href && (
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                )}
              </Link>
            ))}
          </nav>
          
          {/* Mobile sidebar logout button */}
          <div className="px-4 py-4 border-t border-gray-200">
            <button
              onClick={() => {
                handleLogout();
                setSidebarOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-200 hover:shadow-md"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center justify-center px-4 border-b border-gray-200">
            <img
              src={Logo}
              alt="EMG Music"
              className="h-10 w-auto object-contain"
            />
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === item.href
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-white border border-gray-100 shadow-sm">
              {profileLoading ? (
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
              ) : userProfile?.avatar_url ? (
                <img
                  src={userProfile.avatar_url}
                  alt={userProfile.full_name || getUserName()}
                  className="w-10 h-10 rounded-full object-cover border-2 border-purple-100 cursor-pointer hover:border-purple-300 transition-all duration-200 hover:scale-105"
                  onClick={handleAvatarClick}
                />
              ) : (
                <div 
                  className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center cursor-pointer hover:from-purple-200 hover:to-purple-300 transition-all duration-200 hover:scale-105"
                  onClick={handleAvatarClick}
                >
                  <User className="h-5 w-5 text-purple-600" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {profileLoading ? (
                    <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    userProfile?.username || userProfile?.full_name || getUserName()
                  )}
                </p>
                <p className="text-xs text-gray-500">Music Artist</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Enhanced Top bar */}
        <div className="sticky top-0 z-40 flex h-14 sm:h-16 shrink-0 items-center gap-x-3 sm:gap-x-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm px-3 sm:px-4 shadow-sm lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <NotificationCenter />
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />
              
              {/* Enhanced User Avatar and Username */}
              <div className="flex items-center gap-x-3">
                {profileLoading ? (
                  <div className="flex items-center gap-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ) : (
                  <div className="flex items-center gap-x-2">
                    {userProfile?.avatar_url ? (
                      <img
                        src={userProfile.avatar_url}
                        alt={userProfile.full_name || getUserName()}
                        className="w-8 h-8 rounded-full object-cover border-2 border-purple-100 cursor-pointer hover:border-purple-300 transition-all duration-200 hover:scale-105"
                        onClick={handleAvatarClick}
                      />
                    ) : (
                      <div 
                        className="w-8 h-8 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center cursor-pointer hover:from-purple-200 hover:to-purple-300 transition-all duration-200 hover:scale-105"
                        onClick={handleAvatarClick}
                      >
                        <User className="h-4 w-4 text-purple-600" />
                      </div>
                    )}
                    <span className="hidden lg:block text-sm font-semibold text-gray-900">
                      {userProfile?.username || userProfile?.full_name || getUserName()}
                    </span>
                  </div>
                )}
              </div>
              
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-4 sm:py-6">
          <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>


      {/* Back to Top Button */}
      <BackToTop />

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userProfile={userProfile}
        user={user}
      />
    </div>
  );
};

export default Dashboard;

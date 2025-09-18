import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import {
  LayoutDashboard,
  Music,
  Users,
  TrendingUp,
  Settings,
  Menu,
  X,
  DollarSign,
  BarChart3,
  Calendar,
  HelpCircle,
  Upload,
  Play,
  Mic,
  LogOut
} from "lucide-react";
import Modal from "../components/Modal";
import NotificationCenter from "../components/NotificationCenter";
import BackToTop from "../components/BackToTop";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, getUserName, getUserEmail } = useAuth();
  const { showSuccess, showError } = useToast();

  const handleLogout = async () => {
    const result = await signOut();
    if (result.success) {
      showSuccess("Signed out successfully", "You have been logged out of your account");
      navigate("/", { replace: true });
    } else {
      showError("Logout failed", "There was an error signing you out. Please try again.");
    }
  };

  // Profile modal state
  const [profileData, setProfileData] = useState({
    name: getUserName() || 'EMG Artist',
    email: getUserEmail() || 'artist@emgmusic.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    newsletter: true,
    notifications: {
      email: true,
      sms: false,
      push: true
    }
  });

  const handleProfileChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (profileData.newPassword !== profileData.confirmPassword) {
      return;
    }
    if (profileData.newPassword.length < 6) {
      return;
    }
    setProfileData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Handle profile update
  };

  const navigation = [
    { name: "Dashboard", href: "/Dashboard", icon: LayoutDashboard },
    { name: "My Music", href: "/Dashboard/music", icon: Music },
    { name: "Upload Track", href: "/Dashboard/upload", icon: Upload },
    { name: "Analytics", href: "/Dashboard/analytics", icon: BarChart3 },
    { name: "Earnings", href: "/Dashboard/earnings", icon: DollarSign },
    { name: "Playlists", href: "/Dashboard/playlists", icon: Play },
    { name: "Collaborations", href: "/Dashboard/collaborations", icon: Users },
    { name: "Promotion", href: "/Dashboard/promotion", icon: TrendingUp },
    { name: "Calendar", href: "/Dashboard/calendar", icon: Calendar },
    { name: "Settings", href: "/Dashboard/settings", icon: Settings },
    { name: "Help", href: "/Dashboard/help", icon: HelpCircle },
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
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white shadow-xl">
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">
                EMG Dashboard
              </span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
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
          <div className="flex h-16 items-center px-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">
                EMG Dashboard
              </span>
            </div>
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
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Mic className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {getUserName()}
                </p>
                <p className="text-xs text-gray-500">Artist</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-200 hover:shadow-md"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <NotificationCenter />
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="flex items-center gap-x-2 hover:bg-gray-50 rounded-lg p-2 transition-colors"
              >
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Mic className="h-4 w-4 text-purple-600" />
                </div>
                <span className="hidden lg:block text-sm font-medium text-gray-900">
                  {getUserName()}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Profile Modal */}
      <Modal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        title="Artist Profile"
        size="lg"
      >
        <div className="space-y-6">
          {/* Profile Information */}
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Artist Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Update Profile
            </button>
          </form>

          {/* Password Change */}
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={profileData.currentPassword}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={profileData.newPassword}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={profileData.confirmPassword}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Change Password
            </button>
          </form>

          {/* Newsletter & Notifications */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Preferences</h3>
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={profileData.newsletter}
                  onChange={handleProfileChange}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">Subscribe to EMG newsletter</span>
              </label>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Notification Preferences</h4>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="notifications.email"
                    checked={profileData.notifications.email}
                    onChange={handleProfileChange}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">Email notifications</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="notifications.sms"
                    checked={profileData.notifications.sms}
                    onChange={handleProfileChange}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">SMS notifications</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="notifications.push"
                    checked={profileData.notifications.push}
                    onChange={handleProfileChange}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">Push notifications</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
};

export default Dashboard;

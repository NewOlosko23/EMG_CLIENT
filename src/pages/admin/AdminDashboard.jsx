import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Music,
  BarChart3,
  Settings,
  Menu,
  X,
  User,
  Shield,
  Bell,
  LogOut,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Headphones,
  MessageSquare,
  Megaphone
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";
import Modal from "../../components/Modal";
import NotificationCenter from "../../components/NotificationCenter";
import BackToTop from "../../components/BackToTop";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, profile, getUserName } = useAuth();
  const { showSuccess, showError } = useToast();

  const handleLogout = async () => {
    const result = await signOut();
    if (result.success) {
      showSuccess("Signed out successfully", "You have been logged out of your admin account");
      navigate("/", { replace: true });
    } else {
      showError("Logout failed", "There was an error signing you out. Please try again.");
    }
  };

  // Admin navigation items
  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "User Management", href: "/admin/users", icon: Users },
    { name: "Content Moderation", href: "/admin/content", icon: Music },
    { name: "Platform Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Support Tickets", href: "/admin/support", icon: MessageSquare },
    { name: "Announcements", href: "/admin/announcements", icon: Megaphone },
    { name: "System Settings", href: "/admin/settings", icon: Settings },
  ];

  // Mock admin stats
  const adminStats = [
    { name: "Total Users", value: "2,543", icon: Users, change: "+12%", changeType: "positive" },
    { name: "Pending Tracks", value: "23", icon: Clock, change: "+5", changeType: "neutral" },
    { name: "Monthly Revenue", value: "$12,543", icon: DollarSign, change: "+8%", changeType: "positive" },
    { name: "Active Support", value: "7", icon: MessageSquare, change: "-2", changeType: "negative" },
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
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Shield size={20} className="text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">
                EMG Admin
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
                    ? "bg-red-100 text-red-700"
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
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center px-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Shield size={20} className="text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">
                EMG Admin
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
                    ? "bg-red-100 text-red-700"
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
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <Shield className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {getUserName()}
                </p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
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
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4 text-red-600" />
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
        title="Admin Profile"
        size="lg"
      >
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">{getUserName()}</h3>
            <p className="text-sm text-gray-500">Administrator</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <p className="text-sm text-gray-900">{profile?.email || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <p className="text-sm text-gray-900 capitalize">{profile?.role || 'admin'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Member Since
              </label>
              <p className="text-sm text-gray-900">
                {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </Modal>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
};

export default AdminDashboard;

import React, { useState } from "react";
import { Bell, X, Music, TrendingUp, DollarSign, Upload, Users } from "lucide-react";
import Modal from "./Modal";

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "upload",
      title: "Track Uploaded Successfully",
      message: "Your track 'Summer Vibes' has been uploaded and is now live on all platforms.",
      time: "2 hours ago",
      icon: Upload,
      unread: true,
      details: {
        trackName: "Summer Vibes",
        platforms: ["Spotify", "Apple Music", "YouTube Music", "Amazon Music", "Deezer"],
        uploadTime: "2 hours ago",
        status: "Live",
        genre: "Electronic",
        duration: "3:45"
      }
    },
    {
      id: 2,
      type: "milestone",
      title: "Play Milestone Reached",
      message: "Your track 'Midnight Dreams' has reached 100K plays!",
      time: "5 hours ago",
      icon: TrendingUp,
      unread: true,
      details: {
        trackName: "Midnight Dreams",
        milestone: "100,000 plays",
        previousMilestone: "50,000 plays",
        timeToReach: "2 weeks",
        topCountries: ["United States", "United Kingdom", "Canada", "Germany", "France"],
        topPlatforms: ["Spotify", "Apple Music", "YouTube Music"]
      }
    },
    {
      id: 3,
      type: "earnings",
      title: "Payment Received",
      message: "You've received $450 from streaming royalties.",
      time: "1 day ago",
      icon: DollarSign,
      unread: false,
      details: {
        amount: "$450.00",
        period: "January 2024",
        breakdown: {
          "Spotify": "$180.50",
          "Apple Music": "$120.30",
          "YouTube Music": "$89.20",
          "Amazon Music": "$60.00"
        },
        totalPlays: "125,000",
        averagePerPlay: "$0.0036"
      }
    },
    {
      id: 4,
      type: "music",
      title: "New Release Available",
      message: "Your latest single is now available on all major streaming platforms.",
      time: "2 days ago",
      icon: Music,
      unread: false,
      details: {
        trackName: "Electric Dreams",
        releaseDate: "2 days ago",
        platforms: ["Spotify", "Apple Music", "YouTube Music", "Amazon Music", "Deezer", "Tidal"],
        genre: "Electronic",
        duration: "4:12",
        label: "EMG Music",
        isrc: "US-EMG-24-00001"
      }
    },
    {
      id: 5,
      type: "collaboration",
      title: "Collaboration Request",
      message: "Artist 'Luna Star' wants to collaborate on a new track.",
      time: "3 days ago",
      icon: Users,
      unread: true,
      details: {
        collaboratorName: "Luna Star",
        collaboratorGenre: "Pop",
        collaboratorFollowers: "50K",
        projectType: "Single",
        proposedGenre: "Electronic Pop",
        message: "Hi! I love your electronic style and would love to collaborate on a track that combines our sounds. I think we could create something amazing together!",
        responseDeadline: "7 days"
      }
    },
    {
      id: 6,
      type: "promotion",
      title: "Playlist Feature",
      message: "Your track has been added to 'Electronic Vibes' playlist with 25K followers.",
      time: "4 days ago",
      icon: TrendingUp,
      unread: false,
      details: {
        trackName: "Neon Lights",
        playlistName: "Electronic Vibes",
        playlistFollowers: "25,000",
        playlistOwner: "EMG Curators",
        position: "15th",
        estimatedReach: "5,000 new listeners",
        genre: "Electronic"
      }
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    // Mark as read when clicked
    if (notification.unread) {
      setNotifications(prev => 
        prev.map(n => 
          n.id === notification.id ? { ...n, unread: false } : n
        )
      );
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, unread: false }))
    );
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "upload": return Upload;
      case "milestone": return TrendingUp;
      case "earnings": return DollarSign;
      case "music": return Music;
      case "collaboration": return Users;
      case "promotion": return TrendingUp;
      default: return Bell;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "upload": return "bg-blue-100 text-blue-600";
      case "milestone": return "bg-green-100 text-green-600";
      case "earnings": return "bg-yellow-100 text-yellow-600";
      case "music": return "bg-purple-100 text-purple-600";
      case "collaboration": return "bg-indigo-100 text-indigo-600";
      case "promotion": return "bg-pink-100 text-pink-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-gray-500 transition-colors"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Notifications"
        size="lg"
      >
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No notifications</p>
              <p className="text-gray-400 text-sm mt-2">You're all caught up!</p>
            </div>
          ) : (
            <>
              <div className="max-h-96 overflow-y-auto space-y-3">
                {notifications.map((notification) => {
                  const IconComponent = getNotificationIcon(notification.type);
                  return (
                    <button
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`w-full p-4 rounded-lg border transition-all duration-200 text-left hover:shadow-md ${
                        notification.unread 
                          ? "bg-purple-50 border-purple-200 hover:bg-purple-100" 
                          : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${getNotificationColor(notification.type)} flex-shrink-0`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-900 mb-1">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400">
                                {notification.time}
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-2 flex-shrink-0">
                              {notification.unread && (
                                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                              )}
                              <div className="text-xs text-gray-400">
                                Click for details
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <button 
                  onClick={markAllAsRead}
                  className="w-full text-sm text-purple-600 hover:text-purple-700 font-medium py-3 px-4 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  Mark all as read
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>

      {/* Notification Detail Modal */}
      <Modal
        isOpen={!!selectedNotification}
        onClose={() => setSelectedNotification(null)}
        title={selectedNotification?.title || ""}
        size="xl"
      >
        {selectedNotification && (
          <div className="space-y-6 sm:space-y-8">
            {/* Header */}
            <div className="flex items-start gap-4 sm:gap-6">
              <div className={`p-3 sm:p-4 rounded-xl ${getNotificationColor(selectedNotification.type)} flex-shrink-0`}>
                {React.createElement(getNotificationIcon(selectedNotification.type), { className: "h-6 w-6 sm:h-8 sm:w-8" })}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {selectedNotification.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1 sm:mt-2">
                  {selectedNotification.time}
                </p>
              </div>
            </div>

            {/* Message */}
            <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {selectedNotification.message}
              </p>
            </div>

            {/* Details based on notification type */}
            {selectedNotification.details && (
              <div className="space-y-4 sm:space-y-6">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Details</h4>
                
                {selectedNotification.type === "upload" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Track Name</label>
                      <p className="text-sm text-gray-900">{selectedNotification.details.trackName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Genre</label>
                      <p className="text-sm text-gray-900">{selectedNotification.details.genre}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Duration</label>
                      <p className="text-sm text-gray-900">{selectedNotification.details.duration}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {selectedNotification.details.status}
                      </span>
                    </div>
                    <div className="sm:col-span-2 lg:col-span-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Available Platforms</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedNotification.details.platforms.map((platform, index) => (
                          <span key={index} className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {selectedNotification.type === "milestone" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Track Name</label>
                      <p className="text-sm text-gray-900">{selectedNotification.details.trackName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Milestone</label>
                      <p className="text-sm font-semibold text-green-600">{selectedNotification.details.milestone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Previous Milestone</label>
                      <p className="text-sm text-gray-900">{selectedNotification.details.previousMilestone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Time to Reach</label>
                      <p className="text-sm text-gray-900">{selectedNotification.details.timeToReach}</p>
                    </div>
                    <div className="sm:col-span-2 lg:col-span-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Top Countries</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedNotification.details.topCountries.map((country, index) => (
                          <span key={index} className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {country}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="sm:col-span-2 lg:col-span-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Top Platforms</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedNotification.details.topPlatforms.map((platform, index) => (
                          <span key={index} className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {selectedNotification.type === "earnings" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Amount</label>
                      <p className="text-2xl font-bold text-green-600">{selectedNotification.details.amount}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Period</label>
                      <p className="text-sm text-gray-900">{selectedNotification.details.period}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Total Plays</label>
                      <p className="text-sm text-gray-900">{selectedNotification.details.totalPlays}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Average Per Play</label>
                      <p className="text-sm text-gray-900">{selectedNotification.details.averagePerPlay}</p>
                    </div>
                    <div className="sm:col-span-2 lg:col-span-3">
                      <label className="block text-sm font-medium text-gray-700 mb-3">Platform Breakdown</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {Object.entries(selectedNotification.details.breakdown).map(([platform, amount]) => (
                          <div key={platform} className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-700">{platform}</span>
                            <span className="text-sm font-semibold text-gray-900">{amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {selectedNotification.type === "collaboration" && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Collaborator</label>
                        <p className="text-sm text-gray-900">{selectedNotification.details.collaboratorName}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Genre</label>
                        <p className="text-sm text-gray-900">{selectedNotification.details.collaboratorGenre}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Followers</label>
                        <p className="text-sm text-gray-900">{selectedNotification.details.collaboratorFollowers}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Project Type</label>
                        <p className="text-sm text-gray-900">{selectedNotification.details.projectType}</p>
                      </div>
                    </div>
                    <div className="sm:col-span-2 lg:col-span-3">
                      <label className="block text-sm font-medium text-gray-700 mb-3">Message</label>
                      <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{selectedNotification.details.message}</p>
                      </div>
                    </div>
                    <div className="sm:col-span-2 lg:col-span-3 flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                      <button className="px-4 sm:px-6 py-2 sm:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm sm:text-base">
                        Accept Collaboration
                      </button>
                      <button className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base">
                        Decline
                      </button>
                    </div>
                  </div>
                )}

                {/* Add more notification types as needed */}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default NotificationCenter;

import React, { useState } from "react";
import { Calendar as CalendarIcon, Plus, Music, Upload, Users, TrendingUp, Clock, MapPin } from "lucide-react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("month");

  // Mock events data
  const events = [
    {
      id: 1,
      title: "Release: Summer Vibes",
      type: "release",
      date: "2024-03-15",
      time: "00:00",
      description: "New single release on all platforms",
      status: "upcoming"
    },
    {
      id: 2,
      title: "Collaboration Meeting",
      type: "meeting",
      date: "2024-03-18",
      time: "14:00",
      description: "Meeting with Luna Star for collaboration",
      status: "upcoming"
    },
    {
      id: 3,
      title: "Playlist Submission Deadline",
      type: "deadline",
      date: "2024-03-20",
      time: "23:59",
      description: "Submit tracks for Electronic Vibes playlist",
      status: "upcoming"
    },
    {
      id: 4,
      title: "Live Performance",
      type: "performance",
      date: "2024-03-25",
      time: "20:00",
      description: "Live set at Club Electronica",
      status: "upcoming"
    },
    {
      id: 5,
      title: "Promotion Campaign Launch",
      type: "promotion",
      date: "2024-03-28",
      time: "09:00",
      description: "Launch social media promotion campaign",
      status: "upcoming"
    }
  ];

  const getEventIcon = (type) => {
    switch (type) {
      case "release": return Music;
      case "meeting": return Users;
      case "deadline": return Clock;
      case "performance": return TrendingUp;
      case "promotion": return Upload;
      default: return CalendarIcon;
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case "release": return "bg-purple-100 text-purple-600 border-purple-200";
      case "meeting": return "bg-blue-100 text-blue-600 border-blue-200";
      case "deadline": return "bg-red-100 text-red-600 border-red-200";
      case "performance": return "bg-green-100 text-green-600 border-green-200";
      case "promotion": return "bg-yellow-100 text-yellow-600 border-yellow-200";
      default: return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600 mt-1">Manage your music schedule and events</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={view}
            onChange={(e) => setView(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="day">Day</option>
          </select>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Event
          </button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ←
          </button>
          <h2 className="text-xl font-semibold text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            →
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day headers */}
          {dayNames.map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {days.map((day, index) => {
            const dayEvents = getEventsForDate(day);
            const isToday = day && day.toDateString() === new Date().toDateString();
            const isSelected = day && day.toDateString() === selectedDate.toDateString();
            
            return (
              <div
                key={index}
                className={`min-h-[100px] p-2 border border-gray-200 cursor-pointer hover:bg-gray-50 ${
                  isToday ? 'bg-purple-50' : ''
                } ${isSelected ? 'ring-2 ring-purple-500' : ''}`}
                onClick={() => day && setSelectedDate(day)}
              >
                {day && (
                  <>
                    <div className={`text-sm font-medium mb-1 ${
                      isToday ? 'text-purple-600' : 'text-gray-900'
                    }`}>
                      {day.getDate()}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map(event => {
                        const IconComponent = getEventIcon(event.type);
                        return (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded border ${getEventColor(event.type)} flex items-center gap-1`}
                          >
                            <IconComponent className="h-3 w-3" />
                            <span className="truncate">{event.title}</span>
                          </div>
                        );
                      })}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Date Events */}
      {selectedDate && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Events for {selectedDate.toLocaleDateString()}
          </h3>
          {getEventsForDate(selectedDate).length > 0 ? (
            <div className="space-y-4">
              {getEventsForDate(selectedDate).map(event => {
                const IconComponent = getEventIcon(event.type);
                return (
                  <div key={event.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-lg ${getEventColor(event.type)}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900">{event.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{event.time}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          event.status === 'upcoming' 
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {event.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No events scheduled for this date</p>
            </div>
          )}
        </div>
      )}

      {/* Upcoming Events */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          {events.slice(0, 5).map(event => {
            const IconComponent = getEventIcon(event.type);
            return (
              <div key={event.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-lg ${getEventColor(event.type)}`}>
                  <IconComponent className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{event.title}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  event.status === 'upcoming' 
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {event.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;

import React, { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Plus, Music, Upload, Users, TrendingUp, Clock, MapPin, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { supabase } from "../lib/supabaseClient";

const Calendar = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("month");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // Form state for creating/editing events
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_type: "other",
    event_date: "",
    event_time: "",
    location: "",
    notes: "",
    is_all_day: false,
    reminder_minutes: 15
  });

  // Load events from database
  useEffect(() => {
    if (user?.id) {
      loadEvents();
    }
  }, [user?.id]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events_emg')
        .select('*')
        .eq('user_id', user.id)
        .order('event_date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error loading events:', error);
      showToast('Error loading events', 'Failed to load your calendar events', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Mock events data (fallback)
  const mockEvents = [
    {
      id: 1,
      title: "Release: Summer Vibes",
      type: "release",
      date: "2024-03-15",
      time: "00:00",
      description: "New single release on all platforms",
      status: "completed",
      notes: "Successfully released on all major platforms. Initial streaming numbers look promising!"
    },
    {
      id: 2,
      title: "Collaboration Meeting",
      type: "meeting",
      date: "2024-03-18",
      time: "14:00",
      description: "Meeting with Luna Star for collaboration",
      status: "completed",
      notes: "Great creative session! We've outlined the track structure and set next steps for production."
    },
    {
      id: 3,
      title: "Playlist Submission Deadline",
      type: "deadline",
      date: "2024-03-20",
      time: "23:59",
      description: "Submit tracks for Electronic Vibes playlist",
      status: "completed",
      notes: "Submitted 'Neon Lights' and 'Electric Dreams' for consideration. Awaiting curator response."
    },
    {
      id: 4,
      title: "Live Performance",
      type: "performance",
      date: "2024-03-25",
      time: "20:00",
      description: "Live set at Club Electronica",
      status: "prepared",
      notes: "Setlist finalized, equipment checked, and venue confirmed. Ready for performance!"
    },
    {
      id: 5,
      title: "Promotion Campaign Launch",
      type: "promotion",
      date: "2024-03-28",
      time: "09:00",
      description: "Launch social media promotion campaign",
      status: "prepared",
      notes: "Content created, posting schedule set, and influencer partnerships confirmed."
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
    return events.filter(event => event.event_date === dateStr);
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

  // Event management functions
  const openEventModal = (date = null, event = null) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title || "",
        description: event.description || "",
        event_type: event.event_type || "other",
        event_date: event.event_date || "",
        event_time: event.event_time || "",
        location: event.location || "",
        notes: event.notes || "",
        is_all_day: event.is_all_day || false,
        reminder_minutes: event.reminder_minutes || 15
      });
    } else {
      setEditingEvent(null);
      setFormData({
        title: "",
        description: "",
        event_type: "other",
        event_date: date ? date.toISOString().split('T')[0] : "",
        event_time: "",
        location: "",
        notes: "",
        is_all_day: false,
        reminder_minutes: 15
      });
    }
    setShowEventModal(true);
  };

  const closeEventModal = () => {
    setShowEventModal(false);
    setEditingEvent(null);
    setFormData({
      title: "",
      description: "",
      event_type: "other",
      event_date: "",
      event_time: "",
      location: "",
      notes: "",
      is_all_day: false,
      reminder_minutes: 15
    });
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    
    if (!user?.id) {
      showToast('Authentication required', 'Please log in to create events', 'error');
      return;
    }

    try {
      const eventData = {
        user_id: user.id,
        title: formData.title,
        description: formData.description,
        event_type: formData.event_type,
        event_date: formData.event_date,
        event_time: formData.event_time || null,
        location: formData.location,
        notes: formData.notes,
        is_all_day: formData.is_all_day,
        reminder_minutes: formData.reminder_minutes,
        status: 'upcoming'
      };

      if (editingEvent) {
        // Update existing event
        const { error } = await supabase
          .from('events_emg')
          .update(eventData)
          .eq('id', editingEvent.id);

        if (error) throw error;
        showToast('Event updated', 'Your event has been updated successfully', 'success');
      } else {
        // Create new event
        const { error } = await supabase
          .from('events_emg')
          .insert([eventData]);

        if (error) throw error;
        showToast('Event created', 'Your event has been created successfully', 'success');
      }

      closeEventModal();
      await loadEvents();
    } catch (error) {
      console.error('Error saving event:', error);
      showToast('Error saving event', error.message, 'error');
    }
  };

  const deleteEvent = async (eventId) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const { error } = await supabase
        .from('events_emg')
        .delete()
        .eq('id', eventId);

      if (error) throw error;
      showToast('Event deleted', 'Your event has been deleted', 'success');
      await loadEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      showToast('Error deleting event', error.message, 'error');
    }
  };

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
          <button 
            onClick={() => openEventModal()}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
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
                onClick={() => {
                  if (day) {
                    setSelectedDate(day);
                    // Double click to create event on that date
                    if (day.toDateString() === selectedDate.toDateString()) {
                      openEventModal(day);
                    }
                  }
                }}
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
                        const IconComponent = getEventIcon(event.event_type);
                        return (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded border ${getEventColor(event.event_type)} flex items-center gap-1 cursor-pointer hover:opacity-80`}
                            onClick={(e) => {
                              e.stopPropagation();
                              openEventModal(null, event);
                            }}
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
                const IconComponent = getEventIcon(event.event_type);
                return (
                  <div key={event.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg group">
                    <div className={`p-2 rounded-lg ${getEventColor(event.event_type)}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900">{event.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        {event.event_time && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{event.event_time}</span>
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{event.location}</span>
                          </div>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          event.status === 'upcoming' 
                            ? 'bg-blue-100 text-blue-800'
                            : event.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {event.status}
                        </span>
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <button
                        onClick={() => openEventModal(null, event)}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit event"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteEvent(event.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete event"
                      >
                        <X className="h-4 w-4" />
                      </button>
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
          {events.filter(event => event.status === 'upcoming').slice(0, 5).map(event => {
            const IconComponent = getEventIcon(event.event_type);
            return (
              <div key={event.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer" onClick={() => openEventModal(null, event)}>
                <div className={`p-2 rounded-lg ${getEventColor(event.event_type)}`}>
                  <IconComponent className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{event.title}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(event.event_date).toLocaleDateString()}
                    {event.event_time && ` at ${event.event_time}`}
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

      {/* Event Creation/Edit Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingEvent ? 'Edit Event' : 'Create Event'}
              </h2>
              <button
                onClick={closeEventModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleEventSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Event title"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Event description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="event_type" className="block text-sm font-medium text-gray-700 mb-1">
                    Type *
                  </label>
                  <select
                    id="event_type"
                    required
                    value={formData.event_type}
                    onChange={(e) => setFormData({...formData, event_type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="release">Release</option>
                    <option value="meeting">Meeting</option>
                    <option value="deadline">Deadline</option>
                    <option value="performance">Performance</option>
                    <option value="promotion">Promotion</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="event_date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    id="event_date"
                    required
                    value={formData.event_date}
                    onChange={(e) => setFormData({...formData, event_date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label htmlFor="event_time" className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    id="event_time"
                    value={formData.event_time}
                    onChange={(e) => setFormData({...formData, event_time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    disabled={formData.is_all_day}
                  />
                </div>
                <div className="flex items-center mt-6">
                  <input
                    type="checkbox"
                    id="is_all_day"
                    checked={formData.is_all_day}
                    onChange={(e) => setFormData({...formData, is_all_day: e.target.checked, event_time: e.target.checked ? '' : formData.event_time})}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_all_day" className="ml-2 text-sm text-gray-700">
                    All day
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Event location"
                />
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Additional notes"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeEventModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  {editingEvent ? 'Update Event' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;

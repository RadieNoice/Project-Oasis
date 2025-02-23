import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Info,
  Repeat
} from "lucide-react";
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  isToday,
  isWeekend,
  addHours
} from "date-fns";

const colorClasses = {
  blue: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  purple: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  green: "bg-green-500/20 text-green-400 border-green-500/30",
  red: "bg-red-500/20 text-red-400 border-red-500/30",
  yellow: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
};

const Calendar = () => {
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    color: "blue",
    description: "",
    recurring: "none"
  });
  const [error, setError] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Calendar grid calculations
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.time) {
      setError("Please fill in all required fields");
      return;
    }

    const newEvent = {
      id: Date.now(),
      ...formData,
      datetime: new Date(`${formData.date}T${formData.time}`)
    };

    setEvents([...events, newEvent]);
    setShowModal(false);
    setFormData({ 
      title: "", 
      date: "", 
      time: "", 
      color: "blue",
      description: "",
      recurring: "none"
    });
    setError("");
  };

  const getEventsForDate = (date) => {
    return events.filter(event => isSameDay(event.datetime, date));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setFormData(prev => ({
      ...prev,
      date: format(date, "yyyy-MM-dd")
    }));
    setShowModal(true);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md relative">
              <button 
                onClick={() => {
                  setShowModal(false);
                  setSelectedEvent(null);
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
              >
                <X className="h-6 w-6" />
              </button>

              {selectedEvent ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-xl ${colorClasses[selectedEvent.color]}`}>
                    <h2 className="text-xl font-semibold text-gray-100">
                      {selectedEvent.title}
                    </h2>
                    <p className="mt-2 text-sm text-gray-300">
                      {format(selectedEvent.datetime, "MMM d, yyyy 'at' h:mm a")}
                    </p>
                    {selectedEvent.description && (
                      <p className="mt-3 text-gray-400 text-sm">
                        {selectedEvent.description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-4 text-sm text-gray-400">
                    {selectedEvent.recurring !== "none" && (
                      <div className="flex items-center gap-2">
                        <Repeat className="h-4 w-4" />
                        <span>{selectedEvent.recurring} recurrence</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleAddEvent} className="space-y-6">
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Event title"
                      className="w-full bg-gray-700 rounded-xl px-4 py-3 text-gray-100 text-lg font-medium focus:ring-2 focus:ring-blue-500"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      autoFocus
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Date
                        </label>
                        <input
                          type="date"
                          className="w-full bg-gray-700 rounded-lg px-4 py-2 text-gray-100"
                          value={formData.date}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Time
                        </label>
                        <input
                          type="time"
                          className="w-full bg-gray-700 rounded-lg px-4 py-2 text-gray-100"
                          value={formData.time}
                          onChange={(e) => setFormData({...formData, time: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        className="w-full bg-gray-700 rounded-lg px-4 py-2 text-gray-100 h-24"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Color
                      </label>
                      <div className="flex gap-2">
                        {Object.keys(colorClasses).map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setFormData({...formData, color})}
                            className={`h-8 w-8 rounded-full bg-${color}-500 border-2 transition-transform ${
                              formData.color === color 
                                ? "border-white scale-110" 
                                : "border-transparent hover:scale-105"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Recurrence
                      </label>
                      <select
                        className="w-full bg-gray-700 rounded-lg px-4 py-2 text-gray-100"
                        value={formData.recurring}
                        onChange={(e) => setFormData({...formData, recurring: e.target.value})}
                      >
                        <option value="none">Doesn't repeat</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  </div>

                  {error && <p className="text-red-400 text-sm">{error}</p>}

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-6 py-2.5 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                      Create Event
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Calendar */}
      <div className="rounded-2xl border border-gray-800 shadow-2xl p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-800 rounded-xl p-1">
              <button
                onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                className="p-2 hover:bg-gray-700 rounded-lg"
              >
                <ChevronLeft className="h-5 w-5 text-gray-400" />
              </button>
              <h1 className="text-2xl font-semibold text-gray-200 px-4">
                {format(currentDate, "MMMM yyyy")}
              </h1>
              <button
                onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                className="p-2 hover:bg-gray-700 rounded-lg"
              >
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl text-gray-300 transition-colors"
            >
              Today
            </button>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search events..."
              className="w-full bg-gray-800 rounded-xl px-4 py-2.5 text-gray-300 placeholder-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              onClick={() => setShowModal(true)}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Plus className="h-5 w-5" />
              New Event
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-px  rounded-xl overflow-hidden">
          {/* Weekday Headers */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div 
              key={day} 
              className="p-3 text-center text-sm font-medium text-gray-400 uppercase tracking-wider"
            >
              {day}
            </div>
          ))}
          
          {/* Calendar Days */}
          {daysInMonth.map((date) => (
            <div
              key={date}
              onClick={() => handleDateClick(date)}
              className={`min-h-[120px] p-2 border border-gray-800 hover:bg-gray-800/50 cursor-pointer transition-colors group relative ${
                !isSameMonth(date, currentDate) ? "opacity-50" : ""
              } ${isToday(date) ? "border-blue-500" : ""} ${
                isWeekend(date) ? "bg" : ""
              }`}
            >
              <div className={`flex items-center justify-center h-7 w-7 text-sm ${
                isToday(date) 
                  ? " text-white rounded-full"
                  : "text-gray-400"
              } ${isWeekend(date) ? "text-red-400" : ""}`}>
                {format(date, "d")}
              </div>
              
              {/* Events */}
              <div className="mt-1 space-y-1">
                {getEventsForDate(date).map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`text-xs p-2 rounded-lg truncate ${colorClasses[event.color]} hover:brightness-110 transition-all cursor-pointer`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEventClick(event);
                    }}
                  >
                    {event.title}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Events Sidebar */}
        <div className="mt-8 border-t border-gray-800 pt-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-300">
            {format(new Date(), "EEEE, MMM d")} - Events
          </h2>
          <div className="space-y-3">
            {events
              .filter(event => isSameDay(event.datetime, new Date()))
              .sort((a, b) => a.datetime - b.datetime)
              .map((event) => (
                <motion.div 
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors group"
                  onClick={() => handleEventClick(event)}
                >
                  <div className={`h-full w-1.5 rounded-full bg-${event.color}-500 mr-4`} />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-100">{event.title}</h3>
                    <div className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                      <Clock className="h-4 w-4" />
                      {format(event.datetime, "h:mm a")}
                    </div>
                    {event.description && (
                      <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                        {event.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
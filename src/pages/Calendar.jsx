import React, { useState } from "react";
import { Calendar as CalendarIcon, Clock, Plus, X, ChevronLeft, ChevronRight } from "lucide-react";
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
  isToday
} from "date-fns";

const Calendar = () => {
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    color: "blue"
  });
  const [error, setError] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Calendar grid calculations
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.time) {
      setError("Please fill in all fields");
      return;
    }

    const newEvent = {
      id: Date.now(),
      ...formData,
      datetime: new Date(`${formData.date}T${formData.time}`)
    };

    setEvents([...events, newEvent]);
    setShowModal(false);
    setFormData({ title: "", date: "", time: "", color: "blue" });
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Add Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-100">
                {selectedDate ? format(selectedDate, "MMM d, yyyy") : "New Event"}
              </h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Add title"
                  className="w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Event Color
                </label>
                <div className="flex gap-2">
                  {["blue", "purple", "green", "red", "yellow"].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData({...formData, color})}
                      className={`h-8 w-8 rounded-full bg-${color}-500 border-2 ${
                        formData.color === color ? "border-white" : "border-transparent"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Calendar */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 shadow-xl p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
            >
              Today
            </button>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-gray-400" />
              </button>
              <button 
                onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <h1 className="text-2xl font-semibold text-gray-200">
              {format(currentDate, "MMMM yyyy")}
            </h1>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Create
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-px bg-gray-800 rounded-lg overflow-hidden">
          {/* Weekday Headers */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="bg-gray-900 p-2 text-center text-sm font-medium text-gray-400">
              {day}
            </div>
          ))}
          
          {/* Calendar Days */}
          {daysInMonth.map((date) => (
            <div
              key={date}
              onClick={() => handleDateClick(date)}
              className={`min-h-[120px] bg-gray-900 p-2 border border-gray-800 hover:bg-gray-800/50 cursor-pointer transition-colors group relative ${
                !isSameMonth(date, currentDate) ? "opacity-50" : ""
              } ${isToday(date) ? "border-blue-500" : ""}`}
            >
              <div className={`flex items-center justify-center h-6 w-6 text-sm ${
                isToday(date) 
                  ? "bg-blue-500 text-white rounded-full"
                  : "text-gray-400"
              }`}>
                {format(date, "d")}
              </div>
              
              {/* Events */}
              <div className="mt-1 space-y-1">
                {getEventsForDate(date).map((event) => (
                  <div
                    key={event.id}
                    className={`text-xs p-1 rounded truncate bg-${event.color}-500/20 text-${event.color}-400`}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar (Google Calendar-like right panel) */}
        <div className="mt-8 border-t border-gray-800 pt-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-300">
            {format(new Date(), "EEEE, MMM d")} - Events
          </h2>
          <div className="space-y-3">
            {events
              .filter(event => isSameDay(event.datetime, new Date()))
              .sort((a, b) => a.datetime - b.datetime)
              .map((event) => (
                <div 
                  key={event.id}
                  className="flex items-center p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors"
                >
                  <div className={`h-4 w-1 rounded-full bg-${event.color}-500 mr-3`} />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-100">{event.title}</h3>
                    <div className="text-sm text-gray-400">
                      {format(event.datetime, "h:mm a")}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
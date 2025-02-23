import React, { useState } from "react";
import {
  Star,
  Archive,
  Trash2,
  Search,
  ChevronDown,
  Mail,
  Filter,
} from "lucide-react";

const Inbox = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Study Group",
      subject: "Next Week's Physics Study Session",
      preview: "Hey everyone! Just confirming our study session...",
      time: "10:30 AM",
      isStarred: true,
      unread: true,
    },
    {
      id: 2,
      sender: "Math Tutor",
      subject: "Calculus Assignment Review",
      preview: "I've reviewed your latest assignment and...",
      time: "Yesterday",
      isStarred: false,
      unread: false,
    },
    {
      id: 3,
      sender: "Chemistry Lab Partner",
      subject: "Lab Report Draft",
      preview: "Here's my part of the lab report for review...",
      time: "2 days ago",
      isStarred: false,
      unread: false,
    },
  ]);

  const toggleStar = (id) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, isStarred: !msg.isStarred } : msg
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      <div className=" rounded-xl shadow-2xl overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="border-b border-gray-700 p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold flex items-center text-gray-100">
                <Mail className="h-6 w-6 mr-2 text-blue-400" />
                Inbox
              </h1>
              <div className="relative">
                <button className="flex items-center text-sm font-medium text-gray-400 hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-colors">
                  Primary
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <Search className="h-5 w-5 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <Filter className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between bg-gray-750">
          <div className="flex space-x-2">
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <Archive className="h-5 w-5 text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <Trash2 className="h-5 w-5 text-gray-400" />
            </button>
          </div>
          <div className="text-sm text-gray-400">
            {messages.filter((m) => m.unread).length} unread messages
          </div>
        </div>

        {/* Messages List */}
        <div className="divide-y divide-gray-700">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start p-4 hover:bg-gray-700/30 cursor-pointer transition-colors ${
                message.unread ? "bg-blue-900/30" : ""
              }`}
            >
              <button
                onClick={() => toggleStar(message.id)}
                className="p-2 hover:bg-gray-600 rounded-lg mr-2 transition-colors"
              >
                <Star
                  className={`h-5 w-5 transition-all ${
                    message.isStarred
                      ? "text-amber-400 fill-current animate-pulse"
                      : "text-gray-500 hover:text-amber-300"
                  }`}
                />
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-sm font-medium truncate ${
                      message.unread
                        ? "font-semibold text-gray-100"
                        : "text-gray-300"
                    }`}
                  >
                    {message.sender}
                  </h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                    {message.time}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-100 truncate mt-1">
                  {message.subject}
                </p>
                <p className="text-sm text-gray-400 truncate mt-1">
                  {message.preview}
                </p>
              </div>

              {message.unread && (
                <div className="ml-4">
                  <span className="w-2 h-2 bg-blue-400 rounded-full inline-block shadow-glow-blue" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-700 p-4 bg-gray-750">
          <div className="flex justify-between items-center text-sm text-gray-400">
            <div>Showing {messages.length} messages</div>
            <div className="flex space-x-4">
              <button className="hover:text-gray-300 transition-colors">
                Previous
              </button>
              <button className="hover:text-gray-300 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;

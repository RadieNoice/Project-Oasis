import React from "react";
import { Star, Archive, Trash2 } from "lucide-react";

const Inbox  = () => {
  const messages = [
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
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Inbox</h1>
          <div className="flex space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Archive className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Trash2 className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-center p-4 rounded-lg hover:bg-gray-50 cursor-pointer ${
                message.unread ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex-shrink-0">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Star
                    className={`h-5 w-5 ${
                      message.isStarred
                        ? "text-yellow-400 fill-current"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3
                    className={`font-medium ${
                      message.unread ? "font-semibold" : ""
                    }`}
                  >
                    {message.sender}
                  </h3>
                  <span className="text-sm text-gray-500">{message.time}</span>
                </div>
                <p className="text-sm font-medium">{message.subject}</p>
                <p className="text-sm text-gray-600 truncate">
                  {message.preview}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inbox;

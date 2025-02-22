import React, { useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hey everyone! 👋", 
      sender: "JohnDoe", 
      avatar: "👨💻",
      role: "Admin",
      timestamp: "09:30",
      reactions: [{ emoji: "👍", count: 3 }]
    },
    { 
      id: 2, 
      text: "Hi John! Ready for the project meeting?", 
      sender: "DesignGuru", 
      avatar: "👩🎨",
      role: "Moderator",
      timestamp: "09:31",
      reactions: []
    },
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const [channels] = useState(["general", "announcements", "off-topic"]);
  const [onlineMembers] = useState([
    { id: 1, name: "JohnDoe", avatar: "👨💻", status: "online" },
    { id: 2, name: "DesignGuru", avatar: "👩🎨", status: "idle" },
    { id: 3, name: "CodeMaster", avatar: "👨💻", status: "dnd" },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        text: newMessage,
        sender: "You",
        avatar: "😎",
        role: "Member",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reactions: []
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Left Sidebar - Channels */}
      <div className="w-48 bg-gray-800 p-4 border-r border-gray-700">
        <h2 className="text-sm font-bold text-gray-400 mb-4">TEXT CHANNELS</h2>
        <ul className="space-y-2">
          {channels.map((channel) => (
            <li
              key={channel}
              className="flex items-center px-2 py-1 rounded hover:bg-gray-700 cursor-pointer text-gray-300 hover:text-white"
            >
              # {channel}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="group flex items-start hover:bg-gray-800 px-2 py-1 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-xl mr-4">
                {message.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className={`font-medium ${message.role === "Admin" ? "text-red-400" : "text-blue-400"}`}>
                    {message.sender}
                  </span>
                  <span className="text-xs text-gray-400">{message.timestamp}</span>
                  {message.role && (
                    <span className="px-1.5 py-0.5 text-xs bg-gray-700 rounded text-gray-300">
                      {message.role}
                    </span>
                  )}
                </div>
                <p className="text-gray-100">{message.text}</p>
                {message.reactions.length > 0 && (
                  <div className="flex space-x-2 mt-2">
                    {message.reactions.map((reaction, idx) => (
                      <button
                        key={idx}
                        className="flex items-center px-2 py-0.5 bg-gray-700 rounded-full hover:bg-gray-600"
                      >
                        <span className="mr-1">{reaction.emoji}</span>
                        <span className="text-xs">{reaction.count}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSend} className="p-4 border-t border-gray-700">
          <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-2">
            <button type="button" className="text-gray-400 hover:text-white p-2">
              <span className="text-xl">➕</span>
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Message #general"
              className="flex-1 bg-transparent focus:outline-none text-gray-100 placeholder-gray-500"
            />
            <button type="button" className="text-gray-400 hover:text-white p-2">
              <span className="text-xl">😊</span>
            </button>
          </div>
        </form>
      </div>

      {/* Right Sidebar - Members */}
      <div className="w-60 bg-gray-800 border-l border-gray-700 p-4">
        <h2 className="text-sm font-bold text-gray-400 mb-4">ONLINE — {onlineMembers.length}</h2>
        <ul className="space-y-2">
          {onlineMembers.map((member) => (
            <li key={member.id} className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                  {member.avatar}
                </div>
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 
                  ${member.status === "online" ? "bg-green-500" : 
                   member.status === "idle" ? "bg-yellow-500" : 
                   "bg-red-500"}`}
                />
              </div>
              <span className="text-gray-300">{member.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chat;
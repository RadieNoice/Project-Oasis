import React from 'react';
import { Bell, Mail, MessageSquare, Calendar, Trophy, Users } from 'lucide-react';

const NotificationSettings = ({ isLightTheme }) => {
  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <div className={`p-6 rounded-xl ${isLightTheme ? 'bg-gray-100/50 border border-gray-200/50' : 'bg-gray-800/50 border border-gray-700/50'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
          Email Notifications
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
                <Mail className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <h4 className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                  Email Notifications
                </h4>
                <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                  Receive updates via email
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className={`w-11 h-6 rounded-full peer ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'} peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500`}></div>
            </label>
          </div>
        </div>
      </div>

      {/* Push Notifications */}
      <div className={`p-6 rounded-xl ${isLightTheme ? 'bg-gray-100/50 border border-gray-200/50' : 'bg-gray-800/50 border border-gray-700/50'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
          Push Notifications
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
                <Bell className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <h4 className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                  Push Notifications
                </h4>
                <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                  Receive notifications in browser
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className={`w-11 h-6 rounded-full peer ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'} peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500`}></div>
            </label>
          </div>
        </div>
      </div>

      {/* Notification Types */}
      <div className={`p-6 rounded-xl ${isLightTheme ? 'bg-gray-100/50 border border-gray-200/50' : 'bg-gray-800/50 border border-gray-700/50'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
          Notification Types
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
                <MessageSquare className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <h4 className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                  Chat Messages
                </h4>
                <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                  Get notified for new messages
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className={`w-11 h-6 rounded-full peer ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'} peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500`}></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
                <Calendar className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <h4 className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                  Calendar Events
                </h4>
                <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                  Get reminded about events
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className={`w-11 h-6 rounded-full peer ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'} peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500`}></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
                <Trophy className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <h4 className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                  Achievements
                </h4>
                <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                  Get notified about achievements
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className={`w-11 h-6 rounded-full peer ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'} peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500`}></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
                <Users className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <h4 className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                  Social Updates
                </h4>
                <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                  Get notified about social activities
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className={`w-11 h-6 rounded-full peer ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'} peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500`}></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings; 
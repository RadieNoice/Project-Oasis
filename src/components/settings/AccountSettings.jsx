import React from 'react';
import { User, Mail, Lock, Shield, Trash2 } from 'lucide-react';

const AccountSettings = ({ isLightTheme }) => {
  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <div className={`p-6 rounded-xl ${isLightTheme ? 'bg-gray-100/50 border border-gray-200/50' : 'bg-gray-800/50 border border-gray-700/50'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
          Profile Information
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
              <User className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
            </div>
            <div className="flex-1">
              <label className={`block text-sm font-medium mb-1 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                Username
              </label>
              <input
                type="text"
                className={`w-full px-4 py-2 rounded-lg ${isLightTheme ? 'bg-white border border-gray-200 text-gray-800' : 'bg-gray-700 border border-gray-600 text-gray-200'}`}
                placeholder="Enter username"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
              <Mail className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
            </div>
            <div className="flex-1">
              <label className={`block text-sm font-medium mb-1 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                Email
              </label>
              <input
                type="email"
                className={`w-full px-4 py-2 rounded-lg ${isLightTheme ? 'bg-white border border-gray-200 text-gray-800' : 'bg-gray-700 border border-gray-600 text-gray-200'}`}
                placeholder="Enter email"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className={`p-6 rounded-xl ${isLightTheme ? 'bg-gray-100/50 border border-gray-200/50' : 'bg-gray-800/50 border border-gray-700/50'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
          Security Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
              <Lock className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
            </div>
            <div className="flex-1">
              <label className={`block text-sm font-medium mb-1 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                Current Password
              </label>
              <input
                type="password"
                className={`w-full px-4 py-2 rounded-lg ${isLightTheme ? 'bg-white border border-gray-200 text-gray-800' : 'bg-gray-700 border border-gray-600 text-gray-200'}`}
                placeholder="Enter current password"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
              <Lock className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
            </div>
            <div className="flex-1">
              <label className={`block text-sm font-medium mb-1 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                New Password
              </label>
              <input
                type="password"
                className={`w-full px-4 py-2 rounded-lg ${isLightTheme ? 'bg-white border border-gray-200 text-gray-800' : 'bg-gray-700 border border-gray-600 text-gray-200'}`}
                placeholder="Enter new password"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
              <Lock className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
            </div>
            <div className="flex-1">
              <label className={`block text-sm font-medium mb-1 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                Confirm New Password
              </label>
              <input
                type="password"
                className={`w-full px-4 py-2 rounded-lg ${isLightTheme ? 'bg-white border border-gray-200 text-gray-800' : 'bg-gray-700 border border-gray-600 text-gray-200'}`}
                placeholder="Confirm new password"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className={`p-6 rounded-xl ${isLightTheme ? 'bg-gray-100/50 border border-gray-200/50' : 'bg-gray-800/50 border border-gray-700/50'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
          Two-Factor Authentication
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
              <Shield className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
            </div>
            <div>
              <h4 className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                Enable 2FA
              </h4>
              <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                Add an extra layer of security to your account
              </p>
            </div>
          </div>
          <button className={`px-4 py-2 rounded-lg ${isLightTheme ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
            Enable
          </button>
        </div>
      </div>

      {/* Delete Account */}
      <div className={`p-6 rounded-xl ${isLightTheme ? 'bg-gray-100/50 border border-gray-200/50' : 'bg-gray-800/50 border border-gray-700/50'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
          Delete Account
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
              <Trash2 className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
            </div>
            <div>
              <h4 className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                Delete Account
              </h4>
              <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                Permanently delete your account and all data
              </p>
            </div>
          </div>
          <button className={`px-4 py-2 rounded-lg ${isLightTheme ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings; 
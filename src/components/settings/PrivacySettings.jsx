import React, { useState } from 'react';
import { Shield, Eye, Share2, UserX, Lock, Bell } from 'lucide-react';

const PrivacySettings = ({ isLightTheme }) => {
  const [accountVisibility, setAccountVisibility] = useState('public');
  const [dataSharing, setDataSharing] = useState(true);
  const [activityStatus, setActivityStatus] = useState(true);

  return (
    <div className="space-y-6">
      {/* Account Privacy */}
      <div className={`p-6 rounded-xl ${isLightTheme ? 'bg-gray-100/50 border border-gray-200/50' : 'bg-gray-800/50 border border-gray-700/50'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
          Account Privacy
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
                <Eye className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <h4 className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                  Profile Visibility
                </h4>
                <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                  Control who can see your profile
                </p>
              </div>
            </div>
            <select 
              value={accountVisibility}
              onChange={(e) => setAccountVisibility(e.target.value)}
              className={`px-4 py-2 rounded-lg ${
                isLightTheme 
                  ? 'bg-gray-200 text-gray-800 border border-gray-300' 
                  : 'bg-gray-700 text-gray-200 border border-gray-600'
              }`}
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
                <Share2 className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <h4 className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                  Data Sharing
                </h4>
                <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                  Allow data sharing for better recommendations
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={dataSharing}
                onChange={() => setDataSharing(!dataSharing)}
              />
              <div className={`w-11 h-6 rounded-full peer ${
                isLightTheme 
                  ? 'bg-gray-200 peer-checked:bg-blue-500' 
                  : 'bg-gray-700 peer-checked:bg-blue-600'
              } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
                <Bell className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <h4 className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                  Activity Status
                </h4>
                <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                  Show when you're active
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={activityStatus}
                onChange={() => setActivityStatus(!activityStatus)}
              />
              <div className={`w-11 h-6 rounded-full peer ${
                isLightTheme 
                  ? 'bg-gray-200 peer-checked:bg-blue-500' 
                  : 'bg-gray-700 peer-checked:bg-blue-600'
              } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
            </label>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className={`p-6 rounded-xl ${isLightTheme ? 'bg-gray-100/50 border border-gray-200/50' : 'bg-gray-800/50 border border-gray-700/50'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
          Security
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
                <Lock className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <h4 className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                  Two-Factor Authentication
                </h4>
                <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                  Add an extra layer of security
                </p>
              </div>
            </div>
            <button className={`px-4 py-2 rounded-lg ${isLightTheme ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
              Enable 2FA
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
                <Shield className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <h4 className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                  Login History
                </h4>
                <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                  Review your account access
                </p>
              </div>
            </div>
            <button className={`px-4 py-2 rounded-lg ${isLightTheme ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
              View History
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
                <UserX className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <h4 className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                  Blocked Users
                </h4>
                <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                  Manage blocked accounts
                </p>
              </div>
            </div>
            <button className={`px-4 py-2 rounded-lg ${isLightTheme ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
              Manage List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings; 
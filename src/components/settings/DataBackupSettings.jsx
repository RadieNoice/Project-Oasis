import React from 'react';
import { Save, RefreshCw, Trash2, Database, RotateCcw } from 'lucide-react';

const DataBackupSettings = ({ isLightTheme }) => {
  return (
    <div className="space-y-6">
      {/* Auto-Save Preferences */}
      <div className={`p-6 rounded-xl ${isLightTheme ? 'bg-gray-100/50 border border-gray-200/50' : 'bg-gray-800/50 border border-gray-700/50'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
          Auto-Save Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
                <Save className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <h4 className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                  Auto-Save
                </h4>
                <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                  Automatically save your preferences
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

      {/* Restore Last Session */}
      <div className={`p-6 rounded-xl ${isLightTheme ? 'bg-gray-100/50 border border-gray-200/50' : 'bg-gray-800/50 border border-gray-700/50'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
          Restore Last Session
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
                <RefreshCw className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <h4 className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                  Restore Last Session
                </h4>
                <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                  Restore your last working session
                </p>
              </div>
            </div>
            <button className={`px-4 py-2 rounded-lg ${isLightTheme ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
              Restore
            </button>
          </div>
        </div>
      </div>

      {/* Clear Cache & Temporary Files */}
      <div className={`p-6 rounded-xl ${isLightTheme ? 'bg-gray-100/50 border border-gray-200/50' : 'bg-gray-800/50 border border-gray-700/50'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
          Clear Cache & Temporary Files
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
                <Trash2 className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <h4 className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                  Clear Cache
                </h4>
                <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                  Clear temporary files and cache
                </p>
              </div>
            </div>
            <button className={`px-4 py-2 rounded-lg ${isLightTheme ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}>
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Manage Stored Data */}
      <div className={`p-6 rounded-xl ${isLightTheme ? 'bg-gray-100/50 border border-gray-200/50' : 'bg-gray-800/50 border border-gray-700/50'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
          Manage Stored Data
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
                <Database className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <h4 className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                  Manage Data
                </h4>
                <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                  View and manage your stored data
                </p>
              </div>
            </div>
            <button className={`px-4 py-2 rounded-lg ${isLightTheme ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
              Manage
            </button>
          </div>
        </div>
      </div>

      {/* Reset to Default */}
      <div className={`p-6 rounded-xl ${isLightTheme ? 'bg-gray-100/50 border border-gray-200/50' : 'bg-gray-800/50 border border-gray-700/50'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
          Reset to Default
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
                <RotateCcw className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <h4 className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                  Reset Settings
                </h4>
                <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                  Reset all settings to default values
                </p>
              </div>
            </div>
            <button className={`px-4 py-2 rounded-lg ${isLightTheme ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataBackupSettings; 
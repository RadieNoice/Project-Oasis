import React from 'react';
import { Palette, Monitor, Sun, Moon } from 'lucide-react';

const AppearanceSettings = ({ isLightTheme, theme, handleThemeChange }) => {
  return (
    <div className="space-y-6">
      {/* Theme Settings */}
      <div className={`p-6 rounded-xl ${isLightTheme ? 'bg-gray-100/50 border border-gray-200/50' : 'bg-gray-800/50 border border-gray-700/50'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
          Theme Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
              <Palette className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
            </div>
            <div className="flex-1">
              <label className={`block text-sm font-medium mb-1 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                Theme Mode
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => handleThemeChange('dark')}
                  className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
                    theme === 'dark'
                      ? isLightTheme
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-600 text-white'
                      : isLightTheme
                      ? 'bg-gray-200 text-gray-700'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  <Moon className="h-4 w-4" />
                  Dark
                </button>
                <button
                  onClick={() => handleThemeChange('light')}
                  className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
                    theme === 'light'
                      ? isLightTheme
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-600 text-white'
                      : isLightTheme
                      ? 'bg-gray-200 text-gray-700'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  <Sun className="h-4 w-4" />
                  Light
                </button>
                <button
                  onClick={() => handleThemeChange('system')}
                  className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
                    theme === 'system'
                      ? isLightTheme
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-600 text-white'
                      : isLightTheme
                      ? 'bg-gray-200 text-gray-700'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  <Monitor className="h-4 w-4" />
                  System
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings; 
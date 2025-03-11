import React from 'react';
import { HelpCircle, RefreshCw, Wrench, Settings2, Mail, MessageCircle, Users, Lightbulb, Star } from 'lucide-react';

const HelpSupportSettings = ({ isLightTheme }) => {
  return (
    <div className="space-y-6">
      {/* FAQs */}
      <div className={`p-6 rounded-xl ${isLightTheme ? 'bg-gray-100/50 border border-gray-200/50' : 'bg-gray-800/50 border border-gray-700/50'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
          Frequently Asked Questions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'} cursor-pointer hover:scale-[1.02] transition-transform`}>
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-300' : 'bg-gray-600'}`}>
                <HelpCircle className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <h4 className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                Getting Started
              </h4>
            </div>
            <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
              Learn the basics of using our platform
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'} cursor-pointer hover:scale-[1.02] transition-transform`}>
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-300' : 'bg-gray-600'}`}>
                <HelpCircle className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <h4 className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                Using Features
              </h4>
            </div>
            <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
              Detailed guides for all features
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'} cursor-pointer hover:scale-[1.02] transition-transform`}>
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-300' : 'bg-gray-600'}`}>
                <HelpCircle className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <h4 className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                Account & Security
              </h4>
            </div>
            <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
              Manage your account and security settings
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'} cursor-pointer hover:scale-[1.02] transition-transform`}>
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-300' : 'bg-gray-600'}`}>
                <HelpCircle className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <h4 className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                Troubleshooting
              </h4>
            </div>
            <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
              Common issues and solutions
            </p>
          </div>
        </div>
        <button className={`mt-4 w-full px-4 py-2 rounded-lg ${isLightTheme ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
          View All FAQs
        </button>
      </div>

      {/* Troubleshooting & Self-Help */}
      <div className={`p-6 rounded-xl ${isLightTheme ? 'bg-gray-100/50 border border-gray-200/50' : 'bg-gray-800/50 border border-gray-700/50'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
          Troubleshooting & Self-Help
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
                <RefreshCw className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <h4 className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                  Refresh Session
                </h4>
                <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                  Fix minor bugs by restarting the browser session
                </p>
              </div>
            </div>
            <button className={`px-4 py-2 rounded-lg ${isLightTheme ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
              Refresh
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
                <Wrench className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <h4 className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                  Run Diagnostics
                </h4>
                <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                  Check for common issues and suggest fixes
                </p>
              </div>
            </div>
            <button className={`px-4 py-2 rounded-lg ${isLightTheme ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
              Run Check
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
                <Settings2 className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <h4 className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                  Reset Settings
                </h4>
                <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                  Restore default settings if something isn't working
                </p>
              </div>
            </div>
            <button className={`px-4 py-2 rounded-lg ${isLightTheme ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}>
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className={`p-6 rounded-xl ${isLightTheme ? 'bg-gray-100/50 border border-gray-200/50' : 'bg-gray-800/50 border border-gray-700/50'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
          Contact Support
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
                <Mail className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <h4 className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                  Email Support
                </h4>
                <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                  Reach out for help via email
                </p>
              </div>
            </div>
            <button className={`px-4 py-2 rounded-lg ${isLightTheme ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
              Send Email
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
                <MessageCircle className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <h4 className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                  Live Chat
                </h4>
                <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                  Chat with support in real-time
                </p>
              </div>
            </div>
            <button className={`px-4 py-2 rounded-lg ${isLightTheme ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
              Start Chat
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
                <Users className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <h4 className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                  Community Forum
                </h4>
                <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                  Ask questions and get help from other users
                </p>
              </div>
            </div>
            <button className={`px-4 py-2 rounded-lg ${isLightTheme ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
              Join Forum
            </button>
          </div>
        </div>
      </div>

      {/* Feedback & Feature Requests */}
      <div className={`p-6 rounded-xl ${isLightTheme ? 'bg-gray-100/50 border border-gray-200/50' : 'bg-gray-800/50 border border-gray-700/50'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
          Feedback & Feature Requests
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
                <Lightbulb className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <h4 className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                  Suggest a Feature
                </h4>
                <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                  Have an idea? Let us know!
                </p>
              </div>
            </div>
            <button className={`px-4 py-2 rounded-lg ${isLightTheme ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
              Submit Request
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'}`}>
                <Star className={`h-5 w-5 ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <h4 className={`font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                  Rate Us
                </h4>
                <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                  Give feedback on your experience
                </p>
              </div>
            </div>
            <button className={`px-4 py-2 rounded-lg ${isLightTheme ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
              Rate Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportSettings; 
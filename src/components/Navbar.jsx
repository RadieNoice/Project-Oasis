import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, Settings } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-900/80 border-b border-gray-800/30 backdrop-blur-lg"
    >
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Search Bar */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center flex-1 max-w-xl"
          >
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-800/50 border border-gray-700/30 
                  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50
                  transition-all duration-300 hover:bg-gray-800/70"
              />
            </div>
          </motion.div>

          {/* Right Section */}
          <div className="flex items-center space-x-3 ml-6">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-xl hover:bg-gray-800/50 transition-colors duration-200"
            >
              <Bell className="h-5 w-5 text-gray-300" />
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-xl hover:bg-gray-800/50 transition-colors duration-200"
            >
              <Settings className="h-5 w-5 text-gray-300" />
            </motion.button>

            {/* User Profile */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 group cursor-pointer"
            >
              <span className="text-sm font-medium text-gray-300">
                {user?.username}
              </span>
              <div className="relative">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 
                  flex items-center justify-center text-white font-medium shadow-lg
                  group-hover:ring-2 group-hover:ring-blue-400/50 transition-all duration-300">
                  {user?.username?.[0].toUpperCase()}
                </div>
                <div className="absolute inset-0 rounded-full animate-pulse ring-2 ring-blue-400/30 
                  group-hover:animate-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Ambient Light Effect */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
    </motion.nav>
  );
};

export default Navbar;
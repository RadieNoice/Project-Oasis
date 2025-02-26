import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import Particles from './reactbits/Particles';
import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error }) => (
  <div className="text-red-500 p-4 bg-black bg-opacity-60 rounded-lg m-4">
    <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
    <p className="mb-2">{error.message}</p>
    <button 
      onClick={() => window.location.reload()}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Refresh
    </button>
  </div>
);

// Change to accept children instead of using Outlet
const Layout = ({ children }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  // Loading state between route changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800); 
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Subtle gradient effect that changes over time
  const [gradientPosition, setGradientPosition] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setGradientPosition(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(intervalId);
  }, []);

  const gradientStyle = {
    background: `linear-gradient(${gradientPosition}deg, rgba(25, 25, 25, 0.5) 0%, rgba(45, 45, 75, 0.3) 50%, rgba(25, 25, 25, 0.5) 100%)`,
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
  };

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={1.2}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={true}
        />
        {/* Enhanced background effects */}
        <div style={gradientStyle} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/30 pointer-events-none" />
      </div>

      {/* Content Layer */}
      <div className="relative flex h-full">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <div className="container mx-auto px-6 py-8 text-gray-100">
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-64 flex flex-col items-center justify-center"
                    >
                      <l-helix
                        size="45"
                        speed="2.5"
                        color="#3B82F6" 
                      ></l-helix>
                      
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ delay: 0.3 }}
                        className="mt-4 text-gray-400 text-sm font-light"
                      >
                        Loading content...
                      </motion.p>
                    </motion.div>
                  ) : (
                    // Render children instead of Outlet
                    children
                  )}
                </AnimatePresence>
              </ErrorBoundary>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
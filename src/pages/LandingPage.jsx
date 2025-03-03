import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Particles from "../components/reactbits/Particles";

const Landing = () => {
  // Subtle gradient effect that changes over time
  const [gradientPosition, setGradientPosition] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setGradientPosition((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(intervalId);
  }, []);

  const gradientStyle = {
    background: `linear-gradient(${gradientPosition}deg, rgba(15, 23, 42, 0.6) 0%, rgba(20, 30, 70, 0.4) 50%, rgba(15, 23, 42, 0.6) 100%)`,
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
  };

  // Feature items with staggered animation
  const featureItems = [
    {
      title: "Task Management",
      description:
        "Organize tasks, set priorities, and track progress with intuitive tools.",
      icon: "📋",
      color: "from-blue-600 to-blue-800",
    },
    {
      title: "Pomodoro Timer",
      description:
        "Boost focus with customizable time blocks optimized for deep work.",
      icon: "⏱",
      color: "from-purple-600 to-purple-800",
    },
    {
      title: "AI Assistance",
      description:
        "Get smart suggestions and automate repetitive tasks with AI tools.",
      icon: "🤖",
      color: "from-indigo-600 to-indigo-800",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={["#ffffff", "#a5b4fc"]}
          particleCount={180}
          particleSpread={15}
          speed={0.8}
          particleBaseSize={120}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={true}
        />

        {/* Enhanced background effects */}
        <div style={gradientStyle} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/40 pointer-events-none" />

        {/* Decorative elements */}
        <div className="absolute top-40 left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Content Layer */}
      <div className="relative min-h-screen z-10">
        <header className="py-6 px-4 sm:px-8 flex justify-between items-center backdrop-blur-sm bg-black/10">
          <Link to="/">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-xl font-bold text-white">O</span>
              </motion.div>
              <h1 className="text-2xl font-bold text-white">Project Oasis</h1>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/features"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </Link>
            <Link
              to="/about"
              className="text-gray-300 hover:text-white transition-colors"
            >
              About
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <Link to="/loginregister">
              <motion.button
                className="px-5 py-2 rounded-lg text-white bg-transparent border border-gray-700/60 hover:bg-white/5 hover:border-gray-500 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign In
              </motion.button>
            </Link>
            <Link to="/loginregister">
              <motion.button
                className="px-5 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-purple-900/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.button>
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-4 sm:px-8 py-16 lg:py-24">
          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24">
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block mb-3 px-4 py-1 rounded-full bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-800/30 text-blue-400 text-sm">
                ✨ Your productivity journey starts here
              </div>

              <motion.h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Your Personal <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
                  Productivity Oasis
                </span>
              </motion.h2>

              <motion.p
                className="text-lg text-gray-300 mb-8 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                Stay organized, focused, and achieve your goals with our
                all-in-one productivity suite designed to help you thrive in the
                digital landscape.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.7 }}
              >
                <Link to="/loginregister">
                  <motion.button
                    className="px-8 py-3.5 rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-purple-900/20 font-medium"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 15px 25px -5px rgba(91, 33, 182, 0.3)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started — It's Free
                  </motion.button>
                </Link>
                <Link to="/dashboard">
                  <motion.button
                    className="px-8 py-3.5 rounded-xl text-white bg-transparent border border-gray-700 hover:border-gray-500 hover:bg-white/5 font-medium group flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Go to Dashboard</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </motion.button>
                </Link>
              </motion.div>

              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.7 }}
              >
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-black overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900"
                    />
                  ))}
                </div>
                <div>
                  <div className="text-sm text-gray-400">Trusted by</div>
                  <div className="text-white font-medium">10,000+ users</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-2xl blur-lg opacity-70"></div>
              <div className="w-full max-w-lg mx-auto aspect-[4/3] rounded-2xl p-1 relative overflow-hidden backdrop-blur-sm border border-gray-800/80 bg-gray-900/40">
                <div className="relative h-full rounded-xl bg-gray-900/80 p-6 flex flex-col overflow-hidden">
                  {/* Dashboard Mockup Header */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <div className="text-lg font-medium text-white">
                        Dashboard
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                          />
                        </svg>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="space-y-5">
                    <div className="flex gap-3">
                      <div className="w-1/2">
                        <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
                        <div className="h-24 rounded-xl bg-gradient-to-r from-blue-900/30 to-blue-800/30 border border-blue-800/30 p-3">
                          <div className="h-3 bg-gray-700 rounded w-1/2 mb-2"></div>
                          <div className="h-3 bg-gray-700 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-700 rounded w-1/4"></div>
                        </div>
                      </div>
                      <div className="w-1/2">
                        <div className="h-4 bg-gray-800 rounded w-1/2 mb-2"></div>
                        <div className="h-24 rounded-xl bg-gradient-to-r from-purple-900/30 to-purple-800/30 border border-purple-800/30 p-3">
                          <div className="flex justify-between mb-2">
                            <div className="h-3 bg-gray-700 rounded w-1/3"></div>
                            <div className="h-3 bg-purple-700/50 rounded w-1/4"></div>
                          </div>
                          <div className="h-8 bg-gray-700/50 rounded-lg mt-4"></div>
                        </div>
                      </div>
                    </div>

                    <div className="h-5 bg-gray-800 rounded w-1/3"></div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="h-16 rounded-lg bg-gray-800/70 border border-gray-700/50 p-2">
                        <div className="h-2 bg-gray-700 rounded w-2/3 mb-2"></div>
                        <div className="h-6 bg-blue-700/30 rounded-md"></div>
                      </div>
                      <div className="h-16 rounded-lg bg-gray-800/70 border border-gray-700/50 p-2">
                        <div className="h-2 bg-gray-700 rounded w-1/2 mb-2"></div>
                        <div className="h-6 bg-purple-700/30 rounded-md"></div>
                      </div>
                      <div className="h-16 rounded-lg bg-gray-800/70 border border-gray-700/50 p-2">
                        <div className="h-2 bg-gray-700 rounded w-3/4 mb-2"></div>
                        <div className="h-6 bg-indigo-700/30 rounded-md"></div>
                      </div>
                    </div>

                    <div className="h-32 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-800/50 p-4">
                      <div className="h-3 bg-gray-700 rounded w-1/3 mb-5"></div>
                      <div className="flex items-end h-14 gap-2">
                        <div className="h-1/3 w-1/6 bg-blue-600/50 rounded-t"></div>
                        <div className="h-2/3 w-1/6 bg-blue-600/50 rounded-t"></div>
                        <div className="h-full w-1/6 bg-blue-600/50 rounded-t"></div>
                        <div className="h-1/2 w-1/6 bg-blue-600/50 rounded-t"></div>
                        <div className="h-3/4 w-1/6 bg-blue-600/50 rounded-t"></div>
                        <div className="h-1/4 w-1/6 bg-blue-600/50 rounded-t"></div>
                      </div>
                    </div>
                  </div>

                  {/* Animated status indicators */}
                  <motion.div
                    className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-green-500"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                  <motion.div
                    className="absolute bottom-4 right-8 w-2 h-2 rounded-full bg-blue-500"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                  />
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-8 -right-8 w-24 h-24 rounded-2xl bg-gradient-to-r from-blue-600/20 to-blue-800/20 border border-blue-700/30 p-4 backdrop-blur-md"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                }}
              >
                <div className="h-3 w-12 bg-blue-700/40 rounded mb-2"></div>
                <div className="h-9 w-full bg-blue-600/20 rounded-lg border border-blue-700/30"></div>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 w-20 h-20 rounded-2xl bg-gradient-to-r from-purple-600/20 to-purple-800/20 border border-purple-700/30 p-3 backdrop-blur-md"
                animate={{
                  y: [0, 8, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <div className="w-6 h-6 rounded-full bg-purple-600/30 mb-2 mx-auto border border-purple-500/40"></div>
                <div className="h-2 w-10 bg-purple-700/40 rounded mb-1.5"></div>
                <div className="h-2 w-8 bg-purple-700/40 rounded"></div>
              </motion.div>
            </motion.div>
          </div>

          {/* Features Section */}
          <motion.div
            className="py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-800/30 text-blue-400 text-sm inline-block mb-4">
                  Powerful Features
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Everything you need in one place
                </h3>
                <p className="text-gray-400 max-w-xl mx-auto">
                  Our comprehensive suite of tools is designed to help you stay
                  organized, focused, and productive throughout your day.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featureItems.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-xl bg-gradient-to-br ${feature.color}/10 border border-gray-800 hover:border-gray-700 transition-all`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <div
                    className={`text-4xl mb-4 w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${feature.color} bg-opacity-15`}
                  >
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="mt-12 mb-24 py-16 px-8 rounded-2xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-gray-800 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute w-64 h-64 -top-32 -left-32 bg-blue-600/10 rounded-full blur-3xl"></div>
              <div className="absolute w-64 h-64 -bottom-32 -right-32 bg-purple-600/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to boost your productivity?
              </h3>
              <p className="text-gray-300 max-w-xl mx-auto mb-8">
                Join thousands of users who have transformed their work habits
                with Project Oasis. Start your journey today, completely free.
              </p>

              <motion.div
                className="flex flex-wrap gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link to="/loginregister">
                  <motion.button
                    className="px-8 py-3.5 rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-purple-900/20 font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started For Free
                  </motion.button>
                </Link>
                <Link to="/dashboard">
                  <motion.button
                    className="px-8 py-3.5 rounded-xl text-white bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700 font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Explore Dashboard
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </main>

        <footer className="container mx-auto px-8 py-12 border-t border-gray-800/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-lg font-bold text-white">O</span>
                </div>
                <span className="text-xl font-medium text-white">
                  Project Oasis
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Your productivity sanctuary in the digital desert. Stay
                organized, focused, and efficient.
              </p>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/features"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/integrations"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link
                    to="/changelog"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/blog"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/help"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/guides"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Guides
                  </Link>
                </li>
                <li>
                  <Link
                    to="/api"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    API
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800/50">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} Project Oasis. All rights reserved.
            </div>
            <div className="flex space-x-6">
              {/* Social media icons */}
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.093 4.093 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;

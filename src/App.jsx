import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "./components/Layout";
import { quantum } from "ldrs";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SettingsProvider } from "./contexts/SettingsContext";

quantum.register();

// Lazy load pages
const Dashboard = React.lazy(() => import("./pages//Dashboard/Dashboard.jsx"));
const Calendar = React.lazy(() => import("./pages/Calendar.jsx"));
const BookShelf = React.lazy(() => import("./pages/BookShelf.jsx"));
const AITools = React.lazy(() => import("./pages/AITools.jsx"));
const Inbox = React.lazy(() => import("./pages/Inbox.jsx"));
const Achievements = React.lazy(() => import("./pages/Achievements.jsx"));
const Leaderboard = React.lazy(() => import("./pages/Leaderboard.jsx"));
const Chat = React.lazy(() => import("./pages/Chat.jsx"));
const Profile = React.lazy(() => import("./pages/Profile.jsx"));
const Setting = React.lazy(() => import("./pages/Settings.jsx"));
const Landing = React.lazy(() => import("./pages/landingpage/LandingPage.jsx"));
const LoginRegister = React.lazy(() =>
  import("./pages/Login/LoginRegister.jsx")
);

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

const App = () => {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <Router>
          <React.Suspense
            fallback={
              <div className="h-screen w-screen flex items-center justify-center">
                <l-quantum size="45" speed="1.75" color="white"></l-quantum>
              </div>
            }
          >
            <AnimatePresence mode="wait">
              <Routes>
                {/* Landing Page */}
                <Route path="/" element={<Landing />} />

                {/* Login/Register */}
                <Route path="/loginregister" element={<LoginRegister />} />

                {/* Dashboard with Layout */}
                <Route
                  path="/dashboard"
                  element={
                    <Layout>
                      <motion.div
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        <Dashboard />
                      </motion.div>
                    </Layout>
                  }
                />

                {/* Calendar with Layout */}
                <Route
                  path="/calendar"
                  element={
                    <Layout>
                      <motion.div
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        <Calendar />
                      </motion.div>
                    </Layout>
                  }
                />

                {/* Book Shelf with Layout */}
                <Route
                  path="/bookshelf"
                  element={
                    <Layout>
                      <motion.div
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        <BookShelf />
                      </motion.div>
                    </Layout>
                  }
                />

                {/* AI Tools with Layout */}
                <Route
                  path="/ai-tools"
                  element={
                    <Layout>
                      <motion.div
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        <AITools />
                      </motion.div>
                    </Layout>
                  }
                />

                {/* Inbox with Layout */}
                <Route
                  path="/inbox"
                  element={
                    <Layout>
                      <motion.div
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        <Inbox />
                      </motion.div>
                    </Layout>
                  }
                />

                {/* Achievements with Layout */}
                <Route
                  path="/achievements"
                  element={
                    <Layout>
                      <motion.div
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        <Achievements />
                      </motion.div>
                    </Layout>
                  }
                />

                {/* Leaderboard with Layout */}
                <Route
                  path="/leaderboard"
                  element={
                    <Layout>
                      <motion.div
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        <Leaderboard />
                      </motion.div>
                    </Layout>
                  }
                />

                {/* Chat with Layout */}
                <Route
                  path="/chat"
                  element={
                    <Layout>
                      <motion.div
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        <Chat />
                      </motion.div>
                    </Layout>
                  }
                />

                {/* Music with Layout */}
                <Route
                  path="/music"
                  element={
                    <Layout>
                      <motion.div
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        <Music />
                      </motion.div>
                    </Layout>
                  }
                />

                {/* Profile with Layout */}
                <Route
                  path="/profile"
                  element={
                    <Layout>
                      <motion.div
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        <Profile />
                      </motion.div>
                    </Layout>
                  }
                />

                {/* Settings with Layout */}
                <Route
                  path="/settings"
                  element={
                    <Layout>
                      <motion.div
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        <Setting />
                      </motion.div>
                    </Layout>
                  }
                />
              </Routes>
            </AnimatePresence>
          </React.Suspense>
        </Router>
      </SettingsProvider>
    </ThemeProvider>
  );
};

export default App;

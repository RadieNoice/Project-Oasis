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
const Landing = React.lazy(() => import("./pages/LandingPage.jsx"));
const LoginRegister = React.lazy(() =>
  import("./pages/Login/LoginRegister.jsx")
);
const Music = React.lazy(() => import("./pages/Music.jsx"));

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

// Remove Layout from wrapping the entire app
function App() {
  return (
    <ThemeProvider>
      <Router>
        <React.Suspense
          fallback={
            <div className="flex h-screen w-screen items-center justify-center bg-gray-900">
              <l-quantum size="45" speed="1.75" color="black"></l-quantum>
              <div className="mt-8 text-blue-400 font-light text-2xl animate-pulse">
                Loading Oasis...
              </div>
              <div className="absolute w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
            </div>
          }
        >
          <AppRoutes />
        </React.Suspense>
      </Router>
    </ThemeProvider>
  );
}

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Landing page without Layout */}
        <Route
          index
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Landing />
            </motion.div>
          }
        />
        <Route
          path="loginregister"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <LoginRegister />
            </motion.div>
          }
        />

        {/* Dashboard with Layout */}
        <Route
          path="dashboard"
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
          path="calendar"
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

        {/* Bookshelf with Layout */}
        <Route
          path="bookshelf"
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
          path="ai-tools"
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
          path="inbox"
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
          path="achievements"
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
          path="leaderboard"
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
          path="chat"
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
          path="music"
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
          path="profile"
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
          path="settings"
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
  );
};

export default App;

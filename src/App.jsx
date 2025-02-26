import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "./components/Layout";
import { quantum } from "ldrs";

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

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

// Move AnimatedRoutes inside the Layout component
function App() {
  return (
    <Router>
      <React.Suspense
        fallback={
          <div className="flex h-screen w-screen items-center justify-center bg-gray-900">
            // Default values shown
            <l-quantum size="45" speed="1.75" color="black"></l-quantum>
            {/* Optional loading text */}
            <div className="mt-8 text-blue-400 font-light text-2xl animate-pulse">
              Loading Oasis...
            </div>
            {/* Extra glow effect */}
            <div className="absolute w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
          </div>
        }
      >
        <Layout>
          <AppRoutes />
        </Layout>
      </React.Suspense>
    </Router>
  );
}

// Rename to avoid confusion with the exported component
const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          index
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Dashboard />
            </motion.div>
          }
        />
        <Route
          path="calendar"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Calendar />
            </motion.div>
          }
        />
        <Route
          path="bookshelf"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <BookShelf />
            </motion.div>
          }
        />
        <Route
          path="ai-tools"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <AITools />
            </motion.div>
          }
        />
        <Route
          path="inbox"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Inbox />
            </motion.div>
          }
        />
        <Route
          path="achievements"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Achievements />
            </motion.div>
          }
        />
        <Route
          path="leaderboard"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Leaderboard />
            </motion.div>
          }
        />
        <Route
          path="chat"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Chat />
            </motion.div>
          }
        />
        <Route
          path="profile"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Profile />
            </motion.div>
          }
        />
        <Route
          path="settings"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Setting />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default App;

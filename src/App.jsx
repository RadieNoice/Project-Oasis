import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

// Lazy load pages
const Dashboard = React.lazy(() => import("./pages/Dashboard.jsx"));
const Calendar = React.lazy(() => import("./pages/Calendar.jsx"));
const BookShelf = React.lazy(() => import("./pages/BookShelf.jsx"));
const AITools = React.lazy(() => import("./pages/AITools.jsx"));
const Inbox = React.lazy(() => import("./pages/Inbox.jsx"));
const Achievements = React.lazy(() => import("./pages/Achievements.jsx"));
const Leaderboard = React.lazy(() => import("./pages/Leaderboard.jsx"));
const Chat = React.lazy(() => import("./pages/Chat.jsx"));

function App() {
  return (
    <Router>
      {/* Render the particle background */}
      <React.Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="bookshelf" element={<BookShelf />} />
            <Route path="ai-tools" element={<AITools />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="achievements" element={<Achievements />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="chat" element={<Chat />} />
          </Route>
        </Routes>
      </React.Suspense>
    </Router>
  );
}

export default App;

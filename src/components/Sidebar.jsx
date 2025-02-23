import React from "react";
import { useNavigate } from "react-router-dom";
import Dock from "./Dock";
import {
  Home,
  Clock,
  CheckSquare,
  Calendar,
  BookOpen,
  Brain,
  Inbox,
  Trophy,
  Users,
  MessageSquare,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  const items = [
    { icon: <Home className="text-blue-400" />, label: "Dashboard", path: "/" },
    {
      icon: <Calendar className="text-purple-400" />,
      label: "Calendar",
      path: "/calendar",
    },
    {
      icon: <BookOpen className="text-cyan-400" />,
      label: "Book Shelf",
      path: "/bookshelf",
    },
    {
      icon: <Brain className="text-pink-400" />,
      label: "AI Assistant",
      path: "/ai-tools",
    },
    {
      icon: <Inbox className="text-lime-400" />,
      label: "Inbox",
      path: "/inbox",
    },
    {
      icon: <Trophy className="text-yellow-400" />,
      label: "Achievements",
      path: "/achievements",
    },
    {
      icon: <Users className="text-orange-400" />,
      label: "Leaderboard",
      path: "/leaderboard",
    },
    {
      icon: <MessageSquare className="text-violet-400" />,
      label: "Chat",
      path: "/chat",
    },
  ];
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20">
      <Dock
        items={items.map((item) => ({
          ...item,
          onClick: () => navigate(item.path),
        }))}
        panelWidth={72}
        baseItemSize={56}
        magnification={72}
        spring={{ mass: 0.2, stiffness: 170, damping: 15 }}
        className="py-4"
      />
    </div>
  );
};  

export default Sidebar;

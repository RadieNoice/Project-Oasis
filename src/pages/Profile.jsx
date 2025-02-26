import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  User,
  Mail,
  Calendar,
  Award,
  BookOpen,
  Clock,
  Edit2,
  Camera,
  Save,
  X,
  Shield,
  Briefcase,
  MapPin,
  Globe,
  Twitter,
  Github,
  Linkedin,
  CheckSquare,
  ExternalLink,
  BarChart2,
  Coffee,
  PenTool,
  Zap,
  Sparkles,
} from "lucide-react";
import SpotlightCard from "../components/reactbits/SpotlightCard";
import { useAuthStore } from "../store/useAuthStore";

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("activity");
  const progressValue = useMotionValue(0);
  const progressOpacity = useTransform(progressValue, [0, 100], [0.5, 1]);

  const [profileData, setProfileData] = useState({
    username: user?.username || "Alex Morgan",
    email: user?.email || "alex@oasis.dev",
    bio: "Productivity enthusiast and lifelong learner. Building a second brain while exploring the intersection of technology and human potential. Currently focused on building digital systems that help people achieve their goals.",
    location: "San Francisco, CA",
    joinDate: "February 2024",
    website: "https://alexmorgan.dev",
    occupation: "Product Designer & Developer",
    twitter: "alexmorgan",
    github: "alexmorg",
    linkedin: "alexmorgan",
    avatar: null,
    level: 7,
    xpProgress: 65,
    streak: 16,
    interests: [
      "Productivity",
      "Digital Gardens",
      "React",
      "UI/UX",
      "AI",
      "Mindfulness",
    ],
  });

  // Update progress bar animation
  useEffect(() => {
    progressValue.set(profileData.xpProgress);
  }, [profileData.xpProgress, progressValue]);

  // Stats
  const stats = [
    {
      label: "Tasks",
      value: 132,
      icon: <CheckSquare size={16} className="text-emerald-400" />,
      change: "+12%",
      trend: "up",
    },
    {
      label: "Focus Hours",
      value: 87,
      icon: <Clock size={16} className="text-blue-400" />,
      change: "+5%",
      trend: "up",
    },
    {
      label: "Books",
      value: 24,
      icon: <BookOpen size={16} className="text-purple-400" />,
      change: "+3",
      trend: "up",
    },
    {
      label: "Achievements",
      value: 18,
      icon: <Award size={16} className="text-amber-400" />,
      change: "New!",
      trend: "new",
    },
  ];

  // Recent achievements
  const achievements = [
    {
      id: "early-bird",
      title: "Early Bird",
      description: "Completed 5 tasks before 9 AM",
      icon: <Coffee size={16} />,
      date: "3 days ago",
      color: "from-amber-500 to-orange-600",
    },
    {
      id: "bookworm",
      title: "Bookworm",
      description: "Read for 30 days in a row",
      icon: <BookOpen size={16} />,
      date: "1 week ago",
      color: "from-purple-500 to-indigo-600",
    },
    {
      id: "creative",
      title: "Creative Mind",
      description: "Created 10 notes with custom illustrations",
      icon: <PenTool size={16} />,
      date: "2 weeks ago",
      color: "from-pink-500 to-rose-600",
    },
  ];

  // Activity data
  const recentActivity = [
    {
      type: "task",
      title: "Completed 'Advanced React Patterns'",
      time: "2 hours ago",
      details: "Finished all exercises and published project",
    },
    {
      type: "book",
      title: "Started reading 'Atomic Habits'",
      time: "1 day ago",
      details: "Chapter 1-3 completed",
    },
    {
      type: "achievement",
      title: "Unlocked '7-Day Streak'",
      time: "3 days ago",
      details: "Maintained consistent daily activity",
    },
    {
      type: "session",
      title: "Deep work session",
      time: "4 days ago",
      details: "90 minutes of uninterrupted focus",
    },
  ];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
    }, 800);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle adding/removing interests
  const toggleInterest = (interest) => {
    setProfileData((prev) => {
      if (prev.interests.includes(interest)) {
        return {
          ...prev,
          interests: prev.interests.filter((i) => i !== interest),
        };
      } else {
        return { ...prev, interests: [...prev.interests, interest] };
      }
    });
  };

  // Handle file upload
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({
          ...prev,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8 px-4 md:px-6 max-w-6xl"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-2 md:mb-0"
        >
          My Profile
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center space-x-3"
        >
          <div className="flex items-center bg-gray-800/50 px-4 py-2 rounded-xl border border-gray-700/30">
            <div className="flex items-center mr-3">
              <Zap size={14} className="text-amber-400 mr-1.5" />
              <span className="text-amber-200 text-sm font-medium">
                Level {profileData.level}
              </span>
            </div>
            <div className="w-36 h-2 bg-gray-700/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                style={{
                  width: `${profileData.xpProgress}%`,
                  opacity: progressOpacity,
                }}
              />
            </div>
            <span className="ml-2 text-xs text-gray-400">
              {profileData.xpProgress}%
            </span>
          </div>

          <div className="flex items-center bg-gray-800/50 px-4 py-2 rounded-xl border border-gray-700/30">
            <Sparkles size={14} className="text-orange-400 mr-1.5" />
            <span className="text-orange-200 text-sm font-medium">
              {profileData.streak} day streak
            </span>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <SpotlightCard
          className="bg-gradient-to-br from-gray-900/70 to-gray-800/40 rounded-2xl border border-gray-800/30 backdrop-blur-lg p-6 lg:col-span-1 h-fit sticky top-6"
          spotlightColor="rgba(255, 255, 255, 0.07)"
          spotlightSize={300}
        >
          <div className="flex flex-col items-center">
            {/* Avatar with ripple effect */}
            <div className="relative group">
              {/* Ripple animation */}
              <AnimatePresence>
                {!isEditing && (
                  <>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.15 }}
                      exit={{ scale: 1.5, opacity: 0 }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        repeatType: "loop",
                      }}
                      className="absolute inset-0 rounded-full bg-blue-500/20"
                    />
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.1, opacity: 0.1 }}
                      exit={{ scale: 1.6, opacity: 0 }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        repeatType: "loop",
                        delay: 0.5,
                      }}
                      className="absolute inset-0 rounded-full bg-blue-400/10"
                    />
                  </>
                )}
              </AnimatePresence>

              {/* Avatar */}
              <div className="relative h-28 w-28 rounded-full overflow-hidden mb-5">
                {profileData.avatar ? (
                  <img
                    src={profileData.avatar}
                    alt={profileData.username}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-3xl font-medium">
                    {profileData.username[0].toUpperCase()}
                  </div>
                )}

                {/* Edit button */}
                {isEditing && (
                  <label className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer group">
                    <Camera
                      size={22}
                      className="text-white opacity-80 group-hover:opacity-100"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </label>
                )}

                {/* Status indicator */}
                {!isEditing && (
                  <div className="absolute bottom-1 right-1 h-4 w-4 bg-emerald-500 rounded-full border-2 border-gray-900"></div>
                )}
              </div>

              <div className="absolute inset-0 rounded-full ring-2 ring-blue-400/20" />
            </div>

            {/* Username */}
            {!isEditing ? (
              <motion.h2
                layoutId="username"
                className="text-xl font-bold text-white mb-1"
              >
                {profileData.username}
              </motion.h2>
            ) : (
              <motion.div layoutId="username" className="w-full">
                <input
                  type="text"
                  name="username"
                  value={profileData.username}
                  onChange={handleInputChange}
                  className="text-xl font-bold text-center bg-gray-800/70 border border-gray-700 rounded-lg px-3 py-1 mb-1 w-full focus:ring-2 focus:ring-blue-500/40 focus:outline-none"
                />
              </motion.div>
            )}

            {/* Email */}
            <div className="flex items-center gap-1 text-gray-400 text-sm mb-6">
              <Mail size={14} />
              {!isEditing ? (
                <span>{profileData.email}</span>
              ) : (
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="bg-gray-800/70 border border-gray-700 rounded-lg px-2 py-1 w-full text-sm focus:ring-2 focus:ring-blue-500/40 focus:outline-none"
                />
              )}
            </div>

            <div className="w-full border-t border-gray-800/60 mb-5"></div>

            {/* Profile details */}
            <div className="w-full space-y-4">
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Briefcase size={16} className="text-gray-500" />
                {!isEditing ? (
                  <span className="text-gray-300">
                    {profileData.occupation}
                  </span>
                ) : (
                  <input
                    type="text"
                    name="occupation"
                    value={profileData.occupation}
                    onChange={handleInputChange}
                    className="bg-gray-800/70 border border-gray-700 rounded-lg px-2 py-1 w-full text-sm focus:ring-2 focus:ring-blue-500/40 focus:outline-none"
                  />
                )}
              </motion.div>

              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <MapPin size={16} className="text-gray-500" />
                {!isEditing ? (
                  <span className="text-gray-300">{profileData.location}</span>
                ) : (
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleInputChange}
                    className="bg-gray-800/70 border border-gray-700 rounded-lg px-2 py-1 w-full text-sm focus:ring-2 focus:ring-blue-500/40 focus:outline-none"
                  />
                )}
              </motion.div>

              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Calendar size={16} className="text-gray-500" />
                <span className="text-gray-300">
                  Joined {profileData.joinDate}
                </span>
              </motion.div>

              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Globe size={16} className="text-gray-500" />
                {!isEditing ? (
                  <a
                    href={profileData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline flex items-center"
                  >
                    {profileData.website.replace(/(^\w+:|^)\/\//, "")}
                    <ExternalLink size={12} className="ml-1 opacity-70" />
                  </a>
                ) : (
                  <input
                    type="url"
                    name="website"
                    value={profileData.website}
                    onChange={handleInputChange}
                    className="bg-gray-800/70 border border-gray-700 rounded-lg px-2 py-1 w-full text-sm focus:ring-2 focus:ring-blue-500/40 focus:outline-none"
                  />
                )}
              </motion.div>
            </div>

            <div className="w-full border-t border-gray-800/60 my-5"></div>

            {/* Social links */}
            <div className="flex justify-center gap-4 w-full">
              <motion.a
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`https://twitter.com/${profileData.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-gray-800/50 rounded-full text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 transition-colors"
              >
                <Twitter size={18} />
              </motion.a>
              <motion.a
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`https://github.com/${profileData.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-gray-800/50 rounded-full text-gray-300 hover:bg-gray-700/70 hover:text-white transition-colors"
              >
                <Github size={18} />
              </motion.a>
              <motion.a
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`https://linkedin.com/in/${profileData.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-gray-800/50 rounded-full text-blue-500 hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
              >
                <Linkedin size={18} />
              </motion.a>
            </div>

            {/* Edit/Save buttons */}
            <div className="mt-6 w-full">
              {!isEditing ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsEditing(true)}
                  className="w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg flex items-center justify-center gap-2 transition-all"
                >
                  <Edit2 size={16} />
                  Edit Profile
                </motion.button>
              ) : (
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={isSaving}
                    className={`flex-1 py-2.5 ${
                      isSaving
                        ? "bg-blue-600/50"
                        : "bg-blue-600/80 hover:bg-blue-500/80"
                    } text-white rounded-lg flex items-center justify-center gap-2 transition-all`}
                  >
                    {isSaving ? (
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white/90 rounded-full animate-spin" />
                    ) : (
                      <Save size={16} />
                    )}
                    {isSaving ? "Saving..." : "Save Changes"}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsEditing(false)}
                    disabled={isSaving}
                    className="py-2.5 px-4 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 rounded-lg flex items-center justify-center transition-all"
                  >
                    <X size={16} />
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </SpotlightCard>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio Section */}
          <SpotlightCard
            className="bg-gradient-to-br from-gray-900/70 to-gray-800/40 rounded-2xl border border-gray-800/30 backdrop-blur-lg p-6"
            spotlightColor="rgba(255, 255, 255, 0.07)"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-200">About Me</h2>
              <Shield size={20} className="text-gray-500" />
            </div>

            {!isEditing ? (
              <p className="text-gray-300 leading-relaxed">{profileData.bio}</p>
            ) : (
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                rows={4}
                className="w-full bg-gray-800/70 border border-gray-700 rounded-lg px-3 py-2 text-gray-300 focus:ring-2 focus:ring-blue-500/40 focus:outline-none"
              />
            )}

            <div className="mt-6">
              <h3 className="text-md font-medium text-gray-300 mb-3">
                Interests & Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {profileData.interests.map((interest) => (
                  <motion.div
                    key={interest}
                    whileHover={isEditing ? { scale: 1.05 } : {}}
                    whileTap={isEditing ? { scale: 0.95 } : {}}
                    className={`px-3 py-1.5 rounded-full text-sm 
                      ${
                        isEditing
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/30 cursor-pointer hover:bg-blue-500/30"
                          : "bg-gray-800/70 text-gray-300 border border-gray-700/50"
                      }`}
                    onClick={() => isEditing && toggleInterest(interest)}
                  >
                    {interest}
                    {isEditing && <span className="ml-1.5 text-xs">×</span>}
                  </motion.div>
                ))}

                {isEditing && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1.5 rounded-full text-sm bg-gray-800/70 text-gray-300 border border-gray-700/50 hover:bg-gray-700/50 flex items-center"
                    onClick={() => {
                      const interest = prompt("Add new interest or skill:");
                      if (
                        interest &&
                        !profileData.interests.includes(interest)
                      ) {
                        toggleInterest(interest);
                      }
                    }}
                  >
                    <span className="mr-1">+</span> Add
                  </motion.button>
                )}
              </div>
            </div>
          </SpotlightCard>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <SpotlightCard
                key={index}
                className="bg-gradient-to-br from-gray-900/70 to-gray-800/40 rounded-xl border border-gray-800/30 backdrop-blur-lg p-4"
                spotlightColor="rgba(255, 255, 255, 0.07)"
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center mb-1">
                    {stat.icon}
                    <p className="text-gray-400 text-sm ml-1.5">{stat.label}</p>
                  </div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p
                    className={`text-xs mt-1 ${
                      stat.trend === "up"
                        ? "text-green-400"
                        : stat.trend === "down"
                        ? "text-red-400"
                        : "text-amber-400"
                    }`}
                  >
                    {stat.change}
                  </p>
                </motion.div>
              </SpotlightCard>
            ))}
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-800/50 mb-6">
            <div className="flex space-x-6">
              <button
                onClick={() => setActiveTab("activity")}
                className={`pb-3 px-1 font-medium text-sm ${
                  activeTab === "activity"
                    ? "text-white border-b-2 border-blue-500"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                Recent Activity
              </button>
              <button
                onClick={() => setActiveTab("achievements")}
                className={`pb-3 px-1 font-medium text-sm ${
                  activeTab === "achievements"
                    ? "text-white border-b-2 border-blue-500"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                Achievements
              </button>
              <button
                onClick={() => setActiveTab("stats")}
                className={`pb-3 px-1 font-medium text-sm ${
                  activeTab === "stats"
                    ? "text-white border-b-2 border-blue-500"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                Detailed Stats
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "activity" && (
              <motion.div
                key="activity"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <SpotlightCard
                  className="bg-gradient-to-br from-gray-900/70 to-gray-800/40 rounded-2xl border border-gray-800/30 backdrop-blur-lg p-6"
                  spotlightColor="rgba(255, 255, 255, 0.07)"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-200">
                      Recent Activity
                    </h2>
                    <Clock size={20} className="text-gray-500" />
                  </div>

                  <div className="space-y-5">
                    {recentActivity.map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4 pb-5 border-b border-gray-800/30 last:border-0 last:pb-0"
                      >
                        <div
                          className={`p-2.5 rounded-lg ${
                            activity.type === "task"
                              ? "bg-blue-500/20"
                              : activity.type === "book"
                              ? "bg-green-500/20"
                              : activity.type === "achievement"
                              ? "bg-yellow-500/20"
                              : "bg-purple-500/20"
                          }`}
                        >
                          {activity.type === "task" ? (
                            <CheckSquare size={18} className="text-blue-400" />
                          ) : activity.type === "book" ? (
                            <BookOpen size={18} className="text-green-400" />
                          ) : activity.type === "achievement" ? (
                            <Award size={18} className="text-yellow-400" />
                          ) : (
                            <Clock size={18} className="text-purple-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-300 font-medium">
                            {activity.title}
                          </p>
                          <p className="text-gray-500 mt-0.5 text-sm">
                            {activity.details}
                          </p>
                          <p className="text-xs text-gray-500 mt-1.5">
                            {activity.time}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            )}
            {activeTab === "achievements" && (
              <motion.div
                key="achievements"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <SpotlightCard
                  className="bg-gradient-to-br from-gray-900/70 to-gray-800/40 rounded-2xl border border-gray-800/30 backdrop-blur-lg p-6"
                  spotlightColor="rgba(255, 255, 255, 0.07)"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-200">
                      Achievements
                    </h2>
                    <Award size={20} className="text-gray-500" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative overflow-hidden rounded-xl backdrop-blur-sm border border-gray-800/30"
                      >
                        <div
                          className={`absolute inset-0 opacity-20 bg-gradient-to-br ${achievement.color}`}
                        />
                        <div className="relative p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div
                              className={`p-2 rounded-lg bg-gradient-to-br ${achievement.color}`}
                            >
                              {achievement.icon}
                            </div>
                            <span className="text-xs text-gray-400">
                              {achievement.date}
                            </span>
                          </div>
                          <h3 className="font-medium text-white mb-1">
                            {achievement.title}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {achievement.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-center">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="text-sm text-gray-400 hover:text-gray-300 flex items-center gap-1"
                    >
                      View all achievements
                      <ExternalLink size={14} className="ml-1" />
                    </motion.button>
                  </div>
                </SpotlightCard>
              </motion.div>
            )}

            {activeTab === "stats" && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <SpotlightCard
                  className="bg-gradient-to-br from-gray-900/70 to-gray-800/40 rounded-2xl border border-gray-800/30 backdrop-blur-lg p-6"
                  spotlightColor="rgba(255, 255, 255, 0.07)"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-200">
                      Detailed Stats
                    </h2>
                    <BarChart2 size={20} className="text-gray-500" />
                  </div>

                  <div className="space-y-5">
                    {/* Weekly activity chart */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-md font-medium text-gray-300">
                          Weekly Activity
                        </h3>
                        <span className="text-xs text-gray-400">
                          Past 7 days
                        </span>
                      </div>
                      <div className="h-40 bg-gray-800/50 rounded-lg flex items-end justify-between p-4">
                        {[65, 40, 70, 30, 80, 55, 48].map((height, i) => (
                          <div
                            key={i}
                            className="relative flex flex-col items-center"
                          >
                            <div
                              className="w-6 bg-gradient-to-t from-blue-600/80 to-blue-400/80 rounded-t-sm"
                              style={{ height: `${height}%` }}
                            />
                            <span className="mt-2 text-xs text-gray-500">
                              {
                                [
                                  "Mon",
                                  "Tue",
                                  "Wed",
                                  "Thu",
                                  "Fri",
                                  "Sat",
                                  "Sun",
                                ][i]
                              }
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Focus distribution */}
                    <div className="mt-8">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-md font-medium text-gray-300">
                          Focus Distribution
                        </h3>
                        <span className="text-xs text-gray-400">
                          By category
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          {
                            name: "Coding",
                            percentage: 40,
                            color: "bg-blue-500",
                          },
                          {
                            name: "Reading",
                            percentage: 25,
                            color: "bg-purple-500",
                          },
                          {
                            name: "Note Taking",
                            percentage: 20,
                            color: "bg-green-500",
                          },
                          {
                            name: "Learning",
                            percentage: 15,
                            color: "bg-amber-500",
                          },
                        ].map((item, i) => (
                          <div key={i} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-400">
                                {item.name}
                              </span>
                              <span className="text-sm font-medium text-white">
                                {item.percentage}%
                              </span>
                            </div>
                            <div className="h-2 bg-gray-800/70 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${item.color}`}
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
export default Profile;

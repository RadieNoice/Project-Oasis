import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Search, ExternalLink, X, BookOpen, ChevronDown, Code, MessageSquare, PenTool, FileText, BarChart, Zap, Image, Video, Music } from "lucide-react";

const AITools = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // AI Tool Categories
  const categories = [
    { id: "all", name: "All Tools" },
    { id: "writing", name: "Writing & Content" },
    { id: "coding", name: "Coding & Development" },
    { id: "study", name: "Study & Learning" },
    { id: "creative", name: "Creative & Design" },
    { id: "research", name: "Research & Analysis" }
  ];

  const aiTools = [
    {
      name: "ChatGPT",
      icon: <MessageSquare className="h-6 w-6 text-white" />,
      description: "Advanced AI assistant for answering questions, drafting content, and problem-solving.",
      url: "https://chat.openai.com",
      color: "from-green-600/20 to-green-500/10",
      category: "writing"
    },
    {
      name: "GitHub Copilot",
      icon: <Code className="h-6 w-6 text-white" />,
      description: "AI pair programmer that helps you write code faster with smart autocomplete suggestions.",
      url: "https://github.com/features/copilot",
      color: "from-blue-600/20 to-purple-500/10",
      category: "coding"
    },
    {
      name: "Quizlet AI",
      icon: <BookOpen className="h-6 w-6 text-white" />,
      description: "Create flashcards, practice tests, and study guides with AI assistance.",
      url: "https://quizlet.com/",
      color: "from-yellow-600/20 to-orange-500/10",
      category: "study"
    },
    {
      name: "DALL-E",
      icon: <Image className="h-6 w-6 text-white" />,
      description: "Generate realistic images and art from natural language descriptions.",
      url: "https://openai.com/dall-e-3",
      color: "from-pink-600/20 to-red-500/10",
      category: "creative"
    },
    {
      name: "Grammarly",
      icon: <PenTool className="h-6 w-6 text-white" />,
      description: "AI-powered writing assistant that checks grammar, clarity, and tone.",
      url: "https://app.grammarly.com/",
      color: "from-green-500/20 to-emerald-400/10",
      category: "writing"
    },
    {
      name: "Wolfram Alpha",
      icon: <BarChart className="h-6 w-6 text-white" />,
      description: "Computational intelligence for math, science, and data analysis.",
      url: "https://www.wolframalpha.com/",
      color: "from-red-600/20 to-orange-500/10",
      category: "research"
    },
    {
      name: "RunwayML",
      icon: <Video className="h-6 w-6 text-white" />,
      description: "Create, edit and transform videos with powerful AI tools.",
      url: "https://runwayml.com/",
      color: "from-violet-600/20 to-indigo-500/10",
      category: "creative"
    },
    {
      name: "Notion AI",
      icon: <FileText className="h-6 w-6 text-white" />,
      description: "Write faster, think bigger, and augment creativity with AI in your notes.",
      url: "https://www.notion.so/product/ai",
      color: "from-gray-600/20 to-gray-500/10",
      category: "writing"
    },
    {
      name: "Hugging Face",
      icon: <Zap className="h-6 w-6 text-white" />,
      description: "Open-source platform with thousands of pretrained models for NLP, vision, and more.",
      url: "https://huggingface.co/",
      color: "from-yellow-500/20 to-amber-400/10",
      category: "coding"
    },
    {
      name: "SoundRaw",
      icon: <Music className="h-6 w-6 text-white" />,
      description: "Create original royalty-free music with artificial intelligence.",
      url: "https://soundraw.io/",
      color: "from-blue-500/20 to-cyan-400/10", 
      category: "creative"
    }
  ];

  // Filter tools based on search query and active category
  const filteredTools = aiTools.filter(tool =>
    (activeCategory === "all" || tool.category === activeCategory) &&
    tool.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Tool Viewer Modal */}
      <AnimatePresence>
        {selectedTool && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedTool(null);
            }}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-6xl mx-4"
            >
              <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
                <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
                    <span className={`bg-gradient-to-br ${selectedTool.color} p-2 rounded-lg`}>
                      {selectedTool.icon}
                    </span>
                    {selectedTool.name}
                  </h2>
                  <button
                    onClick={() => setSelectedTool(null)}
                    className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="h-[70vh] relative">
                  {/* Loading indicator for iframe */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 z-10">
                    <div className="w-10 h-10 border-4 border-gray-500 border-t-blue-500 rounded-full animate-spin"></div>
                  </div>
                  <iframe
                    src={selectedTool.url}
                    className="w-full h-full rounded-b-2xl relative z-20"
                    title={selectedTool.name}
                    onLoad={(e) => {
                      e.target.previousSibling.style.display = 'none';
                    }}
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <div className="space-y-10">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center space-y-4"
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              AI Study Assistant
            </h1>
            <p className="text-xl text-gray-400">
              Supercharge your learning with powerful AI tools
            </p>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="relative group max-w-2xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search AI tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-300 placeholder-gray-500"
              />
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {isLoading ? (
                // Loading skeletons
                [...Array(6)].map((_, i) => (
                  <motion.div
                    key={`skeleton-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6 h-60"
                  >
                    <div className="flex items-start space-x-4 animate-pulse">
                      <div className="p-3 bg-gray-800/70 rounded-xl w-12 h-12"></div>
                      <div className="flex-1">
                        <div className="h-6 bg-gray-800/70 rounded w-3/4 mb-3"></div>
                        <div className="h-4 bg-gray-800/50 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-800/50 rounded w-5/6"></div>
                        <div className="h-4 mt-6 bg-gray-800/30 rounded w-1/3"></div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : filteredTools.length > 0 ? (
                filteredTools.map((tool) => (
                  <motion.div
                    key={tool.name}
                    layoutId={tool.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    onClick={() => setSelectedTool(tool)}
                    className="relative bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-6 transform transition-all hover:shadow-2xl group cursor-pointer"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${tool.color} rounded-2xl`} />
                    <div className="relative z-10">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${tool.color}`}>
                          {tool.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-100">{tool.name}</h3>
                          <p className="mt-2 text-gray-400">{tool.description}</p>
                          <div className="mt-4 inline-flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                            <span className="border-b border-transparent group-hover:border-blue-300 transition-all">
                              Open Tool
                            </span>
                            <ExternalLink className="h-4 w-4 ml-2 -translate-y-px" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none rounded-2xl" />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-16 text-center"
                >
                  <p className="text-gray-500 text-lg">No tools found matching "{searchQuery}"</p>
                  <button 
                    className="mt-4 text-blue-400 hover:text-blue-300"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("all");
                    }}
                  >
                    Clear search filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AITools;
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ExternalLink, Plus, X, Music as MusicIcon } from "lucide-react";

const MusicPage = () => {
  // Initial music collection
  const initialMusicLinks = [
    {
      title: "Relaxing Piano Music",
      description: "Peaceful piano music for studying, relaxation, and focus",
      thumbnail: "https://img.youtube.com/vi/77ZozI0rw7w/mqdefault.jpg",
      url: "https://www.youtube.com/watch?v=77ZozI0rw7w",
      category: "Piano",
    },
    {
      title: "Calming Nature Sounds",
      description: "Soothing forest ambience with birds and gentle streams",
      thumbnail: "https://img.youtube.com/vi/eKFTSSKCzWA/mqdefault.jpg",
      url: "https://www.youtube.com/watch?v=eKFTSSKCzWA",
      category: "Nature",
    },
    {
      title: "Meditation Music",
      description: "Deep relaxation and meditation background music",
      thumbnail: "https://img.youtube.com/vi/FjHGZj2IjBk/mqdefault.jpg",
      url: "https://www.youtube.com/watch?v=FjHGZj2IjBk",
      category: "Meditation",
    },
    {
      title: "Lo-Fi Study Music",
      description: "Chill beats to help you stay focused while studying",
      thumbnail: "https://img.youtube.com/vi/5qap5aO4i9A/mqdefault.jpg",
      url: "https://www.youtube.com/watch?v=5qap5aO4i9A",
      category: "Lo-Fi",
    },
  ];

  // State management
  const [musicLibrary, setMusicLibrary] = useState(() => {
    const savedMusic = localStorage.getItem("musicLibrary");
    return savedMusic ? JSON.parse(savedMusic) : initialMusicLinks;
  });
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [newMusicEntry, setNewMusicEntry] = useState({
    title: "",
    description: "",
    thumbnail: "",
    url: "",
    category: "",
  });
  
  // Save music library to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("musicLibrary", JSON.stringify(musicLibrary));
  }, [musicLibrary]);

  // Handle form submission for adding new music
  const handleAddMusic = (e) => {
    e.preventDefault();
    
    // Create a new music entry with a unique ID
    const newEntry = {
      ...newMusicEntry,
      id: crypto.randomUUID(),
    };
    
    // Add to music library
    setMusicLibrary([...musicLibrary, newEntry]);
    
    // Reset form and close dialog
    setNewMusicEntry({
      title: "",
      description: "",
      thumbnail: "",
      url: "",
      category: "",
    });
    setShowAddDialog(false);
  };

  // Convert YouTube URL to embed URL
  const getEmbedUrl = (url) => {
    if (!url) return "";
    
    if (url.includes("youtube.com/watch")) {
      return url.replace("watch?v=", "embed/") + "?autoplay=1";
    } else if (url.includes("youtu.be")) {
      const videoId = url.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    
    return url;
  };

  // Handle playing music
  const handlePlayMusic = (music) => {
    setNowPlaying(music);
  };

  // Handle stopping music
  const handleStopMusic = () => {
    setNowPlaying(null);
  };

  // Group music by category for better organization
  const musicByCategory = musicLibrary.reduce((acc, music) => {
    const category = music.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(music);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-6">
      {/* Now Playing Bar - Fixed at bottom when music is playing */}
      <AnimatePresence>
        {nowPlaying && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-900/90 to-blue-900/90 backdrop-blur-md p-4 flex items-center justify-between z-10 border-t border-purple-700"
          >
            <div className="flex items-center gap-4">
              <img 
                src={nowPlaying.thumbnail} 
                alt={nowPlaying.title} 
                className="h-12 w-12 object-cover rounded"
              />
              <div>
                <h3 className="font-medium text-white">{nowPlaying.title}</h3>
                <p className="text-xs text-gray-300">{nowPlaying.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-purple-300">Now Playing</span>
              <button
                onClick={handleStopMusic}
                className="p-2 rounded-full bg-purple-700/50 hover:bg-purple-700 transition-colors"
              >
                <Pause className="h-5 w-5" />
              </button>
            </div>
            
            {/* Hidden iframe for playing music in the background */}
            <iframe
              title="Background Music Player"
              src={getEmbedUrl(nowPlaying.url)}
              allow="autoplay"
              style={{ display: "none" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto pb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3">
              <MusicIcon className="h-8 w-8 text-purple-400" />
              <span>Focus Music</span>
            </h1>
            <p className="text-gray-400 mt-2">
              Curated collection of calm and focus-enhancing music to boost your productivity
            </p>
          </div>
          
          <button
            onClick={() => setShowAddDialog(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors shadow-lg shadow-purple-900/20"
          >
            <Plus className="h-5 w-5" />
            <span>Add Music</span>
          </button>
        </div>
        
        {/* Music Categories */}
        <div className="space-y-10">
          {Object.entries(musicByCategory).map(([category, musicList]) => (
            <div key={category} className="space-y-4">
              <h2 className="text-2xl font-medium text-purple-300 border-b border-purple-800/50 pb-2">
                {category}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {musicList.map((music) => (
                  <motion.div
                    key={music.id || music.url}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gray-800/40 rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-600/50 hover:shadow-lg hover:shadow-purple-900/20 transition-all duration-300"
                  >
                    <div className="relative group">
                      <img
                        src={music.thumbnail}
                        alt={music.title}
                        className="w-full aspect-video object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                        <button
                          onClick={() => handlePlayMusic(music)}
                          className="self-center mb-4 p-3 bg-purple-600 hover:bg-purple-700 rounded-full text-white transition-transform transform hover:scale-105"
                        >
                          <Play className="w-6 h-6" />
                        </button>
                      </div>
                      
                      {nowPlaying && nowPlaying.url === music.url && (
                        <div className="absolute top-3 right-3 px-2 py-1 bg-purple-600 text-xs font-medium rounded-full">
                          Playing
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-white mb-1 line-clamp-1">
                        {music.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                        {music.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="px-2.5 py-1 bg-gray-700/50 rounded-full text-xs text-gray-300">
                          {music.category}
                        </span>
                        <a
                          href={music.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Add Music Dialog */}
      <AnimatePresence>
        {showAddDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-xl border border-gray-700 p-6 w-full max-w-md shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Add New Music</h2>
                <button
                  onClick={() => setShowAddDialog(false)}
                  className="p-1 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleAddMusic} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newMusicEntry.title}
                    onChange={(e) => setNewMusicEntry({ ...newMusicEntry, title: e.target.value })}
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter music title"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={newMusicEntry.category}
                    onChange={(e) => setNewMusicEntry({ ...newMusicEntry, category: e.target.value })}
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., Piano, Lo-Fi, Ambient"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newMusicEntry.description}
                    onChange={(e) => setNewMusicEntry({ ...newMusicEntry, description: e.target.value })}
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Brief description of the music"
                    rows="2"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Thumbnail URL
                  </label>
                  <input
                    type="url"
                    value={newMusicEntry.thumbnail}
                    onChange={(e) => setNewMusicEntry({ ...newMusicEntry, thumbnail: e.target.value })}
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Link to thumbnail image"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Music URL (YouTube)
                  </label>
                  <input
                    type="url"
                    value={newMusicEntry.url}
                    onChange={(e) => setNewMusicEntry({ ...newMusicEntry, url: e.target.value })}
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="YouTube URL"
                    required
                  />
                </div>
                
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddDialog(false)}
                    className="flex-1 py-2.5 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Add Music
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MusicPage;
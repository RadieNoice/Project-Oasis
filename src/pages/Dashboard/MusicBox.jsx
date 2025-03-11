import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Music,
  Play,
  Pause,
  X,
  Volume2,
  VolumeX,
  Plus,
  Link,
  Trash2,
} from "lucide-react";
import SpotlightCard from "../../components/reactbits/SpotlightCard";
import ElasticSlider from "../../components/reactbits/elasticslider";

const MusicBox = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMusicUrl, setNewMusicUrl] = useState("");
  const [newMusicTitle, setNewMusicTitle] = useState("");
  const [newMusicCategory, setNewMusicCategory] = useState("");
  const [customTracks, setCustomTracks] = useState([]);
  const [volume, setVolume] = useState(50); // Default volume: 50%
  const iframeRef = useRef(null);
  const modalRef = useRef(null);
  const musicBoxRef = useRef(null);
  const playerRef = useRef(null);

  const defaultMusicLinks = [
    { title: "Relaxing Piano Music", url: "77ZozI0rw7w", category: "Piano" },
    { title: "Calming Nature Sounds", url: "eKFTSSKCzWA", category: "Nature" },
    { title: "Meditation Music", url: "FjHGZj2IjBk", category: "Meditation" },
    { title: "Lo-Fi Study Music", url: "5qap5aO4i9A", category: "Lo-Fi" },
    { title: "Classical Study Music", url: "jgpJVI3tDbY", category: "Classical" },
    { title: "Ambient Study Music", url: "sjkrrmBnpGE", category: "Ambient" },
  ];

  // Combine default and custom tracks
  const musicLinks = [...defaultMusicLinks, ...customTracks];

  // Extract YouTube video ID from various URL formats
  const extractVideoId = (url) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : url;
  };

  // Close add-form on click outside / Esc key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowAddForm(false);
      }
    };
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setShowAddForm(false);
      }
    };
    if (showAddForm) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscKey);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [showAddForm]);

  // Add new custom track
  const handleAddTrack = (e) => {
    e.preventDefault();
    if (!newMusicUrl) return;
    try {
      const videoId = extractVideoId(newMusicUrl);
      const newTrack = {
        title: newMusicTitle || `Custom Track ${customTracks.length + 1}`,
        url: videoId,
        category: newMusicCategory || "Custom",
        isCustom: true,
      };
      setCustomTracks((prev) => [...prev, newTrack]);
      setNewMusicUrl("");
      setNewMusicTitle("");
      setNewMusicCategory("");
      setShowAddForm(false);
    } catch (error) {
      console.error("Invalid YouTube URL", error);
    }
  };

  // Remove a custom track
  const handleRemoveTrack = (e, index) => {
    e.stopPropagation();
    const actualIndex = index - defaultMusicLinks.length;
    setCustomTracks((prev) => prev.filter((_, i) => i !== actualIndex));
    if (activeVideo === customTracks[actualIndex]?.url) {
      handleStop();
    }
  };

  // Handle play/pause of a track
  const handlePlay = (videoId) => {
    if (activeVideo === videoId) {
      if (playerRef.current) {
        if (isPlaying) {
          playerRef.current.pauseVideo();
          setIsPlaying(false);
        } else {
          playerRef.current.playVideo();
          setIsPlaying(true);
        }
      }
    } else {
      setActiveVideo(videoId);
      setIsPlaying(true);
    }
  };

  // Stop playback
  const handleStop = () => {
    setActiveVideo(null);
    setIsPlaying(false);
    if (playerRef.current && typeof playerRef.current.stopVideo === "function") {
      playerRef.current.stopVideo();
    }
  };

  // Toggle mute state
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  // Handle volume change from ElasticSlider (value is 0–100)
  const handleVolumeChange = (newValue) => {
    setVolume(newValue);
    if (playerRef.current) {
      playerRef.current.setVolume(newValue);
    }
    console.log("New volume:", newValue);
  };

  // Create the YouTube player using the IFrame API
  const createPlayer = () => {
    playerRef.current = new window.YT.Player(iframeRef.current, {
      height: "0",
      width: "0",
      videoId: activeVideo || "",
      playerVars: {
        autoplay: isPlaying ? 1 : 0,
        mute: isMuted ? 1 : 0,
        controls: 0,
      },
      events: {
        onReady: (event) => {
          event.target.setVolume(volume);
        },
        onStateChange: (event) => {
          // Optionally update state when video ends, etc.
        },
      },
    });
  };

  // Load the YouTube IFrame API and create the player
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
    } else {
      if (!playerRef.current) {
        createPlayer();
      }
    }
  }, []);

  // When the active video changes, load it in the player
  useEffect(() => {
    if (playerRef.current) {
      if (activeVideo) {
        playerRef.current.loadVideoById(activeVideo);
      } else {
        if (typeof playerRef.current.stopVideo === "function") {
          playerRef.current.stopVideo();
        }
      }
    }
  }, [activeVideo]);

  // Update player volume when volume state changes
  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setVolume(volume);
    }
  }, [volume]);

  // Update mute state on the player when toggled
  useEffect(() => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
      }
    }
  }, [isMuted]);

  return (
    <>
      <motion.div
        ref={musicBoxRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="h-[300px] relative"
      >
        <SpotlightCard
          className="bg-gradient-to-br from-purple-900/20 to-purple-900/5 rounded-2xl border border-gray-800/50 backdrop-blur-lg p-4 h-full flex flex-col shadow-xl"
          spotlightColor="rgba(147, 51, 234, 0.2)"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="p-2 rounded-xl bg-gradient-to-br from-purple-900/40 to-purple-700/10 border border-purple-800/30 shadow-inner">
                <Music className="h-4 w-4 text-purple-300" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-semibold text-white">
                  Focus Music
                </h3>
                <p className="text-xs text-gray-400">
                  Productivity enhancing tracks
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {activeVideo && (
                <>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleMute}
                    className="p-1.5 rounded-full bg-gray-800/80 hover:bg-gray-700 transition-colors shadow-md"
                  >
                  </motion.button>
                  {/* Use ElasticSlider for volume control */}
                  <ElasticSlider
                    value={volume}
                    onChange={handleVolumeChange}
                    defaultValue={50}
                    startingValue={0}
                    maxValue={100}
                    isStepped={true}
                    stepSize={1}
                    leftIcon={<VolumeX className="h-3.5 w-3.5" />}
                    rightIcon={<Volume2 className="h-3.5 w-3.5" />}
                  />
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleStop}
                    className="p-1.5 rounded-full bg-gray-800/80 hover:bg-gray-700 transition-colors shadow-md"
                  >
                  </motion.button>
                </>
              )}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowAddForm(true)}
                className="p-1.5 rounded-full bg-gray-800/80 hover:bg-gray-700 transition-colors shadow-md"
              >
                <Plus className="h-3.5 w-3.5 text-purple-400" />
              </motion.button>
            </div>
          </div>

          {/* Hidden div for the YouTube IFrame Player */}
          <div style={{ display: "none" }}>
            <div id="youtube-player" ref={iframeRef}></div>
          </div>

          {/* Music List */}
          <div className="flex-grow relative overflow-hidden rounded-xl border border-gray-800/40 bg-gray-900/20">
            <div className="absolute top-0 left-0 right-0 h-[15px] bg-gradient-to-b from-gray-900/90 to-transparent pointer-events-none z-10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[15px] bg-gradient-to-t from-gray-900/90 to-transparent pointer-events-none z-10"></div>
            <div className="overflow-y-auto h-full py-2 px-1.5 space-y-1.5 custom-scrollbar">
              {musicLinks.map((music, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handlePlay(music.url)}
                  whileHover={{ scale: 1.01 }}
                  className={`relative p-2 rounded-lg border cursor-pointer transition-all duration-200 ${
                    activeVideo === music.url
                      ? "bg-gradient-to-r from-purple-900/40 to-gray-800/80 border-purple-800/60 shadow-md"
                      : "bg-gray-800/30 border-gray-700/30 hover:bg-gray-800/50 hover:border-gray-700/60"
                  } ${music.isCustom ? "border-l-2 border-l-purple-500/50" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-black/20 flex items-center justify-center overflow-hidden shadow-inner">
                      <img
                        src={`https://img.youtube.com/vi/${music.url}/default.jpg`}
                        alt={music.title}
                        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                        onError={(e) => {
                          e.target.src =
                            "https://placehold.co/200x200/3730a3/ffffff?text=Music";
                        }}
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-xs font-medium text-gray-200 truncate">
                        {music.title}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        {activeVideo === music.url && (
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isPlaying
                                ? "bg-green-400 animate-pulse shadow-sm shadow-green-500/50"
                                : "bg-gray-500"
                            }`}
                          ></span>
                        )}
                        <span className="text-[10px] text-gray-400">
                          {activeVideo === music.url
                            ? isPlaying
                              ? "Playing"
                              : "Paused"
                            : music.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {music.isCustom && (
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => handleRemoveTrack(e, index)}
                          className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/40 transition-all"
                        >
                          <Trash2 className="h-3 w-3 text-red-400" />
                        </motion.button>
                      )}
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlay(music.url);
                        }}
                        className={`p-2 rounded-full transition-all shadow-md ${
                          activeVideo === music.url
                            ? "bg-purple-600 hover:bg-purple-700 ring-2 ring-purple-600/20"
                            : "bg-gray-700/70 hover:bg-purple-600/80"
                        }`}
                      >
                        {activeVideo === music.url && isPlaying ? (
                          <Pause className="h-3 w-3 text-white" />
                        ) : (
                          <Play className="h-3 w-3 text-white" />
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
              {musicLinks.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <p className="text-sm text-gray-400">No music tracks available</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Click the + button to add tracks
                  </p>
                </div>
              )}
            </div>
          </div>
        </SpotlightCard>

        {/* Add Music Popup */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[90%] max-w-[320px] bg-gray-900/95 backdrop-blur-lg rounded-xl border border-purple-800/40 shadow-2xl"
            >
              <div className="p-3.5">
                <div className="flex items-center justify-between mb-2.5">
                  <h3 className="text-xs font-semibold text-white flex items-center">
                    <Plus className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
                    Add Music Track
                  </h3>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowAddForm(false)}
                    className="p-1 rounded-full bg-gray-700/80 hover:bg-gray-600 transition-colors"
                  >
                    <X className="h-3 w-3 text-gray-300" />
                  </motion.button>
                </div>
                <form onSubmit={handleAddTrack} className="space-y-2.5">
                  <div>
                    <label className="text-xs text-gray-300 flex items-center gap-1 mb-1">
                      <Link className="w-2.5 h-2.5" />
                      YouTube URL
                    </label>
                    <input
                      type="text"
                      value={newMusicUrl}
                      onChange={(e) => setNewMusicUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full bg-gray-800/80 border border-gray-700/50 rounded text-xs p-1.5 text-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      required
                      autoFocus
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-300 mb-1 block">
                        Title (optional)
                      </label>
                      <input
                        type="text"
                        value={newMusicTitle}
                        onChange={(e) => setNewMusicTitle(e.target.value)}
                        placeholder="Track title"
                        className="w-full bg-gray-800/80 border border-gray-700/50 rounded text-xs p-1.5 text-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-300 mb-1 block">
                        Category (optional)
                      </label>
                      <input
                        type="text"
                        value={newMusicCategory}
                        onChange={(e) => setNewMusicCategory(e.target.value)}
                        placeholder="Category"
                        className="w-full bg-gray-800/80 border border-gray-700/50 rounded text-xs p-1.5 text-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end pt-1">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-2.5 py-1 text-xs rounded border border-gray-600 text-gray-300 hover:bg-gray-700/50 mr-2"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="px-2.5 py-1 text-xs rounded bg-purple-600 text-white hover:bg-purple-700 shadow-md"
                    >
                      Add Track
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default MusicBox;

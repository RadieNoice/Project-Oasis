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
import SpotlightCard from "../../components/reactbits/SpotlightCard"; // Assuming paths are correct
import ElasticSlider from "../../components/reactbits/elasticslider"; // Assuming paths are correct

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
  const [isPlayerReady, setIsPlayerReady] = useState(false); // Track player readiness

  const iframeRef = useRef(null);
  const modalRef = useRef(null);
  const musicBoxRef = useRef(null);
  const playerRef = useRef(null);

  const defaultMusicLinks = [
    { title: "Relaxing Piano Music", url: "77ZozI0rw7w", category: "Piano" },
    { title: "Calming Nature Sounds", url: "eKFTSSKCzWA", category: "Nature" },
    { title: "Meditation Music", url: "FjHGZj2IjBk", category: "Meditation" },
    { title: "Lo-Fi Study Music", url: "5qap5aO4i9A", category: "Lo-Fi" },
    {
      title: "Classical Study Music",
      url: "jgpJVI3tDbY",
      category: "Classical",
    },
    { title: "Ambient Study Music", url: "sjkrrmBnpGE", category: "Ambient" },
  ];

  // Combine default and custom tracks
  const musicLinks = [...defaultMusicLinks, ...customTracks];

  // Extract YouTube video ID from various URL formats
  const extractVideoId = (url) => {
    // Regex updated slightly for robustness and clarity, handles various youtube & googleusercontent links
    const regExp =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|googleusercontent\.com\/youtube\.com\/\d+\/)([^"&?\/ ]{11})/;
    const match = url.match(regExp);
    // If match found, return ID, otherwise assume input might be ID itself (or return it for error handling)
    return match ? match[1] : url.length === 11 ? url : null;
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

    const videoId = extractVideoId(newMusicUrl);

    if (!videoId) {
      console.error("Invalid YouTube URL or could not extract Video ID");
      // Optionally show an error message to the user
      return;
    }

    const newTrack = {
      title: newMusicTitle || `Custom Track ${customTracks.length + 1}`,
      url: videoId, // Store only the ID
      category: newMusicCategory || "Custom",
      isCustom: true,
    };
    setCustomTracks((prev) => [...prev, newTrack]);
    setNewMusicUrl("");
    setNewMusicTitle("");
    setNewMusicCategory("");
    setShowAddForm(false);
  };

  // Remove a custom track
  const handleRemoveTrack = (e, index) => {
    e.stopPropagation(); // Prevent triggering play/pause
    // Find the actual track object to remove, considering default tracks
    const trackToRemove = musicLinks[index];
    if (!trackToRemove || !trackToRemove.isCustom) return; // Safety check

    setCustomTracks((prev) => prev.filter((track) => track.url !== trackToRemove.url));

    // If the removed track was playing, stop playback
    if (activeVideo === trackToRemove.url) {
      handleStop();
    }
  };


  // Handle play/pause of a track
  const handlePlay = (videoId) => {
    // If the player isn't ready, don't try to play
    // (Could optionally queue the play action until ready)
    if (!isPlayerReady && !activeVideo) {
        console.warn("Player not ready yet.");
        // Set the video ID, it will be loaded once the player is ready
        setActiveVideo(videoId);
        setIsPlaying(true); // Set desired state
        return;
    }

    if (activeVideo === videoId) {
      // Toggle play/pause for the current video
      if (playerRef.current && typeof playerRef.current.getPlayerState === "function") {
        const playerState = playerRef.current.getPlayerState();
        // Check if playing or buffering (YT.PlayerState.PLAYING or YT.PlayerState.BUFFERING)
        if (playerState === 1 || playerState === 3) {
            playerRef.current.pauseVideo();
            setIsPlaying(false);
        } else {
            playerRef.current.playVideo();
            setIsPlaying(true);
        }
      }
    } else {
      // Play a new video
      setActiveVideo(videoId); // This triggers the useEffect to load the video
      setIsPlaying(true);
    }
  };

  // Stop playback
  const handleStop = () => {
    if (playerRef.current && typeof playerRef.current.stopVideo === "function") {
      playerRef.current.stopVideo();
    }
    setActiveVideo(null);
    setIsPlaying(false);
  };

  // Toggle mute state
  const toggleMute = () => {
    setIsMuted((prev) => !prev); // State update triggers useEffect for mute
  };

  // Handle volume change from ElasticSlider (value is 0–100)
  const handleVolumeChange = (newValue) => {
    setVolume(newValue); // State update triggers useEffect for volume
    console.log("Volume set to:", newValue);
  };

  // Function to create the player instance
  const createPlayer = (videoId) => {
    console.log("Creating player for videoId:", videoId);
    // Destroy existing player if it exists
     if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
        playerRef.current = null;
        setIsPlayerReady(false);
        console.log("Existing player destroyed.");
     }

     // Ensure the div exists
     if (!iframeRef.current) {
         console.error("Iframe container div not found.");
         return;
     }

    playerRef.current = new window.YT.Player(iframeRef.current, {
      height: "0",
      width: "0",
      videoId: videoId || "", // Load initial video if activeVideo is set
      playerVars: {
        autoplay: isPlaying ? 1 : 0, // Autoplay if meant to be playing
        mute: isMuted ? 1 : 0,
        controls: 0, // Hide controls
      },
      events: {
        onReady: (event) => {
          console.log("Player Ready. Setting initial volume:", volume);
          setIsPlayerReady(true); // Set player ready state
          // Check if setVolume exists before calling
          if (event.target && typeof event.target.setVolume === 'function') {
              event.target.setVolume(volume);
          } else {
              console.error("setVolume function not available on player target.");
          }
          // If we intended to play, start playing now
          if (isPlaying && videoId) {
              event.target.playVideo();
          }
        },
        onStateChange: (event) => {
          // Update playing state based on player events
          // YT.PlayerState: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
          if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
          } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
              setIsPlaying(false);
              // If ended, optionally stop completely or load next?
              if(event.data === window.YT.PlayerState.ENDED) {
                 // setActiveVideo(null); // Option: Clear active video on end
              }
          }
           console.log("Player state changed:", event.data);
        },
        onError: (event) => {
            console.error("YouTube Player Error:", event.data);
            // Handle different error codes (e.g., video not found, playback restricted)
            setIsPlaying(false);
            setActiveVideo(null); // Clear active video on error
        }
      },
    });
  };

 // Load the YouTube IFrame API
 useEffect(() => {
    const loadYouTubeAPI = () => {
        if (!window.YT) {
            console.log("Loading YouTube IFrame API...");
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api"; // Use official https source
            document.body.appendChild(tag); // Append to body

            window.onYouTubeIframeAPIReady = () => {
                console.log("YouTube IFrame API Ready.");
                // If a video was selected before API ready, create player now
                if (activeVideo) {
                    createPlayer(activeVideo);
                } else {
                    // API is ready, but no video selected yet.
                    // We can optionally create a dummy player or wait.
                    // For simplicity, we'll just mark API as loaded.
                    // Player creation will happen when a video is selected.
                    console.log("API ready, player will be created on first play.");
                    // You *could* create a player without a videoId here if needed later
                    // createPlayer(null); // Creates player without video, ready for loadVideoById
                }
            };
        } else if (!playerRef.current && activeVideo) {
            // API was already loaded, but player doesn't exist, and a video is active
             console.log("API already loaded. Creating player.");
            createPlayer(activeVideo);
        } else if (!playerRef.current) {
             console.log("API already loaded, no active video. Player will be created on first play.");
        }
    };

    loadYouTubeAPI();

    // Cleanup function to remove the global callback if component unmounts
    // before API loads, although less critical if appended to body.
    return () => {
        // It's tricky to fully clean up the script tag and global callback reliably,
        // especially if other components might use the same API.
        // window.onYouTubeIframeAPIReady = null; // Can cause issues if other instances exist
    };
  }, []); // Runs only once on mount


  // Effect to load video when activeVideo changes
  useEffect(() => {
    // Only act if the player is ready and the activeVideo ID exists
    if (isPlayerReady && activeVideo && playerRef.current && typeof playerRef.current.loadVideoById === 'function') {
      console.log("Loading video:", activeVideo);
      playerRef.current.loadVideoById(activeVideo);
      setIsPlaying(true); // Assume playing after load
    } else if (isPlayerReady && !activeVideo && playerRef.current && typeof playerRef.current.stopVideo === 'function') {
      // If activeVideo is cleared and player is ready, stop the video
      console.log("Stopping video.");
      playerRef.current.stopVideo();
      setIsPlaying(false);
    } else if (!isPlayerReady && activeVideo && window.YT && window.YT.Player) {
        // If player is not ready, but API is loaded and video selected, create the player
        console.log("Player not ready, but API exists. Creating player for:", activeVideo);
        createPlayer(activeVideo);
    }
  }, [activeVideo, isPlayerReady]); // Depend on activeVideo AND isPlayerReady

  // Effect to update player volume when volume state changes
  useEffect(() => {
    // Check if player is ready and the method exists
    if (isPlayerReady && playerRef.current && typeof playerRef.current.setVolume === "function") {
      console.log("useEffect: Setting volume to", volume);
      playerRef.current.setVolume(volume);
    }
  }, [volume, isPlayerReady]); // Depend on volume AND isPlayerReady

  // Effect to update mute state on the player when toggled
  useEffect(() => {
    // Check if player is ready and the methods exist
    if (isPlayerReady && playerRef.current) {
       if (isMuted && typeof playerRef.current.mute === 'function') {
            console.log("useEffect: Muting player.");
            playerRef.current.mute();
       } else if (!isMuted && typeof playerRef.current.unMute === 'function') {
            console.log("useEffect: Unmuting player.");
            playerRef.current.unMute();
       }
    }
  }, [isMuted, isPlayerReady]); // Depend on isMuted AND isPlayerReady


  return (
    <>
      <motion.div
        ref={musicBoxRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="h-[300px] relative" // Adjust height as needed
      >
        <SpotlightCard
         className="bg-gradient-to-br from-purple-900/20 to-purple-900/5 rounded-2xl border border-gray-800/50 backdrop-blur-lg p-4 h-full flex flex-col shadow-xl"
         spotlightColor="rgba(147, 51, 234, 0.2)"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3 flex-shrink-0"> {/* Prevent header shrinking */}
            <div className="flex items-center">
              <div className="p-2 rounded-xl bg-gradient-to-br from-purple-900/40 to-purple-700/10 border border-purple-800/30 shadow-inner">
                <Music className="h-5 w-4 text-purple-300" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-semibold text-white">Focus Music</h3>
                <p className="text-xs text-gray-400">
                  Productivity enhancing tracks
                </p>
              </div>
            </div>

            <div className="flex items-center gap-7">
                {/* Volume controls - Show only when a video is active/loaded */}
              {activeVideo && isPlayerReady && (
                <>
                   {/* Mute Button */}
                  {/* <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleMute}
                    className="p-1.5 rounded-full bg-gray-800/80 hover:bg-gray-700 transition-colors shadow-md"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <VolumeX className="h-3.5 w-3.5 text-gray-400" />
                    ) : (
                      <Volume2 className="h-3.5 w-3.5 text-purple-400" />
                    )}
                  </motion.button> */}

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
                    disabled={isMuted} // Optionally disable slider when muted
                  />
                  {/* Stop Button */}
                   {/* <motion.button
                     whileTap={{ scale: 0.9 }}
                     onClick={handleStop}
                     className="p-1.5 rounded-full bg-red-800/50 hover:bg-red-700/70 transition-colors shadow-md"
                     aria-label="Stop playback"
                   >
                     
                  </motion.button> */}
                  
                </>
              )}
              {/* Add Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowAddForm(true)}
                className="p-1.5 rounded-full bg-gray-800/80 hover:bg-gray-700 transition-colors shadow-md"
                 aria-label="Add new track"
              >
                <Plus className="h-3.5 w-3.5 text-purple-400" />
              </motion.button>
            </div>
          </div>

          {/* Hidden div for the YouTube IFrame Player */}
          {/* It's okay for this to be in the DOM even if player isn't created yet */}
          <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
            <div id="youtube-player-container" ref={iframeRef}></div>
          </div>

          {/* Music List */}
           {/* Flex-grow takes remaining space, overflow causes scroll */}
          <div className="flex-grow relative overflow-hidden rounded-xl border border-gray-800/40 bg-gray-900/20 mt-2">
             {/* Fades for scroll */}
            <div className="absolute top-0 left-0 right-0 h-[15px] bg-gradient-to-b from-gray-900/90 to-transparent pointer-events-none z-10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[15px] bg-gradient-to-t from-gray-900/90 to-transparent pointer-events-none z-10"></div>
            {/* Scrollable content */}
            <div className="overflow-y-auto h-full py-2 px-1.5 space-y-1.5 custom-scrollbar">
              {musicLinks.map((music, index) => (
                <motion.div
                  key={music.url + index} // Use a more unique key if titles/urls can repeat temporarily
                  layout // Animate layout changes (e.g., when removing items)
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }} // Animate removal
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  onClick={() => handlePlay(music.url)}
                  whileHover={{ scale: 1.01 }}
                  className={`relative p-2 rounded-lg border cursor-pointer transition-all duration-200 flex items-center gap-3 ${
                    activeVideo === music.url
                      ? "bg-gradient-to-r from-purple-900/40 to-gray-800/80 border-purple-800/60 shadow-md"
                      : "bg-gray-800/30 border-gray-700/30 hover:bg-gray-800/50 hover:border-gray-700/60"
                  } ${music.isCustom ? "border-l-2 border-l-purple-500/50" : ""}`}
                >
                  {/* Thumbnail */}
                  <div className="w-9 h-9 rounded-lg bg-black/20 flex-shrink-0 flex items-center justify-center overflow-hidden shadow-inner">
                    <img
                      src={`https://img.youtube.com/vi/${music.url}/default.jpg`} // Use official thumbnail URL
                      alt={music.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" // Use group-hover if needed
                      onError={(e) => {
                        // Fallback placeholder
                        e.target.src =
                         `https://placehold.co/90x90/3730a3/5046e5?text=${music.category?.[0] || 'M'}`;
                         e.target.alt = "Missing thumbnail";
                      }}
                       loading="lazy" // Lazy load thumbnails
                    />
                  </div>
                  {/* Title & Status */}
                  <div className="flex-grow min-w-0"> {/* Prevents text overflow issues */}
                    <p className="text-xs font-medium text-gray-200 truncate">
                      {music.title}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                       {/* Status indicator only if this track is active */}
                      {activeVideo === music.url && (
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isPlaying
                              ? "bg-green-400 animate-pulse shadow-sm shadow-green-500/50"
                              : "bg-gray-500" // Paused or stopped/cued state
                          }`}
                        ></span>
                      )}
                      <span className="text-[10px] text-gray-400">
                        {activeVideo === music.url
                          ? isPlaying ? "Playing" : "Paused"
                          : music.category}
                      </span>
                    </div>
                  </div>
                   {/* Action Buttons */}
                  <div className="flex gap-1 flex-shrink-0">
                    {music.isCustom && (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => handleRemoveTrack(e, index)}
                        className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/40 transition-all"
                        aria-label={`Remove ${music.title}`}
                      >
                        <Trash2 className="h-3 w-3 text-red-400" />
                      </motion.button>
                    )}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent container click
                          handlePlay(music.url);
                        }}
                        className={`p-2 rounded-full transition-all shadow-md ${
                          activeVideo === music.url
                           ? "bg-purple-600 hover:bg-purple-700 ring-1 ring-purple-600/30" // More subtle ring
                           : "bg-gray-700/70 hover:bg-purple-600/80"
                        }`}
                        aria-label={activeVideo === music.url && isPlaying ? `Pause ${music.title}` : `Play ${music.title}`}
                      >
                      {activeVideo === music.url && isPlaying ? (
                        <Pause className="h-3 w-3 text-white" />
                      ) : (
                        <Play className="h-3 w-3 text-white" />
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
              {musicLinks.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <p className="text-sm text-gray-400">No music tracks available</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Click the <Plus className="inline h-3 w-3"/> button to add tracks
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
              transition={{ duration: 0.2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[90%] max-w-[320px] bg-gray-900/95 backdrop-blur-lg rounded-xl border border-purple-800/40 shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="add-track-title"
            >
              <div className="p-3.5">
                <div className="flex items-center justify-between mb-2.5">
                  <h3 id="add-track-title" className="text-xs font-semibold text-white flex items-center">
                    <Plus className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
                    Add Music Track
                  </h3>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowAddForm(false)}
                    className="p-1 rounded-full bg-gray-700/80 hover:bg-gray-600 transition-colors"
                    aria-label="Close add track form"
                  >
                    <X className="h-3 w-3 text-gray-300" />
                  </motion.button>
                </div>
                <form onSubmit={handleAddTrack} className="space-y-2.5">
                  <div>
                    <label htmlFor="youtube-url" className="text-xs text-gray-300 flex items-center gap-1 mb-1">
                      <Link className="w-2.5 h-2.5" />
                      YouTube URL or Video ID
                    </label>
                    <input
                      id="youtube-url"
                      type="text"
                      value={newMusicUrl}
                      onChange={(e) => setNewMusicUrl(e.target.value)}
                      placeholder="e.g., https://www.youtube.com/watch?v=..." // Example placeholder
                      className="w-full bg-gray-800/80 border border-gray-700/50 rounded text-xs p-1.5 text-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder:text-gray-500"
                      required
                      autoFocus
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="track-title" className="text-xs text-gray-300 mb-1 block">
                        Title (optional)
                      </label>
                      <input
                        id="track-title"
                        type="text"
                        value={newMusicTitle}
                        onChange={(e) => setNewMusicTitle(e.target.value)}
                        placeholder="Track title"
                         className="w-full bg-gray-800/80 border border-gray-700/50 rounded text-xs p-1.5 text-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="track-category" className="text-xs text-gray-300 mb-1 block">
                        Category (optional)
                      </label>
                      <input
                        id="track-category"
                        type="text"
                        value={newMusicCategory}
                        onChange={(e) => setNewMusicCategory(e.target.value)}
                        placeholder="e.g., Lo-Fi, Study"
                         className="w-full bg-gray-800/80 border border-gray-700/50 rounded text-xs p-1.5 text-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end pt-1">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="button" // Important: Set type to button to prevent form submission
                      onClick={() => setShowAddForm(false)}
                      className="px-2.5 py-1 text-xs rounded border border-gray-600 text-gray-300 hover:bg-gray-700/50 mr-2"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="px-2.5 py-1 text-xs rounded bg-purple-600 text-white hover:bg-purple-700 shadow-md disabled:opacity-50"
                      disabled={!newMusicUrl} // Disable if URL is empty
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
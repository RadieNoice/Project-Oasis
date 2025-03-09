import React, { useState } from "react";
import { motion } from "framer-motion";
import { Music, Play, X } from "lucide-react";
import SpotlightCard from "../../components/reactbits/SpotlightCard";

const MusicBox = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  const musicLinks = [
    {
      title: "Relaxing Piano Music",
      url: "77ZozI0rw7w",
      category: "Piano",
    },
    {
      title: "Calming Nature Sounds",
      url: "eKFTSSKCzWA",
      category: "Nature",
    },
    {
      title: "Meditation Music",
      url: "FjHGZj2IjBk",
      category: "Meditation",
    },
    {
      title: "Lo-Fi Study Music",
      url: "5qap5aO4i9A",
      category: "Lo-Fi",
    },
    {
      title: "Classical Study Music",
      url: "jgpJVI3tDbY",
      category: "Classical",
    },
    {
      title: "Ambient Study Music",
      url: "sjkrrmBnpGE",
      category: "Ambient",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="h-full"
    >
      <SpotlightCard
        className="bg-gradient-to-br from-purple-900/20 to-purple-900/5 rounded-2xl border border-gray-800/50 backdrop-blur-lg p-4 h-full"
        spotlightColor="rgba(147, 51, 234, 0.15)"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center mb-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-900/30 to-purple-700/10 border border-purple-800/30 shadow-inner">
              <Music className="h-5 w-5 text-purple-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-base font-medium text-gray-100">
                Calming Music
              </h3>
              <p className="text-xs text-gray-400">
                Focus-enhancing tracks
              </p>
            </div>
          </div>

          {activeVideo && (
            <div className="mb-2 relative h-[45%]">
              <div className="w-full rounded-xl overflow-hidden bg-black/20 h-full">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&controls=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 flex-grow overflow-y-auto custom-scrollbar">
            {musicLinks.map((music, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-gray-800/40 rounded-lg p-2 hover:bg-gray-800/60 transition-all duration-300 border border-gray-700/30"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-grow min-w-0">
                    <h4 className="text-xs font-medium text-gray-200 mb-1 truncate">
                      {music.title}
                    </h4>
                    <span className="px-1.5 py-0.5 bg-purple-500/20 text-purple-300 text-[10px] rounded-full">
                      {music.category}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveVideo(music.url)}
                    className="flex-shrink-0"
                  >
                    <div className="p-1.5 bg-purple-500 rounded-lg text-white hover:bg-purple-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-110 active:scale-95">
                      <Play className="h-3.5 w-3.5" />
                    </div>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

export default MusicBox; 
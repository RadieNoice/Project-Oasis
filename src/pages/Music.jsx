import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Play } from "lucide-react";

const MusicPage = () => {
  const musicLinks = [
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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-100 mb-2">Calming Music</h1>
        <p className="text-gray-400 mb-8">
          A collection of peaceful and relaxing music to help you focus and unwind.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {musicLinks.map((music, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gray-800/40 rounded-xl overflow-hidden border border-gray-700/30 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300"
            >
              <div className="relative group">
                <img
                  src={music.thumbnail}
                  alt={music.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={music.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors"
                  >
                    <Play className="w-6 h-6" />
                  </a>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100 mb-1">
                      {music.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-2">
                      {music.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="px-3 py-1 bg-gray-700/30 rounded-full text-xs text-gray-300">
                    {music.category}
                  </span>
                  <a
                    href={music.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MusicPage; 
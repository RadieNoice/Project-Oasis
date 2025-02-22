import React, { useState } from "react";
import { Brain, Search, ExternalLink, X } from "lucide-react";

const AITools = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const aiTools = [
    // ... (keep the same tools array)
  ];

  const filteredTools = aiTools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      {/* Tool Viewer Modal */}
      {selectedTool && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center">
          <div className="w-full max-w-6xl mx-4">
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-gray-800 shadow-2xl">
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
              <div className="h-[70vh]">
                <iframe
                  src={selectedTool.url}
                  className="w-full h-full rounded-b-2xl"
                  title={selectedTool.name}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <div className="space-y-10">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              AI Study Assistant
            </h1>
            <p className="text-xl text-gray-400">
              Supercharge your learning with powerful AI tools
            </p>
          </div>

          <div className="relative group max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search AI tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-300 placeholder-gray-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTools.map((tool) => (
              <div
                key={tool.name}
                onClick={() => setSelectedTool(tool)}
                className="relative bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-6 transform transition-all hover:scale-[1.02] hover:shadow-2xl group cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${tool.color} rounded-2xl`} />
                <div className="relative z-10">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${tool.color}`}>
                      {tool.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-100">{tool.name}</h3>
                      <p className="mt-2 text-gray-400">{tool.description}</p>
                      <div className="mt-4 inline-flex items-center text-green-400 group-hover:text-green-300 transition-colors">
                        <span className="border-b border-transparent group-hover:border-green-300 transition-all">
                          Open Tool sdsg
                        </span>
                        <ExternalLink className="h-4 w-4 ml-2 -translate-y-px" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none rounded-2xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITools;
import React, { useState } from "react";
import { Book, Plus, Search, X, FileText, Image, Download } from "lucide-react";

const BookShelf = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [studyMaterials, setStudyMaterials] = useState([
    {
      id: 1,
      title: "Mathematics Notes",
      subtitle: "Calculus Chapter 5",
      description: "Comprehensive notes on integration techniques and applications.",
      category: "Mathematics",
      date: "Added 2 days ago",
      color: "blue",
      files: [
        { name: "calculus_notes.pdf", type: "pdf", url: "#" },
        { name: "diagram.png", type: "image", url: "#" }
      ]
    },
    // Add other initial materials here
  ]);

  const [newMaterial, setNewMaterial] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "",
    files: []
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filePreview, setFilePreview] = useState(null);
  const [uploadError, setUploadError] = useState("");

  // Handle file upload with validation
  const handleFileUpload = (e) => {
    const files = e.target.files;
    const validTypes = ["application/pdf", "image/png", "image/jpeg"];
    
    if (files.length > 3) {
      setUploadError("Maximum 3 files allowed");
      return;
    }

    const invalidFiles = Array.from(files).filter(
      file => !validTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      setUploadError("Only PDF, PNG, and JPG files allowed");
      return;
    }

    setUploadError("");
    const newFiles = Array.from(files).map(file => ({
      file,
      name: file.name,
      type: file.type.startsWith("image/") ? "image" : "pdf",
      url: URL.createObjectURL(file)
    }));

    setNewMaterial(prev => ({
      ...prev,
      files: [...prev.files, ...newFiles]
    }));

    // Preview first image
    if (files[0]?.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setFilePreview(e.target.result);
      reader.readAsDataURL(files[0]);
    }
  };

  // Add new material to the list
  const handleAddMaterial = (e) => {
    e.preventDefault();
    if (!newMaterial.title || !newMaterial.category) return;

    const material = {
      id: Date.now(),
      ...newMaterial,
      date: "Added just now",
      color: ["blue", "green", "purple"][Math.floor(Math.random() * 3)],
    };

    setStudyMaterials([material, ...studyMaterials]);
    setShowAddModal(false);
    setNewMaterial({
      title: "",
      subtitle: "",
      description: "",
      category: "",
      files: []
    });
    setFilePreview(null);
  };

  // Filter materials based on search query
  const filteredMaterials = studyMaterials.filter(material =>
    material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle file download
  const handleDownload = (file) => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto min-h-screen p-6 ">
      {/* Add Material Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black flex items-center justify-center p-4 z-50">
          <div className=" rounded-xl p-6 w-full max-w-md ring-1 ring-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Add New Material</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-800 rounded-lg"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleAddMaterial}>
              <div className="space-y-4">
                {/* Title Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newMaterial.title}
                    onChange={(e) => setNewMaterial(prev => ({...prev, title: e.target.value}))}
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>

                {/* Subtitle Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={newMaterial.subtitle}
                    onChange={(e) => setNewMaterial(prev => ({...prev, subtitle: e.target.value}))}
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>

                {/* Description Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newMaterial.description}
                    onChange={(e) => setNewMaterial(prev => ({...prev, description: e.target.value}))}
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none h-24"
                  />
                </div>

                {/* Category Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={newMaterial.category}
                    onChange={(e) => setNewMaterial(prev => ({...prev, category: e.target.value}))}
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>

                {/* File Upload Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Attach Files (PDF/Images)
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Plus className="h-8 w-8 text-gray-500 mb-2" />
                        <p className="text-sm text-gray-400">Click to upload</p>
                        <p className="text-xs text-gray-500 mt-1">PDF, PNG, JPG (max 3 files)</p>
                      </div>
                      <input 
                        type="file" 
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        accept=".pdf,.png,.jpg,.jpeg"
                      />
                    </label>
                  </div>

                  {uploadError && (
                    <p className="text-red-400 text-sm mt-2">{uploadError}</p>
                  )}

                  {/* Preview Area */}
                  <div className="mt-4 space-y-2">
                    {filePreview && (
                      <div className="relative group">
                        <img 
                          src={filePreview} 
                          alt="Preview" 
                          className="h-24 w-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFilePreview(null);
                            setNewMaterial(prev => ({
                              ...prev,
                              files: prev.files.slice(1)
                            }));
                          }}
                          className="absolute top-1 right-1 p-1 bg-black/50 rounded-full hover:bg-black/80"
                        >
                          <X className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    )}

                    {newMaterial.files.slice(filePreview ? 1 : 0).map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-800 p-2 rounded">
                        <div className="flex items-center gap-2">
                          {file.type === "pdf" ? (
                            <FileText className="h-4 w-4 text-blue-400" />
                          ) : (
                            <Image className="h-4 w-4 text-green-400" />
                          )}
                          <span className="text-gray-300 text-sm">{file.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setNewMaterial(prev => ({
                            ...prev,
                            files: prev.files.filter((_, i) => i !== index + (filePreview ? 1 : 0))
                          }))}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add Material
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="rounded-xl p-8 ring-1 ring-gray-800">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Book Shelf</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 group"
          >
            <Plus className="h-5 w-5 text-green-200 group-hover:text-white transition-colors" /> 
            Add Material
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            <input
              type="text"
              placeholder="Search your study materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 border-transparent placeholder-gray-500"
            />
          </div>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material) => (
            <div key={material.id} className="bg-gray-800 rounded-lg p-6 hover:ring-1 hover:ring-gray-600 transition-all duration-300 hover:bg-gray-800/50 group">
              <div className="flex items-center mb-4">
                <Book className={`h-8 w-8 text-${material.color}-400 group-hover:text-${material.color}-300 transition-colors`} />
                <div className="ml-3">
                  <h3 className="font-semibold text-white">{material.title}</h3>
                  <p className="text-sm text-gray-300">{material.subtitle}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                {material.description}
              </p>
              
              {/* File Attachments */}
              {material.files.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <h4 className="text-xs font-medium text-gray-400 mb-2">Attachments:</h4>
                  <div className="space-y-2">
                    {material.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-700/20 p-2 rounded">
                        <div className="flex items-center gap-2">
                          {file.type === "pdf" ? (
                            <FileText className="h-4 w-4 text-blue-400" />
                          ) : (
                            <Image className="h-4 w-4 text-green-400" />
                          )}
                          <span className="text-gray-300 text-sm">{file.name}</span>
                        </div>
                        <button 
                          onClick={() => handleDownload(file)}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-gray-400">{material.date}</span>
                <span className={`px-3 py-1 bg-${material.color}-900/30 text-${material.color}-400 rounded-full text-xs`}>
                  {material.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookShelf;
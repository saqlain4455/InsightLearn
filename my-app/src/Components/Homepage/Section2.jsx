import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { connectionApi } from "../../services/apiconnector";
import { subsection } from "../../services/apis";
import Button from "./Button";
import { Video, Clock, FileText, Upload, CheckCircle } from "lucide-react";

const Section2 = () => {
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    timeDuration: "",
    description: "",
  });

  const [file, setFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFile(e) {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setVideoPreview(url);
    }
  }

  async function createSection2() {
    const fd = new FormData();
    fd.append("sectionId", id);
    fd.append("title", form.title);
    fd.append("timeDuration", form.timeDuration);
    fd.append("description", form.description);
    fd.append("vedioFile", file);

    try {
      const res = await connectionApi(
        subsection.CREATE_SUBSECTION,
        "POST",
        {},
        null,
        fd
      );

      console.log("Subsection created");
      
      // Reset form after success
      setForm({ title: "", timeDuration: "", description: "" });
      setFile(null);
      setVideoPreview(null);
    } catch (err) {
      console.log("Error");
    }
  }

  // Cleanup video preview URL
  React.useEffect(() => {
    return () => {
      if (videoPreview) {
        URL.revokeObjectURL(videoPreview);
      }
    };
  }, [videoPreview]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Video size={24} className="text-purple-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Add Subsection</h2>
              <p className="text-slate-400 text-sm mt-1">
                Create a new lesson with video content
              </p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl shadow-2xl p-8 border border-slate-700 space-y-6">
          
          {/* Title */}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-slate-200 flex items-center gap-2">
              <FileText size={18} className="text-purple-400" />
              Lesson Title
            </label>
            <input
              name="title"
              value={form.title}
              placeholder="e.g., Introduction to Variables"
              className="px-4 py-3 rounded-lg bg-slate-900 text-white border border-slate-700 
                         focus:ring-2 focus:ring-purple-500 focus:border-transparent 
                         transition-all duration-200 placeholder-slate-500"
              onChange={handleInput}
            />
          </div>

          {/* Time Duration */}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-slate-200 flex items-center gap-2">
              <Clock size={18} className="text-purple-400" />
              Duration
            </label>
            <input
              name="timeDuration"
              value={form.timeDuration}
              placeholder="e.g., 15:30 or 15 minutes"
              className="px-4 py-3 rounded-lg bg-slate-900 text-white border border-slate-700 
                         focus:ring-2 focus:ring-purple-500 focus:border-transparent 
                         transition-all duration-200 placeholder-slate-500"
              onChange={handleInput}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-slate-200 flex items-center gap-2">
              <FileText size={18} className="text-purple-400" />
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              placeholder="Describe what students will learn in this lesson"
              rows={4}
              className="px-4 py-3 rounded-lg bg-slate-900 text-white border border-slate-700 
                         focus:ring-2 focus:ring-purple-500 focus:border-transparent 
                         transition-all duration-200 resize-none placeholder-slate-500"
              onChange={handleInput}
            />
          </div>

          {/* Video Upload */}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-slate-200 flex items-center gap-2">
              <Upload size={18} className="text-purple-400" />
              Video File
            </label>
            
            <div className="flex flex-col gap-4">
              <label className="cursor-pointer">
                <div className="px-4 py-6 rounded-lg bg-slate-900 border-2 border-dashed 
                                border-slate-700 hover:border-purple-500 transition-all duration-200 
                                text-center">
                  {file ? (
                    <div className="flex items-center justify-center gap-3 text-purple-400">
                      <CheckCircle size={24} />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto text-slate-500 mb-2" size={32} />
                      <p className="text-sm text-slate-400">
                        Click to upload video
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        MP4, MOV, AVI up to 500MB
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleFile}
                />
              </label>

              {/* Video Preview */}
              {videoPreview && (
                <div className="rounded-lg overflow-hidden border-2 border-slate-700 shadow-lg">
                  <video 
                    src={videoPreview} 
                    controls 
                    className="w-full max-h-96 bg-black"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <div onClick={createSection2}>
              <Button active={true} linkto={"/dashboard"}>
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} />
                  Create Subsection
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-purple-500/10 backdrop-blur rounded-xl p-4 border border-purple-500/30">
          <div className="flex items-start gap-3">
            <Video size={20} className="text-purple-400 flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm text-slate-300">
                <span className="font-semibold text-purple-400">Pro tip:</span> Keep your videos 
                concise and focused on a single topic for better learning outcomes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
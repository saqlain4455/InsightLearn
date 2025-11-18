import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { connectionApi } from "../../services/apiconnector";
import { section } from "../../services/apis";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { Course } from "../../services/apis";
import { FolderOpen, Plus, ChevronRight, BookOpen, Layers } from "lucide-react";

const Section = () => {
  const [sectionName, setSectionName] = useState("");
  console.log(sectionName);
  const [sections, setSections] = useState([]);
  console.log(sections);
  const { token } = useSelector((state) => state.auth);
  const courseId = token.user.courses[token.user.courses.length - 1];
  console.log(courseId);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourseSections();
  }, []);

  async function fetchCourseSections() {
    try {
      const res = await connectionApi(
        Course.GET_DETAILS,
        "POST",
        null,
        null,
        { courseId: courseId }
      );
      console.log(res);
      setSections(res.data.data.courseContent);
    } catch (err) {
      console.log("Error fetching course", err);
    }
  }

  async function createSection() {
    if (!sectionName.trim()) return;

    try {
      const res = await connectionApi(
        section.CREATE_SECTION,
        "POST",
        null,
        null,
        { courseId, sectionName }
      );

      const newSection = res.data.data;

      setSections((prev) => [...prev, newSection]);
      setSectionName("");
    } catch (err) {
      console.log("Section create error", err);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-sky-500/20 flex items-center justify-center">
              <Layers size={24} className="text-sky-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Course Sections</h2>
              <p className="text-slate-400 text-sm mt-1">
                Organize your course content into sections
              </p>
            </div>
          </div>
        </div>

        {/* Add New Section Card */}
        <div className="bg-gradient-to-r from-sky-500/10 to-blue-500/10 backdrop-blur 
                        rounded-xl p-6 border border-sky-500/30 shadow-xl mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Plus size={20} className="text-sky-400" />
            <h3 className="text-lg font-semibold">Add New Section</h3>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={sectionName}
              placeholder="Enter section name (e.g., Introduction, Advanced Topics)"
              className="flex-1 px-4 py-3 rounded-lg bg-slate-900 text-white border border-slate-700 
                         focus:ring-2 focus:ring-sky-500 focus:border-transparent 
                         transition-all duration-200 placeholder-slate-500"
              onChange={(e) => setSectionName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && createSection()}
            />
            <div onClick={createSection}>
              <Button active={true}>
                <div className="flex items-center gap-2">
                  <Plus size={18} />
                  Add Section
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {sections.length === 0 && (
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-12 border border-slate-700 
                          text-center shadow-xl">
            <FolderOpen size={64} className="mx-auto text-slate-600 mb-4" />
            <p className="text-xl text-slate-300 mb-2">No sections yet</p>
            <p className="text-sm text-slate-500">
              Create your first section to start organizing your course content
            </p>
          </div>
        )}

        {/* Section List */}
        <div className="space-y-4">
          {sections.map((sec, index) => (
            <div
              key={sec._id}
              className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700 
                         hover:border-sky-500/50 transition-all duration-300 shadow-lg 
                         hover:shadow-sky-500/10 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Left Side - Section Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/20 flex items-center 
                                  justify-center flex-shrink-0 mt-1 group-hover:bg-sky-500/30 
                                  transition-colors">
                    <span className="text-sky-400 font-bold">{index + 1}</span>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {sec.sectionName}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <BookOpen size={14} />
                      <span>
                        {sec.subSection?.length || 0} subsection{sec.subSection?.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side - Action Button */}
                <button
                  className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r 
                             from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600
                             text-white font-semibold rounded-lg 
                             shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50
                             transition-all duration-300 hover:scale-105
                             self-start sm:self-center"
                  onClick={() => navigate(`/subsection/${sec._id}`)}
                >
                  <span>Manage Subsections</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        {sections.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              Total Sections: <span className="text-sky-400 font-semibold">{sections.length}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Section;
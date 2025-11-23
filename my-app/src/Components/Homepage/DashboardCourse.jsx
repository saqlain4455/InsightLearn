import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  Star, 
  BookOpen, 
  User, 
  PlayCircle, 
  Tag, 
  DollarSign, 
  Clock,
  CheckCircle,
  Award
} from "lucide-react";

const DashboardCourse = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeVideo, setActiveVideo] = useState(null);  
  
  const data = location.state.details;
  const courseId = data._id;
 

  function handleReviewClick() {
    navigate("/review", {
      state: {
        courseId: courseId,
        courseName: data.courseName
      }
    });
  }

  const totalLessons = data.courseContent?.reduce(
    (acc, section) => acc + (section.subSection?.length || 0), 
    0
  ) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Thumbnail */}
            <div className="relative group w-full lg:w-auto flex-shrink-0">
              <img
                src={data.thumbnail}
                alt={data.courseName}
                className="w-full lg:w-96 h-64 rounded-xl object-cover border-2 border-slate-700 
                           shadow-2xl group-hover:shadow-sky-500/30 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
            </div>

            {/* Course Info */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                {data.tag?.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 
                               rounded-full text-sm font-medium flex items-center gap-1"
                  >
                    <Tag size={14} />
                    {t}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 
                             bg-clip-text text-transparent">
                {data.courseName}
              </h1>

              <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">
                {data.courseDescription}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-slate-800/50 backdrop-blur rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center gap-2 text-yellow-400 mb-1">
                    <DollarSign size={18} />
                    <span className="text-sm text-slate-400">Price</span>
                  </div>
                  <p className="text-2xl font-bold">₹{data.price}</p>
                </div>

                <div className="bg-slate-800/50 backdrop-blur rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center gap-2 text-sky-400 mb-1">
                    <BookOpen size={18} />
                    <span className="text-sm text-slate-400">Sections</span>
                  </div>
                  <p className="text-2xl font-bold">{data.courseContent?.length || 0}</p>
                </div>

                <div className="bg-slate-800/50 backdrop-blur rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center gap-2 text-green-400 mb-1">
                    <PlayCircle size={18} />
                    <span className="text-sm text-slate-400">Lessons</span>
                  </div>
                  <p className="text-2xl font-bold">{totalLessons}</p>
                </div>
              </div>

              {/* Review Button */}
              <button
                onClick={handleReviewClick}
                className="mt-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 
                           hover:to-yellow-700 text-black px-6 py-3 rounded-lg font-semibold 
                           shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50
                           transition-all duration-300 hover:scale-105 flex items-center gap-2 
                           w-fit"
              >
                <Star size={20} />
                Give Rating & Review
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        
        {/* What You Will Learn */}
        <div className="bg-gradient-to-br from-sky-500/10 to-blue-500/5 backdrop-blur 
                        rounded-xl p-8 border border-sky-500/30 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-sky-500/20 flex items-center justify-center">
              <CheckCircle className="text-sky-400" size={22} />
            </div>
            <h2 className="text-2xl font-bold">What You Will Learn</h2>
          </div>
          <p className="text-slate-300 leading-relaxed text-lg">
            {data.whatYouWillLearn}
          </p>
        </div>

        {/* Instructor */}
        <div className="bg-slate-800/50 backdrop-blur rounded-xl p-8 border border-slate-700 
                        shadow-xl hover:border-slate-600 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <User className="text-purple-400" size={22} />
            </div>
            <h2 className="text-2xl font-bold">Your Instructor</h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={data.instructor.image}
                alt={`${data.instructor.firstName} ${data.instructor.lastName}`}
                className="w-9 h-9  rounded-full file: md:w-20  md:h-20  md:rounded-full border-2 border-purple-500/50 shadow-lg"
              />
              <div className="absolute -bottom-2 left-5 md:-bottom-1 md:left-12 w-6 h-6 bg-purple-500 rounded-full 
                              flex items-center justify-center border-2 border-slate-800">
                <Award size={14} className="text-white" />
              </div>
            </div>
            <div>
              <p className="font-semibold text-xl text-white">
                {data.instructor.firstName} {data.instructor.lastName}
              </p>
              <p className="text-slate-400 mt-1">{data.instructor.email}</p>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="bg-slate-800/50 backdrop-blur rounded-xl p-8 border border-slate-700 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <BookOpen className="text-green-400" size={22} />
              </div>
              <h2 className="text-2xl font-bold">Course Curriculum</h2>
            </div>
            <div className="text-sm text-slate-400">
              {data.courseContent?.length || 0} sections · {totalLessons} lessons
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {data.courseContent?.map((section, idx) => (
              <div
                key={section._id}
                className="bg-slate-900/50 rounded-xl border border-slate-700 
                           hover:border-sky-500/50 transition-all duration-300 overflow-hidden"
              >
                
                {/* Section Header */}
                <div className="bg-slate-800/50 p-6 border-b border-slate-700">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center">
                      <span className="text-sky-400 font-bold text-sm">{idx + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-white mb-1">
                        {section.sectionName}
                      </h3>
                      <p className="text-sm text-slate-400">
                        {section.subSection?.length || 0} lesson
                        {section.subSection?.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                </div>

                {/* SUBSECTIONS + VIDEO PLAYER */}
                <div className="p-4 space-y-3">
                  
                  {section.subSection?.length > 0 ? (
                    <>
                      <div className="space-y-2">
                        {section.subSection.map((sub) => (
                          <div key={sub._id}>
                            <div
                              onClick={() => setActiveVideo(sub.vedioFile)}
                              className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg 
                                         hover:bg-slate-800/50 transition-colors duration-200 
                                         group cursor-pointer"
                            >
                              <div className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center">
                                <PlayCircle className="text-green-400 group-hover:text-green-300" size={14} />
                              </div>

                              <span className="text-slate-300 flex-1">{sub.title}</span>

                              {sub.timeDuration && (
                                <span className="text-xs text-slate-500 flex items-center gap-1">
                                  <Clock size={12} />
                                  {sub.timeDuration}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {activeVideo && (
                        <div className="mt-4">
                          <video
                            className="w-full rounded-lg border border-slate-700"
                            controls
                            src={activeVideo}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-slate-500 text-center py-4 italic">
                      No lessons available in this section
                    </p>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Students */}
        {data.studentsEnrolled && (
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur 
                          rounded-xl p-6 border border-green-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <User className="text-green-400" size={22} />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Students Enrolled</p>
                  <p className="text-2xl font-bold text-green-400">
                    {data.studentsEnrolled?.length || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default DashboardCourse;

import React from 'react'
import { Ratings } from '../../services/apis';
import { BookOpen, Tag, User, PlayCircle, CheckCircle, Star } from "lucide-react";
import { connectionApi } from "../../services/apiconnector";
import { useState ,useEffect} from 'react';
const CategoryCourseDetails = ({data}) => {
    console.log(data)
  const [avgRating, setAvgRating] = useState(0);
 
  async function AverageRating(){
    try{
      const response = await connectionApi(Ratings.AVGRATING,
                                            "POST",
                                            null,
                                            null,
                                            {courseId:data._id}
      )
     
      const rating= response.data.averageRating
      if(response){
        console.log("got the avgreview")
        setAvgRating(rating || 0)
      }
    }catch(error){
      console.log("no data found",error)
    }
  }

  useEffect(()=>{
    AverageRating()
  }, [])
       

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      
      {/* Hero Section with Thumbnail */}
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
                    className="px-3 py-1 bg-sky-500/20 text-sky-400 border border-sky-500/30 
                               rounded-full text-sm font-medium"
                  >
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

              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-sky-500/20 flex items-center justify-center">
                    <Tag className="text-sky-400" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Price</p>
                    <p className="text-2xl font-bold text-sky-400">₹{data.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <Star className="text-amber-400 fill-amber-400" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Rating</p>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold text-amber-400">
                        {avgRating > 0 ? avgRating.toFixed(1) : 'N/A'}
                      </p>
                      {avgRating > 0 && (
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={
                                i < Math.round(avgRating)
                                  ? "text-amber-400 fill-amber-400"
                                  : "text-slate-600"
                              }
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
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
            <img
              src={data.instructor.image}
              alt={`${data.instructor.firstName} ${data.instructor.lastName}`}
              className="w-20 h-20 rounded-full border-2 border-purple-500/50 shadow-lg"
            />
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
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <BookOpen className="text-green-400" size={22} />
            </div>
            <h2 className="text-2xl font-bold">Course Content</h2>
          </div>

          {data.courseContent?.length === 0 && (
            <div className="text-center py-8">
              <BookOpen className="mx-auto text-slate-600 mb-3" size={48} />
              <p className="text-slate-400">No sections added yet.</p>
            </div>
          )}

          <div className="flex flex-col gap-4">
            {data.courseContent?.map((section, idx) => (
              <div
                key={section._id}
                className="bg-slate-900/50 p-6 border border-slate-700 rounded-xl 
                           hover:border-sky-500/50 transition-all duration-300"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center 
                                  flex-shrink-0 mt-1">
                    <span className="text-sky-400 font-bold text-sm">{idx + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl text-white">
                      {section.sectionName}
                    </h3>
                  </div>
                </div>

                {/* Subsections */}
                {section.subSection?.length > 0 ? (
                  <div className="ml-11 space-y-2 mt-4">
                    {section.subSection.map((sub) => (
                      <div
                        key={sub._id}
                        className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg 
                                   hover:bg-slate-800 transition-colors duration-200"
                      >
                        <PlayCircle className="text-sky-400 flex-shrink-0" size={18} />
                        <span className="text-slate-300">{sub.title}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 ml-11 mt-2 italic">No subsections available.</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-sky-500 to-blue-500 rounded-xl p-8 shadow-2xl 
                        shadow-sky-500/30 text-center">
          <h3 className="text-2xl font-bold mb-3">Ready to Start Learning?</h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Join thousands of students and master new skills with this comprehensive course.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-sky-600 font-semibold rounded-lg 
                             hover:bg-slate-100 transition-all duration-300 shadow-lg 
                             hover:scale-105">
              Enroll Now
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white 
                             font-semibold rounded-lg hover:bg-white/10 transition-all duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
   
  

export default CategoryCourseDetails

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Ratings, User } from "../../services/apis";
import { connectionApi } from "../../services/apiconnector";
import { Course } from "../../services/apis.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const DashBoard = () => {
  const { token } = useSelector((state) => state.auth || null);
  const [userDetails, setUserDetails] = useState(null);
  console.log(userDetails)
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function getDetails() {
    try {
      setLoading(true);
      const response = await connectionApi(
        User.GET_USER_DETAILS,
        "POST",
        null,
        null,
        { userId: token?.user?._id }
      );

      if (response?.data?.data) {
        const user = response.data.data;
        setUserDetails(user);
        console.log(user.courses)
        setCourses(user.courses || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }





  async function getInfo(courseId) {
    try {
      const response = await connectionApi(
        Course.GETFULL_COURSEDETAILS,
        "POST",
        null,
        null,
        { courseId }
      );
      if (response) {
        navigate("/fullcourse", {
          state: {
            details: response.data.data,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

   async function deleteCourse (courseId){
    try{
      const response = await  connectionApi(Course.DELETE_COURSE,
                                            "DELETE",
                                              null,
                                                null,
                                                {courseId:courseId}
      )
      console.log(response)

      if(response){
        console.log("deleted successfully")
        setCourses(courses.filter((c) => c._id !== courseId));
        toast.success("deleted successfully")
      }
      }catch(error){
        console.log("error occured here :",error)
      }

  }
    async  function deleteCourse2 (courseId){
      try{
          console.log(courseId)
      
          const response = await connectionApi(User.DELETE_USER_COURSE,
                                                "POST",
                                                null,
                                                null,
                                                {courseId:courseId}
          )
            const id = response.data.data
            console.log(id)
          if(response){
            console.log("deleted successfully")
             setCourses(  courses.filter((c) => c._id !== courseId ));
            toast.success("deleted successfully")
          }
        }catch(error){
            console.log("somthing went wrong on frontend ")
            toast.error("deletion failed")
        }
    }

  useEffect(() => {
    getDetails();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userDetails) return null;

  const accountType = userDetails.accountType;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="w-11/12 max-w-7xl mx-auto py-10">
        {/* HEADER SECTION */}
        <div className="relative bg-gradient-to-r from-yellow-500/10 via-yellow-400/5 to-transparent border border-yellow-500/20 rounded-2xl p-8 mb-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl"></div>
          <div className="relative flex items-center gap-6">
            <div className="relative">
              <img
                src={userDetails.image}
                alt="profile"
                className="w-24 h-24 object-cover rounded-full border-4 border-yellow-500/30 shadow-xl"
              />
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-4 border-gray-900"></div>
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome  {userDetails.firstName}! 👋
              </h1>
              <p className="text-gray-300 text-lg">
                {accountType === "Instructor"
                  ? "Manage your created courses and track student progress."
                  : "Continue your learning journey and explore new courses."}
              </p>
            </div>
          </div>
        </div>

        {/* STATS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-6 hover:scale-105 transition-transform">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Courses</p>
                <p className="text-3xl font-bold text-white">{courses.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl p-6 hover:scale-105 transition-transform">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Completed</p>
                <p className="text-3xl font-bold text-white">0</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-6 hover:scale-105 transition-transform">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-400 text-sm">In Progress</p>
                <p className="text-3xl font-bold text-white">{courses.length}</p>
              </div>
            </div>
          </div>
        </div>

        {accountType === "Instructer" && (
  <div className="mb-6 flex justify-end">
    <button
      onClick={() => navigate("/coursecreate")}
      className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition shadow-lg"
    >
      Create Course
    </button>
  </div>
)}

        {/* COURSES SECTION */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <span className="w-1.5 h-8 bg-yellow-500 rounded-full"></span>
            {accountType === "Instructer" ? "Your Created Courses" : "Your Enrolled Courses"}
          </h2>
          {courses.length > 0 && (
            <button className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 rounded-lg hover:bg-yellow-500/20 transition">
              View All →
            </button>
          )}
        </div>

        {/* COURSE CARDS */}
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div
                key={course._id}
                className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 cursor-pointer hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/10"
                onClick={() => getInfo(course._id)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt="thumbnail"
                    className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                  <div className="absolute top-3 right-3 px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">
                    {accountType === "Instructer" ? "Created" : "Enrolled"}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-yellow-400 transition">
                    {course.courseName}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {course.courseDescription?.slice(0, 100)}...
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>8h 30m</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>24 videos</span>
                    </div>
                  </div>

                  {accountType !== "Instructer" && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-yellow-400 font-semibold">45%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                  )}

                  <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-black py-3 rounded-xl font-bold hover:from-yellow-400 hover:to-yellow-300 transition-all shadow-lg shadow-yellow-500/20 group-hover:shadow-yellow-500/40">
                    {accountType === "Instructer" ? "Manage Course" : "Continue Learning"} →
                  </button>
                 {
                    accountType === "Instructer"&&(
                      <div className="mt-3">
                  <button 
                    className="w-full bg-red-500/10 border border-red-500/30 text-red-400 py-3 rounded-xl font-semibold hover:bg-red-500/20 hover:border-red-500/50 transition-all flex items-center justify-center gap-2 group/delete" 
                    onClick={(e)=>{
                      e.stopPropagation()
                      deleteCourse(course._id)
                    }} 
                  >
                    <svg className="w-5 h-5 group-hover/delete:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Course
                  </button>
                  </div>
                    )
                  }
                  {
                    accountType==="Student" &&(
                     <div className="mt-3">
                  <button 
                    className="w-full bg-red-500/10 border border-red-500/30 text-red-400 py-3 rounded-xl font-semibold hover:bg-red-500/20 hover:border-red-500/50 transition-all flex items-center justify-center gap-2 group/delete" 
                    onClick={(e)=>{
                      e.stopPropagation()
                      deleteCourse2(course._id)
                    }} 
                  >
                    <svg className="w-5 h-5 group-hover/delete:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Unenroll from Course
                  </button>
                  </div>

                    )
                  }
                  
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No courses yet</h3>
            <p className="text-gray-400 mb-6">
              {accountType === "Instructor" 
                ? "Start creating your first course to share your knowledge." 
                : "Explore our catalog and enroll in courses to start learning."}
            </p>
            <button className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition">
              {accountType === "Instructor" ? "Create Course" : "Browse Courses"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
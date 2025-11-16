import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { User } from "../../services/apis";
import { connectionApi } from "../../services/apiconnector";
import {Course} from "../../services/apis.js"
import { useNavigate } from "react-router-dom";
const DashBoard = () => {
  const { token } = useSelector((state) => state.auth);

  // Local State
  const [userDetails, setUserDetails] = useState(null);
  const [courses, setCourses] = useState([]);
  const navigate =useNavigate()
  // Fetch user details from backend
  console.log(courses)
  async function getDetails() {
    const response = await connectionApi(
      User.GET_USER_DETAILS,
      "POST",
      null,
      null,
      { userId: token?.user?._id }
    );
   
    if (response?.data?.data) {
      const user = response.data.data;
      console.log(user)
      setUserDetails(user);
      setCourses(user.courses || []);
    }
  }
  async function getInfo(courseId){
    try{
      console.log(courseId)
    
    const response = await connectionApi(Course.GETFULL_COURSEDETAILS,
                                          "POST",
                                          null,
                                          null,
                                          {courseId:courseId}

                    
    )
    console.log(response)
      if(response){
        navigate("/fullcourse",{
          state:{
            details:response.data.data
          }
        })
          }


    }catch(error){
      console.log(error)
    }
  }
  useEffect(() => {
    getDetails();
  }, []);

  if (!userDetails) return null;

  const accountType = userDetails.accountType;

  return (
    <div className="w-11/12 mx-auto my-10 text-white" >
      {/* HEADER */}
      <div className="flex items-center gap-5 mb-8">
        <img
          src={userDetails.image}
          alt="profile"
          className="w-20 h-20 rounded-full border"
        />

        <div>
          <h1 className="text-3xl font-bold">
            Welcome Back, {userDetails.firstName}
          </h1>

          <p className="text-gray-300 text-lg">
            {accountType === "Instructor"
              ? "Manage your created courses and insights."
              : "Continue learning from your enrolled courses."}
          </p>
        </div>
      </div>

      {/* COURSES SECTION */}
      <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
        {accountType === "Instructor"
          ? "Your Created Courses"
          : "Your Enrolled Courses"}
      </h2>

      {/* COURSE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-gray-700 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all"
              onClick={()=>getInfo(course._id)}

            >
              <img
                src={course.thumbnail}
                alt="thumbnail"
                className="h-36 w-full object-cover rounded-xl mb-3"
              />

              <h3 className="text-xl font-semibold mb-2">
                {course.courseName}
              </h3>

              <p className="text-gray-400 text-sm mb-4">
                {course.courseDescription?.slice(0, 80)}...
              </p>

              <button className="w-full bg-yellow-500 text-black py-2 rounded-lg font-semibold">
                {userDetails.accountType === "Instructer" ? "View Course" : "Continue Learning"}
              </button>
            </div>
          ))
        ) : (
          <div className="text-gray-400 text-lg">
            No courses found.
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;

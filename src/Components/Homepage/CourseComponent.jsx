import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Course } from "../../services/apis";
import { connectionApi } from "../../services/apiconnector";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCart,RemoveId } from "../../Slice/Cart";
const CourseComponent = () => {
  const location = useLocation();
  const courseData = location.state?.courses || [];
  console.log(courseData)
  const navigate = useNavigate();
 
  const { token } = useSelector((state) => state.auth);
  const {cartItem }=useSelector((state)=>state.cart)
  console.log(cartItem)
  const userId = token?.user?._id;
  const dispatch = useDispatch()

  // ---------------- GET FULL COURSE DETAILS ----------------
  async function getDetails(courseId) {
    try {
      const res = await connectionApi(
        Course.GETFULL_COURSEDETAILS,
        "POST",
        null,
        null,
        { courseId, userId }
      );

      if (res) {
        console.log("course details success:", res);
        navigate("/details", { state: { details: res.data.data } });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // ---------------- BUY COURSE ----------------
  async function addedd(courseId) {
    try {
      const res = await connectionApi(
        Course.PAYMENT_ID,
        "POST",
        null,
        null,
        { courseId:courseId, userId:userId }
      );

      if (res) {
        console.log(res)
        toast.success("Payment Successfully Initiated");
      }else{
        toast.error("already added")
      }
    } catch (error) {
      console.log(error);
    }
  }

  function addtocart (course){
        dispatch(setCart(course))
       
       
  }
  function RemoveItem (courseId){
    dispatch(RemoveId(courseId))
   
  }

  return (
    <div className="w-11/12 max-w-5xl mx-auto my-10">
      <h1 className="text-3xl font-bold mb-5 text-white">Course Details</h1>

      {courseData.length === 0 && (
        <div className="text-gray-500 text-lg">No course data available.</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courseData.map((course, index) => (
          <div
            key={index}
            className="border rounded-2xl p-5 shadow-md bg-white"
            onClick={() => getDetails(course._id)}
          >
            <img
              src={course.thumbnail}
              alt={course.courseName}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />

            <h2 className="text-xl font-semibold mb-2">
              {course.courseName}
            </h2>

            <p className="text-gray-700 mb-2">
              {course.courseDescription}
            </p>

            <div className="flex flex-col gap-1 mb-3">
              <span className="text-sm text-gray-600">
                Instructor: {course.instructor}
              </span>
              <span className="text-sm text-gray-600">
                Price: ₹{course.price}
              </span>
              <span className="text-sm text-gray-600">
                Tags: {course.tag?.join(", ")}
              </span>
            </div>

            <div className="text-sm font-semibold text-yellow-600">
              What You Will Learn:
            </div>
            <p className="text-gray-700 border-l-4 border-yellow-500 pl-3 mt-1">
              {course.whatYouWillLearn}
            </p>

            <button
              className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold"
              onClick={(e) => {
                e.stopPropagation();
                addedd(course._id);
              }}
            >
              Buy Now
            </button>
               {cartItem.some((c)=>c._id=== course._id)?
                 (<button className="" onClick={(e)=>{
                 e.stopPropagation()
              RemoveItem(course._id)
            }}>
               Remove Item
            </button>):(
              <button className="" onClick={(e)=>{
                e.stopPropagation()
             addtocart(course)
            }}>
              add to cart 
            </button>
            )
              }
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseComponent;

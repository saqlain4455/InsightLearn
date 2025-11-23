import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Course } from "../../services/apis";
import { connectionApi } from "../../services/apiconnector";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setCart, RemoveId } from "../../Slice/Cart";

const CourseComponent = () => {
  const location = useLocation();
  const courseData = location.state.courses || [];
  const navigate = useNavigate();
  const [loading, setLoading] = useState({});
  console.log(courseData)
  // 🔹 Only change: Single useSelector to get token and user
  const authState = useSelector((state) => state.auth.token);
  const token = authState?.token || null; // raw JWT string
  const user = authState?.user || null;
 
  const accountType = user?.accountType || null;
  const userId = user?._id;

  const { cartItem } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

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
        navigate("/details", { state: { details: res.data.data } });
      }
    } catch (error) {
      console.log("error fetching course details");
    }
  }

  // 🔹 Only change: Use raw token from above
  async function addedd(courseId) {
    if (!token) {
      toast.error("Please login to continue");
      return;
    }

    setLoading({ ...loading, [courseId]: true });
    try {
      const res = await connectionApi(
        Course.PAYMENT_ID,
        "POST",
        null,
        null,
        { courseId, userId }
      );
      console.log(res)
      if (res) {
        toast.success("Payment Successfully Initiated");
      } else {
        toast.error("Already added");
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment failed");
    } finally {
      setLoading({ ...loading, [courseId]: false });
    }
  }

  function addtocart(course) {
    dispatch(setCart(course));
    toast.success("Added to cart!");
  }

  function RemoveItem(courseId) {
    dispatch(RemoveId(courseId));
    toast.success("Removed from cart");
  }

 return (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12">
    <div className="w-11/12 max-w-7xl mx-auto">

      {/* Header Section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-gray-800/50 border border-gray-700/50 rounded-lg hover:bg-gray-700/50 transition"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-4xl font-bold text-white">
            Explore <span className="text-yellow-400">Courses</span>
          </h1>
        </div>
        <p className="text-gray-400 text-lg ml-14">
          Browse our collection of courses and start learning today
        </p>
      </div>

      {/* Stats Bar */}
      {courseData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

          {/* Total Courses */}
          <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Courses</p>
              <p className="text-white font-bold text-xl">{courseData.length}</p>
            </div>
          </div>

          {/* In Cart */}
          <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-400 text-sm">In Cart</p>
              <p className="text-white font-bold text-xl">{cartItem.length}</p>
            </div>
          </div>

          {/* Avg Price */}
          <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Avg Price</p>
              <p className="text-white font-bold text-xl">
                ₹{Math.round(courseData.reduce((acc, c) => acc + c.price, 0) / courseData.length)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseData.map((course, index) => {
          const isInCart = cartItem.find((x) => x._id === course._id);

          return (
            <div
              key={course._id || index}
              className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/10 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >

              {/* Thumbnail */}
              <div
                className="relative overflow-hidden"
                onClick={() => getDetails(course._id)}
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>

                {/* Price Badge */}
                <div className="absolute top-3 right-3 px-3 py-1 bg-yellow-500 text-black text-sm font-bold rounded-full shadow-lg">
                  ₹{course.price || 0}
                </div>

                {/* Cart Badge */}
                {isInCart && (
                  <div className="absolute top-3 left-3 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    In Cart
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h2
                  className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-yellow-400 transition cursor-pointer"
                  onClick={() => getDetails(course._id)}
                >
                  {course.courseName}
                </h2>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {course.courseDescription || 'No description available'}
                </p>

               
          

                {/* Action Buttons */}
                {accountType === "Student" && (
                  <div className="flex gap-2">
                    <button
                      className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-bold py-3 rounded-xl hover:from-yellow-400 hover:to-yellow-300 transition-all shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        addedd(course._id);
                      }}
                      disabled={loading[course._id]}
                    >
                      {loading[course._id] ? (
                        <>
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                          Buy Now
                        </>
                      )}
                    </button>

                    {/* Cart Buttons */}
                    {isInCart ? (
                      <button
                        className="px-4 py-3 bg-red-500/20 border border-red-500/30 text-red-400 font-semibold rounded-xl hover:bg-red-500/30 transition-all flex items-center gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          RemoveItem(course._id);
                        }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    ) : (
                      <button
                        className="px-4 py-3 bg-purple-500/20 border border-purple-500/30 text-purple-400 font-semibold rounded-xl hover:bg-purple-500/30 transition-all flex items-center gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          addtocart(course);
                        }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);
}

export default CourseComponent;
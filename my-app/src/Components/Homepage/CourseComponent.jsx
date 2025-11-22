import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Course } from "../../services/apis";
import { connectionApi } from "../../services/apiconnector";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setCart, RemoveId } from "../../Slice/Cart";

const CourseComponent = () => {
  const location = useLocation();
  const courseData = location.state?.courses || [];
  const navigate = useNavigate();
  const [loading, setLoading] = useState({});

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

        {/* Rest of the component remains the same */}
        {/* ... Course Grid, Buttons, Cart logic unchanged ... */}
      </div>
    </div>
  );
};

export default CourseComponent;

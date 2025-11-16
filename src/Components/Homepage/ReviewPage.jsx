import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { connectionApi } from "../../services/apiconnector";
import { Ratings } from "../../services/apis"; // your review API

const ReviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { courseId, courseName } = location.state;

  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");

  async function handleSubmit() {
    if (!review.trim()) return alert("Review cannot be empty");

    try {
      const response = await connectionApi(
        Ratings.CREATE_REVIEW, // your backend route
        "POST",
        null,
        null,
        { courseId: courseId, rating: rating, review: review }
      );

      if (response?.status === 200) {
        alert("Review submitted successfully");
        navigate("/dashboard");
      } else {
        alert(response?.message || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
      alert("Error submitting review");
    }
  }

  return (
    <div className="w-full min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center">

      <div className="w-full max-w-xl bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700">

        <h1 className="text-2xl font-bold text-yellow-400 mb-4">
          Give Rating & Review
        </h1>

        <p className="text-lg mb-3">
          Course: <span className="font-semibold">{courseName}</span>
        </p>

        {/* Rating Input */}
        <label className="font-semibold">Rating (1–5)</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full p-2 mt-2 mb-4 bg-slate-700 text-white rounded"
        >
          {[1, 2, 3, 4, 5].map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>

        {/* Review Text */}
        <label className="font-semibold">Write Your Review</label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full h-32 p-3 mt-2 bg-slate-700 text-white rounded border border-slate-600"
          placeholder="Write your detailed feedback..."
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full mt-5 bg-yellow-500 text-black py-2 rounded-lg font-semibold hover:bg-yellow-400"
        >
          Submit Review
        </button>
      </div>

    </div>
  );
};

export default ReviewPage;

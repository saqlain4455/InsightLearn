import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DashboardCourse = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state.details; // full course object
  const courseId = data._id;           // course id

  function handleReviewClick() {
    navigate("/review", {
      state: {
        courseId: courseId,
        courseName: data.courseName
      }
    });
  }

  return (
    <div className="w-full min-h-screen bg-slate-900 text-white p-6 flex flex-col gap-6">

      {/* Thumbnail + Basic Info */}
      <div className="flex gap-6">
        <img
          src={data.thumbnail}
          alt={data.courseName}
          className="w-72 h-44 rounded-lg object-cover border border-slate-700"
        />

        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">{data.courseName}</h1>
          <p className="text-slate-300">{data.courseDescription}</p>

          <p className="text-lg">
            <span className="font-semibold text-yellow-400">Price:</span>{" "}
            ₹{data.price}
          </p>

          <p className="text-lg">
            <span className="font-semibold text-yellow-400">Tag:</span>{" "}
            {data.tag?.join(", ")}
          </p>

          {/* REVIEW BUTTON */}
          <button
            onClick={handleReviewClick}
            className="mt-4 bg-yellow-500 text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-400"
          >
            Give Rating & Review
          </button>
        </div>
      </div>

      {/* What You Will Learn */}
      <div className="bg-slate-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">What You Will Learn</h2>
        <p className="text-slate-300">{data.whatYouWillLearn}</p>
      </div>

      {/* Instructor */}
      <div className="bg-slate-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Instructor</h2>
        <div className="flex items-center gap-4">
          <img
            src={data.instructor.image}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <p className="font-semibold text-lg">
              {data.instructor.firstName} {data.instructor.lastName}
            </p>
            <p className="text-slate-400">{data.instructor.email}</p>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="bg-slate-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Course Content</h2>

        {data.courseContent?.length === 0 && (
          <p className="text-slate-400">No sections added yet.</p>
        )}

        <div className="flex flex-col gap-4">
          {data.courseContent?.map((section) => (
            <div
              key={section._id}
              className="p-3 border border-slate-700 rounded-lg"
            >
              <h3 className="font-semibold text-lg">{section.sectionName}</h3>

              {section.subSection?.length > 0 ? (
                <ul className="ml-5 list-disc text-slate-300 mt-2">
                  {section.subSection.map((sub) => (
                    <li key={sub._id}>{sub.title}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-500 ml-2">No subsections.</p>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default DashboardCourse;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { connectionApi } from "../../services/apiconnector";
import { section } from "../../services/apis";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { Course } from "../../services/apis";

const Section = () => {
  const [sectionName, setSectionName] = useState("");
  console.log(sectionName)
  const [sections, setSections] = useState([]);
console.log(sections)
  const { token } = useSelector((state) => state.auth);
  const courseId = token.user.courses[token.user.courses.length - 1];
  console.log(courseId)
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
        {  courseId:courseId }
      );
      console.log(res)
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

      // Add newly created section to UI list
      setSections((prev) => [...prev, newSection]);
      setSectionName("");
    } catch (err) {
      console.log("Section create error", err);
    }
  }

  return (
    <div className="w-10/12 mx-auto py-10">

      <h2 className="text-2xl font-semibold mb-6">Course Sections</h2>

      {/* Add New Section */}
      <div className="flex gap-3 mb-8">
        <input
          value={sectionName}
          placeholder="Enter section name"
          className="border rounded-lg px-3 py-2 w-72"
          onChange={(e) => setSectionName(e.target.value)}
        />
        <div onClick={createSection}>
          <Button active={true}>Add Section</Button>
        </div>
      </div>

      {/* Section List */}
     <div className="space-y-5">
        {sections.map((sec) => (
          <div
            key={sec._id}
            className="p-4 border rounded-xl bg-gray-100 flex justify-between text-black"
          >
            
            <div>
              <h3 className="text-lg font-medium">{sec.sectionName}</h3>
            </div>

            <button
              className="px-3 py-2 bg-yellow-500 rounded-lg"
              onClick={() => navigate(`/subsection/${sec._id}`)}
            >
              Manage Subsections
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section;



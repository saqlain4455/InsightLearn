import { useState, useEffect } from "react";
import { connectionApi } from "../../services/apiconnector";
import { controller, Course } from "../../services/apis";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const CreateCourse = () => {
  // 1. Local form state
  const [formData, setFormData] = useState({
    courseName: "",
    courseDescription: "",
    whatYouWillLearn: "",
    price: "",
    tag: "",
    category: "",
    thumbnail: null,
  });
console.log(formData)
  // 2. Category list state
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
 
  // Handle input change
  const handleInput = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "thumbnail" ? files[0] : value,
    }));
  };

  const clicked = async () => {
    console.log("CLICKED FUNCTION CALLED");
    try {
      const fd = new FormData();

      fd.append("courseName", formData.courseName);
      fd.append("courseDescription", formData.courseDescription);
      fd.append("whatYouWillLearn", formData.whatYouWillLearn);
      fd.append("price", formData.price);
      fd.append("tag", formData.tag);
      fd.append("category", formData.category);

      if (formData.thumbnail) {
        fd.append("thumbnail", formData.thumbnail);
      }
      console.log(fd)
      const res = await connectionApi(
        Course.CREATE_COURSE,
        "POST",
        {  },
        null,
        fd
      );
      console.log(res)
      if (res) {
        console.log("course created succesfully",res)
        navigate("/section");
      }
    } catch (error) {
      console.error("Error while creating course:", error.response?.data || error.message);
    }
  };

  const getCategories = async () => {
    try {
      const data = await connectionApi(controller.CATEGORIES_API, "GET");
      setCategories(data.data.data);
    } catch (error) {
      console.log("Failed to fetch categories");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-[#EAB308] rounded-2xl shadow-lg p-8 w-full max-w-3xl space-y-6">
        <h2 className="text-2xl font-bold text-center mb-4">Create a Course</h2>

        {/* Course Name */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Course Name</label>
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            placeholder="Course Name"
            onChange={handleInput}
            className="px-4 py-2 rounded-lg text-black focus:ring-yellow-400 focus:ring-2"
          />
        </div>

        {/* Course Description */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Course Description</label>
          <textarea
            name="courseDescription"
            value={formData.courseDescription}
            placeholder="Course Description"
            onChange={handleInput}
            className="px-4 py-2 rounded-lg text-black focus:ring-yellow-400 focus:ring-2 resize-none"
          />
        </div>

        {/* Thumbnail */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Thumbnail Image</label>
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleInput}
            className="text-gray-200"
          />
        </div>

        {/* What You Will Learn */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">What You Will Learn</label>
          <textarea
            name="whatYouWillLearn"
            value={formData.whatYouWillLearn}
            placeholder="Details about the course"
            onChange={handleInput}
            className="px-4 py-2 rounded-lg text-black focus:ring-yellow-400 focus:ring-2 resize-none"
          />
        </div>

        {/* Price + Tag */}
        <div className="flex gap-4">
          <div className="flex flex-col flex-1">
            <label className="mb-1 font-semibold">Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              placeholder="Enter Price"
              onChange={handleInput}
              className="px-4 py-2 rounded-lg text-black focus:ring-yellow-400 focus:ring-2"
            />
          </div>

          <div className="flex flex-col flex-1">
            <label className="mb-1 font-semibold">Tag</label>
            <input
              type="text"
              name="tag"
              value={formData.tag}
              placeholder="Enter Tag"
              onChange={handleInput}
              className="px-4 py-2 rounded-lg text-black focus:ring-yellow-400 focus:ring-2"
            />
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Select Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInput}
            className="px-4 py-2 rounded-lg text-black focus:ring-yellow-400 focus:ring-2"
          >
            <option value="">-- Choose a Category --</option>
            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <div className="flex justify-center" onClick={clicked}>
          <Button active={true} >
            Create Course
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;

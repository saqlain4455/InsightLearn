import { useState, useEffect } from "react";
import { connectionApi } from "../../services/apiconnector";
import { controller, Course } from "../../services/apis";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { BookOpen, Upload, DollarSign, Tag, FolderOpen, FileText, Target } from "lucide-react";

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    courseName: "",
    courseDescription: "",
    whatYouWillLearn: "",
    price: "",
    tag: "",
    category: "",
    thumbnail: null,
  });
  console.log(formData);

  const [categories, setCategories] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value, files } = e.target;

    if (name === "thumbnail" && files[0]) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      // Create preview URL
      const url = URL.createObjectURL(files[0]);
      setPreviewUrl(url);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
      console.log(fd);
      const res = await connectionApi(Course.CREATE_COURSE, "POST", {}, null, fd);
      console.log(res);
      if (res) {
        console.log("course created successfully", res);
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

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full 
                          bg-gradient-to-r from-sky-500 to-blue-500 mb-4 shadow-lg shadow-sky-500/50">
            <BookOpen size={32} className="text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-2">Create a New Course</h2>
          <p className="text-slate-400">Fill in the details to get started with your new course</p>
        </div>

        {/* Form Container */}
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl shadow-2xl p-8 border border-slate-700 space-y-6">
          
          {/* Course Name */}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-slate-200 flex items-center gap-2">
              <FileText size={18} className="text-sky-400" />
              Course Name
            </label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              placeholder="Enter course name"
              onChange={handleInput}
              className="px-4 py-3 rounded-lg bg-slate-900 text-white border border-slate-700 
                         focus:ring-2 focus:ring-sky-500 focus:border-transparent 
                         transition-all duration-200 placeholder-slate-500"
            />
          </div>

          {/* Course Description */}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-slate-200 flex items-center gap-2">
              <FileText size={18} className="text-sky-400" />
              Course Description
            </label>
            <textarea
              name="courseDescription"
              value={formData.courseDescription}
              placeholder="Describe your course in detail"
              onChange={handleInput}
              rows={4}
              className="px-4 py-3 rounded-lg bg-slate-900 text-white border border-slate-700 
                         focus:ring-2 focus:ring-sky-500 focus:border-transparent 
                         transition-all duration-200 resize-none placeholder-slate-500"
            />
          </div>

          {/* Thumbnail Upload */}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-slate-200 flex items-center gap-2">
              <Upload size={18} className="text-sky-400" />
              Course Thumbnail
            </label>
            
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <label className="flex-1 cursor-pointer">
                <div className="px-4 py-3 rounded-lg bg-slate-900 border-2 border-dashed 
                                border-slate-700 hover:border-sky-500 transition-all duration-200 
                                text-center">
                  <Upload className="mx-auto text-slate-500 mb-2" size={24} />
                  <p className="text-sm text-slate-400">
                    {formData.thumbnail ? formData.thumbnail.name : "Click to upload image"}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 5MB</p>
                </div>
                <input
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleInput}
                  className="hidden"
                />
              </label>

              {/* Preview */}
              {previewUrl && (
                <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden border-2 
                                border-slate-700 shadow-lg">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* What You Will Learn */}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-slate-200 flex items-center gap-2">
              <Target size={18} className="text-sky-400" />
              What You Will Learn
            </label>
            <textarea
              name="whatYouWillLearn"
              value={formData.whatYouWillLearn}
              placeholder="Key learning outcomes and skills students will gain"
              onChange={handleInput}
              rows={3}
              className="px-4 py-3 rounded-lg bg-slate-900 text-white border border-slate-700 
                         focus:ring-2 focus:ring-sky-500 focus:border-transparent 
                         transition-all duration-200 resize-none placeholder-slate-500"
            />
          </div>

          {/* Price + Tag Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-slate-200 flex items-center gap-2">
                <DollarSign size={18} className="text-sky-400" />
                Price
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                placeholder="₹ 0"
                onChange={handleInput}
                className="px-4 py-3 rounded-lg bg-slate-900 text-white border border-slate-700 
                           focus:ring-2 focus:ring-sky-500 focus:border-transparent 
                           transition-all duration-200 placeholder-slate-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-slate-200 flex items-center gap-2">
                <Tag size={18} className="text-sky-400" />
                Tag
              </label>
              <input
                type="text"
                name="tag"
                value={formData.tag}
                placeholder="e.g., Beginner, Advanced"
                onChange={handleInput}
                className="px-4 py-3 rounded-lg bg-slate-900 text-white border border-slate-700 
                           focus:ring-2 focus:ring-sky-500 focus:border-transparent 
                           transition-all duration-200 placeholder-slate-500"
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-slate-200 flex items-center gap-2">
              <FolderOpen size={18} className="text-sky-400" />
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInput}
              className="px-4 py-3 rounded-lg bg-slate-900 text-white border border-slate-700 
                         focus:ring-2 focus:ring-sky-500 focus:border-transparent 
                         transition-all duration-200 cursor-pointer"
            >
              <option value="" className="bg-slate-900">-- Choose a Category --</option>
              {categories.map((item) => (
                <option key={item._id} value={item._id} className="bg-slate-900">
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <div onClick={clicked}>
              <Button active={true}>
                Create Course
              </Button>
            </div>
          </div>
        </div>

        {/* Helper Text */}
        <p className="text-center text-slate-500 text-sm mt-6">
          Make sure all required fields are filled before creating the course
        </p>
      </div>
    </div>
  );
};

export default CreateCourse;
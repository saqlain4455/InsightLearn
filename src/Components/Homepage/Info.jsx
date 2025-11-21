import React, { useState } from 'react';
import image from "../../assets/signup.png";
import image2 from "../../assets/frame.png";
import { setUser } from '../../Slice/user';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import toast from 'react-hot-toast';
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";

const Info = () => {
  const [userType, setUserType] = useState("Student");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function input(e) {
    const { value, name } = e.target;

    if (name === "accountType") setUserType(value);

    const newValue = {
      [name]: value
    };

    dispatch(setUser(newValue));
  }

  function clicked() {
    if (!user.email) {
      toast.error("Enter the details");
    } else {
      navigate("/verifyotp");
    }
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-11/12 max-w-5xl flex flex-col md:flex-row justify-evenly items-center text-white shadow-lg rounded-lg p-6 gap-6">

        <div className="flex-1 flex flex-col gap-4 w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={input}
              className={`px-4 py-2 rounded ${userType === "Student" ? "bg-[#EAB308] text-white" : "bg-slate-550"}`}
              value="Student"
              name="accountType"
            >
              Student
            </button>
            <button
              onClick={input}
              className={`px-4 py-2 rounded ${userType === "Instructer" ? "bg-[#EAB308] text-white" : "bg-slate-550"}`}
              name="accountType"
              value="Instructer"
            >
              Instructor
            </button>
          </div>

          <input
            type="text"
            placeholder="First Name"
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            onChange={input}
            name="firstName"
          />

          <input
            type="text"
            placeholder="Last Name"
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            onChange={input}
            name="lastName"
          />

          <input
            type="email"
            placeholder="Email"
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            onChange={input}
            name="email"
          />

          {/* PASSWORD */}
          <div className="relative w-full">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              onChange={input}
              name="password"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-600"
            >
              {showPass ? <RxEyeOpen /> : <GoEyeClosed />}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative w-full">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              onChange={input}
              name="confirmPassword"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-600"
            >
              {showConfirm ? <RxEyeOpen /> : <GoEyeClosed />}
            </button>
          </div>

          {userType === "Student" ? (
            <div className="p-3 bg-blue-50 rounded-md text-center text-blue-800">
              You are signing up as a Student
            </div>
          ) : (
            <div className="p-3 bg-green-50 rounded-md text-center text-green-800">
              You are signing up as an Instructor
            </div>
          )}

          <div onClick={clicked}>
            <Button active={true}>Sign Up</Button>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex justify-center relative">
          <img src={image} className="w-full max-w-md rounded-lg absolute left-[7%] bottom-[5%]" />
          <img src={image2} className="w-full max-w-md rounded-lg" />
        </div>

      </div>
    </div>
  );
};

export default Info;

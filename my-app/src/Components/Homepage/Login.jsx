import React, { useState } from 'react'
import image from "../../assets/login.png"
import image2 from "../../assets/frame.png"
import CTAButton from "../Homepage/Button.jsx"
import { connectionApi } from '../../services/apiconnector.js'
import { Auth } from '../../services/apis.js'
import { useNavigate } from 'react-router-dom'
import { setToken } from '../../Slice/auth.js'
import { useDispatch } from "react-redux"
import toast from 'react-hot-toast';
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";

const Login = () => {
  const [state, setState] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  function inputFunc(e){
    const { name, value } = e.target
    setState(prev => ({ ...prev, [name]: value }))
  }

  const clicked = async () => {
    try {
      if(!state.email || !state.password){
        toast.error("Please enter your Email and Password")
        return
      }
      const data = await connectionApi(Auth.LOGIN, "POST", null, null, { email: state.email, password: state.password });
      if(data){
        dispatch(setToken(data.data))
        navigate("/dashboard")
      } else {
        toast.error("Something went wrong at login")
      }
    } catch(error){
      console.log("Error during login")
      toast.error("Login failed")
    }
  }

  return (
    <div className='w-full h-screen flex flex-col justify-center '>
      <div className='w-11/12 flex flex-col md:flex-row mx-auto max-w-maxContent gap-5 justify-evenly items-center'>
        
        {/* Form */}
        <div className='flex flex-col gap-3 text-xl items-center text-black w-full md:w-auto'>
          <label className='font-bold w-full text-left text-white'>Email</label>
          <input
            type="email"
            name='email'
            placeholder='Enter Your Email'
            className='rounded-md px-3 py-1 w-full md:w-80 text-richblack-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
            onChange={inputFunc}
          />

          <label className='font-bold w-full text-left mt-2 text-white'>Password</label>
          <div className='relative w-full md:w-80'>
            <input
              type={showPassword ? "text" : "password"}
              name='password'
              placeholder='Enter Your Password'
              className='rounded-md px-3 py-1 w-full text-richblack-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
              onChange={inputFunc}
            />
            <button
              type="button"
              className='absolute right-2 top-2 text-xl text-gray-600'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <RxEyeOpen /> : <GoEyeClosed />}
            </button>
          </div>

          <div className='mt-4 flex flex-row w-full items-center' onClick={clicked}>
            <CTAButton active={true}>Login</CTAButton>
          </div>
        </div>

        {/* Images */}
        <div className='relative md:w-auto flex justify-center'>
          <img src={image} className='w-[400px] border absolute left-[5%] bottom-[5%]' />
          <img src={image2} className='w-[400px] border' />
        </div>
      </div>
    </div>
  )
}

export default Login;


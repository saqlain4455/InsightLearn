import React, { useState } from 'react'
import image from "../../assets/login.png"
import image2 from "../../assets/frame.png"
import CTAButton from "../Homepage/Button.jsx"
import { connectionApi } from '../../services/apiconnector.js'
import { Auth } from '../../services/apis.js'
import { useNavigate } from 'react-router-dom'
import { setToken } from '../../Slice/auth.js'
import {useDispatch} from "react-redux"
import { BeatLoader } from "react-spinners";
import toast from 'react-hot-toast';
const Login = () => {
const [loading,setLoading] =useState(false)
  const [state,setState]=useState({
       
    "email":null,
    "password":null
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  

 function inputFunc(e){
  const {name,value}=e.target
  setState((prevalue)=>{
     return {
      ...prevalue,[name]:value
    }
  })
  console.log(state)
 }

const clicked = async()=>{
    try{
      if(state.email===null||state.password==null){
       toast.error("Please enter your Email and Password")
      }else{
         setLoading(true)
      }
      
      const data= await connectionApi(Auth.LOGIN,
        "POST",
        null,
        null,
        {email:state.email,
        password:state.password
        }
        
      )
      if(data){
        setLoading(false)
        dispatch(setToken(data.data))
        console.log("success login",data)
         navigate("/dashboard")
      }else{
        navigate("/Login")
        console.log("something went wrong at login")
      }
     
    }catch(error){
      console.log("somthing went wrong while login",error)
    }
}
  return (
  
      loading?(
        <div className='w-11/12  lg:h-[600px] mx-auto  flex flex-row items-center  justify-center  '>
          <BeatLoader
  color="#EAB308"
  margin={3}
  size={15}
/>

        </div>
      ):(
        <div className='w-full h-screen flex flex-col justify-center '>
  <div className='w-11/12 flex flex-col md:flex-row mx-auto max-w-maxContent gap-5 justify-evenly items-center'>
    
    {/* Form */}
    <div className='flex flex-col  gap-3 text-xl items-center text-black w-full md:w-auto'>
      
      <label className='font-bold w-full text-left text-white'>Email</label>
      <input
        type="email"
        name='email'
        placeholder='Enter Your Email'
        className='rounded-md px-3 py-1 w-full md:w-80 text-richblack-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
        onChange={inputFunc}

      />

      <label className='font-bold w-full text-left mt-2 text-white'>Password</label>
      <input
        type='password'
        name='password'
        className='rounded-md px-3 py-1 w-full md:w-80 text-richblack-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
        placeholder='Enter Your Password'
        onChange={inputFunc}
      />

      <div className='mt-4 flex flex-row  w-full items-center' onClick={clicked}>
        <CTAButton active={true}>
          Login
        </CTAButton>
      </div>
    </div>

    {/* Images */}
    <div className='relative  md:w-auto flex justify-center'>
      <img src={image} className='w-[400px] border absolute left-[5%] bottom-[5%]' />
      <img src={image2} className='w-[400px] border' />
    </div>

  </div>
</div>
      )
    
   
   

  )
}

export default Login

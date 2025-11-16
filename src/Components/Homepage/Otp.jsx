import React, { useState } from 'react'
import Button from './Button'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../Slice/user'
import { Auth } from '../../services/apis'
import { connectionApi } from '../../services/apiconnector'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const Otp = () => {
const {user} = useSelector((state)=>state.user)
const dispath = useDispatch()
const navigate=useNavigate()
function getInput(e){
    const {name,value} =e.target
    const newValue ={
        [name]:value
    }
       dispath( setUser(newValue))
}

console.log(user)
   async function clicked() {
  try {
    const data = await connectionApi(
      Auth.SIGN_UP,
      "POST",
      null,
      null,
      {
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        confirmPassword: user.confirmPassword,
        email: user.email,
        accountType: user.accountType,
        otp: user.otp,
      }
    );
    if(data){
      toast.success(" otp verification is  successfully")
       console.log("Signup response:", data);
    navigate("/login")

    }
   
  } catch (error) {
    console.log("Error during signup:", error);
  }
}



  return (
    <div className='w-full   flex flex-col justify-center  '>
    <div className='w-11/12 mx-auto max-w-[1020px] flex flex-col  font-bold text-white  h-[500px] items-center justify-center gap-5 text-xl'>
      <h1 className='text-2xl'>Verify Your Otp Here </h1>

      <input 
      type='text'
      placeholder='Enter your Otp here'
      name='otp'
      onChange={getInput}
      />
      <div onClick={clicked}>
        <Button  active={true}>
            Next
        </Button>
        </div>
    </div>
    </div>
  )
}

export default Otp

import React ,{useState}from 'react'
import image from "../../assets/signup.png"
import image2 from "../../assets/frame.png"
import { setUser } from '../../Slice/user';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from './Button';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Info = () => {
  



  const [userType, setUserType] = useState("Student"); 
  const  {user}=useSelector((state)=> state.user)
      console.log(user)
      const dispath=useDispatch()
  const navigate =useNavigate()

      
    function input(e){
      const {value,name}=e.target
      name==="accountType"&&setUserType(value)
      const newValue={
        [name]:value
      }
      dispath(setUser(newValue))
       
    }

    function clicked(){
        if(!user.email){
          toast.error("Enter the details")
        }else{
          navigate("/verifyotp")
        }
    }
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-11/12 max-w-5xl flex flex-col md:flex-row justify-evenly items-center text-white  shadow-lg rounded-lg p-6 gap-6">
        
        {/* Form */}
        <div className="flex-1 flex flex-col gap-4 w-full">
          <h2 className="text-2xl font-bold mb-4 text-center tk">Sign Up</h2>

          {/* User type toggle */}
          <div className="flex justify-center gap-4 mb-4 ">
            <button
              onClick={ input
                
              }
              className={`px-4 py-2 rounded ${
                userType === "Student" ? "bg-[#EAB308] text-white" : "bg-slate-550"
              }`}
            value="Student"
             name='accountType'
            >
              Student
            </button>
            <button
              onClick={input}
              className={`px-4 py-2 rounded ${
                userType === "Instructer" ? "bg-[#EAB308] text-white" : "bg-slate-550"
              }`}
              name='accountType'
              value="Instructer"
            >
              Instructor
            </button>
          </div>

          {/* Form fields */}
          
          <input
            type="text"
            placeholder="First Name"
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black "
            onChange={input}     
             name='firstName'
            />
          <input
            type="text"
            placeholder="Last Name"
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            onChange={input}
            name='lastName'
          />
          <input
            type="email"
            placeholder="Email"
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            onChange={input}
            name="email"

          />
          <input
            type="password"
            placeholder="Password"
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            onChange={input}
            name="password"
          />
           <input
            type="password"
            placeholder="confirm Password"
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            onChange={input}
            name="confirmPassword"
          />

          {/* Conditional div based on user type */}
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
            <Button active={true} >
            sign up
            </Button>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 flex justify-center relative">
          <img src={image} className="w-full max-w-md rounded-lg absolute left-[7%]  bottom-[5%]" />
          <img src={image2} className='w-full max-w-md rounded-lg' />
        </div>
      </div>
    </div>
  );
};



export default Info

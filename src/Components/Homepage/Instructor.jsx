import React from 'react'
import image from "../../assets/image-3.jpg"
import CTAButton from "../Homepage/Button.jsx"
import { TiArrowRightThick } from "react-icons/ti";

const Instructor = () => {
  return (
    <div>
      <div className=' w-11/12 flex flex-row mx-auto max-w-maxContent  justify-evenly  mt-20 '>

    <div className='w-[40%] '>
    <img  className='w-[300px]'   src={image} />
    </div>


    <div className='flex flex-col   w-[40%] text-white justify-evenly  items-center my-20 gap-9 '>
        <h1 className='font-bold text-4xl'>
        Become an  <span className=' text-sky-500'> Instructor</span>
        </h1>
        <p>
        Join our community of expert instructors and share your knowledge with learners worldwide. Create engaging courses, inspire students, and make a difference in their lives while earning income doing what you love.
        </p>
    <div>
        <CTAButton active={true} linkto={"/signup"} >
            <div className='flex flex-row items-center gap-2'>
                Start teaching today
                <TiArrowRightThick  />
            </div>
        </CTAButton>
    </div>
    </div>
      </div>
    </div>
  )
}

export default Instructor

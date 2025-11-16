import React from 'react'
import image from "../../assets/image-2.jpg"
import CTAButton from "../Homepage/Button.jsx"
const LearningLanguage = () => {
  return (
    <div>
      <div className='flex flex-col  justify-between  items-center  gap-4 mt-20      '>
        <div className='    '>
            <h1 className='font-bold text-4xl text-center'>
                Your <span className='text-sky-500'>sniff knife</span> for learning any language
            </h1>
           
        </div>
        <div>
             <p>
                using spin maiking multiple languages  easy with 20+ realistic voiceover progress tracking schedule and more.
            </p>
        </div>

    <div className='w-[500px]'>
      <img src={image} />
    </div>

    <div>
    <CTAButton  active={true} liinkto={"/signup"}>
          Learn more  
        </CTAButton>
    </div>
        
        
      </div>

    </div>
  )
}

export default LearningLanguage


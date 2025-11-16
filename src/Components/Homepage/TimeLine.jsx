import React from 'react'
import { HiAcademicCap } from "react-icons/hi2";
import image3 from "../../assets/image-2.jpg"
import { IoDiamondOutline } from "react-icons/io5";
import { SlBadge } from "react-icons/sl";
import { FaFileCode } from "react-icons/fa";
import image4 from "../../assets/frame.png"

const data =[{
    model:<HiAcademicCap />,
    Heading:"Leadership",
    Description:"Learn from industry experts who are passionate about teaching and mentoring "

},{
    model:<IoDiamondOutline />,
    Heading:"Leadership",
    Description:"Learn from industry experts who are passionate about teaching and mentoring "

},{
    model:<SlBadge />,
    Heading:"Leadership",
    Description:"Learn from industry experts who are passionate about teaching and mentoring "

},{
    model:<FaFileCode />,
    Heading:"Leadership",
    Description:"Learn from industry experts who are passionate about teaching and mentoring "

},
]

const TimeLine = () => {
  return (
    <div >
      <div className='flex flex-row justify-evenly  border '>
    <div className='flex flex-col justify-between w-[40%]'>
        {
            data.map((item,index)=>{
               return (
                <div className='flex flex-row gap-7 items-center ' key={index}>
                    <div className=' border  '> 
                        {item.model}
                        </div>
                    <div className='flex flex-col gap-2 justify-center mt-10 '>
                    <h3 className='font-bold'>
                        {item.Heading}
                    </h3>
                <p>
                    {item.Description}
                </p>
                    </div>

                </div>

               )
            })
        }
    </div>

        <div className='w-[550px]  relative  '>
            
            <img  className='h-fit'  src={image4}  />
            <img className='absolute top-[70px]' src={image3}  />
            

            <div className='flex flex-row absolute px-10  py-[40px] text-white uppercase font-bold  border  justify-between   bg-[#009973]  left-[40px] bottom-[-50px] gap-5'>
            <div className='flex flex-row  gap-4 items-center'>
                <p>
                10
                </p>
                <p>
            years of experience 
                </p>
               
            </div>

            <div className='flex gap-3 items-center'>
            <p>
                250
            </p>
            <p>
                Types of Courses
            </p>
            </div>
            </div>
        </div>

      </div>
    </div>
  )
}

export default TimeLine

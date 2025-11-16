import React, { useState } from 'react'
import {info} from "../../data/Info.js"
import Cards from './Cards.jsx'


  const titles=[
    "free",
    "new to code",
    "beginner",
    "intermediate"
    
]

const SelectSection = () => {
    const [tag,setTag] = useState(titles[0])
const [courses,setCourses] = useState(info[0].courses)
const [currentCourse,setCurrentCourse] = useState(info[0].courses[0].heading)

const setUpCourse =(value)=>{
    setTag(value)
    const result =(info.filter((item)=> item.tag===value))
    setCourses(result[0].courses)
    setCurrentCourse(result[0].courses[0].heading)

}
  return (
    <div >
        <div className='flex flex-row  w-full justify-center   ' >

       
     {
        titles.map((item,index)=>{
            return (
                <div className={`bg-${tag===item ? "sky-500":"gray-200"}  flex flex-row justify-center text-white px-3 py-3  cursor-pointer lg:w-[150px]  `}
                onClick={()=>setUpCourse(item)}
                key={index}>
                    {item}

                </div>
            )
        })
     }

    
     </div>
       <div className='lg:h-[70px]'></div>
      <div className='w-full ' >
         <Cards 
         coursees={courses}
         currentCourse={currentCourse}
         />
     </div>
    </div>
  )
}

export default SelectSection

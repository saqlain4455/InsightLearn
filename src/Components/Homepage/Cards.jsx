import React from 'react'

const Cards = ({coursees,currentCourse}) => {
  return (
    <div className='flex flex-row  justify-evenly w-full gap-5 '>
      {
        coursees.map((item,index)=>{
            return(
                <div className={`flex flex-col ${currentCourse===item.heading? "bg-black":"bg-brown " }  lg:h-[250px] justify-evenly text-center  items-center   w-full  text-white`}>
                    <h2 className='text-2xl font-bold text-[#EAB308]'>{item.heading}</h2>
                    <p>{item.description}</p>
                <p> Lessons: {item.lessons}</p>
                </div>

            )
        })

        }
      
    </div>
  )
}

export default Cards

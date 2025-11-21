import React from 'react'
import { HiAcademicCap } from "react-icons/hi2";
import image3 from "../../assets/image-2.jpg"
import { IoDiamondOutline } from "react-icons/io5";
import { SlBadge } from "react-icons/sl";
import { FaFileCode } from "react-icons/fa";
import image4 from "../../assets/frame.png"

const data = [
{
model: <HiAcademicCap />,
Heading: "Leadership",
Description: "Develop strong decision-making and guide teams with confidence."
},
{
model: <IoDiamondOutline />,
Heading: "Innovation",
Description: "Explore creative ideas and build solutions that stand out."
},
{
model: <SlBadge />,
Heading: "Excellence",
Description: "Achieve high standards through dedication and consistent growth."
},
{
model: <FaFileCode />,
Heading: "Technical Skills",
Description: "Gain hands-on coding experience with real-world projects."
},
];

const TimeLine = () => {
return (
<div className="w-full px-4 py-10">
<div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-10">

    {/* LEFT CONTENT */}
    <div className="flex flex-col w-full lg:w-1/2 gap-10">
      {data.map((item, index) => (
        <div key={index} className="flex flex-row gap-5 items-start">
          <div className="text-3xl p-3 border rounded-full">
            {item.model}
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">{item.Heading}</h3>
            <p className="text-sm">{item.Description}</p>
          </div>
        </div>
      ))}
    </div>

    {/* RIGHT IMAGE SECTION */}
    <div className="relative w-full lg:w-[550px] flex justify-center">
      <img className="w-full max-w-[550px]" src={image4} />

      <img
        className="absolute top-[40px] w-[70%] left-1/2 -translate-x-1/2"
        src={image3}
      />

      <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 bg-[#009973] 
        text-white px-5 py-4 rounded-md w-[90%] md:w-[85%]
        flex flex-col md:flex-row justify-between gap-5 font-bold uppercase">

        <div className="flex flex-row items-center gap-3">
          <p className="text-xl">10</p>
          <p className="text-sm md:text-base">Years of Experience</p>
        </div>

        <div className="flex flex-row items-center gap-3">
          <p className="text-xl">250</p>
          <p className="text-sm md:text-base">Types of Courses</p>
        </div>

      </div>
    </div>

  </div>
</div>


)
}

export default TimeLine
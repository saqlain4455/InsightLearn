import React, { useState } from 'react'
import {info} from "../../data/Info.js"
import Cards from './Cards.jsx'


  const titles=[
    "free",
    "new to code",
    "beginner as Dev",
    "intermediate" 
]

const SelectSection = () => {
  const [tag, setTag] = useState(titles[0]);
  const [courses, setCourses] = useState(info[0].courses);
  const [currentCourse, setCurrentCourse] = useState(info[0].courses[0].heading);

  const setUpCourse = (value) => {
    setTag(value);
    const result = info.filter((item) => item.tag === value);
    setCourses(result[0].courses);
    setCurrentCourse(result[0].courses[0].heading);
  };

  return (
    <div className=' bg-gradient-to-b from-slate-950 to-slate-900  '>
      <div className='max-w-7xl mx-auto'>
        {/* Tab Navigation */}
        <div className='flex flex-wrap justify-center gap-3 mb-12 px-4'>
          {titles.map((item, index) => {
            const isActive = tag === item;
            return (
              <button
                key={index}
                onClick={() => setUpCourse(item)}
                className={`
                  px-6 py-3 rounded-lg font-semibold capitalize
                  transition-all duration-300 transform
                  ${isActive
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/50 scale-105'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:scale-105'
                  }
                  min-w-[140px] text-center
                `}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Course Cards */}
        <Cards coursees={courses} currentCourse={currentCourse} />
      </div>
    </div>
  );
};

export default SelectSection;
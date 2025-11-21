import react from "react"
const Cards = ({ coursees, currentCourse }) => {
  return (
    <div className='flex flex-row flex-wrap justify-center gap-6 px-4 lg:px-8'>
      {coursees.map((item, index) => {
        const isActive = currentCourse === item.heading;
        return (
          <div
            key={index}
            className={`
              flex flex-col justify-between p-6 rounded-xl shadow-lg
              transition-all duration-300 hover:scale-105 hover:shadow-2xl
              ${isActive 
                ? 'bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-yellow-500' 
                : 'bg-gradient-to-br from-slate-800 to-slate-700 border-2 border-transparent hover:border-slate-600'
              }
              min-h-[280px] flex-1 min-w-[280px] max-w-[350px]
            `}
          >
            <div>
              <h2 className='text-2xl font-bold text-yellow-400 mb-4'>
                {item.heading}
              </h2>
              <p className='text-gray-300 text-base leading-relaxed mb-4'>
                {item.description}
              </p>
            </div>
            <div className='flex items-center gap-2 text-sm'>
              <span className='bg-yellow-500 text-slate-900 font-semibold px-3 py-1 rounded-full'>
                {item.lessons} Lessons
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Cards 
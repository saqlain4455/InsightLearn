import React from 'react'
import CTAButton from "./Button.jsx"
import { TiArrowRightThick } from "react-icons/ti";
import {TypeAnimation} from "react-type-animation"

const CodeBlocks = ({
    heading,
    subHeading,
    postion,
    cta1,
    cta2,
    codeblock,
    codecolor
}) => {
  return (
    <div
      className={`flex flex-col md:flex-${postion} my-20 
                  justify-between w-full md:w-[900px] gap-6 h-fit`}
    >

      {/* LEFT SECTION */}
      <div className="flex flex-col justify-evenly w-full md:w-1/2">
        {heading}

        <div className="mt-3">
          {subHeading}
        </div>

        <div className="flex flex-row px-3 py-2 gap-3 justify-center">
          <CTAButton active={cta1.active} linkto={cta1.linkto} >
            <div className='flex flex-row gap-2 items-center'>
              {cta1.text}
              <TiArrowRightThick />
            </div>
          </CTAButton>

          <CTAButton active={cta2.active} linkto={cta2.linkto}>
            {cta2.text}
          </CTAButton>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-row w-full md:w-1/2 h-fit py-10 shrink-0">

        {/* Line numbers */}
        <div className="w-[15%] flex flex-col text-slate-400">
          {Array.from({ length: 11 }, (_, i) => (
            <p key={i}>{i + 1}</p>
          ))}
        </div>

        {/* Code animation block */}
        <div className={`flex flex-col ${codecolor} w-[85%] font-mono text-sm sm:text-base`}>
          <TypeAnimation
            sequence={[codeblock, 500, " "]}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block"
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>

    </div>
  )
}

export default CodeBlocks

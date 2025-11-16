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
    <div className={`flex flex-${postion} my-20 justify-between  w-[100%] lg:w-[900px]  gap-3  h-fit    `}>
      <div className='flex flex-col  justify-evenly w-[50%]   '>
        {heading}
        <div>
            {subHeading}
        </div>
        <div className='flex flex-row px-3 py-2 gap-3 justify-center'>
            <CTAButton active={cta1.active} linkto={cta1.linkto} >
                <div className='flex flex-row  gap-2 items-center '>
                    {cta1.text}
                    <TiArrowRightThick />
                </div>
            </CTAButton>

            <CTAButton active={cta2.active} linkto={cta2.linkto} >
                {cta2.text}
            </CTAButton>
        </div>
      </div>
    {/*section-2 */}
      <div className='flex flex-row w-[50%] h-fit py-10   '>
        <div className='w-[10%] flex flex-col'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
        </div>
        <div className={`flex flex-col ${codecolor} w-[90%] font-mono`}>
            <TypeAnimation 
            sequence={[codeblock, 500," "]}
            repeat={Infinity}
            style={
              {
                whiteSpace:"pre-line",
                display:"block"
              }
            }
            omitDeletionAnimation={true}
            />
        </div>
      </div>
    </div>
  )
}

export default CodeBlocks

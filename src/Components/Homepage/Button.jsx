import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children,linkto,active}) => {
  return (
    <Link  to={linkto}>

    <div className={`px-2 py-2  rounded tranistion-all duration-300 hover:scale-110   cursor-pointer
        ${active ? 'bg-[#EAB308] text-white ': 'bg-gray-200 text-black hover:bg-gray-300 '}
        ` }>
      {children}
    </div>
    </Link >
  )
}

export default Button

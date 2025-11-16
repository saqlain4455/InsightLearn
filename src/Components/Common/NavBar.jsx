import React, { useEffect, useState } from 'react'
import { navLinks } from '../../data/Info'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowDropdown } from "react-icons/io";
import { useSelector } from 'react-redux';
import { connectionApi } from '../../services/apiconnector';
import { controller } from '../../services/apis';

import CTAButton from "../Homepage/Button.jsx"
import { useDispatch } from 'react-redux';
import { RemoveToken } from '../../Slice/auth.js';
import { BeatLoader } from "react-spinners";

const NavBar = () => {

    const [name,setName] = useState(navLinks[0])
    const  {token}=useSelector((state)=> state.auth)
    console.log(token)
    const {user} = useSelector((state)=>state.auth.token)
    console.log(user)
    const  {cart}=useSelector((state)=> state.cart)
    const [subLinks,setSubLinks]= useState([])
    const navigate= useNavigate()
    const dispatch= useDispatch()
    const [loading,setLoading]=useState(false)
    const [course,setCourse]=useState([])
    
        const changeName= (value)=>{
            setName(value)
           
        }
         const getCategory = async()=>{
                        try{
                            const data= await connectionApi( controller.CATEGORIES_API,"GET")
                            setSubLinks(data.data.data)
                            console.log(data.data.data)
                        }catch(error){
                            console.log("error ocured while fecthiong the data ")
            
                        }
                    }

                    
        
        useEffect(()=>{
            getCategory()
            
        },[])

        function clicled2(){
           
            const  value =  dispatch(RemoveToken())
            localStorage.removeItem("token")
            navigate("/login")
        }

       async  function clicked3 (e){
        try{
                 const {value}=e.target
                 console.log(value)
            const req= await connectionApi(controller.GETDETAILSBYID,
                                            "POST",
                                            null,
                                            null,
                                            {categoryId:value}
            )

            console.log("courses details:",req)
            setCourse(req)
    navigate("/courseDetails", {
  state: {
    category: req.data.data,       
    courses: req.data.data.course  
  }
});
        }catch(error){
            console.log("error occured while getting the category",error)
        }
       }
  return (
         loading?
            <div className='w-11/12  lg:h-[600px] mx-auto  flex flex-row items-center  justify-center  '>
              <BeatLoader
      color="#EAB308"
      margin={3}
      size={15}
    />
    </div>:
    
    <div className='h=[30px]  border-b mt-5'>
    <div className='w-11/12 max-w-maxContent mx-auto flex flex-row justify-evenly items-center text-white   gap-4   lg:ml-[150px]'>
     <div  className=' text-xl   '>
        <h3>Logo</h3>
     </div>

        <div className='flex flex-row gap-6 items-center text-[18px]  justify-center font-semibold  '>
            {

            
            navLinks.map((link,index)=>{
                return  ( <Link className={`${link.name===name?"text-yellow-400 text-black" :"text-sky-300"}`} onClick={()=>changeName(link.name)} key={index} to={link.link}>
             {link.name === "Catalog" ? (
  <div className="flex flex-row items-center gap-1 relative group">
  {link.name} <IoIosArrowDropdown />

  {/* Diamond pointer */}
  <div className="absolute top-full left-[35px] w-3 h-3 bg-white rotate-45 opacity-0 invisible 
    group-hover:opacity-100 group-hover:visible transition-all duration-200 delay-300 shadow-md"></div>

  {/* Dropdown box */}
  <div className="absolute top-[calc(100%+6px)] left-0 opacity-0 invisible 
    group-hover:opacity-100 group-hover:visible transition-all duration-200 delay-300 
    bg-white lg:h-[50px] lg:w-[200px] shadow-md text-black text-[15px] flex  flex-col  justify-center">

        {
            subLinks.map((link)=>(
                <div className='flex flex-col text-black'>
                    <button onClick={clicked3} value={link._id} className='text-black'>
                        {link.name}
                    </button>
                    
                </div>
                
                
            ))
        }
    
  </div>
</div>


) : (
  <div>{link.name}</div>
)}

 

                   
                </Link> )
            })}
        </div>

            <div className='flex flex-row gap-3 items-center mb-3'>
               

               {
                token===null &&(
                    <div className=' font-bold'>
                     <CTAButton active={true} linkto={"/Login"} 
                    >
                        Login
                    </CTAButton>
                    </div>
                )
               }
               {
                token===null &&(
                    <div className=' font-bold'>
                        
                    <CTAButton active={false} linkto={"/signup"} 
                    >
                        SignUp
                    </CTAButton>
                    
                    </div>
                )
               }
                {token&&(
                    <div onClick={clicled2}>
                        <CTAButton active={true} >
                            Logout
                        </CTAButton>
                        </div>
                )
                
                }

                {
                    token&&(
                        <div >
                            <img  className="w-10 rounded-full border " src={token.user.image} />
                        </div>
                    )
                }
                {
                    user.accountType==="Student"&&(
                        <div >
                            <Link to={"/cart"}>
                            add to cart 
                            </Link>
                        </div>
                    )
                }
              

            </div>

    </div>
     </div>
  )
}

export default NavBar

import React, { useEffect, useState } from 'react';
import { navLinks } from '../../data/Info';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowDropdown } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { connectionApi } from '../../services/apiconnector';
import { controller } from '../../services/apis';
import CTAButton from "../Homepage/Button.jsx";
import { RemoveToken } from '../../Slice/auth.js';
import { BeatLoader } from "react-spinners";
import { ShoppingCart } from "lucide-react";
import Logo from "../../assets/Logo 2.webp"
const NavBar = () => {
    const [name, setName] = useState(navLinks[0]);
    const token = useSelector((state) => state.auth?.token ?? null);
    const user = token?.user ?? null;

    const cart = useSelector((state) => state.cart.cartItem);
    console.log(cart)
    const [subLinks, setSubLinks] = useState([]);
    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeName = (value) => setName(value);

    const getCategory = async () => {
        try {
            const data = await connectionApi(controller.CATEGORIES_API, "GET");
            setSubLinks(data?.data?.data ?? []);
        } catch (error) {
            console.log("Error fetching categories:", error);
        }
    };

    const handleLogout = () => {
        dispatch(RemoveToken());
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleCategoryClick = async (e) => {
        try {
            const value = e.target.value;
            const req = await connectionApi(
                controller.GETDETAILSBYID,
                "POST",
                null,
                null,
                { categoryId: value }
            );

            const categoryData = req?.data?.data ?? {};
            const coursesData = categoryData?.course ?? [];

            setCourse(categoryData);

            navigate("/courseDetails", {
                state: { category: categoryData, courses: coursesData }
            });
        } catch (error) {
            console.log("Error fetching courses:", error);
        }
    };

    useEffect(() => {
        getCategory();
    }, []);

    if (loading) {
        return (
            <div className="w-11/12 lg:h-[600px] mx-auto flex items-center justify-center">
                <BeatLoader color="#EAB308" margin={3} size={15} />
            </div>
        );
    }

    return (
        <div className="border-b mt-5">
            <div className="w-11/12 max-w-maxContent mx-auto flex justify-evenly items-center text-white gap-4 lg:ml-[150px]">

                {/* Logo */}
                <div className="text-xl">
                    <img   src={Logo} className='w-[110px] h-[60px]'/>
                </div>

                {/* Navigation Links */}
                <div className="flex gap-6 items-center text-[18px] font-semibold">
                    {navLinks.map((link, index) => (

                        link.name === "Create a course" && user?.accountType !== "Instructer"
                            ? null  
                            :
                            <Link
                                key={index}
                                to={link.link}
                                className={`${link.name === name ? "text-yellow-400" : "text-sky-300"}`}
                                onClick={() => changeName(link.name)}
                            >

                                {link.name === "Catalog" ? (
                                    <div className="flex items-center gap-1 relative group">
                                        {link.name} <IoIosArrowDropdown />

                                        {/* Diamond pointer */}
                                        <div className="absolute top-full left-[35px] w-3 h-3 bg-slate-900 rotate-45 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 delay-300 shadow-md"></div>

                                        {/* Dropdown */}
                                     <div className="absolute top-[30px] left-0 
                opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                transition-all duration-200 delay-200 
                bg-slate-900 w-[220px] py-2
                shadow-lg rounded-xl 
                text-white text-[15px] flex flex-col">
    {subLinks.map((sublink, idx) => (
        <button
            key={idx}
            value={sublink?._id}
            onClick={handleCategoryClick}
            className="text-white text-left px-4 py-2 hover:bg-black rounded-lg font-bold"
        >
            {sublink?.name}
        </button>
    ))}
</div>

                                    </div>
                                ) : (
                                    <div>
                                        {link.name==="DashBoard" && !token?
                                            null:link.name
                                    }
                                        </div>
                                )}
                            </Link>
                    ))}
                </div>

                {/* Right Section */}
                <div className="flex gap-6 items-center mb-3 ">

                    {!token && (
                        <>
                            <CTAButton active={true} linkto={"/login"}>Login</CTAButton>
                            <CTAButton active={false} linkto={"/signup"}>SignUp</CTAButton>
                        </>
                    )}

                         {user?.accountType === "Student" && (
                        <div className="relative">
  {/* Badge */}
  <div className="absolute bottom-4 left-4 flex items-center justify-center 
                  text-white text-sm font-semibold w-5 h-5 
                  rounded-full bg-[#EAB308]">
    {cart ? cart.length : 0}
  </div>

  {/* Cart Icon */}
  <Link to="/cart">
    <ShoppingCart />
  </Link>
</div>
                    )}


                    {token && (
                        <>

                         <Link to="/additionaldetails">
                                <img className="w-10 rounded-full border h-[45px] object-cover " src={user?.image} alt="Profile" />
                            </Link>


                            <div onClick={handleLogout}>
                                <CTAButton active={true}>Logout</CTAButton>
                            </div>

                           
                        </>
                    )}

                   
                </div>
            </div>


          
            
        </div>
    );
};

export default NavBar;

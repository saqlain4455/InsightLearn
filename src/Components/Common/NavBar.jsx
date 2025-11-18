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

const NavBar = () => {
    const [name, setName] = useState(navLinks[0]);
    const token = useSelector((state) => state.auth?.token ?? null);
    const user = token?.user ?? null;
    const cart = useSelector((state) => state.cart);
    const [subLinks, setSubLinks] = useState([]);
    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Change active nav link
    const changeName = (value) => setName(value);

    // Fetch categories
    const getCategory = async () => {
        try {
            const data = await connectionApi(controller.CATEGORIES_API, "GET");
            setSubLinks(data?.data?.data ?? []);
        } catch (error) {
            console.log("Error fetching categories:", error);
        }
    };

    // Logout
    const handleLogout = () => {
        dispatch(RemoveToken());
        localStorage.removeItem("token");
        navigate("/login");
    };

    // Fetch courses by category
    const handleCategoryClick = async (e) => {
        try {
            const value = e.target.value;
            const req = await connectionApi(controller.GETDETAILSBYID, "POST", null, null, { categoryId: value });
            const categoryData = req?.data?.data ?? {};
            const coursesData = categoryData?.course ?? [];
            console.log(categoryData)
            console.log(coursesData)
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
            <div className='w-11/12 lg:h-[600px] mx-auto flex items-center justify-center'>
                <BeatLoader color="#EAB308" margin={3} size={15} />
            </div>
        );
    }

    return (
        <div className='border-b mt-5'>
            <div className='w-11/12 max-w-maxContent mx-auto flex justify-evenly items-center text-white gap-4 lg:ml-[150px]'>
                
                {/* Logo */}
                <div className='text-xl'><h3>Logo</h3></div>

                {/* Navigation Links */}
                <div className='flex gap-6 items-center text-[18px] font-semibold'>
                    {navLinks.map((link, index) => (
                        <Link
                            key={index}
                            to={link.link}
                            className={`${link.name === name ? "text-yellow-400 text-black" : "text-sky-300"}`}
                            onClick={() => changeName(link.name)}
                        >
                            {link.name === "Catalog" ? (
                                <div className="flex items-center gap-1 relative group">
                                    {link.name} <IoIosArrowDropdown />

                                    {/* Diamond pointer */}
                                    <div className="absolute top-full left-[35px] w-3 h-3 bg-white rotate-45 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 delay-300 shadow-md"></div>

                                    {/* Dropdown box */}
                                    <div className="absolute top-[calc(100%+6px)] left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 delay-300 bg-white lg:h-[50px] lg:w-[200px] shadow-md text-black text-[15px] flex flex-col justify-center">
                                        {subLinks.map((sublink, idx) => (
                                            <button
                                                key={idx}
                                                value={sublink?._id}
                                                onClick={handleCategoryClick}
                                                className='text-black text-left p-2'
                                            >
                                                {sublink?.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div>{link.name}</div>
                            )}
                        </Link>
                    ))}
                </div>

                {/* Right Buttons */}
                <div className='flex gap-3 items-center mb-3'>
                    {!token && (
                        <>
                            <CTAButton active={true} linkto={"/Login"}>Login</CTAButton>
                            <CTAButton active={false} linkto={"/signup"}>SignUp</CTAButton>
                        </>
                    )}

                    {token && (
                        <>
                            <div onClick={handleLogout}>
                                <CTAButton active={true}>Logout</CTAButton>
                            </div>
                            <div> 
                                <Link to="/additionaldetails">
                                <img className="w-10 rounded-full border" src={user?.image} alt="Profile" />
                                </Link>
                            </div>
                        </>
                    )}

                    {user?.accountType === "Student" && (
                        <div>
                            <Link to={"/cart"}>Add to cart</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavBar;

import React, { useEffect, useState } from "react";
import { navLinks } from "../../data/Info";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowDropdown } from "react-icons/io";
import { Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { connectionApi } from "../../services/apiconnector";
import { controller } from "../../services/apis";
import CTAButton from "../Homepage/Button.jsx";
import { RemoveToken } from "../../Slice/auth.js";
import { BeatLoader } from "react-spinners";
import { ShoppingCart } from "lucide-react";
import Logo from "../../assets/newlogo.png";

const NavBar = () => {
  const [name, setName] = useState(navLinks[0]);
  const token = useSelector((state) => state.auth?.token ?? null);
  const user = token?.user ?? null;
  const cart = useSelector((state) => state.cart.cartItem);
 console.log(token)
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
      if (!value) return;

      const req = await connectionApi(
        controller.GETDETAILSBYID,
        "POST",
        {},
        {},
        { categoryId: value }
      );

      const categoryData = req?.data?.data ?? {};
      const coursesData = categoryData?.course ?? [];
      console.log(categoryData)
      console.log(coursesData)
      navigate("/courseDetails", {
        state: { category: categoryData, courses: coursesData },
      });
      setMobileOpen(false);
    } catch (error) {
      console.log("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <BeatLoader color="#EAB308" size={15} />
      </div>
    );
  }

  return (
    <div className="w-full bg-transparent border-b">
      {/* NAVBAR MAIN */}
      <div className="max-w-maxContent w-full mx-auto flex justify-between md:justify-evenly items-center px-4 py-3 text-white">

      
        <Link to="/">
          <img src={Logo} className="w-[120px] h-[60px]" />
        </Link>

        <div className="hidden lg:flex items-center gap-6 text-[18px] font-semibold">
          {navLinks.map((link, index) =>
            link.name === "Create a course" && user?.accountType !== "Instructer" ? null : (
              <Link
                key={index}
                to={link.link}
                className={`${link.name === name ? "text-yellow-400" : "text-sky-300"}`}
                onClick={() => changeName(link.name)}
              >
                {link.name === "Catalog" ? (
                  <div className="relative group flex items-center gap-1">
                    Catalog <IoIosArrowDropdown />

                    {/* Dropdown */}
                    <div className="absolute top-[30px] left-0 bg-slate-900 w-[220px] rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-lg">
                      {subLinks.map((sublink, idx) => (
                        <button
                          key={idx}
                          value={sublink?._id}
                          onClick={handleCategoryClick}
                          className="text-left px-4 py-2 hover:bg-black rounded-lg font-bold w-full"
                        >
                          {sublink?.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  link.name === "DashBoard" && !token ? null : link.name
                )}
              </Link>
            )
          )}
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex items-center gap-6">

          {!token && (
            <>
              <CTAButton active={true} linkto={"/login"}>Login</CTAButton>
              <CTAButton active={false} linkto={"/signup"}>SignUp</CTAButton>
            </>
          )}

          {user?.accountType === "Student" && (
            <div className="relative">
              <div className="absolute bottom-4 left-4 w-5 h-5 rounded-full bg-yellow-400 text-black text-sm flex items-center justify-center">
                {cart ? cart.length : 0}
              </div>
              <Link to="/cart"><ShoppingCart /></Link>
            </div>
          )}

          {token && (
            <>
              <Link to="/additionaldetails">
                <img src={user?.image} className="w-10 h-10 rounded-full object-cover border" />
              </Link>
              <div onClick={handleLogout}>
                <CTAButton active={true}>Logout</CTAButton>
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* MOBILE MENU PANEL */}
      {mobileOpen && (
        <div className="lg:hidden bg-slate-900 text-white px-6 py-4 flex flex-col gap-4">

          {navLinks.map((link, idx) =>
            link.name === "Create a course" && user?.accountType !== "Instructer" ? null : (
              <div key={idx}>
                {link.name === "Catalog" ? (
                  <details className="bg-slate-800 p-3 rounded-lg">
                    <summary className="cursor-pointer font-semibold">{link.name}</summary>
                    <div className="flex flex-col mt-2 gap-2">
                      {subLinks.map((item, j) => (
                        <button
                          key={j}
                          value={item?._id}
                          onClick={handleCategoryClick}
                          className="bg-slate-700 py-2 px-3 rounded-lg font-bold"
                        >
                          {item?.name}
                        </button>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link
                    to={link.link}
                    onClick={() => setMobileOpen(false)}
                    className="text-sky-300 font-semibold text-lg"
                  >
                         {link.name==="DashBoard" && !token?null:link.name}
                  </Link>
                )}
              </div>
            )
          )}

          {!token && (
            <>
              <CTAButton active={true} linkto={"/login"}>Login</CTAButton>
              <CTAButton active={false} linkto={"/signup"}>SignUp</CTAButton>
            </>
          )}

          {token && (
            <>
              <Link to="/additionaldetails" onClick={() => setMobileOpen(false)}>
                <img src={user?.image} className="w-12 h-12 rounded-full border object-cover" />
              </Link>
              <div onClick={handleLogout}>
                <CTAButton active={true}>Logout</CTAButton>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;

import React, { useState, useEffect, useRef } from "react";
import { AlignJustify, X } from "lucide-react";
import { Link,useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuthContext } from "../context/AuthContext";
import { LogOutUserAsync,} from "../features/Auth/authSlice";
import toast from "react-hot-toast";
import { usePageContext } from "../context/PageContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideProfile, setHideProfile] = useState(false);

  const dropdownMenuRef = useRef(null);
  const profileIconRef = useRef(null);
  const { usertoken, setUsertoken } = useAuthContext();
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { setCategory } = usePageContext();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 220);
    };

    const handleClickOutside = (event) => {
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target) &&
        profileIconRef.current &&
        !profileIconRef.current.contains(event.target)
      ) {
        setHideProfile(false);
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(LogOutUserAsync());
    setUsertoken(null);
    localStorage.removeItem("info");
    toast.success("Logut SuccessFully !");
    navigate("/",{replace:true})
  };

  const handleChange = (e) => {
    setCategory(e.target.value);
  };
  return (
    <>
      <header
        className={`p-3 sticky top-0 z-50 duration-300 ${
          scrolled
            ? "bg-[#FFFFFF] shadow-sm border-b-[1px] border-black shadow-blue-400 "
            : "bg-[#2A3342]"
        }`}
      >
        <nav className="w-full flex justify-around items-center mx-auto relative">
          <Link to="/">
            <div className="flex justify-center items-center cursor-pointer">
              <p className="text-green-500 font-bold">BLOG APP</p>
            </div>
          </Link>
          <div>
            {!usertoken && (
              <ul className="hidden md:flex text-white gap-7">
                <div dropdownMenuRef={dropdownMenuRef}>
                  <form class="md:w-96 ">
                    <select
                      onChange={(e) => handleChange(e)}
                      id="countries"
                      class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="">All</option>
                      <option value="Web development">Web development</option>
                      <option value="Tech">Tech</option>
                      <option value="Programming Language">
                        Programming Language
                      </option>
                      <option value="Crypto Curency">Crypto Curency</option>
                      <option value="Graphic design">Graphic design</option>
                      <option value="Global warming">Global warming</option>
                      <option value="Nature">Nature</option>
                    </select>
                  </form>
                </div>
              </ul>
            )}
            <div
              ref={dropdownMenuRef}
              className={`duration-300 fixed h-full backdrop-blur-md top-[61px] w-full bg-gray-600 flex md:hidden text-white ${
                isOpen ? "left-0" : "left-[-100%]"
              }`}
            >
              <ul className="flex gap-7 flex-col w-full justify-start duration-300">
                <div dropdownMenuRef={dropdownMenuRef}>
                  <form class="md:w-96 ">
                    <select
                      onChange={(e) => handleChange(e)}
                      id="countries"
                      class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="">All</option>
                      <option value="Web development">Web development</option>
                      <option value="Tech">Tech</option>
                      <option value="Programming Language">
                        Programming Language
                      </option>
                      <option value="Crypto Curency">Crypto Curency</option>
                      <option value="Graphic design">Graphic design</option>
                      <option value="Global warming">Global warming</option>
                      <option value="Nature">Nature</option>
                    </select>
                  </form>
                </div>
              </ul>
            </div>
          </div>

          <div className="flex gap-7">
            <div className="cursor-pointer relative flex justify-center items-center"></div>
            {usertoken ? (
              <div className="isolate flex -space-x-2 relative">
                <div
                  ref={profileIconRef}
                  onClick={() => setHideProfile(!hideProfile)}
                  className="relative"
                >
                  <span className="border flex justify-center items-center relative z-0  h-10 w-10 rounded-full ring-2 text-blue-600 cursor-pointer  font-bold text-lg">
                    {usertoken?.user?.username.charAt(0).toUpperCase() ?usertoken?.user?.username.charAt(0).toUpperCase():usertoken?.username.charAt(0).toUpperCase()}
                  </span>
                </div>

                <div
                  className={`absolute right-0 top-11 z-50 h-20 w-56 border rounded-md bg-slate-100 ${
                    hideProfile ? "" : "hidden"
                  }`}
                >
                  <div className="flex flex-col justify-start p-2 gap-3">
                    <p className="text-black w-full border border-b-2 text-md cursor-pointer duration-200 bg-green-200 hover:rounded-sm">
                  Hi:{" "}  {usertoken?.user?.username ?usertoken?.user?.username:usertoken?.username}
                    </p>

                    <p
                      onClick={handleLogout}
                      className="text-black  text-md cursor-pointer duration-200 hover:bg-slate-700 hover:rounded-sm hover:text-white"
                    >
                      Sign out
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Link to="/signup">
                  <button className="inline-flex items-center gap-2 rounded-md border border-[#F14F4F] bg-[#F14F4F] px-5 py-2 text-white hover:bg-transparent hover:text-[#F14F4F] focus:outline-none ">
                    <span className="text-sm font-medium"> SIGNUP </span>
                    <svg
                      className="size-4 rtl:rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            )}
          </div>
          <span
            className={`block md:hidden cursor-pointer ${
              scrolled ? "text-black" : "text-[#FFFF]"
            }`}
          >
            {isOpen ? (
              <X onClick={toggleMenu} />
            ) : (
              <AlignJustify onClick={toggleMenu} />
            )}
          </span>
        </nav>
      </header>
    </>
  );
};

export default Navbar;

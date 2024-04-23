import React, { useEffect, useRef, useState } from "react";
// import Logo from "../../assets/bajar.png";
import { Link, useLocation } from "react-router-dom";
import { EyeIcon, ListOrderedIcon } from "lucide-react";
const AdminHome = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarRef = useRef(null);
  const Location = useLocation();
  const Pathname = Location.pathname;
  const handleClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside, true);

    return () => {
      window.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div>
      <button
        onClick={(e) => handleClick(e)}
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <aside
        ref={sidebarRef}
        id="logo-sidebar"
        className={`fixed duration-300 top-14 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? "" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-200 dark:bg-gray-800">
          <a href="https://flowbite.com/" class="flex items-center ps-2.5 mb-5">
            {/* <img className="h-8 rounded-full" src={Logo} alt="logo" /> */}
          </a>
          <ul class="space-y-2 font-medium">
            <li>
              <Link
                to="/admin/blog/add"
                class={`flex items-center ${
                  Pathname === "/admin/blog/add"
                    ? "bg-slate-400 text-white"
                    : ""
                } p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
              >
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Add Blog</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/blog"
                class={`flex items-center ${
                  Pathname === "/organizations/view/product"
                    ? "bg-slate-400 text-white"
                    : ""
                } p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
              >
                <EyeIcon></EyeIcon>
                <span class="flex-1 ms-3 whitespace-nowrap">View Blog</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div class="p-2 sm:ml-64">
        <div class=" border-gray-200  dark:border-gray-700">{children}</div>
      </div>
    </div>
  );
};

export default AdminHome;

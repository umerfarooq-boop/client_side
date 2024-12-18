import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import control from "../assets/control.png";
import Chat from '../assets/Chat.png';
import User from '../assets/User.png';
import Calendar from '../assets/Calendar.png';
import Search from '../assets/Search.png';
import Chart from '../assets/Chart.png';
import Folder from '../assets/Folder.png';
import Setting from '../assets/Setting.png';
import DashboardGraph from "./DashboardGraph";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
export default function Dashboard({ children }) {
  const [open, setOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const Menus = [
    { title: "Dashboard", src: Chat, path: "/dashboard" },
    // {
    //   title: "Website", 
    //   src: User, 
    //   path: "", 
    //   submenu: [
    //     // { title: "Slidder", src: Chat, path: "/home_slidder" },
    //     { title: "Slidder", src: Chat, path: "/allhomeSlides" },
    //     { title: "HomeService", src: Chat, path: "/home_services" },
    //     { title: "AboutService", src: Chat, path: "/about_services" },
    //     { title: "AboutQuestion", src: Chat, path: "/about_question" },
    //   ]
    // },
    {
      title: "Website", 
      src: User, 
      path: "", 
      submenu: [
        // { title: "Slidder", src: Chat, path: "/home_slidder" },
        { title: "Slidder", src: Chat, path: "/index_slides" },
        { title: "HomeService", src: Chat, path: "/index_services" },
        { title: "AboutService", src: Chat, path: "/index_about_services" },
        { title: "AboutQuestion", src: Chat, path: "/about_question" },
      ]
    },
    {
      title: "User", 
      src: User, 
      path: "", 
      submenu: [
        { title: "Coaches", src: Chat, path: "/allcoach" }
      ]
    },
    {
      title: "Post", 
      src: User, 
      path: "", 
      submenu: [
        { title: "AddPost", src: Chat, path: "/AddPost" },
        { title: "allPost", src: Chat, path: "/allpost" },
        { title: "EditPost", path: "/Editpost" }
      ]
    },
    { title: "Video", src: User, gap: true, path: "/vedio" },
    { title: "Schedule", src: Calendar, path: "/schedule" },
    { title: "Search", src: Search, path: "/search" },
    { title: "Analytics", src: Chart, path: "/analytics" },
    { title: "Files", src: Folder, gap: true, path: "/files" },
    { title: "Setting", src: Setting, path: "/setting" },
  ];

  const handleDropdownToggle = (hasSubmenu) => {
    if (hasSubmenu) {
      setDropdownOpen(!dropdownOpen);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={` ${open ? "w-72" : "w-20"} bg-dark-purple h-full p-5 pt-8 relative duration-300 `}>
        <img
          src={control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          alt="toggle"
        />
        <div className="flex gap-x-4 items-center">
          <img src={logo} className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`} alt="logo" />
          <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}>Designer</h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li key={index} className={`${Menu.gap ? "mt-9" : "mt-2"}`}>
              {/* Main Menu Item */}
              {Menu.submenu ? (
                <div
                  onClick={() => handleDropdownToggle(Menu.submenu)}
                  className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4"
                >
                  <img src={Menu.src} alt={Menu.title} />
                  <span className={`${!open && "hidden"} origin-left duration-200`}>
                    {Menu.title}
                  </span>
                  {/* Dropdown icon for items with a submenu */}
                  {Menu.submenu && (
                    <ExpandMoreIcon
                      className={`ml-auto transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                      style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  )}
                </div>
              ) : (
                <Link to={Menu.path} className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-black text-sm items-center gap-x-4">
                  <img src={Menu.src} alt={Menu.title} />
                  <span className={`${!open && "hidden"} origin-left duration-200`}>
                    {Menu.title}
                  </span>
                </Link>
              )}
              
              {/* Dropdown Items */}
              {Menu.submenu && dropdownOpen && (
                <ul className={`${open ? "block" : "hidden"} pl-8 pt-2`}>
                  {Menu.submenu.map((subMenu, subIndex) => (
                    <li key={subIndex} className="p-2 text-gray-300 text-sm hover:bg-light-white rounded-md">
                      <Link to={subMenu.path}>{subMenu.title}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      {/* Previous Page Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px 12px",
          border: "none",
          background: "#f5f5f5",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        title="Go to Previous Page"
      >
        <WestIcon style={{ marginRight: "5px" }} /> Previous
      </button>

      {/* Next Page Button */}
      <button
        onClick={() => navigate(+1)}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px 12px",
          border: "none",
          background: "#f5f5f5",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        title="Go to Next Page"
      >
        Next <EastIcon style={{ marginLeft: "5px" }} />
      </button>
    </div>
        {/* Conditionally render the DashboardGraph only on the Dashboard page */}
        {location.pathname === "/dashboard" && <DashboardGraph />}

        {children}
      </div>
    </div>
    
    

  );
}
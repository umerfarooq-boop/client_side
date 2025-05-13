import React from 'react'
import { Navbar, MobileNav, Typography, Button, IconButton } from "@material-tailwind/react";
import { Link, Routes, Route } from 'react-router-dom';
import About from './About'
import logo from '../../public/logo.png'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import { useEffect } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from '../axios'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Fade from '@mui/material/Fade';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import ChatIcon from '@mui/icons-material/Chat';
import Badge from "@mui/material/Badge";
import _logo from '../../public/StepContent/ali.jpg'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
function Nav() {
  const [openNav, setOpenNav] = useState(false);


  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [profile, setProfile] = useState([]);
  let role = localStorage.getItem('role') || '';  // Assuming role is stored in localStorage
  const token = localStorage.getItem('token') || '';  // Assuming token is stored in localStorage
  const coach_id = localStorage.getItem('coach_id') || '';
  const player_id = localStorage.getItem('player_id') || '';
  const admin_id = localStorage.getItem('admin_id') || '';
  const [status, setStatus] = useState("");


  useEffect(() => {
    const getProfileData = async () => {
      let userId = '';

      if (role === 'coach') {
        userId = coach_id;
      } else if (role === 'player') {
        userId = player_id;
      } else if (role === 'admin') {
        userId = admin_id;
      }
      if (!userId) {
        console.log('User ID is missing for the given role');
        return;
      }
      console.log(userId)
      console.log(role)
      try {
        const response = await axios.get(`/profile-data/${userId}/${role}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;

        if (data && data.user) {
          setProfile(data.user);

          if (role === "player" || role === 'admin' && data.user.player?.status === "active") {
            setStatus(data.user.player.status);
            console.log("Player status:", data.user.player.status);
          } else if (role === "coach" && data.user.coach?.status === "active") {
            setStatus(data.user.coach.status);
            console.log("Coach status:", data.user.coach.status);
          }
        }
        if (response.data && Array.isArray(response.data.user)) {
          setProfile(response.data.user);
        } else if (response.data && response.data.user) {
          setProfile([response.data.user]);
        }

      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    getProfileData();

  }, [role, coach_id, player_id, token]);

  const [anchor, setAnchor] = React.useState(null);
  const openanchor = Boolean(anchor);
  const handleCl = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleC = () => {
    setAnchor(null);
  };

  let login_id = null;

  if (role === 'player') {
    login_id = localStorage.getItem('player_id');
  } else if (role === 'coach') {
    login_id = localStorage.getItem('coach_id');
  } else if (role === 'admin') {
    login_id = localStorage.getItem('admin_id');
  }

  const isEditPaid = localStorage.getItem('isEditPaid');

  // Ensure you store and use user_id

  // console.log(`Login id is: ${login_id}`);


  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-3 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 oswald-font text-[15px]">
      <li className="flex items-center gap-x-1 p-1 font-medium">
        <HomeOutlinedIcon sx={{ fontSize: 20, color: 'black' }} />
        <Link to="/" className="text-black">Home</Link>
      </li>

      <li className="flex items-center gap-x-1 p-1 font-medium">
        <ContactPageOutlinedIcon sx={{ fontSize: 20, color: 'black' }} />
        <Link to="/about" className="text-black">About</Link>
      </li>

      <li className="flex items-center gap-x-1 p-1 font-medium">
        <SupportAgentOutlinedIcon sx={{ fontSize: 20, color: 'black' }} />
        <Link to="/question" className="text-black">Question</Link>
      </li>

      <li className="flex items-center gap-x-1 p-1 font-medium">
        <ReviewsOutlinedIcon sx={{ fontSize: 20, color: 'black' }} />
        <Link to="/testimonial" className="text-black">Testimonial</Link>
      </li>

      {(role === 'player' || role === 'admin' || role === '') && (
        <li className="flex items-center gap-x-1 p-1 font-medium">
          <GroupsOutlinedIcon sx={{ fontSize: 30, color: 'black' }} />
          <Link to="/coachpost" className="text-black">Coaches</Link>
        </li>
      )}

      <li className="flex items-center gap-x-1 p-1 font-medium">
        <EmailOutlinedIcon sx={{ fontSize: 20, color: 'black' }} />
        <Link to="/contact" className="text-black">Contact Us</Link>
      </li>
    </ul>

  );





  return (
    <>
      <Navbar className="mx-auto max-w-full px-4 py-2 lg:px-8 lg:py-4">
        <div className="container mx-auto my-auto flex items-center justify-between text-blue-gray-900">
          <div className="text-center">
            {/* <div className="w-[90px] h-[10px] overflow-hidden"> */}
            <a href="/" className="block w-full h-full">
              <img src={_logo} alt="Logo" className="w-16  object-contain" />
            </a>
            {/* </div> */}
          </div>

          <div className="hidden lg:block">{navList}</div>
          <div className="flex items-center gap-x-1">
            {/* Here Remove the Code */}



            {
              token ? (
                <div>
                  {
                    profile.map((index, key) => (
                      role === 'player' ? (
                        <div key={key} className="flex items-center gap-5">

                          <div>

                            <img
                              src={`http://127.0.0.1:8000/uploads/player_image/${index.player.image}`}
                              className="hidden lg:block w-10 h-10 rounded-full border-2 border-indigo-450 shadow-2xl shadow-indigo-900 cursor-pointer object-cover"
                              alt="Thumbnail"
                              id="basic-button"
                              aria-controls={open ? 'basic-menu' : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? 'true' : undefined}
                              onClick={handleClick}
                              loading="lazy"
                            />
                          </div>
                        </div>

                      ) : role === 'admin' ? (
                        <div key={key}>
                          <img
                            src={`http://127.0.0.1:8000/uploads/coach_image/${index.coach.image}`}
                            className="hidden lg:block w-10 h-10 rounded-full border-2 border-indigo-450 shadow-2xl shadow-indigo-900 cursor-pointer object-cover"
                            alt="Thumbnail"
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            loading="lazy"
                          />
                        </div>
                      ) : role === 'coach' ? (
                        <div key={key}>

                          <img
                            src={`http://127.0.0.1:8000/uploads/coach_image/${index.coach.image}`}
                            className="hidden lg:block w-10 h-10 rounded-full border-2 border-indigo-450 shadow-2xl shadow-indigo-900 cursor-pointer object-cover"
                            alt="Thumbnail"
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            loading="lazy"
                          />

                        </div>
                      ) : null
                    ))
                  }
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={handleClose} className='font-medium'><AccountCircleIcon />{role}</MenuItem>
                    {
                      status === 'active' ? (
                        <MenuItem><Link to={`/dashboard/${login_id}`} onClick={handleClose}><SpaceDashboardIcon />Dashboard</Link></MenuItem>
                      ) : (
                        <MenuItem><Link to={''} onClick={handleClose}><RemoveCircleIcon /> Not Active</Link></MenuItem>
                      )
                    }
                    <MenuItem><Link to={'/signup'} onClick={handleClose}><LogoutIcon /> Logout</Link></MenuItem>
                  </Menu>
                </div>
              ) : (


                <div className="flex gap-4 items-center">
                  {/* Login Button */}
                  <Link
                    to="/login"
                    className="text-black hover:text-[indigo] oswald-font-medium text-md hidden lg:flex items-center gap-x-2"
                  >
                    <PersonAddAltOutlinedIcon className="text-base" />
                    Login
                  </Link>

                  {/* Signup Button */}
                  {coach_id ? (
                    <h1 className="text-black oswald-font text-md">Coach Info</h1>
                  ) : (
                    <Link
                      to="/signup"
                      onClick={handleClose}
                      className="text-black hover:text-[darkgrey] oswald-font-medium text-md hidden lg:flex items-center gap-x-1"
                    >
                      <LogoutIcon className="w-4 h-4 text-base" />
                      Signup
                    </Link>
                  )}
                </div>



              )
            }




            {/* Here Remove the Code */}
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-black hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
        <MobileNav open={openNav}>
          <div className="container mx-auto">
            {navList}
            {
              token ? (
                <div>
                  {
                    profile.map((index, key) => (
                      role === 'player' ? (
                        <div key={key}>
                          <img
                            src={`http://127.0.0.1:8000/uploads/player_image/${index.player?.image}`}
                            className="lg:block  w-10 h-10 rounded-full border-2 border-indigo-450 shadow-2xl shadow-indigo-900 cursor-pointer object-cover"
                            alt="Thumbnail"
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                          />
                        </div>
                      ) : role === 'admin' ? (
                        <div key={key}>
                          <img
                            src={`http://127.0.0.1:8000/uploads/player_image/${index.player?.image}`}
                            className="hidden lg:block w-10 h-10 rounded-full border-2 border-indigo-450 shadow-2xl shadow-indigo-900 cursor-pointer object-cover"
                            alt="Thumbnail"
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div key={key}>
                          <img
                            src={`http://127.0.0.1:8000/uploads/coach_image/${index.coach?.image}`}
                            className=" lg:block w-10 h-10 rounded-full border-2 border-indigo-450 shadow-2xl shadow-indigo-900 cursor-pointer object-cover"
                            alt="Thumbnail"
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                          />
                        </div>
                      )
                    ))
                  }
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={handleClose} className='font-medium'><AccountCircleIcon />{role}</MenuItem>
                    {
                      status === 'active' ? (
                        <div>
                          <MenuItem><Link to={`/dashboard/${login_id}`} onClick={handleClose}><SpaceDashboardIcon />Dashboard</Link></MenuItem>
                          {
                            role === 'player' ? (
                              <div>
                                <MenuItem><Link to={`/PlayerRequest/${player_id}/${role}`} onClick={handleClose}><BookmarkAddedIcon />Booking Request</Link></MenuItem>
                                {
                                  isEditPaid === 'false' ? (
                                    <MenuItem><Link to={`/editplayer_appointment_table/${player_id}`} onClick={handleClose}><BookmarkAddedIcon />Edit Booking Request</Link></MenuItem>

                                  ) : null
                                }
                                <MenuItem><Link to={'/equipment_request/'} onClick={handleClose}><SportsCricketIcon />Equipment Request</Link></MenuItem>
                                <MenuItem><Link to={`/player_booked_equipment/${player_id}`} onClick={handleClose}><SportsCricketIcon />Booked Request</Link></MenuItem>
                                <MenuItem><Link to={'/singal_invoice'} onClick={handleClose}><SportsCricketIcon />Invoice</Link></MenuItem>
                              </div>
                            ) : null
                          }
                        </div>
                      ) : (
                        <MenuItem><Link to={''} onClick={handleClose}><RemoveCircleIcon />Not Active</Link></MenuItem>
                      )
                    }
                    <MenuItem><Link to={'/signup'} onClick={handleClose}><LogoutIcon /> Logout</Link></MenuItem>
                  </Menu>
                </div>
              ) : (
                <div className="flex items-center gap-x-1">
                  <Button fullWidth variant="text" size="sm" className="text-black bg-slate-300">
                    <Link to={'/login'}>Login</Link>
                  </Button>
                  <Button fullWidth variant="gradient" size="sm" className="text-black bg-slate-300">
                    <Link to={'/signup'}>Signup</Link>
                  </Button>
                </div>
              )
            }
          </div>
        </MobileNav>
      </Navbar>



    </>
  )
}

export default Nav
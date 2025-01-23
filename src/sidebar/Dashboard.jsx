import {Navbar,MobileNav,Typography,Button, IconButton } from "@material-tailwind/react";
// import About from './About' 
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Fade from '@mui/material/Fade';
import { ArrowDropDown } from '@mui/icons-material';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import Notifications from "../website/Notifications";
import logo from "../../public/logo.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import DashboardGraph from "./DashboardGraph";
import EastIcon from "@mui/icons-material/East";  
import WestIcon from "@mui/icons-material/West";
import WebIcon from "@mui/icons-material/Web";
import React, { useEffect, useState } from 'react';
import axios from "../axios";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks'

function Dashboard({children}) {
  const [openNav, setOpenNav] = React.useState(false);
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem('role' || '');
  
  let login_id = null;
  const { id } = useParams();
  if (role === 'player') {
      login_id = localStorage.getItem('player_id');
  } else if (role === 'coach') {
      login_id = localStorage.getItem('coach_id');
    } else if (role === 'admin'){
    login_id = localStorage.getItem('admin_id');
    
  }
 
  // console.log(`Login id is: ${login_id}`);

  // const player_id = localStorage.getItem('player_id');
  
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
  // let role = localStorage.getItem('role') || '';  // Assuming role is stored in localStorage
  const token = localStorage.getItem('token') || '';  // Assuming token is stored in localStorage
  const coach_id = localStorage.getItem('coach_id') || '';
  const player_id = localStorage.getItem('player_id') || '';
  const admin_id = localStorage.getItem('admin_id') || '';
  const [status,setStatus] = useState("");


  useEffect(() => {
      const getProfileData = async () => {
          let userId = '';
          
          if (role === 'coach') {
              userId = coach_id;
          } else if (role === 'player') {
              userId = player_id;
          } else if(role === 'admin'){
             userId = admin_id;
          }
  
          if (!userId) {
              console.log('User ID is missing for the given role');
              return;
          }
  
          try {
              const response = await axios.get(`/profile-data/${userId}/${role}`, {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              });
              const data = response.data;

                if (data && data.user) {
                    setProfile(data.user);

                    if (role === "player" || role === "admin" && data.user.player?.status === "active") {
                        setStatus(data.user.player.status);
                        console.log("Player status:", data.user.player.status);
                    } else if (role === "coach" && data.user.coach?.status === "active") {
                        setStatus(data.user.coach.status);
                        console.log("Coach status:", data.user.coach.status);
                    }
                }
              if(response.data && Array.isArray(response.data.user)) {
                  setProfile(response.data.user);
              } else if(response.data && response.data.user) {
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

  // let login_id = null;

  if (role === 'player') {
      login_id = localStorage.getItem('player_id');
  } else if (role === 'coach') {
      login_id = localStorage.getItem('coach_id');
    } else if (role === 'admin'){
    login_id = localStorage.getItem('admin_id');
  }

  // console.log(`Login id is: ${login_id}`);
  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' })
   
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {role === 'admin' ? (
        <div className="flex gap-3">
        <Button 
          variant="text" 
          endIcon={<ArrowDropDown className="text-black"/>} 
          {...bindTrigger(popupState)}
        >
          Website<ArrowDropDown className="text-black"/>
        </Button>
      <Menu {...bindMenu(popupState)}>
      <MenuItem onClick={popupState.close}>
              <Link
                variant="body1"
                component={Link}
                to="/allcoach"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Coaches
              </Link>
            </MenuItem>
            <MenuItem onClick={popupState.close}>
              <Link
                variant="body1"
                component={Link}
                to="/index_player"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Players
              </Link>
            </MenuItem>
            <MenuItem onClick={popupState.close}>
              <Link
                variant="body1"
                component={Link}
                to="/index_slides"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Slidder
              </Link>
            </MenuItem>
            <MenuItem onClick={popupState.close}>
              <Link
                variant="body1"
                component={Link}
                to="/index_services"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                HomeServices
              </Link>
            </MenuItem>
            <MenuItem onClick={popupState.close}>
              <Link
                variant="body1"
                component={Link}
                to="/index_about_services"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                About Services
              </Link>
            </MenuItem>
            <MenuItem onClick={popupState.close}>
              <Link
                variant="body1"
                component={Link}
                to="/index_about_question"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                About Question
              </Link>
            </MenuItem>
            <MenuItem onClick={popupState.close}>
              <Link
                variant="body1"
                component={Link}
                to="/contact_feedback"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Contact Feedback
              </Link>
            </MenuItem>
      </Menu>
        </div>
      ) : role === 'coach' ? (
        <div className="flex gap-4">
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="flex items-center gap-x-2 p-1 font-medium"
          >
            <Link to={'/allpost'} className="flex items-center text-black">
              Post
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="flex items-center gap-x-2 p-1 font-medium"
          >
            <Link to={`/showattendance/${coach_id}`} className="flex items-center text-black">
              Attendance
            </Link>
          </Typography>
        </div>
      ) : null}
    </ul>
  );
  

    
  return (
    <>
       <Navbar className="mx-auto max-w-full px-4 py-2 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
      <div className="text-center">
            <h3 className="text-3xl sm:text-2xl leading-normal font-extrabold italic tracking-tight text-gray-900">
              Coach <span className="text-indigo-600">Selector</span>
            </h3>
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
            <div key={key}>
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
          ) : role === 'admin' ? (
            <div key={key}>
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
          ) : role === 'coach' ? (
            <div key={key}>
              <div className="grid lg:grid-cols-2 gap-4">
              <div className="hidden lg:block">
              {
              role === 'coach' ? (
                <Notifications coachId={id} />
              ) : null
              }
              </div>
              <div>
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
              </div>
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
    <div className="flex items-center">
  <Button variant="text" size="sm" className="hidden lg:inline-block">
    <Link to="/login" className="text-black">Login</Link>
  </Button>
  {
    coach_id ? (
      // Add content here if needed when coach_id is truthy
      <h1 className='text-black'></h1>
    ) : (
      <MenuItem>
        <Link to="/signup" onClick={handleClose} className="text-black hidden lg:inline-block">
          <LogoutIcon className="text-black" /> Signin
        </Link>
      </MenuItem>
    )
  }
</div>

  )
}




          {/* Here Remove the Code */}
        </div>
        <IconButton
          variant="text"
          className="ml-auto mb-5 h-6 w-6 text-black hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
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
                src={`http://127.0.0.1:8000/uploads/player_image/${index.player.image}`}
                className="lg:block  w-10 h-10 rounded-full border-2 border-indigo-450 shadow-2xl shadow-indigo-900 cursor-pointer object-cover"
                alt="Thumbnail"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </div>
          ) : role === 'coach' ? (
            <div key={key}>
  <div className="grid sm:grid-cols-1 gap-4">
    {/* Notifications - Visible on mobile and larger screens */}
    <div className="block sm:block">
      {role === 'coach' ? <Notifications coachId={id} /> : null}
    </div>

    {/* Profile Image - Visible on mobile and larger screens */}
    <div className="block sm:block">
      <img 
        src={`http://127.0.0.1:8000/uploads/coach_image/${index.coach.image}`}
        className="block w-10 h-10 rounded-full border-2 border-indigo-450 shadow-2xl shadow-indigo-900 cursor-pointer object-cover"
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
</div>

            
          ) : role === 'admin' ? (
            <div key={key}>
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
            <div>
              <MenuItem><Link to={`/dashboard/${login_id}`} onClick={handleClose}><SpaceDashboardIcon />Dashboard</Link></MenuItem>
              {
                role === 'player' ? (
                  <div>
                    <MenuItem><Link to={`/PlayerRequest/${player_id}/${role}`} onClick={handleClose}><BookmarkAddedIcon />Booking Request</Link></MenuItem>
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
	
	<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} className="m-5 ">
          <button
            onClick={() => navigate(-1)}
            className="bg-indigo-700 font-medium italic"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 12px',
              border: 'none',
              // background: '#283593',
              
              borderRadius: '4px',
              cursor: 'pointer',
              color:'white'
            }}
            title="Go to Previous Page"
          >
            <WestIcon style={{ marginRight: '5px' }} /> Previous
          </button>

          <button
            onClick={() => navigate(+1)}
            className="bg-indigo-700 font-medium italic"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 12px',
              border: 'none',
              color:'white',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            title="Go to Next Page"
          >
            Next <EastIcon style={{ marginLeft: '5px' }} />
          </button>
          <Link to={'/'}>
          <button
            className="bg-indigo-700 font-medium italic"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 12px',
              border: 'none',
              color:'white',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            title="Go to Next Page"
          >
            Website <WebIcon style={{ marginLeft: '5px' }} />
          </button>
          </Link>
        </div>
        <div className="p-10">
        {location.pathname === `/dashboard/${login_id}` && <DashboardGraph />}
        {children}
        </div>

        {/* Render DashboardGraph only on Dashboard page */}



    </>
  )
}

export default Dashboard
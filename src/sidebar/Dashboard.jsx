import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  button,
} from "@material-tailwind/react";
// import About from './About'
import Menu from "@mui/material/Menu";
<<<<<<< HEAD
import MenuItem from "@mui/material/MenuItem";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
=======
import SportsCricketIcon from "@mui/material/MenuItem";
import MenuItem from "@mui/material/MenuItem";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
import LogoutIcon from "@mui/icons-material/Logout";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Fade from "@mui/material/Fade";
import { ArrowDropDown } from "@mui/icons-material";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import Notifications from "../website/Notifications";
import logo from "../../public/logo.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import DashboardGraph from "./DashboardGraph";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import WebIcon from "@mui/icons-material/Web";
import React, { useEffect, useState } from "react";
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import DescriptionIcon from "@mui/icons-material/Description";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import RateReviewIcon from '@mui/icons-material/RateReview';
import PeopleIcon from "@mui/icons-material/People";
import GroupIcon from "@mui/icons-material/Group";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import axios from "../axios";
<<<<<<< HEAD
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
=======
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
import ChatIcon from '@mui/icons-material/Chat';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import _logo from '../../public/StepContent/ali.jpg'

import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";

function Dashboard({ children }) {
  const [openNav, setOpenNav] = React.useState(false);
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem("role" || "");

  let login_id = null;
  const { id } = useParams();
  if (role === "player") {
    login_id = localStorage.getItem("player_id");
  } else if (role === "coach") {
    login_id = localStorage.getItem("coach_id");
  } else if (role === "admin") {
    login_id = localStorage.getItem("admin_id");
  }

  // console.log(`Login id is: ${login_id}`);

  // const player_id = localStorage.getItem('player_id');

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    // setAnchorEl(null);
     localStorage.clear();           // Clear local storage
    navigate("/");                  // Redirect to Home (assuming route is "/")
  };

  const [profile, setProfile] = useState([]);
  // let role = localStorage.getItem('role') || '';  // Assuming role is stored in localStorage
  const token = localStorage.getItem("token") || ""; // Assuming token is stored in localStorage
  const coach_id = localStorage.getItem("coach_id") || "";
  const player_id = localStorage.getItem("player_id") || "";
  const admin_id = localStorage.getItem("admin_id") || "";
  const [status, setStatus] = useState("");

  useEffect(() => {
    const getProfileData = async () => {
      let userId = "";

      if (role === "coach") {
        userId = coach_id;
      } else if (role === "player") {
        userId = player_id;
      } else if (role === "admin") {
        userId = admin_id;
      }

      const user_id = localStorage.getItem("user_id");

      if (!userId) {
        console.log("User ID is missing for the given role");
        return;
      }

      try {
        const response = await axios.get(`/profile-data/${user_id}/${role}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;

        if (data && data.user) {
          setProfile(data.user);

          if (role === "player" && data.user.player?.status === "active") {
            setStatus(data.user.player.status);
            console.log("Player status:", data.user.player.status);
          } else if (
            role === "coach" ||
            (role === "admin" && data.user.coach?.status === "active")
          ) {
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
        console.error("Error fetching profile data:", error);
      }
    };

    getProfileData();
  }, [role, coach_id, player_id, token, admin_id, status]);

  const [anchor, setAnchor] = React.useState(null);
  const openanchor = Boolean(anchor);
  const handleCl = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleC = () => {
    setAnchor(null);
  };

  const handleLogout = () => {
    localStorage.clear();           // Clear local storage
    navigate("/");                  // Redirect to Home (assuming route is "/")
  };
  // let login_id = null;

  if (role === "player") {
    login_id = localStorage.getItem("player_id");
  } else if (role === "coach") {
    login_id = localStorage.getItem("coach_id");
  } else if (role === "admin") {
    login_id = localStorage.getItem("admin_id");
  } else if (role === "parent") {
    login_id = localStorage.getItem("parent_id");
  }

<<<<<<< HEAD
=======
  const user_id = localStorage.getItem('user_id');

>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
  // console.log(`Login id is: ${login_id}`);
  const popupState = usePopupState({ variant: "popover", popupId: "demoMenu" });

  const navList = (
    <ul className="flex flex-col gap-2 mt-2 mb-4 lg:flex-row lg:items-center lg:gap-6 lg:mt-0 lg:mb-0">
      {role === "admin" ? (
        <div className="gap-4 mb-2 block md:block sm:block xsm:block lg:flex xl:flex">
          {/* Coaches Link */}
          <div className="flex items-center gap-x-2 text-black font-bold ">
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="flex items-center gap-x-2 pb-2 font-medium"
            >
              <PeopleIcon className="text-[#90A4AE]" fontSize="small" />
              <Link
                to="/allcoach"
                style={{ textDecoration: "none", color: "black" }}
              >
                Coaches
              </Link>
            </Typography>
          </div>

          {/* Players Link */}
          <div className="flex items-center gap-x-2 text-black  mb-2">
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="flex items-center gap-x-2 p-1 font-medium"
            >
              <GroupIcon className="text-[#90A4AE]" fontSize="small" />
              <Link
                to="/index_player"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Players
              </Link>
            </Typography>
          </div>

          {/* Website Dropdown */}
          <div className="flex items-center gap-x-2 text-black font-bold mb-2">
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="flex items-center font-medium"
            >
              <a
                variant="text"
                {...bindTrigger(popupState)}
                className="flex items-center pr-10 cursor-pointer" // Ensuring proper alignment
              >
                Website
                <ArrowDropDown className="text-[#90A4AE]" fontSize="medium" />
              </a>
            </Typography>

            <Menu {...bindMenu(popupState)}>
              <MenuItem onClick={popupState.close}>
                <SlideshowIcon className="text-[#90A4AE]" fontSize="small" />
                <Typography
                  as="li"
                  variant="small"
                  color="blue-gray"
                  className="flex items-center gap-x-2 p-1 font-medium"
                >
                  <Link
                    variant="body1"
                    component={Link}
                    to="/index_slides"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Slidder
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={popupState.close}>
                <HomeIcon className="text-[#90A4AE]" fontSize="small" />
                <Typography
                  as="li"
                  variant="small"
                  color="blue-gray"
                  className="flex items-center gap-x-2 p-1 font-medium"
                >
                  <Link
                    variant="body1"
                    component={Link}
                    to="/index_services"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    HomeServices
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={popupState.close}>
                <InfoIcon className="text-[#90A4AE]" fontSize="small" />
                <Typography
                  as="li"
                  variant="small"
                  color="blue-gray"
                  className="flex items-center gap-x-2 p-1 font-medium"
                >
                  <Link
                    variant="body1"
                    component={Link}
                    to="/index_about_services"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    About Services
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={popupState.close}>
                <HelpOutlineIcon className="text-[#90A4AE]" fontSize="small" />
                <Typography
                  as="li"
                  variant="small"
                  color="blue-gray"
                  className="flex items-center gap-x-2 p-1 font-medium"
                >
                  <Link
                    variant="body1"
                    component={Link}
                    to="/index_about_question"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    About Question
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={popupState.close}>
                <FeedbackIcon className="text-[#90A4AE]" fontSize="small" />
                <Typography
                  as="li"
                  variant="small"
                  color="blue-gray"
                  className="flex items-center gap-x-2 p-1 font-medium"
                >
                  <Link
                    variant="body1"
                    component={Link}
                    to="/contact_feedback"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Contact Feedback
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={popupState.close}>
                <SlideshowIcon className="text-[#90A4AE]" fontSize="small" />
                <Typography
                  as="li"
                  variant="small"
                  color="blue-gray"
                  className="flex items-center gap-x-2 p-1 font-medium"
                >
                  <Link
                    variant="body1"
                    component={Link}
                    to="/vedio"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Vedio
                  </Link>
                </Typography>
              </MenuItem>
            </Menu>
          </div>
        </div>
      ) : role === "coach" ? (
        <div className="gap-4 mb-2 block md:block sm:block xsm:block lg:flex xl:flex">
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="flex items-center gap-x-2 p-1 font-medium "
          >
            <DescriptionIcon className="text-[#90A4AE]" fontSize="small" />
            <Link to={"/allpost"} className="flex items-center text-black">
              Post
            </Link>
          </Typography>

          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="flex items-center gap-x-2 p-1 font-medium"
          >
            <EventNoteIcon className="text-[#90A4AE]" fontSize="small" />
            <Link
              to={`/showattendance/${coach_id}`}
              className="flex items-center text-black"
            >
              Attendance
            </Link>
          </Typography>

          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="flex items-center gap-x-2 p-1 font-medium"
          >
            <LeaderboardIcon className="text-[#90A4AE]" fontSize="small" />
            <Link
              to={`/addScore/${coach_id}`}
              className="flex items-center text-black"
            >
              ScoreBoard
            </Link>
          </Typography>

          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="flex items-center gap-x-2 p-1 font-medium"
          >
            <EventAvailableIcon className="text-[#90A4AE]" fontSize="small" />
            <Link
              to={`/all_appointment/${coach_id}`}
              className="flex items-center text-black"
            >
              Appointments
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="flex items-center gap-x-2 p-1 font-medium"
          >
            <BuildCircleIcon className="text-[#90A4AE]" fontSize="small" />
            <Link
              to={`/all_equipment/${coach_id}`}
              className="flex items-center text-black"
            >
              Equipment
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="flex items-center gap-x-2 p-1 font-medium"
          >
            <AccountCircleIcon className="text-[#90A4AE]" fontSize="small" />
            <Link
              to={`/editcoach/${coach_id}`}
              className="flex items-center text-black"
            >
              Profile
            </Link>
          </Typography>
        </div>
      ) : role === "player" ? (
        <ul className="gap-4 mb-2 flex flex-col md:flex-col sm:flex-col xsm:flex-col lg:flex-row xl:flex-row oswald-font text-[15px]">
          {/* Score */}
          <li className="flex items-center p-1 font-medium">
            <Link
              to={`/showscore/${player_id}`}
              className="scale-105 hover:scale-110 transform transition duration-200 ease-in-out flex items-center gap-x-1 p-1 font-medium text-gray-700 hover:text-indigo-600"
            >
              <LeaderboardOutlinedIcon
                sx={{ fontSize: 20, color: 'inherit' }}
                className="cursor-pointer"
              />
              <span>Score</span>
            </Link>
          </li>

          {/* Attendance */}
          <li className="flex items-center p-1 font-medium">
            <Link
              to={`/studentattendance/${player_id}`}
              className="scale-105 hover:scale-110 transform transition duration-200 ease-in-out flex items-center gap-x-1 p-1 font-medium text-gray-700 hover:text-indigo-600"
            >
              <EventAvailableOutlinedIcon
                sx={{ fontSize: 20, color: 'inherit' }}
                className="cursor-pointer"
              />
              <span>Attendance</span>
            </Link>
          </li>

          {/* Profile */}
          <li className="flex items-center p-1 font-medium">
            <Link
              to={`/edit_player/${player_id}`}
              className="scale-105 hover:scale-110 transform transition duration-200 ease-in-out flex items-center gap-x-1 p-1 font-medium text-gray-700 hover:text-indigo-600"
            >
              <AccountCircleOutlinedIcon
                sx={{ fontSize: 20, color: 'inherit' }}
                className="cursor-pointer"
              />
              <span>Profile</span>
            </Link>
          </li>

          {/* Reviews */}
          <li className="flex items-center p-1 font-medium">
            <Link
              to={`/add_reviews`}
              className="scale-105 hover:scale-110 transform transition duration-200 ease-in-out flex items-center gap-x-1 p-1 font-medium text-gray-700 hover:text-indigo-600"
            >
              <RateReviewOutlinedIcon
                sx={{ fontSize: 20, color: 'inherit' }}
                className="cursor-pointer"
              />
              <span>Reviews</span>
            </Link>
          </li>
        </ul>
      ) :
      // ) : role === "parent" ? (
      //   <div className="gap-4 mb-2 block md:block sm:block xsm:block lg:flex xl:flex">
      //     <Typography
      //       as="li"
      //       variant="small"
      //       color="blue-gray"
      //       className="flex items-center gap-x-2 p-1 font-medium"
      //     >
      //       <EventNoteIcon className="text-[#90A4AE]" fontSize="small" />
      //       <Link
      //         to={`/parent_player_attendance/${login_id}`}
      //         className="flex items-center text-black"
      //       >
      //         Attendance
      //       </Link>
      //     </Typography>

      //     <Typography
      //       as="li"
      //       variant="small"
      //       color="blue-gray"
      //       className="flex items-center gap-x-2 p-1 font-medium"
      //     >
      //       <EmojiEventsIcon className="text-[#90A4AE]" fontSize="small" />
      //       <Link
      //         to={`/parent_player_score/${login_id}`}
      //         className="flex items-center text-black"
      //       >
      //         Score
      //       </Link>
      //     </Typography>

      //     <div className="ml-auto">
      //       <button className="bg-indigo-900 text-white px-4 py-1.5 rounded-md hover:bg-indigo-700">
      //         Logout
      //       </button>
      //     </div>
      //   </div>
       role === "parent" ? (
    <div className="gap-4 mb-2 block md:block sm:block xsm:block lg:flex xl:flex">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <EventNoteIcon className="text-[#90A4AE]" fontSize="small" />
        <Link
          to={`/parent_player_attendance/${login_id}`}
          className="flex items-center text-black"
        >
          Attendance
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <EmojiEventsIcon className="text-[#90A4AE]" fontSize="small" />
        <Link
          to={`/parent_player_score/${login_id}`}
          className="flex items-center text-black"
        >
          Score
        </Link>
      </Typography>

      <div className="ml-auto">
        <button
          onClick={handleLogout}
          className="bg-indigo-900 text-white px-4 py-1.5 rounded-md hover:bg-indigo-700"
        >
          Logout
        </button>
      </div>
    </div>
  ) : null}
    </ul>
  );

  return (
    <>
      <Navbar className="mx-auto max-w-full px-2 py-2 lg:px-5 lg:py-2">
        <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
          <div className="text-start">
            <Link to="/" className="block w-full h-full">
              <img src={_logo} alt="Logo" className="w-16 object-contain" />
            </Link>
          </div>

          <div className="hidden lg:block">{navList}</div>
          <div className="flex items-center gap-x-1">
            {/* Here Remove the Code */}

            {token ? (
              <div>
                {profile.map((index, key) =>
                  role === "player" ? (
                    <div key={key} className="flex items-center gap-3 p-2">
                      {role === "player" && (
                        <div className="relative group">
                          <Link
                            to="#" // Add your notifications route here
                            className="scale-105 hover:scale-110 transform transition duration-200 ease-in-out cursor-pointer text-gray-700 hover:text-indigo-600"
                          >
<<<<<<< HEAD
                            <Notifications coachId={id}/>
                          </Link>
                          <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            Notifications
                            <span className="absolute bottom-full left-1/2 w-2 h-2 bg-gray-800 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></span>
=======
                            <Notifications sx={{ fontSize: 30 }}  coachId = {id}/>
                          </Link>
                          <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            Notifications
                            <span className="absolute bottom-full left-1/2 w-2 h-2 bg-indigo-600 transform -translate-x-1/2 translate-y-1/2 rotate-45"></span>
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
                          </span>
                        </div>
                      )}

                      {/* Chat link with icon */}
                      <div className="relative group">
                        <Link
                          to={`/ChatUi/${player_id}`}
                          className="scale-100 hover:scale-110 transform transition duration-200 ease-in-out cursor-pointer text-gray-700 hover:text-indigo-600"
                        >
                          <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: 28 }} />
                        </Link>
                        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                          Chats
<<<<<<< HEAD
                          <span className="absolute bottom-full left-1/2 w-2 h-2 bg-gray-800 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></span>
=======
                          <span className="absolute bottom-full left-1/2 w-2 h-2 bg-indigo-600 transform -translate-x-1/2 translate-y-1/2 rotate-45"></span>
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
                        </span>
                      </div>

                      {/* Player image */}
                      <div className="relative group">
                        <img
                          src={`http://127.0.0.1:8000/uploads/player_image/${index.player.image}`}
                          className="w-10 h-10 rounded-full border-2 border-indigo-450 shadow-lg cursor-pointer object-cover hover:scale-105 transform transition duration-200"
                          alt="Thumbnail"
                          id="basic-button"
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={handleClick}
                          loading="lazy"
                        />
                        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                          Profile
<<<<<<< HEAD
                          <span className="absolute bottom-full left-1/2 w-2 h-2 bg-gray-800 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></span>
=======
                          <span className="absolute bottom-full left-1/2 w-2 h-2 bg-indigo-600 transform -translate-x-1/2 translate-y-1/2 rotate-45"></span>
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
                        </span>
                      </div>
                    </div>

                  ) : role === "coach" ? (
                    <div key={key} className="hidden sm:flex items-center justify-end gap-4 p-2 text-sm">
                      {/* Notifications block (only for coach) */}
                      {role === "coach" && (
                        <div className="relative group flex-shrink-0">
                          <Link
                            to="#"
                            className="scale-105 hover:scale-110 transform transition duration-200 ease-in-out cursor-pointer text-gray-700 hover:text-indigo-600"
                          >
<<<<<<< HEAD
                            <Notifications coachId={id} />
=======
                            <Notifications fontSize="small" coachId={id} />
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
                          </Link>
                          <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            Notifications
                            <span className="absolute bottom-full left-1/2 w-2 h-2 bg-indigo-600 transform -translate-x-1/2 translate-y-1/2 rotate-45"></span>
                          </span>
                        </div>
                      )}

<<<<<<< HEAD
                      

=======
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
                      {/* Chat icon link */}
                      <div className="relative group flex-shrink-0">
                        <Link
                          to={`/ChatUi/${coach_id}`}
                          className="scale-105 hover:scale-110 transform transition duration-200 ease-in-out cursor-pointer text-gray-700 hover:text-indigo-600"
                        >
                          <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: 20 }} />
                        </Link>
                        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                          Chats
                          <span className="absolute bottom-full left-1/2 w-2 h-2 bg-indigo-600 transform -translate-x-1/2 translate-y-1/2 rotate-45"></span>
                        </span>
                      </div>

                      {/* Coach image */}
                      <div className="relative group flex-shrink-0">
                        <img
                          src={`http://127.0.0.1:8000/uploads/coach_image/${index.coach.image}`}
                          className="w-10 h-10 rounded-full border border-indigo-450 shadow cursor-pointer object-cover hover:scale-105 transform transition duration-200"
                          alt="Profile"
                          onClick={handleClick}
                          loading="lazy"
                        />
                        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                          Profile
                          <span className="absolute bottom-full left-1/2 w-2 h-2 bg-indigo-600 transform -translate-x-1/2 translate-y-1/2 rotate-45"></span>
                        </span>
                      </div>
                    </div>


                  ) : null
                )}

<<<<<<< HEAD
                
{
  role === 'admin' ? (
     <h1 className="text-black">Umer</h1>
  ):null
}
                
=======
                {
                  role === 'admin' ? (
                    <Link to={'/login'} className='text-black' >Logout</Link>
                  ) : null
                }

>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose} className="font-medium">
                    <AccountCircleIcon />
                    {role}
                  </MenuItem>
                  {status === "active" ? (
                    <MenuItem>
                      <Link to={`/dashboard/${login_id}`} onClick={handleClose}>
                        <SpaceDashboardIcon />
                        Dashboard
                      </Link>
                    </MenuItem>
                  ) : (
                    <MenuItem>
                      <Link to={""} onClick={handleClose}>
                        <RemoveCircleIcon /> Not Active
                      </Link>
                    </MenuItem>
                  )}
                  <MenuItem>
                    <Link to={"/login"} onClick={handleClose}>
                      <LogoutIcon /> Logout
                    </Link>
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <div className="flex items-center">
                <Button
                  variant="text"
                  size="sm"
                  className="hidden lg:inline-block"
                >
                  <Link to="/login" className="text-black">
                    Login
                  </Link>
                </Button>
                {coach_id ? (
                  // Add content here if needed when coach_id is truthy
                  <h1 className="text-black"></h1>
                ) : (
                  <MenuItem>
                    <Link
                      to="/login"
                      onClick={handleClose}
                      className="text-black hidden lg:inline-block"
                    >
                      <LogoutIcon className="text-black" /> Signin
                    </Link>
                  </MenuItem>
                )}
              </div>
            )}

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
            {token ? (
              <div>
                {profile.map((index, key) =>
                  role === "player" ? (
                    <div key={key}>
                      <div className="block sm:block">
                        {role === "player" ? (
<<<<<<< HEAD
                          <Notifications coachId={player_id} />
=======
                          <Notifications coachId={id} />
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
                        ) : null}
                      </div>
                      <img
                        src={`http://127.0.0.1:8000/uploads/player_image/${index.player.image}`}
                        className="lg:block  w-10 h-10 rounded-full border-2 border-indigo-450 shadow-2xl shadow-indigo-900 cursor-pointer object-cover"
                        alt="Thumbnail"
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                      />
                    </div>
                  ) : role === "coach" ? (
                    <div key={key}>
                      <div className="grid sm:grid-cols-1 gap-4">
                        {/* Notifications - Visible on mobile and larger screens */}
                        <div className="block sm:block">
                          {role === "coach" ? (
<<<<<<< HEAD
                            <Notifications coachId={coach_id} />
=======
                            <Notifications coachId={id} />
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
                          ) : null}
                        </div>

                        {/* Profile Image - Visible on mobile and larger screens */}
                        <div className="block sm:block">
                          <img
                            src={`http://127.0.0.1:8000/uploads/coach_image/${index.coach.image}`}
                            className="block w-10 h-10 rounded-full border-2 border-indigo-450 shadow-2xl shadow-indigo-900 cursor-pointer object-cover"
                            alt="Thumbnail"
                            id="basic-button"
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <h1>Umer Farooq</h1>
                    </div>
                  ) : role === "admin" ? (
                    <div key={index}>
                      <img
                        src={`http://127.0.0.1:8000/uploads/coach_image/${index.coach.image}`}
                        className="block w-10 h-10 rounded-full border-2 border-indigo-450 shadow-2xl shadow-indigo-900 cursor-pointer object-cover"
                        alt="Thumbnail"
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                        loading="lazy"
                      />
                      {/* <h1 className="text-black">King</h1> */}
                    </div>
                  ) : null
                )}
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
<<<<<<< HEAD
                  }}
                >
                  <MenuItem onClick={handleClose} className="font-medium">
                    <AccountCircleIcon />
                    {role}
                  </MenuItem>
                  {status === "active" ? (
                    <div>
                      <div>
                        <MenuItem>
                          <Link
                            to={`/dashboard/${login_id}`}
                            onClick={handleClose}
                          >
                            <SpaceDashboardIcon />
                            Dashboard
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link to="/invoice" >
                            <ReceiptLongIcon />
                            Invoice
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link to={`/player_emergency/${coach_id}`} >
                            <ContactEmergencyIcon />
=======
                    className: "py-0 font-['Oswald'] " // Apply Oswald font to the entire menu
                  }}
                >
                  {/* Profile Menu Item */}
                  <MenuItem
                    onClick={handleClose}
                    className="font-medium transition-all duration-300 hover:bg-indigo-50 hover:text-indigo-600 hover:scale-[1.02] font-['Oswald']"
                  >
                    <AccountCircleIcon className="mr-2" />
                    <span className=" font-['Oswald']">{role}</span>
                  </MenuItem>

                  {status === "active" ? (
                    <div className="font-['Oswald']">
                      <div>
                        <MenuItem className="transition-all duration-300 hover:bg-indigo-50 hover:scale-[1.02]">
                          <Link
                            to={`/dashboard/${login_id}`}
                            onClick={handleClose}
                            className="flex items-center w-full hover:text-indigo-600 transition-colors duration-300 font-['Oswald']"
                          >
                            <SpaceDashboardIcon className="mr-2" />
                            Dashboard
                          </Link>
                        </MenuItem>

                        <MenuItem className="transition-all duration-300 hover:bg-indigo-50 hover:scale-[1.02]">
                          <Link
                            to="/invoice"
                            className="flex items-center w-full hover:text-indigo-600 transition-colors duration-300 font-['Oswald']"
                          >
                            <ReceiptLongIcon className="mr-2" />
                            Invoice
                          </Link>
                        </MenuItem>

                        <MenuItem className="transition-all duration-300 hover:bg-indigo-50 hover:scale-[1.02]">
                          <Link
                            to={`/player_emergency/${coach_id}`}
                            className="flex items-center w-full hover:text-indigo-600 transition-colors duration-300 font-['Oswald']"
                          >
                            <ContactEmergencyIcon className="mr-2" />
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
                            Emergency
                          </Link>
                        </MenuItem>
                      </div>
<<<<<<< HEAD
                      {role === "player" ? (
                        <div>
                          <MenuItem>
                            <Link
                              to={`/PlayerRequest/${player_id}/${role}`}
                              onClick={handleClose}
                            >
                              <BookmarkAddedIcon />
                              Booking Request
                            </Link>
                          </MenuItem>
                          <MenuItem>
                            <Link
                              to={"/equipment_request"}
                              onClick={handleClose}
                            >
                              <BookmarkAddedIcon />
=======

                      {role === "player" && (
                        <div>
                          <MenuItem className="transition-all duration-300 hover:bg-indigo-50 hover:scale-[1.02]">
                            <Link
                              to={`/PlayerRequest/${player_id}/${role}`}
                              onClick={handleClose}
                              className="flex items-center w-full hover:text-indigo-600 transition-colors duration-300 font-['Oswald']"
                            >
                              <EditCalendarIcon className="mr-2" />
                              Booking Request
                            </Link>
                          </MenuItem>
                          <MenuItem className="transition-all duration-200 hover:bg-indigo-50 hover:scale-[1.02]">
                            <Link
                              to={`/player_booked_equipment/${player_id}`}
                              onClick={handleClose}
                              className="flex items-center w-full hover:text-indigo-600 cursor-pointer font-['Oswald']"
                            >
                              <EventAvailableIcon className="mr-2" />
                              Booked Request
                            </Link>
                          </MenuItem>
                          <MenuItem className="transition-all duration-300 hover:bg-indigo-50 hover:scale-[1.02]">
                            <Link
                              to={"/equipment_request"}
                              onClick={handleClose}
                              className="flex items-center w-full hover:text-indigo-600 transition-colors duration-300 font-['Oswald']"
                            >
                              <BookmarkAddedIcon className="mr-2" />
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
                              Equipment Request
                            </Link>
                          </MenuItem>
                        </div>
<<<<<<< HEAD
                      ) : null}
                    </div>
                  ) : (
                    <MenuItem>
                      <Link to={""} onClick={handleClose}>
                        <RemoveCircleIcon />
=======
                      )}
                    </div>
                  ) : (
                    <MenuItem className="transition-all duration-300 hover:bg-gray-100 font-['Oswald']">
                      <Link
                        to={""}
                        onClick={handleClose}
                        className="flex items-center w-full text-gray-500 font-['Oswald']"
                      >
                        <RemoveCircleIcon className="mr-2" />
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
                        Not Active
                      </Link>
                    </MenuItem>
                  )}

<<<<<<< HEAD
                  <MenuItem>
                    <Link to={"/login"} onClick={handleClose}>
                      <LogoutIcon /> Logout
=======
                  <MenuItem className="transition-all duration-300 hover:bg-red-50 hover:scale-[1.02] font-['Oswald']">
                    <Link
                      to={"/login"}
                      onClick={handleClose}
                      className="flex items-center w-full hover:text-red-600 transition-colors duration-300 font-['Oswald']"
                    >
                      <LogoutIcon className="mr-2" />
                      Logout
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
                    </Link>
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <div className="flex items-center gap-x-1">
                <Button
                  fullWidth
                  variant="text"
                  size="sm"
                  className="text-black bg-slate-300"
                >
                  <Link to={"/login"}>Login</Link>
                </Button>
                <Button
                  fullWidth
                  variant="gradient"
                  size="sm"
                  className="text-black bg-slate-300"
                >
                  <Link to={"/signup"}>Signup</Link>
                </Button>
              </div>
            )}
          </div>
        </MobileNav>



      </Navbar>

      {/* <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} className="m-5 ">
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
        </div> */}
      <div className="">
        {location.pathname === `/dashboard/${login_id}` && <DashboardGraph />}
        {children}
      </div>

      {/* Render DashboardGraph only on Dashboard page */}
    </>
  );
}

export default Dashboard;

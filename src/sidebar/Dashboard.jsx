
import { Link, useLocation, useNavigate } from "react-router-dom";
import DashboardGraph from "./DashboardGraph";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import React, { useEffect, useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse, IconButton, Avatar, Box } from '@mui/material';
import { ExpandLess, ExpandMore, ChevronLeft, ChevronRight, Home, Settings, AccountCircle } from '@mui/icons-material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import logo from "../../public/logo.png";
import ImageIcon from '@mui/icons-material/Image';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HelpIcon from '@mui/icons-material/Help';
import FeedbackIcon from '@mui/icons-material/Feedback';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import WebIcon from '@mui/icons-material/Web';

function SidebarItem({ 
  icon, 
  text, 
  active = false, 
  expanded = false, 
  subMenu = null, 
  path, 
  isActive, 
  onToggle 
}) {
  useEffect(() => {
    if (!expanded) {
      onToggle(false); // Close submenu when sidebar collapses
    }
  }, [expanded, onToggle]);

  

  return (
    <>
      <ListItem
        button
        component={path ? Link : "div"}
        to={path || undefined} // Ensure `to` is passed only if `path` exists
        onClick={() => subMenu && onToggle(!isActive)}
        selected={active}
        sx={{
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <ListItemIcon
          sx={{
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "rotate(10deg)",
            },
          }}
        >
          {icon}
        </ListItemIcon>
        {expanded && <ListItemText primary={text} />}
        {subMenu && (expanded ? (isActive ? <ExpandLess /> : <ExpandMore />) : null)}
      </ListItem>
      {subMenu && (
        <Collapse in={isActive} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subMenu.map((item, index) => (
              <SidebarItem key={index} {...item} expanded={expanded} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}



export default function Dashboard({ children }) {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  
  let login_id = null;

  if (role === 'player') {
      login_id = localStorage.getItem('player_id');
  } else if (role === 'coach') {
      login_id = localStorage.getItem('coach_id');
  }

  console.log(`Login id is: ${login_id}`);


  const navBarItems = [
    { icon: <Home />, text: "Dashboard", path: `/dashboard/${login_id}` },
    ...(role === "admin"
      ? [
          {
            icon: <WebAssetIcon />,
            text: "Website",
            subMenu: [
              { icon: <ImageIcon />, text: "Slidder", path: "/index_slides" },
              { icon: <MiscellaneousServicesIcon />, text: "HomeService", path: "/index_services" },
              { icon: <MedicalServicesIcon />, text: "AboutService", path: "/index_about_services" },
              { icon: <HelpIcon />, text: "AboutQuestion", path: "/index_about_question" },
              { icon: <FeedbackIcon />, text: "Contact Feedback", path: "/contact_feedback" },
            ],
          },
          {
            icon: <AccountCircle />,
            text: "User",
            subMenu: [
              { icon: <AccountCircle />, text: "Coaches", path: "/allcoach" },
              { icon: <AccountCircle />, text: "Players", path: "/index_player" },
            ],
          },
          { icon: <OndemandVideoIcon />, text: "Video", path: "/vedio" },
        ]
      : []),

      ...(role === "coach"
        ? [
          { icon: <PostAddIcon />, text: "Post", path: "/allpost" },
        ] : []
      ),
    
    // { icon: <AccountCircle />, text: "Schedule", path: "/schedule" },
    // { icon: <AccountCircle />, text: "Search", path: "/search" },
    // { icon: <AccountCircle />, text: "Analytics", path: "/analytics" },
    // { icon: <AccountCircle />, text: "Files", path: "/files" },
    // { icon: <Settings />, text: "Setting", path: "/setting" },
  ];
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const handleToggle = (index, isActive) => {
    setActiveSubMenu(isActive ? index : null);
  };


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Box display="flex" sx={{ overflowX: 'hidden' }} >
        {/* Drawer Component */}
        <Drawer
          variant="permanent"
          open={expanded}
          sx={{
            width: expanded ? 260 : 70,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: expanded ? 260 : 70,
              boxSizing: 'border-box',
              transition: 'width 0.3s ease'
            },
          }}
        >
          {/* Logo */}
          <Box display="flex" alignItems="center" justifyContent="center" p={1} mt={1} >
            {expanded ? (
              <div>
                <img src={logo} alt="logo" style={{ width: '70px', height: 'auto' }} />
              </div>
            ) : (
              <Avatar src={logo} sx={{ width: 40, height: 40 }} />
            )}
          </Box>

          {/* Navigation Items */}
          <List>
      {navBarItems.map((item, index) => (
        <SidebarItem
          key={index}
          {...item}
          expanded={expanded}
          isActive={activeSubMenu === index}
          onToggle={(isActive) => handleToggle(index, isActive)}
        />
      ))}
    </List>
          {expanded ? (
          <Box mt="auto" p={2} display="flex" alignItems="center">
            <Avatar src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=Mark+Ruffalo" />
            {expanded && (
              <Box ml={2}>
                <Box fontWeight="bold">Mark Ruffalo</Box>
                <Box fontSize="small" color="gray">mark@gmail.com</Box>
              </Box>
            )}
            {/* <IconButton>
              <MoreVert />
            </IconButton> */}
          </Box>
        ) : (
          <Box mt="auto" p={1} display="flex" alignItems="center">
            <Avatar src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=Mark+Ruffalo" />
          </Box>
        )}


        </Drawer>

        {/* Expand Button */}
        <Box
          sx={{
            position: 'fixed',
            top: '11%',
            left: expanded ? 260 : 70,
            transform: 'translateY(-50%)',
            zIndex: 10,
          }}
        >
          <IconButton onClick={() => setExpanded(!expanded)} >
            {expanded ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Box>
      </Box>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          marginLeft: expanded ? '50px' : '70px', // Adjust main content position dynamically
          transition: 'margin-left 0.3s ease', // Smooth transition
          padding: '10px',
        }}
      >
        {/* Navigation Buttons */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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

        {/* Render DashboardGraph only on Dashboard page */}
        {location.pathname === `/dashboard/${login_id}` && <DashboardGraph />}
        {children}
      </div>
    </div>
  );
}

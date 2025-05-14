import React, { useEffect, useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse, IconButton, Avatar, Box } from '@mui/material';
import { ExpandLess, ExpandMore, ChevronLeft, ChevronRight, Home, Settings, AccountCircle, MoreVert } from '@mui/icons-material';
import logo from '../../../../public/logo.png'

function SidebarItem({ icon, text, active = false, expanded = false, subMenu = null }) {
  const [expandSubMenu, setExpandSubMenu] = useState(false);

  useEffect(() => {
    if (!expanded) {
      setExpandSubMenu(false);
    }
  }, [expanded]);

  return (
    <>
      <ListItem
        button
        onClick={() => subMenu && setExpandSubMenu(!expandSubMenu)}
        selected={active}
        sx={{
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)', // Slightly enlarge the item on hover
          },
        }}
      >
        <ListItemIcon
          sx={{
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'rotate(10deg)', // Rotate icon a little on hover
            },
          }}
        >
          {icon}
        </ListItemIcon>
        {expanded && <ListItemText primary={text} />}
        {subMenu && (expanded ? (expandSubMenu ? <ExpandLess /> : <ExpandMore />) : null)}
      </ListItem>
      {subMenu && (
        <Collapse in={expandSubMenu} timeout="auto" unmountOnExit sx={{ animation: 'bounce 0.5s ease' }}>
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

export default function Checking() {
  const [expanded, setExpanded] = useState(true);

  const navBarItems = [
    {
      icon: <Home />,
      text: 'Home',
      active: true,
    },
    {
      icon: <AccountCircle />,
      subMenu: [
        {
          icon: <AccountCircle />,
          text: 'Profile',
        },
        {
          icon: <Settings />,
          text: 'Settings',
        },
      ],
      text: 'Profile',
    },
    {
      icon: <Settings />,
      text: 'Settings',
    },
  ];

  return (
    <Box display="flex" sx={{ overflowX: 'hidden' }}>
      {/* Drawer Component */}
      <Drawer
        variant="permanent"
        open={expanded}
        sx={{
          width: expanded ? 220 : 70,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: expanded ? 180 : 70,
            boxSizing: 'border-box',
            overflow: 'hidden', // Prevent horizontal scroll on the drawer
            transition: 'width 0.3s ease', // Smooth transition for expanding and collapsing
          },
          // Making the drawer responsive
          [theme => theme.breakpoints.down('md')]: {
            width: expanded ? 200 : 60, // Reduce size for smaller screens
          },
        }}
      >
        {/* Logo and List Items */}
          {expanded ? (
        <Box display="flex" alignItems="center" justifyContent="center" p={1} mt={-2}>
            
              <div>
              <Avatar
                src={logo}
                alt="Logo"
                sx={{
                  width: expanded ? 130 : 104, // Increase logo size on expanded
                  height: expanded ? 130 : 194, // Adjust height accordingly
                }}
              />
              </div>
          </Box>
          ) : (
            <Box display="flex" alignItems="center" justifyContent="center" pl={1} mt={-1}>
  <Avatar
    src={logo}
    alt="Logo"
    sx={{
      width: expanded ? 150 : 120, // Increase logo size on expanded
      height: expanded ? 150 : 120, // Adjust height accordingly
      objectFit: 'streatch', // Ensures image fills the container but might be cut off
    }}
  />
</Box>

          )}
        
        <List>
          {navBarItems.map((item, index) => (
            <SidebarItem key={index} {...item} expanded={expanded} />
          ))}
        </List>
        {/* User Info */}
        {expanded ? (
          <Box mt="auto" p={2} display="flex" alignItems="center">
            <Avatar src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=Mark+Ruffalo" />
            {expanded && (
              <Box ml={2}>
                <Box fontWeight="bold">Mark Ruffalo</Box>
                <Box fontSize="small" color="gray">mark@gmail.com</Box>
              </Box>
            )}
            <IconButton>
              <MoreVert />
            </IconButton>
          </Box>
        ) : (
          <Box mt="auto" p={1} display="flex" alignItems="center">
            <Avatar src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=Mark+Ruffalo" />
          </Box>
        )}
      </Drawer>

      {/* Expand Button Outside Drawer */}
      <Box
        sx={{
          position: 'absolute',
          top: '11%',
          left: expanded ? 180 : 60,
          transform: 'translateY(-50%)',
          zIndex: 10,
        }}
      >
        <IconButton
          onClick={() => setExpanded(!expanded)}
          sx={{
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'rotate(180deg)', // Rotate the expand button when clicked or hovered
            },
          }}
        >
          {expanded ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>
    </Box>
  );
}

import React, { useEffect, useState } from "react";
import {
  Badge,
  IconButton,
  Popover,
  List,
  ListItem,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Stack,
  styled,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';

import axios from "../axios";

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  transition: "transform 0.2s",
  "&:hover": {
    transform: "translateX(5px)",
    cursor: "pointer",
    backgroundColor: theme.palette.grey[50],
  },
}));

const Notifications = ({ coachId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`/Getnotifications/${coachId}`);
        setNotifications(response.data.notifications);
        setUnreadCount(response.data.notifications.filter((n) => !n.is_read).length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [coachId]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const markAsRead = async (id) => {
    try {
      await axios.post(`/markNotificationAsRead/${coachId}`, { id });
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id ? { ...notification, is_read: true } : notification
        )
      );
      setUnreadCount((prev) => (prev > 0 ? prev - 1 : 0));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <IconButton
  onClick={handleClick}
  size="large"
  aria-label="show notifications"
  color="inherit"
>
  <Badge badgeContent={unreadCount} color="error">
    <NotificationsIcon className="text-black"/>
  </Badge>
</IconButton>


      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ width: 360, maxHeight: 480, overflow: "auto" }}>
          <Typography variant="h6" sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
            Notifications
          </Typography>
          <List sx={{ p: 0 }}>
            {notifications.map((notification) => (
              <ListItem key={notification.id} sx={{ p: 2 }}>
                <StyledCard
                  onClick={() => markAsRead(notification.id)}
                  sx={{
                    width: "100%",
                    bgcolor: notification.is_read ? "inherit" : "action.hover",
                  }}
                >
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar src={`http://127.0.0.1:8000/uploads/player_image/${notification.player?.image}` || ""} />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" component="div">
                          {notification.message}
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          sx={{ mt: 1 }}
                        >
                          <AccessTimeIcon size={16} />
                          <Typography variant="caption" color="text.secondary">
                            {new Intl.DateTimeFormat('en-PK', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit',
                              timeZone: 'Asia/Karachi',
                            }).format(new Date(notification.created_at))}
                          </Typography>

                          {notification.is_read ? (
                            <CheckCircleIcon
                            fontSize="small"
                            color="success"
                            style={{ marginLeft: "auto" }}
                            />
                          ) : (
                            <RadioButtonUncheckedOutlinedIcon
                            fontSize="small"
                            color="success"
                            style={{ marginLeft: "auto" }}
                            />
                          )
                            
                        }
                        </Stack>
                      </Box>
                    </Stack>
                  </CardContent>
                </StyledCard>
              </ListItem>
            ))}
          </List>
        </Box>
      </Popover>
    </Box>
  );
};

export default Notifications;

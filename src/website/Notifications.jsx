import React, { useEffect, useState } from 'react';
import axios from '../axios';

const Notifications = ({ coachId }) => {
    const [notifications, setNotifications] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`/Getnotifications/${coachId}`);
                setNotifications(response.data.notifications);
                setCount(response.data.notifications.filter(n => !n.is_read).length);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, [coachId]);

    return (
        <div>
            <h2>Notifications ({count})</h2>
            <ul>
                {notifications.map(notification => (
                    <li key={notification.id}>
                        {notification.message}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;

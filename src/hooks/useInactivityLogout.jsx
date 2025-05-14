import { useEffect, useRef } from 'react';

const useInactivityLogout = (timeout = 60000) => {
  const timer = useRef(null);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
    window.location.href = '/login';
  };

  const resetTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(logout, timeout);
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'scroll', 'click'];
    events.forEach(event => window.addEventListener(event, resetTimer));

    resetTimer(); // Initialize timer on mount

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      if (timer.current) clearTimeout(timer.current);
    };
  }, [timeout]);
};

export default useInactivityLogout;

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
// import { AppointmentProvider } from './context/AppointmentContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* <AppointmentProvider> */}
        <App />
      {/* </AppointmentProvider> */}
    </BrowserRouter>
  </StrictMode>
);

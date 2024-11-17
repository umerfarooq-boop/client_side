import './App.css';
import Signup from './Auth/Signup';
import Login from './Auth/Login';
import Otp from './Auth/Otp';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import AdminProfile from './admin/AdminProfile';
import Page from './Page';
import Profile from './profile/Profile';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Dashboard from './sidebar/Dashboard';
import NewsFeed from './sidebar/News/NewsFeed';
import AddPost from './sidebar/News/AddPost';
import Home from './website/Home';
import About from './website/About';
import CoachPost from './website/CoachPost';
import Addvedio from './sidebar/vedios/Addvedio';
import ProtectedRoute from './ProtectedRoute';
import CoachDetail from './website/CoachDetail';
// import AddPost from './sidebar/News/AddPost';

function App() {
  return (
    <>
      <Link to='/'></Link>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/otp' element={<Otp />} />
        <Route path='/coachpost' element={<CoachPost />} />
        <Route path='/page' element={<Page />} />
        <Route path='/admin-profile' element={<AdminProfile />} />
        <Route path='/coachdetail/:id' element={<CoachDetail />} />
        
        {/* Wrap the dashboard and other private routes with ProtectedRoute */}
        <Route
          path='/dashboard/*'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/vedio'
          element={
            <ProtectedRoute>
              <Addvedio />
            </ProtectedRoute>
          }
        />

        <Route
          path='/AddPost'
          element={
            <ProtectedRoute>
              <AddPost />
            </ProtectedRoute>
          }
        />

        {/* Public Profile route with a container */}
        <Route 
          path='/profile' 
          element={
            <Container fixed>
                <Profile />
            </Container>
          } 
        />
      </Routes>
    </>
  );
}

export default App;

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
// import AddPost from './sidebar/News/AddPost';

function App() {

  const authenticated = localStorage.getItem('email');

  return (
    <>
      <Link to='/'></Link>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/otp' element={<Otp />} />
        <Route path='/page' element={<Page />} />
        <Route path='/admin-profile' element={<AdminProfile />} />
        <Route path='/dashboard' element={<Dashboard />} />
        {
          authenticated ? (
            <Route path='/dashboard/*' element={<Dashboard />} />
          ):(
            <Route path='*' element={<Navigate to='/signup' />} />
          )
        }
        {/* Wrap only the Profile component in Container and Box */}
        <Route 
          path='/profile' 
          element={
            <Container fixed>
                <Profile />
            </Container>
          } 
        />
        {/* <Route path="/newsfeed" element={<NewsFeed />} />
        <Route path="/addpost" element={<AddPost />} /> */}
      </Routes>
    </>
  );
}

export default App;

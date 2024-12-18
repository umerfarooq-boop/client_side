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
import AddPost from './sidebar/News/AddPost';
import Home from './website/Home';
import About from './website/About';
import CoachPost from './website/CoachPost';
import Addvedio from './sidebar/vedios/Addvedio';
import ProtectedRoute from './ProtectedRoute';
import CoachDetail from './website/CoachDetail';
import AllCoach from './sidebar/User/Coach/AllCoach';
import ShowCoach from './sidebar/User/Coach/ShowCoach';
import EditCoach from './sidebar/User/Coach/EditCoach';
import AllPost from './sidebar/News/AllPost';
import SinglePost from './sidebar/News/SinglePost';
import Updatenews from './sidebar/News/UpdateNews';
import Contact from './website/Contact';
import HomeService from './sidebar/Menagewebsite/HomeService';
import AboutService from './sidebar/Menagewebsite/AboutService';
import AboutQuestion from './sidebar/Menagewebsite/AboutQuestion';
// import HomeSlidder from './sidebar/Menagewebsite/Homslidder/HomeSlidder';
import Index_Slidder from './sidebar/Menagewebsite/Homslidder/index_Slidder';
import AddHomeSliddder from './sidebar/Menagewebsite/Homslidder/AddHomeSlidder';
import SingleSlidder from './sidebar/Menagewebsite/Homslidder/SingleSlidder';
import EditSlidder from './sidebar/Menagewebsite/Homslidder/EditSlidder';
import Index_service from './sidebar/Menagewebsite/HomeService/Index_service';
import Single_service from './sidebar/Menagewebsite/HomeService/Single_service';
import Add_service from './sidebar/Menagewebsite/HomeService/Add_service';
import Update_service from './sidebar/Menagewebsite/HomeService/Update_service';
import Index_about_service from './sidebar/Menagewebsite/AboutService/Index_about_service';
// import AllHomeSlides from './sidebar/Menagewebsite/Homslidder/AllHomeSlides';
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
        <Route path='/contact' element={<Contact />} />
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

        /**
        * ! Working of Menage Website
        */

        <Route
          path='/addhome_slidder'
          element={
            <ProtectedRoute>
              <AddHomeSliddder />
            </ProtectedRoute>
          }
        />
        <Route
          path='/single_slidder/:id'
          element={
            <ProtectedRoute>
              <SingleSlidder />
            </ProtectedRoute>
          }
        />
        <Route
          path='/edit_slidder/:id'
          element={
            <ProtectedRoute>
              <EditSlidder />
            </ProtectedRoute>
          }
        />
        <Route
          path='/index_slides'
          element={
            <ProtectedRoute>
              <Index_Slidder />
            </ProtectedRoute>
          }
        />
        /***
        * ! Home Service Routes
        */
        <Route
          path='/index_services'
          element={
            <ProtectedRoute>
              <Index_service />
            </ProtectedRoute>
          }
        />
        <Route
          path='/add_services'
          element={
            <ProtectedRoute>
              <Add_service />
            </ProtectedRoute>
          }
        />
        <Route
          path='/single_services/:id'
          element={
            <ProtectedRoute>
              <Single_service />
            </ProtectedRoute>
          }
        />
        <Route
          path='/edit_service/:id'
          element={
            <ProtectedRoute>
              <Update_service/>
            </ProtectedRoute>
          }
        />
        /***
          * ! Home Service Routes
        */

        /***
        * ! About Service
        */

        <Route
          path='/index_about_services'
          element={
            <ProtectedRoute>
              <Index_about_service />
            </ProtectedRoute>
          }
        />

        /***
        * ! About Service
        */
        <Route
          path='/about_services'
          element={
            <ProtectedRoute>
              <AboutService />
            </ProtectedRoute>
          }
        />
        <Route
          path='/about_question'
          element={
            <ProtectedRoute>
              <AboutQuestion />
            </ProtectedRoute>
          }
        />
          

        /**
        * ! Working of Menage Website
        */


        /**
          * ? Start User Profile Route
        */
        <Route
          path='/showcoach/:id'
          element={
            <ProtectedRoute>
              <ShowCoach />
            </ProtectedRoute>
          }
        />


        <Route
          path='/editcoach/:id'
          element={
            <ProtectedRoute>
              <EditCoach />
            </ProtectedRoute>
          }
        />

        <Route
          path='/allcoach'
          element={
            <ProtectedRoute>
              <AllCoach />
            </ProtectedRoute>
          }
        />

        /**
          * ? End User Profile Route
        */

        /**
          * ? START POST RECORD
        */

        <Route
          path='/allpost'
          element={
            <ProtectedRoute>
              <AllPost />
            </ProtectedRoute>
          }
        />
        <Route
          path='/singlepost/:id'
          element={
            <ProtectedRoute>
              <SinglePost/>
            </ProtectedRoute>
          }
        />
        <Route
          path='/updatepost/:id'
          element={
            <ProtectedRoute>
              <Updatenews/>
            </ProtectedRoute>
          }
        />

        /**
          * ? END POST RECORD
        */
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

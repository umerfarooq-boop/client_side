import './App.css';
import Signup from './Auth/Signup';
import Login from './Auth/Login';
import Otp from './Auth/Otp';
import { Routes, Route, Link, Navigate, useParams } from 'react-router-dom';
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
import Add_about_service from './sidebar/Menagewebsite/AboutService/Add_about_service';
import Single_about_service from './sidebar/Menagewebsite/AboutService/Single_about_service';
import Update_about_service from './sidebar/Menagewebsite/AboutService/Update_about_service';
import Index_about_question from './sidebar/Menagewebsite/AboutQuestion/Index_about_question';
import Single_about_questioin from './sidebar/Menagewebsite/AboutQuestion/Single_about_questioin';
import Add_about_question from './sidebar/Menagewebsite/AboutQuestion/Add_about_question';
import Update_about_question from './sidebar/Menagewebsite/AboutQuestion/Update_about_question';
import Checking from './sidebar/Menagewebsite/Homslidder/Checking';
import IndexFeedback from './sidebar/Menagewebsite/ContactFeedback/IndexFeedback';
import ShowFeedback from './sidebar/Menagewebsite/ContactFeedback/ShowFeedback';
import Index_player from './sidebar/User/Player/Index_player';
import Show_player from './sidebar/User/Player/Show_player';
import Edit_player from './sidebar/User/Player/Edit_player';
import ResetPassword from './Auth/ResetPassword';
import ForgotOtp from './Auth/ForgotOtp';
import Schedule from './website/Schedule';
import PlayerRequest from './website/PlayerRequest';
import EditPlayerAppointment from './website/EditPlayerAppointment';
import { AppointmentProvider } from './context/AppointmentContext';
import ShowAttendance from './sidebar/Attendance/ShowAttendance';
// import AllHomeSlides from './sidebar/Menagewebsite/Homslidder/AllHomeSlides';
// import AddPost from './sidebar/News/AddPost';
function App() {
  const {id} = useParams();
  return (
    <>
      <Link to='/'></Link>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/otp' element={<Otp />} />
        <Route path='/resetpassword/:id' element={<ResetPassword />} />
        <Route path='/forgotPass/:id' element={<ForgotOtp />} />
        <Route path='/coachpost' element={<CoachPost />} />
        <Route path='/page' element={<Page />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/schedule/:id' element={<Schedule />} />
        <Route path='/admin-profile' element={<AdminProfile />} />
        <Route path='/coachdetail/:id' element={<CoachDetail />} />
        <Route path='/PlayerRequest/:id/:role' element={<PlayerRequest />} />
        
        {/* Wrap the dashboard and other private routes with ProtectedRoute */}
        <Route
          path='/dashboard/:id/*'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        /**
        * ! Edit Player Appointment
        */
        <Route
          path='/editplayer_appointment/:id'
          element={
            <ProtectedRoute>
              <AppointmentProvider id={id}>
                <EditPlayerAppointment id={id}/>
              </AppointmentProvider>
            </ProtectedRoute>
          }
        />
        /**
        * ! Edit Player Appointment
        */

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

        <Route
          path='/add_about_services'
          element={
            <ProtectedRoute>
              <Add_about_service />
            </ProtectedRoute>
          }
        />

        <Route
          path='/single_about_services/:id'
          element={
            <ProtectedRoute>
              <Single_about_service />
            </ProtectedRoute>
          }
        />

        <Route
          path='/update_about_services/:id'
          element={
            <ProtectedRoute>
              <Update_about_service />
            </ProtectedRoute>
          }
        />

        /***
        * ! Frequently Question
        */

        <Route
          path='/index_about_question'
          element={
            <ProtectedRoute>
              <Index_about_question />
            </ProtectedRoute>
          }
        />

        <Route
          path='/single_about_question/:id'
          element={
            <ProtectedRoute>
              <Single_about_questioin />
            </ProtectedRoute>
          }
        />

        <Route
          path='/add_about_question'
          element={
            <ProtectedRoute>
              <Add_about_question />
            </ProtectedRoute>
          }
        />

        <Route
          path='/edit_about_question/:id'
          element={
            <ProtectedRoute>
              <Update_about_question />
            </ProtectedRoute>
          }
        />

        <Route
          path='/checking'
          element={
            
              <Checking />
          }
        />

        /***
        * ! Frequently Question
        */

        /***
        * ! Contact Infromation
        */
        <Route
          path='/contact_feedback'
          element={
            <ProtectedRoute>
              <IndexFeedback />
            </ProtectedRoute>
          }
        />

        <Route
          path='/single_feedback/:id'
          element={
            <ProtectedRoute>
              <ShowFeedback />
            </ProtectedRoute>
          }
        />

        /***
        * ! Contact Infromation
        */

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
          * ? Start coach Profile Route
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
          * ? End Coach Profile Route
        */

          /***
          * ! Player Record
          */
          
          <Route
          path='/index_player'
          element={
            <ProtectedRoute>
              <Index_player />
            </ProtectedRoute>
          }
          />

          <Route
          path='/show_player/:id'
          element={
            <ProtectedRoute>
              <Show_player />
            </ProtectedRoute>
          }
          />

          <Route
          path='/edit_player/:id'
          element={
            <ProtectedRoute>
              <Edit_player />
            </ProtectedRoute>
          }
          />

          /***
          * ! Player Record
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

        <Route
          path='/AddPost'
          element={
            <ProtectedRoute>
              <AddPost />
            </ProtectedRoute>
          }
        />

        /**
          * ? END POST RECORD
        */

        /**
        * ? Vedio
        */
        <Route
          path='/vedio'
          element={
            <ProtectedRoute>
              <Addvedio />
            </ProtectedRoute>
          }
        />

        /**
        * ? Vedio
        */

        /**
        * ? Menage Attendance
        */

        <Route
          path='/showattendance/:id'
          element={
            <ProtectedRoute>
              <ShowAttendance />
            </ProtectedRoute>
          }
        />

        /**
        * ? Menage Attendance
        */
        

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

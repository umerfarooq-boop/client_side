import './App.css'
import Signup from './Auth/Signup'
import Login from './Auth/Login'
import Otp from './Auth/Otp'
import { Routes,Route,Link } from 'react-router-dom'
import AdminProfile from './admin/AdminProfile'
import PlayerProfile from './player/PlayerProfile'
import CoachProfile from './coach/CoachProfile'
function App() {

  return (
    <>
      <Link to='/'></Link>
      <Routes>
        <Route path='/' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/otp' element={<Otp/>} />
        <Route path='/admin-profile' element={<AdminProfile/>} />
        <Route path='/coach-profile' element={<CoachProfile/>} />
        <Route path='/player-profile' element={<PlayerProfile />} />
      </Routes>
    </>
  )
}

export default App

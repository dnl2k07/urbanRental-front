import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import { AuthProvider } from './context/AuthContext'
import Admin from './pages/Admin';
import ReservationDetail from './Pages/ReservationDetail';
import MyReservations from './Pages/MyReservations';
import Profile from './Pages/Profile';
import FAQ from './Pages/FAQ';
import Legal from './Pages/Legal';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/admin' element={<Admin />}/>
          <Route path='/myreservations' element={<MyReservations/>} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/car/:vehicle_id' element={<ReservationDetail />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path='/legal' element={<Legal />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)

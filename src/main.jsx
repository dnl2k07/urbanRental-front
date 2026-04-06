import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import { AuthProvider } from './context/AuthContext'
import Admin from './pages/Admin'
import ReservationDetail from './pages/ReservationDetail'

// Hello2
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/admin' element={<Admin />}/>
          <Route path='/car/:vehicle_id' element={<ReservationDetail />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)

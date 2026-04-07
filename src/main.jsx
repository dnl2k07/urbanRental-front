import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import './Design/Main.css'
import HomePage from './Pages/MainPage';
import Login from './Pages/Login';
import UserProfile from './Pages/UserProfile';
import AdminPage from './Pages/AdminPage';
import './Design/AdminCarUpload.css'
import { AuthProvider } from './context/AuthContext'
import ReservationDetail from './Pages/ReservationDetail'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Login />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path='/car/:vehicle_id' element={<ReservationDetail />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)

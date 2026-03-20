import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Design/Main.css'
import HomePage from './Pages/MainPage';
import Login from './Pages/Login';
import UserProfile from './Pages/UserProfile';
import AdminPage from './Pages/AdminPage';
import './Design/AdminCarUpload.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

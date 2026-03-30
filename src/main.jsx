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
import ReservationPage from './Pages/ReservationPage';
import MyRentals from './Pages/MyRentals';
import AdminUserManagement from './Pages/AdminUserManagement';
import AdminCategoryManagement from './Pages/AdminCategoryManagement';
import CarDetails from './Pages/CarDetails';
import FilterResults from './Pages/FilterResults';
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
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/my-rentals" element={<MyRentals />} />
        <Route path="/car/:id" element={<CarDetails />} />
        <Route path="/filter-results" element={<FilterResults />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/users" element={<AdminUserManagement />} />
        <Route path="/admin/categories" element={<AdminCategoryManagement />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

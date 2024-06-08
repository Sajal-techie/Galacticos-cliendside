import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AcademyManage from '../Components/admin/AcademyManage'
import Home_Admin from '../Components/admin/Home_Admin'
import Admin_login from '../Components/admin/Admin_login'
import RedirectIfAuthenticated from './protected/RedirectIfAuthenticated'
import ProtectedRoute from './protected/ProtectedRoute'

const AdminRoutes = () => {
  return (
    <Routes>
        <Route path="/login" element={<RedirectIfAuthenticated element={<Admin_login/>} redirectTo={'/admin/home'} />}/>
        <Route path="/home" element={<ProtectedRoute element={<Home_Admin/>} role={"admin"} />}/>
        <Route path="/academyview" element={<ProtectedRoute element={<AcademyManage/>} role={"admin"} />}/>
    </Routes>
  )
}

export default AdminRoutes

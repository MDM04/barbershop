import {Route, Routes} from "react-router-dom"
import AdminWelcomePage from "../admin/AdminWelcomepage"
import AdminLoginPage from "../admin/AdminLoginPage"
import AdminSignUpPage from "../admin/AdminSignUpPage"
import AdminForgotPassword from "../admin/AdminForgotPassword"
import AdminHomePage from "../admin/AdminHomePage"
import AdminSchedulingPage from "../admin/AdminScheduling"
import AdminBarbersPage from "../admin/AdminBarbersPage"
import AdminServicesPage from "../admin/AdminServicePage"
import AdminAnniversaryPage from "../admin/AdminAnniversaryPage"
import AdminImage from "../admin/AdminImage"

const AdminRoutes = () =>{
    return(
        <Routes>
            <Route path="/admin-welcome-page" element={<AdminWelcomePage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/admin-signup-page" element={<AdminSignUpPage />} />
            <Route path="/admin-forgot-password" element={<AdminForgotPassword />} />
            <Route path="/admin-home" element={<AdminHomePage />} />
            <Route path="/admin-scheduling" element={<AdminSchedulingPage />} />
            <Route path="/admin-barbers" element={<AdminBarbersPage />} />
            <Route path="/admin-services" element={<AdminServicesPage />} />
            <Route path="/admin-birthday" element={<AdminAnniversaryPage />} />
            <Route path="/admin-image" element={<AdminImage />} />
        </Routes>
    )
}

export default AdminRoutes
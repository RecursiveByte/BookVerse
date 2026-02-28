import { Routes, Route } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import Home from "@/pages/home/Home";
import UserLogin from "@/pages/auth/UserLogin";
import UserDashboard from "@/pages/user/UserDashboard";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import AdminLogin from "@/pages/auth/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard"

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.USER_LOGIN} element={<UserLogin />} />
      <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLogin />} />
      <Route path={ROUTES.SIGNUP} element={<Register />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />

      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.USER_DASHBOARD} element={<UserDashboard />} />
      </Route>

      <Route  >
         <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
       </Route> 

      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default AppRouter;
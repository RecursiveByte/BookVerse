import { Routes, Route } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import Home from "@/pages/home/Home";
import UserLogin from "@/pages/auth/UserLogin";
import UserDashboard from "@/pages/dashboard/UserDashboard";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";
// import Signup from "../pages/Signup";
// import AdminDashboard from "../pages/AdminDashboard";
// import AdminLogin from "../pages/AdminLogin";
// import AdminViewBooks from "../pages/AdminViewBooks";
// import CSVUploader from "../components/CsvUploader";
// import ProtectedRoute from "../components/ProtectedRoute";
// import AuthRedirector from "../components/AuthRedirector";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* <Route path={ROUTES.HOME} element={<AuthRedirector />} /> */}

      {/*  

      <Route path={ROUTES.ADMIN_DASHBOARD} element={
        <ProtectedRoute onlyAdmin={true}>
          <AdminDashboard />
        </ProtectedRoute>
      } />

      
      
      
      
      

      <Route path={ROUTES.ADMIN_VIEW_BOOKS} element={
        <ProtectedRoute>
          <AdminViewBooks />
        </ProtectedRoute>
      } />

      <Route path={ROUTES.ADMIN_ADD_BOOK} element={
        <ProtectedRoute>
          <CSVUploader />
        </ProtectedRoute>
      } />  

      
            */}

      <Route
        path={ROUTES.USER_DASHBOARD}
        element={
          // <ProtectedRoute>
          <UserDashboard />
          // </ProtectedRoute>
        }
      />
      <Route path={ROUTES.USER_LOGIN} element={<UserLogin />} />
      <Route path={ROUTES.SIGNUP} element={<Register />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
      {/* <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLogin />} /> */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default AppRouter;

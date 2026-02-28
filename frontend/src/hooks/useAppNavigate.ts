import { useNavigate } from "react-router-dom";

const useAppNavigate = () => {
  const navigate = useNavigate();

  return {
    toHome: () => navigate("/"),
    toDashboard: () => navigate("/userDashboard"),
    toAdminDashboard:()=> navigate("/adminDashboard"),
    toLogin: () => navigate("/userLogin"),
    toRegister: () => navigate("/register"),
    toForgotPassword: () => navigate("/forgot-password"),
  };
};

export default useAppNavigate;
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { checkAuth } from "@/services/auth.service";
import { showError } from "@/utils/toast";

const ProtectedRoute = () => {
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean | null;
    role: "user" | "admin" | null;
  }>({
    isAuthenticated: null,
    role: null,
  });

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await checkAuth();
        setAuthState({
          isAuthenticated: res.data.isAuthenticated ?? false,
          role: res.data.role ?? null,
        });
        
      } catch (error: any) {
        setAuthState({ isAuthenticated: false, role: null });
        if (!error.response) {
          showError("Server is unreachable. Please try again later.");
        } else if (error.response.status === 401) {
          showError("Session expired. Please login again.");
        }
      }
    };
    verify();
  }, []);

  if (authState.isAuthenticated === null)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        Loading...
      </div>
    );

  if (!authState.isAuthenticated) return <Navigate to="/userLogin" />;

  return <Outlet />;
};

export default ProtectedRoute;

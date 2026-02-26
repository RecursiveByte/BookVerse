import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { checkAuth } from "@/services/auth.service";

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
      } catch {
        setAuthState({ isAuthenticated: false, role: null });
      }
    };
    verify();
  }, []);

  if (authState.isAuthenticated === null) return <div>Loading...</div>;

  if (!authState.isAuthenticated) return <Navigate to="/userLogin" />;

  return <Outlet />;
};

export default ProtectedRoute;
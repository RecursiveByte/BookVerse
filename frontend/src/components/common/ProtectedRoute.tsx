import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { checkAuth } from "@/services/auth.service";
import { showError, showWarn } from "@/utils/toast";
import useAppNavigate from "@/hooks/useAppNavigate";

const ProtectedRoute = ({ role }: { role: "admin" | "user" }) => {

  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean | null;
    user: { id: string; role: string } | null;
  }>({
    isAuthenticated: null,
    user: null,
  });


  const {toLogin} = useAppNavigate();
  
  useEffect(() => {
    const verify = async () => {
      try {
        const res = await checkAuth();
        setAuthState({
          isAuthenticated: res.data.isAuthenticated ?? false,
          user: res.data.user,
        });
      } catch (error: any) {
        setAuthState({ isAuthenticated: false, user: null });
        if (!error.response) {
          showError("Server is unreachable. Please try again later.");
        } else if (error.response.status === 401) {
          showError("Session expired. Please login again.");
        }
      }
    };
    verify();

  }, []);

  useEffect(() => {
    if (authState.isAuthenticated === null) return;

    if (!authState.isAuthenticated || !authState.user) {
      showWarn("Please login to continue.");
      toLogin();
      return;
    }

    if (authState.user.role !== role) {
      showWarn("You are not authorized to access this page.");
      toLogin();
    }
  }, [authState]);

  if (authState.isAuthenticated === null)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        Loading...
      </div>
    );


  return <Outlet  context={{ user: authState.user }} />;
};

export default ProtectedRoute;
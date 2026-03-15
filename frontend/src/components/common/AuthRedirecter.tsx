import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "@/services/auth.service";
import { ROUTES } from "@/constants/routes";

const AuthRedirector = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await checkAuth();
        if (res.data.isAuthenticated && res.data.user) {
          setRole(res.data.user.role);
          setStatus("authenticated");
        } else {
          setStatus("unauthenticated");
        }
      } catch {
        setStatus("unauthenticated");
      }
    };
    verify();
  }, []);

  if (status === "loading") return null;

  if (status === "authenticated") {
    if (role === "admin") return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;
    return <Navigate to={ROUTES.USER_DASHBOARD} replace />;
  }

  return <>{children}</>;
};

export default AuthRedirector;
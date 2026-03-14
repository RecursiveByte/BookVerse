import { useOutletContext, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { showWarn } from "@/utils/toast";
import type { User } from "@/types/user.type";

export const useUser = () => {
  const context = useOutletContext<{ user: User } | null>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!context) {
      showWarn("You are not authorized to access this page.");
      navigate("/userLogin");
    }
  }, [context, navigate]);

  return context?.user;
};
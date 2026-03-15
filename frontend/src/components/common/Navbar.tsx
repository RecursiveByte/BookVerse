import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@/components/ui/Button";
import useAppNavigate from "@/hooks/useAppNavigate";
import { getUserDetails } from "@/services/user.service";
import { logout } from "@/services/auth.service";
import type { UserRes } from "@/types/user.type";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserRes | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toHome, toRegister, toLogin } = useAppNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserDetails();
        setUser(res);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {}
    setUser(null);
    toLogin();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] border-b border-[#1f1f1f]">
      <div className="flex items-center justify-between px-6 sm:px-10 h-16">

        <div onClick={toHome} className="flex items-center cursor-pointer">
          <span className="text-white font-black text-xl tracking-tight">BookVerse</span>
          <span className="w-2.5 h-2.5 bg-[#00e676] rounded-sm inline-block mb-0.5 ml-1" />
        </div>

        <div className="hidden sm:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background: "hsl(142,70%,45%,0.15)",
                  border: "1px solid hsl(142,70%,45%,0.3)",
                  color: "hsl(142,70%,55%)",
                }}
              >
                {user.name[0].toUpperCase()}
              </div>
              <Button label="Logout" variant="secondary" onClick={handleLogout} />
            </div>
          ) : (
            <>
              <Button label="Sign In" variant="secondary" onClick={toLogin} />
              <Button label="Sign Up" variant="primary" onClick={toRegister} />
            </>
          )}
        </div>

        <button
          className="sm:hidden flex flex-col gap-1.5 cursor-pointer p-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {isOpen && (
        <div className="sm:hidden flex flex-col gap-3 px-6 py-4 border-t border-[#1f1f1f] bg-[#0a0a0a]">
          {user ? (
            <Button label="Logout" variant="secondary" onClick={handleLogout} />
          ) : (
            <>
              <Button label="Sign In" variant="secondary" onClick={() => navigate("/userLogin")} />
              <Button label="Sign Up" variant="primary" onClick={() => navigate("/signup")} />
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
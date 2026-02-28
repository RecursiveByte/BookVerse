import { useState } from "react";
import { AdminNavItems } from "@/constants/AdminNavitems";
import { ChevronLeft,ChevronRight } from "lucide-react";

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Sidebar = ({ activePage, setActivePage }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <aside
      className={`relative h-screen flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-60"
      } bg-[hsl(var(--card))] border-r border-[hsl(var(--border))] shadow-[4px_0_20px_hsl(var(--primary)/0.08)] overflow-hidden`}
    >
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-[hsl(var(--primary)/0.12)] blur-[80px] pointer-events-none" />

      <nav className="relative z-10 flex-1 flex flex-col gap-1 px-2 py-4">
        {AdminNavItems.map(({ label, icon: Icon, key }) => {
          const isActive = activePage === key;
          return (
            <button
              key={key}
              onClick={() => setActivePage(key)}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 group
                ${
                  isActive
                    ? "bg-[hsl(var(--primary)/0.15)] text-[hsl(var(--primary))] shadow-[0_0_12px_hsl(var(--primary)/0.2)]"
                    : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--primary)/0.08)] hover:text-[hsl(var(--foreground))]"
                }`}
            >
              <Icon
                className={`shrink-0 w-4 h-4 transition-all duration-200 ${
                  isActive
                    ? "text-[hsl(var(--primary))] drop-shadow-[0_0_6px_hsl(var(--primary)/0.6)]"
                    : "group-hover:text-[hsl(var(--foreground))]"
                }`}
              />
              {!collapsed && (
                <span className="whitespace-nowrap">{label}</span>
              )}
              {isActive && (
                <span className="ml-auto w-1 h-4 rounded-full bg-[hsl(var(--primary))] shadow-[0_0_6px_hsl(var(--primary)/0.8)]" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="relative z-10 px-2 pb-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex relative bottom-20 items-center justify-center w-full h-9 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--input))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--primary)/0.1)] hover:text-[hsl(var(--primary))] hover:shadow-[0_0_10px_hsl(var(--primary)/0.2)] transition-all duration-200"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
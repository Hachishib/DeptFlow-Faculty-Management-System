import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ClipboardClock,
  Megaphone,
  ChartColumnBig,
  CircleUserRound,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

interface SidebarProps {
  onNavigate?: () => void;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    id: "manageFaculty",
    label: "Manage Faculty",
    icon: <Users size={18} />,
  },
  {
    id: "manageSchedule",
    label: "Manage Schedule",
    icon: <ClipboardClock size={18} />,
  },
  {
    id: "announcements",
    label: "Announcements",
    icon: <Megaphone size={18} />,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <ChartColumnBig size={18} />,
  },
  {
    id: "profile",
    label: "My Profile",
    icon: <CircleUserRound size={18} />,
  },
];

export default function Sidebar({ onNavigate }: SidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname.split("/");
  const [activeId, setActiveId] = useState<string>(currentPath[2]);
  const navigate = useNavigate();

  function handleNavClick(id: string) {
    setActiveId(id);
    const pathMap: Record<string, string> = {
      dashboard: "/admin/dashboard",
      announcements: "/admin/announcements",
      analytics: "/admin/analytics",
      profile: "/admin/profile",
      manageSchedule: "/admin/manage-schedule",
      manageFaculty: "/admin/manage-faculty",
    };
    navigate(pathMap[id]);
    onNavigate?.();
  }

  return (
    <aside className="w-64 h-full bg-white border-r border-stroke flex flex-col p-5 shadow-sm">
      <p className="text-xs font-bold text-gray pb-5 tracking-widest uppercase">
        Main Navigation
      </p>

      <nav className="flex flex-col gap-1 flex-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`
                relative flex items-center gap-3 px-3 py-2.5 rounded-lg
                text-sm font-medium transition-all duration-150
                w-full text-left cursor-pointer overflow-hidden
                ${
                  isActive
                    ? "bg-[#FEF2F2] text-[#880000] font-semibold"
                    : "text-darker-gray hover:bg-primary/5 hover:text-primary"
                }
              `}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-full w-[3.5px] bg-[#880000] rounded-r-full" />
              )}
              <span className={isActive ? "text-[#880000]" : "text-gray-400"}>
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/*logout*/}
      <div className="border-t border-dashed border-stroke pt-3">
        <button
          onClick={() => console.log("Logging out...")}
          className="
            flex items-center gap-3 px-3 py-2.5 rounded-lg
            text-sm font-medium text-gray-400
            hover:bg-[#FEF2F2] hover:text-[#880000]
            transition-all duration-150 w-full text-left
            cursor-pointer group
          "
        >
          <span className="text-gray-400 group-hover:text-[#880000] transition-colors">
            <LogOut size={18} />
          </span>
          Log Out
        </button>
      </div>
    </aside>
  );
}

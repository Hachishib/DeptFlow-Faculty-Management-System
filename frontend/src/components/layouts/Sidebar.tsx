import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ClipboardClock,
  Megaphone,
  ChartColumnBig,
  LogOut,
} from "lucide-react";

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    id: "manage-faculty",
    label: "Manage Faculty",
    icon: <Users size={18} />,
  },
  {
    id: "manage-schedule",
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
];

export default function Sidebar() {
  const [activeId, setActiveId] = useState<string>("dashboard");

  return (
    <aside className="w-64 h-full bg-white border-r border-stroke  flex flex-col p-5">
      <p className="text-xs font-bold text-gray pb-5 tracking-widest uppercase">
        Main Navigation
      </p>

      <nav className="flex flex-col gap-1 flex-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activeId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`
                relative flex items-center gap-3 px-3 py-2.5 rounded-lg
                text-sm font-medium transition-all duration-150
                w-full text-left cursor-pointer overflow-hidden
                ${
                  isActive
                    ? "bg-[#FEF2F2] text-primary font-semibold"
                    : "text-darker-gray hover:bg-primary/5 hover:text-primary"
                }
              `}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-full w-[3.5px] bg-primary rounded-r-full" />
              )}

              <span className={isActive ? "text-primary" : "text-gray-400"}>
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-dashed border-stroke pt-3">
        <button
          onClick={() => console.log("Logging out...")}
          className="
            flex items-center gap-3 px-3 py-2.5 rounded-lg
            text-sm font-medium text-gray-400
            hover:bg-[#FEF2F2] hover:text-primary
            transition-all duration-150 w-full text-left
            cursor-pointer group
          "
        >
          <span className="text-gray-400 group-hover:text-primary transition-colors">
            <LogOut size={18} />
          </span>
          Log Out
        </button>
      </div>
    </aside>
  );
}

import AiConflictAlert from "../../components/layouts/AIConflictAlert";
import AnnouncementCard from "../../components/layouts/AnnouncementCard";
import DashboardHeader from "../../components/layouts/DashboardHeader";
import TeachingLoadMonitor from "../../components/layouts/LoadMonitor";
import StatCard from "../../components/ui/StatCard";
import QuickActionCard from "../../components/ui/QuickActionCard";

import {Users, CalendarDays, TriangleAlert, UserPlus, CalendarPlus, Megaphone} from "lucide-react";

import announcementData from "../../mock/announcement.json";

const STAT_CARDS = [
  {
    id: "faculty",
    label: "TOTAL FACULTY",
    value: 12,
    description: "Registered this department",
    icon: <Users size={35} />,
    iconBg: "bg-[#FFF3F3]",
    valueColor: "text-primary",
    borderColor: "border-t-primary",
  },
  {
    id: "schedules",
    label: "ACTIVE SCHEDULES",
    value: 34,
    description: "Assignments this semester",
    icon: <CalendarDays size={35} />,
    iconBg: "bg-[#FFF3F3]",
    valueColor: "text-primary",
    borderColor: "border-t-primary",
  },
  {
    id: "conflicts",
    label: "CONFLICTS DETECTED",
    value: 2,
    description: "Requires immediate attention",
    icon: <TriangleAlert size={35} />,
    iconBg: "bg-[#FEF2F2]",
    valueColor: "text-primary",
    borderColor: "border-t-primary",
    hasAlert: true,
  },
];

const QUICK_ACTIONS = [
  {
    id: "add-faculty",
    label: "Add Faculty",
    sublabel: "Register new member",
    icon: <UserPlus size={24} />,
  },
  {
    id: "assign-schedule",
    label: "Assign Schedule",
    sublabel: "Set teaching load",
    icon: <CalendarPlus size={24} />,
  },

  {
    id: "post-announcement",
    label: "Post Announcement",
    sublabel: "Notify all faculty",
    icon: <Megaphone size={24} />,
  },
];


export default function AdminDashboard(){
  return (
    <div className="p-8 space-y-6 font-lexend">
      <DashboardHeader
        name="Juan Dela Cruz"
        role="Department Head"
        department="Computer Studies"
        semester="1st Semester AY 2025–2026"
      />

      <div className="grid grid-cols-3 gap-4">
        {STAT_CARDS.map((card) => (
          <StatCard key={card.id} card={card} />
        ))}
      </div>

      <AiConflictAlert />

      <div className="grid grid-cols-2 gap-4">
        <TeachingLoadMonitor />
        <AnnouncementCard announcements={announcementData} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {QUICK_ACTIONS.map((action) => (
          <QuickActionCard key={action.id} action={action} />
        ))}
      </div>
    </div>
  );
}
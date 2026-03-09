import {User, GraduationCap, Award, FlaskConical} from "lucide-react"
import type { Tab } from "../../types/profileTab";


type ProfileTabsProps = {
  activeTab: Tab;
  setActiveTab: React.Dispatch<React.SetStateAction<Tab>>;
};

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "personal", label: "Personal Info", icon: <User size={15} /> },
  { id: "education", label: "Education", icon: <GraduationCap size={15} /> },
  { id: "credentials", label: "Credentials", icon: <Award size={15} /> },
  { id: "research", label: "Research", icon: <FlaskConical size={15} /> },
];

export default function ProfileTabs({ activeTab, setActiveTab }: ProfileTabsProps) {
  return (
    <div className="flex gap-1 bg-white rounded-xl shadow-sm p-1.5 mb-4 overflow-x-auto">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 cursor-pointer flex-1 justify-center ${activeTab === tab.id ? "bg-[#FEF2F2] text-[#880000] font-semibold" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"}`}
        >
          <span
            className={
              activeTab === tab.id ? "text-[#880000]" : "text-gray-300"
            }
          >
            {tab.icon}
          </span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
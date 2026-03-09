import { useState } from "react";
import { CalendarDays, LayoutGrid, Table2 } from "lucide-react";

import type { ScheduleEntry } from "../../types/schedule";
import { SCHEDULE_COLORS } from "../../utils/scheduleHelper";

import mockScheduleData from "../../mock/schedule.json";
import TimetableView from "./TimetableView";
import CardView from "./CardView";
import SkeletonLoader from "../ui/SkeletonLoader";

type ViewMode = "timetable" | "card";

type MyScheduleProps = {
  schedule?: ScheduleEntry[];
  semester?: string;
  isLoading?: boolean;
};

const MOCK_SCHEDULE: ScheduleEntry[] = mockScheduleData;

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
      <CalendarDays size={36} className="mb-3 opacity-30" />
      <p className="text-sm font-medium">No schedule assigned yet</p>
      <p className="text-xs mt-1">Your teaching assignments will appear here</p>
    </div>
  );
}

export default function MySchedule({
  schedule = MOCK_SCHEDULE,
  semester = "1st Semester AY 2025–2026",
  isLoading = false,
}: MyScheduleProps) {
  const [view, setView] = useState<ViewMode>("timetable");

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 sm:px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-[#FFF3F3] p-2 rounded-full">
            <CalendarDays size={16} className="text-[#880000]" />
          </div>
          <div>
            <p className="text-sm sm:text-base font-bold text-gray-800">
              My Teaching Schedule
            </p>
            <p className="text-xs text-gray-400">{semester}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Legend */}
          {view === "timetable" && !isLoading && schedule.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {schedule.map((entry) => (
                <div key={entry.id} className="flex items-center gap-1.5">
                  <div
                    className={`w-2.5 h-2.5 rounded-sm border ${SCHEDULE_COLORS[entry.color]}`}
                  />
                  <span className="text-[11px] text-gray-500 whitespace-nowrap hidden sm:inline">
                    {entry.subject}
                  </span>
                  <span className="text-[11px] text-gray-500 whitespace-nowrap sm:hidden">
                    {entry.subjectCode}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* View toggle */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg shrink-0">
            <button
              onClick={() => setView("timetable")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-150 cursor-pointer ${
                view === "timetable"
                  ? "bg-white text-[#880000] shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Table2 size={13} />
              <span className="hidden sm:inline">Timetable</span>
            </button>
            <button
              onClick={() => setView("card")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-150 cursor-pointer ${
                view === "card"
                  ? "bg-white text-[#880000] shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <LayoutGrid size={13} />
              <span className="hidden sm:inline">Cards</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {isLoading ? (
          <SkeletonLoader />
        ) : schedule.length === 0 ? (
          <EmptyState />
        ) : view === "timetable" ? (
          <TimetableView schedule={schedule} />
        ) : (
          <CardView schedule={schedule} />
        )}
      </div>
    </div>
  );
}

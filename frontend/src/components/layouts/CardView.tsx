import type { ScheduleEntry } from "../../types/schedule";
import { BORDER_COLORS, SCHEDULE_COLORS } from "../../utils/scheduleHelper";

export default function CardView({ schedule }: { schedule: ScheduleEntry[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {schedule.map((entry) => (
        <div
          key={entry.id}
          className={`rounded-xl border-l-[4px] p-4 shadow-sm ${SCHEDULE_COLORS[entry.color] ?? "bg-gray-50 border-gray-300 text-gray-800"} ${BORDER_COLORS[entry.color] ?? "border-l-gray-400"}`}
        >
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="min-w-0">
              <p className="text-[11px] font-extrabold opacity-60 tracking-widest uppercase">
                {entry.subjectCode}
              </p>
              <p className="text-sm font-bold leading-snug mt-0.5 truncate">
                {entry.subject}
              </p>
            </div>
            <span className="text-[10px] font-bold px-2 py-1 bg-white/60 rounded-full whitespace-nowrap shrink-0">
              {entry.section}
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs opacity-80">
              <span className="w-10 font-semibold opacity-60 shrink-0">
                Days
              </span>
              <span>{entry.days.map((d) => d.slice(0, 3)).join(", ")}</span>
            </div>
            <div className="flex items-center gap-2 text-xs opacity-80">
              <span className="w-10 font-semibold opacity-60 shrink-0">
                Time
              </span>
              <span className="font-semibold">
                {entry.startTime} – {entry.endTime}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs opacity-80">
              <span className="w-10 font-semibold opacity-60 shrink-0">
                Room
              </span>
              <span>{entry.room}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
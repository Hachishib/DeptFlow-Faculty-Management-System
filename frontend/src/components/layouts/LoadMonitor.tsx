// ── components/layouts/TeachingLoadMonitor.tsx ───────────
//
// Accepts an optional `schedule` prop so ManageFacultyPage can pass
// a faculty member's real schedule and get accurate load numbers.
// Falls back to the JSON mock when no schedule is provided (MyProfile default).

import type { ScheduleEntry } from "../../types/schedule";

type Props = {
  schedule?: ScheduleEntry[];
  semester?: string;
};

function calcHours(schedule: ScheduleEntry[]): number {
  return schedule.reduce((sum, s) => {
    const parse = (t: string) => {
      const [hm, period] = t.split(" ");
      let [h, m] = hm.split(":").map(Number);
      if (period === "PM" && h !== 12) h += 12;
      if (period === "AM" && h === 12) h = 0;
      return h * 60 + m;
    };
    return sum + ((parse(s.endTime) - parse(s.startTime)) / 60) * s.days.length;
  }, 0);
}

export default function TeachingLoadMonitor({
  schedule,
  semester = "1st Semester AY 2025–2026",
}: Props) {
  // When schedule is provided (e.g. from ManageFacultyPage), use real data.
  // When omitted (MyProfile), show the summary cards with live-computed values.
  const hasSchedule = schedule !== undefined;
  const subjects = hasSchedule ? schedule!.length : "—";
  const hours = hasSchedule ? calcHours(schedule!).toFixed(0) : "—";

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border-t-[3px] border-t-[#880000]">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-bold text-gray-800">Teaching Load</p>
        <span className="text-[10px] text-gray-400">{semester}</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#FEF2F2] rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-[#880000]">{subjects}</p>
          <p className="text-[10px] text-gray-500 mt-0.5">Subjects</p>
        </div>
        <div className="bg-[#FEF2F2] rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-[#880000]">{hours}</p>
          <p className="text-[10px] text-gray-500 mt-0.5">Hrs / Week</p>
        </div>
      </div>
    </div>
  );
}

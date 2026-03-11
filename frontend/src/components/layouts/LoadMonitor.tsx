import facultyLoadData from "../../mock/facultyLoad.json";
import type { ScheduleEntry } from "../../types/schedule";

type FacultyLoad = {
  id: string;
  name: string;
  type: "Full Time" | "Part Time";
  units: { current: number; max: number };
};

type Props = {
  schedule?: ScheduleEntry[];
  semester?: string;
  facultyLoad?: FacultyLoad[];
  variant?: "card" | "monitor";
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

function getBarColor(current: number, max: number) {
  const pct = current / max;
  if (pct > 1) return "bg-red-500";
  if (pct >= 0.85) return "bg-amber-400";
  return "bg-emerald-400";
}

function getStatusLabel(current: number, max: number) {
  const pct = current / max;
  if (pct > 1) return { text: "Overloaded", color: "text-red-500" };
  if (pct >= 0.85) return { text: "Near maximum", color: "text-amber-500" };
  return { text: "Within range", color: "text-emerald-600" };
}

// ── Shared single-faculty card ────────────────────────────
function LoadCard({
  units,
  max,
  subjects,
  semester,
}: {
  units: number;
  max: number;
  subjects?: number;
  semester: string;
}) {
  const pct = Math.min((units / max) * 100, 100);
  const { text, color } = getStatusLabel(units, max);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-bold text-gray-700 uppercase tracking-widest">
          Teaching Load
        </p>
        <span className="text-[10px] text-gray-400">{semester}</span>
      </div>

      <div className="flex items-end justify-between mb-1.5">
        <span className="text-2xl font-bold text-[#880000]">{units}</span>
        <span className="text-xs text-gray-400">/ {max} units max</span>
      </div>
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${getBarColor(units, max)}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className={`text-[10px] mt-1.5 font-medium ${color}`}>{text}</p>

      {subjects !== undefined && (
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-400">Subjects</span>
          <span className="text-sm font-bold text-[#880000]">{subjects}</span>
        </div>
      )}
    </div>
  );
}

// ── Main export ───────────────────────────────────────────
export default function TeachingLoadMonitor({
  schedule,
  semester = "1st Semester AY 2025–2026",
  facultyLoad = facultyLoadData as FacultyLoad[],
  variant = "monitor",
}: Props) {
  const hasSchedule = schedule !== undefined;
  const myUnits = hasSchedule ? Math.round(calcHours(schedule!)) : 19;
  const myMax = 21;

  // "card" mode — just the single faculty's load (for FacultyProfileModal)
  if (variant === "card") {
    return (
      <div className="bg-white rounded-xl shadow-sm p-5 border-t-[3px] border-t-[#880000]">
        <LoadCard
          units={myUnits}
          max={myMax}
          subjects={hasSchedule ? schedule!.length : undefined}
          semester={semester}
        />
      </div>
    );
  }

  // "monitor" mode — card + full faculty list (for MyProfile sidebar)
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border-t-[3px] border-t-[#880000] space-y-5">
      <LoadCard
        units={myUnits}
        max={myMax}
        subjects={hasSchedule ? schedule!.length : undefined}
        semester={semester}
      />

      <div className="border-t border-gray-100 pt-4">
        <p className="text-xs font-bold text-gray-700 uppercase tracking-widest mb-3">
          Faculty Load Monitor
        </p>

        <div className="space-y-4">
          {facultyLoad.map((f) => {
            const pct = Math.min((f.units.current / f.units.max) * 100, 100);
            const { text, color } = getStatusLabel(
              f.units.current,
              f.units.max,
            );

            return (
              <div key={f.id}>
                <div className="flex items-center justify-between mb-1">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-700 truncate">
                      {f.name}
                    </p>
                    <p className="text-xs text-gray-400">{f.type}</p>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <span className="text-xs font-bold text-[#880000]">
                      {f.units.current}
                    </span>
                    <span className="text-xs text-gray-400">
                      {" "}
                      / {f.units.max}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${getBarColor(f.units.current, f.units.max)}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className={`text-[10px] mt-0.5 font-medium ${color}`}>
                  {text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

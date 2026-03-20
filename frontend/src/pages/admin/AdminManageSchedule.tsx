// ─────────────────────────────────────────────────────────────────────────────
// ManageSchedule.tsx
// Place this file in: src/pages/admin/ManageSchedule.tsx  (or your pages dir)
//
// This page follows the same patterns as AdminDashboard.tsx:
//   - font-lexend, text-primary, border-t-primary, Tailwind classes only
//   - lucide-react for all icons
//   - TypeScript interfaces for all data shapes
//   - Mock data at the top — swap with your API calls / Supabase queries
//
// EDITABLE SECTIONS are marked with: // ✏️ EDIT
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useMemo } from "react";
import {
  Plus, Pencil, Trash2, Search, LayoutGrid, TableProperties,
  Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, X, 
  Users, CalendarDays, BookOpen, Clock,
} from "lucide-react";

type ScheduleStatus = "draft" | "finalized";
type ConflictType   = "HARD" | "SOFT";
type ViewMode = "card" | "timetable";

interface ScheduleAssignment {
  id: string;
  faculty_id: string;
  subject_id: string;
  room_id: string;
  day: string;
  start_time: string;
  end_time: string;
  section: string;
  status: ScheduleStatus;
}

interface Faculty {
  id: string;
  avatarColor?: string;
  role?: string;
  type?: string;
  max_units?: number;
  initials?: string;
  personal: { firstName: string; lastName: string; email: string; phone: string; employeeId: string; designation: string; employmentType: string; dateHired: string; status: string };
  education?: any[];
  credentials?: any[];
  research?: any[];
  schedule?: any[];
}

const getAvatarColor = (f: ReturnType<typeof getFaculty>): string => 
  (f && 'avatarColor' in f && typeof f.avatarColor === 'string' && f.avatarColor) ? f.avatarColor : "bg-gray-400";

interface Conflict {
  id: string;
  type: ConflictType;
  label: string;
  affected: string[];
  message: string;
  suggestion: string;
  fix: { scheduleId: string; field: keyof ScheduleAssignment; value: string } | null;
  dismissed: boolean;
  applied: boolean;
}

import FACULTY_LIST from "../../mock/faculty.json";
import SUBJECT_LIST from "../../mock/subjects.json";
import ROOM_LIST from "../../mock/schedule.json";

// Transform mock schedule data to match ScheduleAssignment interface


// ✏️ EDIT — Days of the week for schedule entries
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const HOURS_PER_UNIT = 1;




// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const getFaculty = (id: string) => FACULTY_LIST.find(f => f.id === id);
const getSubject = (id: string) => SUBJECT_LIST.find(s => s.id === id);
const getRoom    = (id: string) => ROOM_LIST.find(r => r.id === id);
const getFacultyInitials = (f: ReturnType<typeof getFaculty>) => f ? `${f.personal.firstName.charAt(0)}${f.personal.lastName.charAt(0)}`.toUpperCase() : "";
const getFacultyName = (f: ReturnType<typeof getFaculty>) => f ? `${f.personal.firstName} ${f.personal.lastName}` : "Unknown Faculty";
const toMins     = (t: string)  => { const [h,m] = t.split(":").map(Number); return h*60+m; };
const overlaps   = (aS:string,aE:string,bS:string,bE:string) =>
  toMins(aS) < toMins(bE) && toMins(aE) > toMins(bS);
const getTotalUnits = (sched: ScheduleAssignment[], fid: string) =>
  sched.filter(s=>s.faculty_id===fid).reduce((n,s)=>n+(getSubject(s.subject_id)?.units||0),0);
const getFacultyMaxUnits = (f: ReturnType<typeof getFaculty>) => f ? ((f as Faculty).max_units ?? 21) : 21;
const getDurationHours = (start: string, end: string): number => {
  if (!start || !end) return 0;
  return (toMins(end) - toMins(start)) / 60;
};

const isHourUnitMatch = (start: string, end: string, units: number): boolean =>
  getDurationHours(start, end) === units * HOURS_PER_UNIT;

// ─────────────────────────────────────────────────────────────────────────────
// CONFLICT ENGINE
// ─────────────────────────────────────────────────────────────────────────────

function runConflictScan(sched: ScheduleAssignment[]): Conflict[] {
  const results: Conflict[] = [];
  const seen = new Set<string>();

  sched.forEach((a, i) => {
    sched.forEach((b, j) => {
      if (j <= i) return;
      const key = [a.id, b.id].sort().join("-");
      if (seen.has(key)) return;

      // Hard: time overlap same faculty
      if (a.faculty_id === b.faculty_id && a.day === b.day && overlaps(a.start_time,a.end_time,b.start_time,b.end_time)) {
        seen.add(key);
        const f=getFaculty(a.faculty_id), sA=getSubject(a.subject_id), sB=getSubject(b.subject_id);
        const fixDay = b.day === "Monday" ? "Wednesday" : "Monday";
        results.push({ id:`time-${key}`, type:"HARD", label:"Time Overlap", affected:[a.id,b.id],
          message:`${getFacultyName(f)} is double-booked on ${a.day}: ${sA?.code} (${a.start_time}–${a.end_time}) overlaps with ${sB?.code} (${b.start_time}–${b.end_time}).`,
          suggestion:`Reschedule ${sB?.code} (${b.section}) to ${fixDay} at the same time. No other conflicts found on that day.`,
          fix:{ scheduleId:b.id, field:"day", value:fixDay }, dismissed:false, applied:false });
      }

      // Hard: room double-booking
      if (a.room_id === b.room_id && a.day === b.day && overlaps(a.start_time,a.end_time,b.start_time,b.end_time)) {
        seen.add(key);
        const r=getRoom(a.room_id), fA=getFaculty(a.faculty_id), fB=getFaculty(b.faculty_id);
        const altRoom = ROOM_LIST.find(x => x.id !== a.room_id && x.id !== b.room_id);
        results.push({ id:`room-${key}`, type:"HARD", label:"Room Double-Booking", affected:[a.id,b.id],
          message:`${r?.room} is double-booked on ${a.day}: assigned to both ${getFacultyName(fA)} and ${getFacultyName(fB)} at overlapping times.`,
          suggestion:`Move ${getFacultyName(fB)}'s class (${getSubject(b.subject_id)?.code}) to ${altRoom?.room ?? "another available room"}.`,
          fix:{ scheduleId:b.id, field:"room_id", value:altRoom?.id ?? b.room_id }, dismissed:false, applied:false });
      }
    });

    // Hard: load overload
    const f = getFaculty(a.faculty_id);
    if (f) {
      const maxUnits = getFacultyMaxUnits(f);
      const u = getTotalUnits(sched, a.faculty_id);
      const alreadyFlagged = results.some(c=>c.label==="Load Overload"&&c.affected.includes(a.faculty_id));
      if (u > maxUnits && !alreadyFlagged) {
        const alt = FACULTY_LIST.find(x=>x.id!==f.id&&getTotalUnits(sched,x.id)+3<=(getFacultyMaxUnits(x)??0));
        results.push({ id:`overload-${a.faculty_id}`, type:"HARD", label:"Load Overload", affected:sched.filter(s=>s.faculty_id===a.faculty_id).map(s=>s.id),
          message:`${getFacultyName(f)} is assigned ${u} units — ${u-maxUnits} over their ${maxUnits}-unit max.`,
          suggestion:`Transfer ${u-maxUnits} unit(s) from ${getFacultyName(f)} to ${getFacultyName(alt) ?? "a faculty member with available capacity"}.`,
          fix:null, dismissed:false, applied:false });
      }
      // Soft: near limit
      const nearFlagged = results.some(c=>c.label==="Near Load Limit"&&c.affected.includes(a.faculty_id));
      if (u > maxUnits * 0.85 && u <= maxUnits && !nearFlagged) {
        results.push({ id:`near-${a.faculty_id}`, type:"SOFT", label:"Near Load Limit", affected:[a.faculty_id],
          message:`${getFacultyName(f)} is at ${u}/${maxUnits} units (${Math.round(u/maxUnits*100)}%). Adding more subjects risks overload.`,
          suggestion:`Avoid assigning additional subjects to ${getFacultyName(f)} this semester.`,
          fix:null, dismissed:false, applied:false });
      }
    }
  });

    // Soft: uneven distribution
    const loads = FACULTY_LIST.map(f=>({ f, u:getTotalUnits(sched,f.id), maxUnits: getFacultyMaxUnits(f) })).filter(x=>x.u>0);
    if (loads.length > 1) {
        const mx = Math.max(...loads.map(l=>l.u));
        const mn = Math.min(...loads.map(l=>l.u));
        if (mx - mn >= 6) {
        const hi = loads.find(l=>l.u===mx)!;
        const lo = loads.find(l=>l.u===mn)!;
        results.push({ id:"dist-soft", type:"SOFT", label:"Uneven Load Distribution", affected:loads.map(l=>l.f.id),
            message:`${getFacultyName(hi.f)} has ${mx} units while ${getFacultyName(lo.f)} only has ${mn} — a ${mx-mn}-unit gap.`,
            suggestion:`Consider moving one 3-unit subject from ${getFacultyName(hi.f)} to ${getFacultyName(lo.f)} for a more balanced workload.`,
            fix:null, dismissed:false, applied:false });
        }
    }
  sched.forEach(s => {
    const sub = getSubject(s.subject_id);
    if (!sub) return;
    if (!isHourUnitMatch(s.start_time, s.end_time, sub.units)) {
      const actual   = getDurationHours(s.start_time, s.end_time);
      const expected = sub.units * HOURS_PER_UNIT;
      results.push({
        id: `unithr-${s.id}`,
        type: "SOFT",
        label: "Hour–Unit Mismatch",
        affected: [s.id],
        message: `${sub.code} (${sub.units} units) for section ${s.section} is scheduled for ${actual} hr${actual !== 1 ? "s" : ""} but should be ${expected} hr${expected !== 1 ? "s" : ""} (1 unit = ${HOURS_PER_UNIT} hr).`,
        suggestion: `Adjust the time slot so the class runs for exactly ${expected} hour${expected !== 1 ? "s" : ""}. Example: if start is ${s.start_time}, set end to ${(() => { const end = toMins(s.start_time) + expected * 60; return `${String(Math.floor(end/60)).padStart(2,"0")}:${String(end%60).padStart(2,"0")}`; })()}.`,
        fix: {
          scheduleId: s.id,
          field: "end_time",
          value: (() => {
            const end = toMins(s.start_time) + expected * 60;
            return `${String(Math.floor(end / 60)).padStart(2, "0")}:${String(end % 60).padStart(2, "0")}`;
          })(),
        },
        dismissed: false,
        applied: false,
      });
    }
  });

  return results;
}

// ─────────────────────────────────────────────────────────────────────────────
// SMALL REUSABLE UI PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────

// Faculty avatar circle — uses Tailwind bg color class from Faculty.avatarColor
function Avatar({ initials, colorClass, size = "md" }: { initials:string; colorClass:string; size?:"sm"|"md"|"lg" }) {
  const sz = size === "sm" ? "w-7 h-7 text-[11px]" : size === "lg" ? "w-11 h-11 text-base" : "w-9 h-9 text-sm";
  return (
    <div className={`${sz} ${colorClass} rounded-full flex items-center justify-center text-white font-bold shrink-0`}>
      {initials}
    </div>
  );
}

// Status badge pill
function StatusBadge({ status }: { status: ScheduleStatus }) {
  return status === "finalized"
    ? <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-700"><span className="w-1.5 h-1.5 rounded-full bg-green-600 inline-block"/>Finalized</span>
    : <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block"/>Draft</span>;
}

// Conflict type badge
function ConflictBadge({ type }: { type: ConflictType }) {
  return type === "HARD"
    ? <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-700">🔴 Hard</span>
    : <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-700">🟡 Soft</span>;
}

// Input / Select wrapper — consistent with form style
const inputCls = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-white font-lexend";

// ─────────────────────────────────────────────────────────────────────────────
// MODAL WRAPPER
// ─────────────────────────────────────────────────────────────────────────────

function Modal({ title, onClose, maxWidth="max-w-lg", children }: { title:string; onClose:()=>void; maxWidth?:string; children:React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className={`bg-white rounded-2xl w-full ${maxWidth} max-h-[90vh] overflow-y-auto shadow-2xl font-lexend`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
            <X size={16}/>
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────
// CLOCK TIME PICKER
// ─────────────────────────────────────────────────────────────────────────────

function TimePickerClock({
  value,
  onChange,
  minTime,
  placeholder = "Select time...",
}: {
  value: string;
  onChange: (val: string) => void;
  minTime?: string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"hour" | "minute">("hour");

  // Parse "HH:mm" string into hours and minutes
  const parseTime = (t: string) => {
    if (!t) return { h: 7, m: 0 };
    const [h, m] = t.split(":").map(Number);
    return { h, m };
  };

  const { h, m } = parseTime(value);
  const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
  const ampm: "AM" | "PM" = h < 12 ? "AM" : "PM";

  // Build "HH:mm" from display hour (1-12), AM/PM, and minutes
  const buildTime = (dh: number, period: "AM" | "PM", mins: number): string => {
    let h24 = dh;
    if (period === "PM" && dh !== 12) h24 = dh + 12;
    if (period === "AM" && dh === 12) h24 = 0;
    return `${String(h24).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  };

  const selectHour = (hour: number) => {
    onChange(buildTime(hour, ampm, m));
    setMode("minute");
  };

  const selectMinute = (min: number) => {
    onChange(buildTime(displayHour, ampm, min));
    setOpen(false);
    setMode("hour");
  };

  const toggleAmPm = (period: "AM" | "PM") => {
    onChange(buildTime(displayHour, period, m));
  };

  // Check if resulting time is below minTime
  const isBelowMin = (newVal: string) => {
    if (!minTime || !newVal) return false;
    return newVal <= minTime;
  };

  // Clock geometry
  const SIZE    = 208;
  const CENTER  = SIZE / 2;
  const RADIUS  = 78;
  const BTN     = 32; // button diameter

  const getPos = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    return {
      x: CENTER + RADIUS * Math.cos(angle) - BTN / 2,
      y: CENTER + RADIUS * Math.sin(angle) - BTN / 2,
    };
  };

  const handRotation = mode === "hour"
    ? ((displayHour % 12) / 12) * 360
    : (m / 60) * 360;

  const handLength = RADIUS - 14;
  const displayValue = value
    ? `${String(displayHour).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`
    : null;

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => { setOpen(o => !o); setMode("hour"); }}
        className={`${inputCls} flex items-center justify-between gap-2`}
      >
        <span className={displayValue ? "text-gray-800" : "text-gray-400"}>
          {displayValue ?? placeholder}
        </span>
        <Clock size={15} className="text-gray-400 shrink-0" />
      </button>

      {/* Popover */}
      {open && (
        <div className="absolute top-full left-0 mt-1.5 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 p-4 w-[232px]">

          {/* Time display row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setMode("hour")}
                className={`text-[22px] font-black px-1.5 py-0.5 rounded-lg transition-colors
                  ${mode === "hour" ? "bg-[#FFF3F3] text-primary" : "text-gray-400 hover:bg-gray-50"}`}
              >
                {String(displayHour).padStart(2, "0")}
              </button>
              <span className="text-[22px] font-black text-gray-200 select-none">:</span>
              <button
                onClick={() => setMode("minute")}
                className={`text-[22px] font-black px-1.5 py-0.5 rounded-lg transition-colors
                  ${mode === "minute" ? "bg-[#FFF3F3] text-primary" : "text-gray-400 hover:bg-gray-50"}`}
              >
                {String(m).padStart(2, "0")}
              </button>
            </div>
            {/* AM / PM toggle */}
            <div className="flex flex-col gap-1">
              {(["AM", "PM"] as const).map(period => (
                <button
                  key={period}
                  onClick={() => toggleAmPm(period)}
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-lg transition-colors
                    ${ampm === period ? "bg-primary text-white" : "text-gray-400 hover:bg-gray-100"}`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* Mode label */}
          <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest font-semibold mb-2">
            {mode === "hour" ? "Select Hour" : "Select Minute"}
          </p>

          {/* Clock face */}
          <div className="relative mx-auto" style={{ width: SIZE, height: SIZE }}>
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full bg-gray-50 border-2 border-gray-100" />

            {/* Tick marks */}
            {Array.from({ length: 60 }).map((_, i) => {
              const angle = (i / 60) * 360;
              const isMajor = i % 5 === 0;
              return (
                <div
                  key={i}
                  className={`absolute ${isMajor ? "bg-gray-300" : "bg-gray-200"}`}
                  style={{
                    width:  isMajor ? 2 : 1,
                    height: isMajor ? 8 : 5,
                    left:   CENTER - (isMajor ? 1 : 0.5),
                    top:    6,
                    transformOrigin: `50% ${CENTER - 6}px`,
                    transform: `rotate(${angle}deg)`,
                  }}
                />
              );
            })}

            {/* Clock hand */}
            <div
              className="absolute bg-primary rounded-full"
              style={{
                width:          3,
                height:         handLength,
                left:           CENTER - 1.5,
                top:            CENTER - handLength,
                transformOrigin: "50% 100%",
                transform:      `rotate(${handRotation}deg)`,
                transition:     "transform 0.15s ease",
              }}
            />

            {/* Hand base dot */}
            <div
              className="absolute bg-primary rounded-full z-10"
              style={{ width: 8, height: 8, left: CENTER - 4, top: CENTER - 4 }}
            />

            {/* Hour numbers */}
            {mode === "hour" &&
              [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((hour, idx) => {
                const pos = getPos(idx, 12);
                const isSelected = hour === displayHour;
                const wouldBeInvalid = isBelowMin(buildTime(hour, ampm, m));
                return (
                  <button
                    key={hour}
                    onClick={() => !wouldBeInvalid && selectHour(hour)}
                    disabled={wouldBeInvalid}
                    className={`absolute w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center transition-all
                      ${isSelected
                        ? "bg-primary text-white shadow-md scale-110"
                        : wouldBeInvalid
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-700 hover:bg-[#FFF3F3] hover:text-primary"
                      }`}
                    style={{ left: pos.x, top: pos.y }}
                  >
                    {hour}
                  </button>
                );
              })}

            {/* Minute markers */}
            {mode === "minute" &&
              [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((min, idx) => {
                const pos = getPos(idx, 12);
                const isSelected = m === min;
                const wouldBeInvalid = isBelowMin(buildTime(displayHour, ampm, min));
                return (
                  <button
                    key={min}
                    onClick={() => !wouldBeInvalid && selectMinute(min)}
                    disabled={wouldBeInvalid}
                    className={`absolute w-8 h-8 rounded-full text-[11px] font-bold flex items-center justify-center transition-all
                      ${isSelected
                        ? "bg-primary text-white shadow-md scale-110"
                        : wouldBeInvalid
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-700 hover:bg-[#FFF3F3] hover:text-primary"
                      }`}
                    style={{ left: pos.x, top: pos.y }}
                  >
                    {String(min).padStart(2, "0")}
                  </button>
                );
              })}
          </div>

          {/* Confirm button (minute mode only) */}
          {mode === "minute" && (
            <button
              onClick={() => { setOpen(false); setMode("hour"); }}
              className="w-full mt-3 py-2 bg-primary hover:bg-primary/90 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Confirm Time
            </button>
          )}
        </div>
      )}
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────
// FORM MODAL (Add / Edit)
// ─────────────────────────────────────────────────────────────────────────────

const EMPTY_FORM: Omit<ScheduleAssignment,"id"> = {
  faculty_id:"", subject_id:"", room_id:"", day:"", start_time:"", end_time:"", section:"", status:"draft",
};

function ScheduleFormModal({ editing, onSave, onClose }: {
  editing: ScheduleAssignment | null;
  onSave: (entry: ScheduleAssignment) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Omit<ScheduleAssignment,"id">>(editing ? { ...editing } : { ...EMPTY_FORM });
  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }));
  const isValid = !!(form.faculty_id && form.subject_id && form.room_id && form.day && form.start_time && form.end_time && form.section);
  const selectedSubject = getSubject(form.subject_id);
  const durationHours   = getDurationHours(form.start_time, form.end_time);
  const hoursMismatch   = !!(form.start_time && form.end_time && selectedSubject && !isHourUnitMatch(form.start_time, form.end_time, selectedSubject.units));

  return (
    <Modal title={editing ? "Edit Assignment" : "Add Assignment"} onClose={onClose}>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3">

        {/* Faculty */}
        <div className="col-span-2">
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Faculty Member <span className="text-red-500">*</span></label>
          <select className={inputCls} value={form.faculty_id} onChange={e=>set("faculty_id",e.target.value)}>
            <option value="">Select faculty...</option>
            {FACULTY_LIST.map(f=><option key={f.id} value={f.id}>{f.personal.firstName} {f.personal.lastName}</option>)}
          </select>
        </div>

        {/* Subject */}
        <div className="col-span-2">
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Subject <span className="text-red-500">*</span></label>
          <select className={inputCls} value={form.subject_id} onChange={e=>set("subject_id",e.target.value)}>
            <option value="">Select subject...</option>
            {SUBJECT_LIST.map(s=><option key={s.id} value={s.id}>{s.code} — {s.name} ({s.units} units)</option>)}
          </select>
        </div>

        {/* Section */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Section <span className="text-red-500">*</span></label>
          <input className={inputCls} placeholder="e.g. BSIT-2A" value={form.section} onChange={e=>set("section",e.target.value)}/>
        </div>

        {/* Room */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Room <span className="text-red-500">*</span></label>
          <select className={inputCls} value={form.room_id} onChange={e=>set("room_id",e.target.value)}>
            <option value="">Select room...</option>
            {ROOM_LIST.map(r=><option key={r.id} value={r.id}>{r.room}</option>)}
          </select>
        </div>

        {/* Day */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Day <span className="text-red-500">*</span></label>
          <select className={inputCls} value={form.day} onChange={e=>set("day",e.target.value)}>
            <option value="">Select day...</option>
            {DAYS.map(d=><option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        {/* Start Time */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Start Time <span className="text-red-500">*</span></label>
          <TimePickerClock
            value={form.start_time}
            onChange={val => { set("start_time", val); set("end_time", ""); }}
            placeholder="Select start time..."
          />
        </div>

        {/* End Time */}
        <div className="col-span-2">
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">End Time <span className="text-red-500">*</span></label>
          <TimePickerClock
            value={form.end_time}
            onChange={val => set("end_time", val)}
            minTime={form.start_time}
            placeholder="Select end time..."
          />
        </div>
      </div>

      {/* Info note */}
      {/* Hour / unit mismatch warning */}
      {hoursMismatch && selectedSubject && (
        <div className="mt-4 flex gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
          <AlertTriangle size={14} className="shrink-0 mt-0.5"/>
          <span>
            <strong>{selectedSubject.code}</strong> is {selectedSubject.units} unit{selectedSubject.units !== 1 ? "s" : ""} — requires exactly <strong>{selectedSubject.units * HOURS_PER_UNIT} hr{selectedSubject.units !== 1 ? "s" : ""}</strong> of class time (1 unit = {HOURS_PER_UNIT} hr). Current slot is <strong>{durationHours} hr{durationHours !== 1 ? "s" : ""}</strong>.
          </span>
        </div>
      )}

      {/* Hour / unit match confirmation */}
      {!hoursMismatch && form.start_time && form.end_time && selectedSubject && (
        <div className="mt-4 flex gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-xs text-green-700">
          <CheckCircle2 size={14} className="shrink-0 mt-0.5"/>
          <span>
            Time slot matches — <strong>{durationHours} hr{durationHours !== 1 ? "s" : ""}</strong> assigned for a <strong>{selectedSubject.units}-unit</strong> subject. ✓
          </span>
        </div>
      )}

      {/* Info note */}
      <div className="mt-2 flex gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
        <AlertTriangle size={14} className="shrink-0 mt-0.5"/>
        <span>Conflict detection runs on the full schedule. Add all assignments first, then click <strong>Run AI Conflict Scan</strong>.</span>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-5">
        <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button
          onClick={() => isValid && onSave({ ...form, id: editing?.id ?? String(Date.now()) } as ScheduleAssignment)}
          disabled={!isValid}
          className={`flex-[2] py-2.5 rounded-xl text-sm font-semibold text-white transition-colors ${isValid ? "bg-primary hover:bg-primary/90" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
          {editing ? "Save Changes" : "Add to Draft Schedule"}
        </button>
      </div>
    </Modal>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DELETE CONFIRM MODAL
// ─────────────────────────────────────────────────────────────────────────────

function DeleteModal({ schedule, onConfirm, onClose }: { schedule:ScheduleAssignment; onConfirm:()=>void; onClose:()=>void }) {
  const f = getFaculty(schedule.faculty_id);
  const s = getSubject(schedule.subject_id);
  return (
    <Modal title="Remove Assignment" onClose={onClose} maxWidth="max-w-sm">
      <div className="text-center py-2">
        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
          <Trash2 size={22}/>
        </div>
        <p className="font-bold text-gray-900 mb-2">Remove this assignment?</p>
        <p className="text-sm text-gray-500 leading-relaxed">
          <span className="font-semibold text-gray-700">{s?.code} — {s?.name}</span><br/>
          Assigned to <span className="font-semibold">{getFacultyName(f)}</span> on <span className="font-semibold">{schedule.day}</span> ({schedule.start_time}–{schedule.end_time})
        </p>
        <p className="text-xs text-red-500 mt-2">This action cannot be undone.</p>
      </div>
      <div className="flex gap-3 mt-5">
        <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
        <button onClick={onConfirm} className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 rounded-xl text-sm font-semibold text-white transition-colors">Remove</button>
      </div>
    </Modal>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONFLICT CARD (inside scan results modal)
// ─────────────────────────────────────────────────────────────────────────────

function ConflictCard({ c, onApply, onDismiss }: { c:Conflict; onApply:((c:Conflict)=>void)|null; onDismiss:((id:string)=>void)|null }) {
  const isHard = c.type === "HARD";
  return (
    <div className={`rounded-xl border p-4 mb-3 ${isHard ? "bg-red-50 border-red-200" : "bg-amber-50 border-amber-200"}`}>
      {/* Header */}
      <div className="flex items-start gap-3">
        <AlertTriangle size={16} className={`shrink-0 mt-0.5 ${isHard ? "text-red-500" : "text-amber-500"}`}/>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <ConflictBadge type={c.type}/>
            <span className={`text-xs font-bold ${isHard ? "text-red-700" : "text-amber-700"}`}>{c.label}</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">{c.message}</p>

          {/* AI suggestion box */}
          <div className="bg-white/70 border border-gray-200 rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Sparkles size={11} className="text-violet-600"/>
              <span className="text-[11px] font-bold text-violet-700 uppercase tracking-wide">AI Suggested Fix</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{c.suggestion}</p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 mt-3">
        {onApply && (
          <button onClick={()=>onApply(c)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold text-white transition-colors ${isHard ? "bg-primary hover:bg-primary/90" : "bg-violet-600 hover:bg-violet-700"}`}>
            <ShieldCheck size={13}/> Apply Suggestion
          </button>
        )}
        {onDismiss && (
          <button onClick={()=>onDismiss(c.id)} className="flex-1 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors">
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AI CONFLICT SCAN RESULTS MODAL
// ─────────────────────────────────────────────────────────────────────────────

function ConflictScanModal({ initialConflicts, onApplyFix, onClose, onFinalize }: {
  initialConflicts: Conflict[];
  onApplyFix: (fix: Conflict["fix"]) => void;
  onClose: () => void;
  onFinalize: () => void;
}) {
  const [conflicts, setConflicts] = useState<Conflict[]>(initialConflicts);
  const hard     = conflicts.filter(c=>c.type==="HARD"&&!c.dismissed&&!c.applied);
  const soft     = conflicts.filter(c=>c.type==="SOFT"&&!c.dismissed&&!c.applied);
  const resolved = conflicts.filter(c=>c.dismissed||c.applied);
  const canFinalize = hard.length === 0;

  const handleApply   = (c: Conflict) => { onApplyFix(c.fix); setConflicts(p=>p.map(x=>x.id===c.id?{...x,applied:true}:x)); };
  const handleDismiss = (id: string)  => setConflicts(p=>p.map(c=>c.id===id?{...c,dismissed:true}:c));

  return (
    <Modal title="AI Conflict Scan Results" onClose={onClose} maxWidth="max-w-2xl">
      {/* Summary row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className={`rounded-xl border p-4 text-center ${hard.length ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"}`}>
          <div className={`text-3xl font-black ${hard.length ? "text-red-600" : "text-green-600"}`}>{hard.length}</div>
          <div className={`text-xs font-bold mt-1 ${hard.length ? "text-red-600" : "text-green-600"}`}>Hard Conflicts</div>
        </div>
        <div className={`rounded-xl border p-4 text-center ${soft.length ? "bg-amber-50 border-amber-200" : "bg-gray-50 border-gray-200"}`}>
          <div className={`text-3xl font-black ${soft.length ? "text-amber-600" : "text-gray-400"}`}>{soft.length}</div>
          <div className={`text-xs font-bold mt-1 ${soft.length ? "text-amber-600" : "text-gray-400"}`}>Soft Warnings</div>
        </div>
        <div className="rounded-xl border border-violet-200 bg-violet-50 p-4 text-center">
          <div className="text-3xl font-black text-violet-600">{resolved.length}</div>
          <div className="text-xs font-bold text-violet-600 mt-1">Resolved</div>
        </div>
      </div>

      {/* Hard conflicts */}
      {hard.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-bold text-red-600 flex items-center gap-1.5 mb-3">
            <AlertTriangle size={13}/> Hard Conflicts — must be resolved before finalizing
          </p>
          {hard.map(c=><ConflictCard key={c.id} c={c} onApply={c.fix ? handleApply : null} onDismiss={null}/>)}
        </div>
      )}

      {/* Soft warnings */}
      {soft.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-bold text-amber-600 flex items-center gap-1.5 mb-3">
            <AlertTriangle size={13}/> Soft Warnings — can be dismissed
          </p>
          {soft.map(c=><ConflictCard key={c.id} c={c} onApply={c.fix ? handleApply : null} onDismiss={handleDismiss}/>)}
        </div>
      )}

      {/* All clear */}
      {hard.length === 0 && soft.length === 0 && (
        <div className="flex flex-col items-center py-8 gap-3">
          <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-green-600">
            <CheckCircle2 size={28}/>
          </div>
          <p className="font-bold text-gray-900">No conflicts remaining!</p>
          <p className="text-sm text-gray-500">The schedule is clear and ready to finalize.</p>
        </div>
      )}

      {/* Resolved list */}
      {resolved.length > 0 && (
        <div className="border-t border-gray-100 pt-4 mt-2">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Resolved</p>
          {resolved.map(c=>(
            <div key={c.id} className="flex items-center gap-2 py-2 px-3 bg-gray-50 rounded-lg mb-1.5 text-xs text-gray-500">
              <CheckCircle2 size={13} className="text-green-500"/>{c.label} — {c.applied?"Fix applied":"Dismissed"}
            </div>
          ))}
        </div>
      )}

      {/* Finalize button */}
      <div className="mt-5 pt-4 border-t border-gray-100">
        <button onClick={()=>canFinalize&&onFinalize()} disabled={!canFinalize}
          className={`w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors ${canFinalize ? "bg-primary text-white hover:bg-primary/90" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
          <ShieldCheck size={16}/>
          {canFinalize ? "Finalize & Publish Schedule" : `Resolve ${hard.length} hard conflict${hard.length!==1?"s":""} to finalize`}
        </button>
      </div>
    </Modal>
  );
}

/// ─────────────────────────────────────────────────────────────────────────────
// CARD VIEW
// ─────────────────────────────────────────────────────────────────────────────

function CardView({ data, onEdit, onDelete }: { data:ScheduleAssignment[]; onEdit:(s:ScheduleAssignment)=>void; onDelete:(s:ScheduleAssignment)=>void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map(s=>{
        const f=getFaculty(s.faculty_id),sub=getSubject(s.subject_id),r=getRoom(s.room_id);
        return (
          <div key={s.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
            {/* Colored top accent — dynamically matched to faculty color */}
            <div className={`h-1.5 ${getAvatarColor(f)}`}/>
            <div className="p-4">
              {/* Faculty row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <Avatar initials={getFacultyInitials(f)} colorClass={getAvatarColor(f)} size="sm"/>
                  <div>
                    <p className="text-xs font-bold text-gray-900">{getFacultyName(f)}</p>
                    <p className="text-[11px] text-gray-400">{f?.personal.designation}</p>
                  </div>
                </div>
                <StatusBadge status={s.status}/>
              </div>

              {/* Subject block */}
              <div className="bg-gray-50 rounded-xl p-3 mb-3">
                <p className="text-sm font-black text-primary">{sub?.code}</p>
                <p className="text-xs text-gray-700 mt-0.5">{sub?.name}</p>
                <p className="text-[11px] text-gray-400 mt-1">{sub?.units} units · {s.section}</p>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                {[["Day", s.day], ["Time", `${s.start_time}–${s.end_time}`]].map(([k,v])=>(
                  <div key={k} className="bg-gray-50 rounded-lg p-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{k}</p>
                    <p className="text-xs font-semibold text-gray-700 mt-0.5">{v}</p>
                  </div>
                ))}
                <div className="col-span-2 bg-gray-50 rounded-lg p-2">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Room</p>
                      <p className="text-xs font-semibold text-gray-700 mt-0.5">{r?.room}</p>
                    </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button onClick={()=>onEdit(s)} className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                  <Pencil size={12}/> Edit
                </button>
                <button onClick={()=>onDelete(s)} className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-red-200 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors">
                  <Trash2 size={12}/> Remove
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TIMETABLE VIEW
// ─────────────────────────────────────────────────────────────────────────────

// ✏️ EDIT — timetable slot height in pixels and start hour
const SLOT_H  = 56;
const START_H = 7; // 07:00
const TIME_LABELS = ["07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"];

function TimetableView({ data, onEdit, onDelete }: { data:ScheduleAssignment[]; onEdit:(s:ScheduleAssignment)=>void; onDelete:(s:ScheduleAssignment)=>void }) {
  const byDay = useMemo(()=>{
    const m: Record<string,ScheduleAssignment[]> = {};
    DAYS.forEach(d=>{ m[d]=[]; });
    data.forEach(s=>{ if(m[s.day]) m[s.day].push(s); });
    return m;
  },[data]);

  const top = (t:string) => (toMins(t) - START_H*60) / 60 * SLOT_H;
  const height = (s:string, e:string) => Math.max((toMins(e)-toMins(s))/60*SLOT_H - 4, 28);

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
      {/* Day headers */}
      <div className="grid border-b border-gray-100 sticky top-0 bg-white z-10" style={{ gridTemplateColumns:"52px repeat(5,1fr)" }}>
        <div className="border-r border-gray-100"/>
        {DAYS.map(d=>(
          <div key={d} className="py-3 text-center text-xs font-bold text-gray-700 border-r border-gray-100">{d.slice(0,3)}</div>
        ))}
      </div>

      {/* Grid body */}
      <div className="grid" style={{ gridTemplateColumns:"52px repeat(5,1fr)" }}>
        {/* Time labels column */}
        <div className="border-r border-gray-100">
          {TIME_LABELS.map(t=>(
            <div key={t} style={{ height:SLOT_H }} className="flex items-start justify-end pr-2 pt-1 text-[10px] text-gray-400 font-medium border-b border-gray-50">{t}</div>
          ))}
        </div>

        {/* Day columns */}
        {DAYS.map(day=>(
          <div key={day} className="relative border-r border-gray-100">
            {/* Background slot rows */}
            {TIME_LABELS.map((t,i)=>(
              <div key={t} style={{ height:SLOT_H }} className={`border-b ${i%2===0?"border-gray-100":"border-dashed border-gray-50"} ${i%2!==0?"bg-gray-50/40":""}`}/>
            ))}

            {/* Assignment blocks */}
            {byDay[day].map(s=>{
              const f=getFaculty(s.faculty_id), sub=getSubject(s.subject_id);
              const blockH = height(s.start_time, s.end_time);
              return (
                <div key={s.id}
                  // ✏️ EDIT — block colors use inline opacity trickery since faculty colors are Tailwind classes
                  // If you switch to hex values in Faculty, use: background:`${f.color}18`, borderLeft:`3px solid ${f.color}`
                  className="absolute left-1 right-1 rounded-lg px-2 py-1 overflow-hidden cursor-pointer group border-l-2 border-l-primary bg-[#FFF3F3] hover:bg-[#FFE8E8] transition-colors"
                  onMouseEnter={e=>(e.currentTarget.style.zIndex="5")}
                  onMouseLeave={e=>(e.currentTarget.style.zIndex="2")}
                  style={{ top: top(s.start_time)+2, height:blockH, zIndex:2 }}>
                  <p className="text-[10px] font-black text-primary truncate">{sub?.code}</p>
                  {blockH > 38 && <p className="text-[9px] text-gray-600 truncate">{getFacultyInitials(f)} · {s.section}</p>}
                  {blockH > 56 && <p className="text-[9px] text-gray-400">{s.start_time}–{s.end_time}</p>}
                  {blockH > 72 && <p className="text-[9px] text-gray-400 truncate">📍 {getRoom(s.room_id)?.room ?? "No room"}</p>}
                  {blockH > 74 && (
                    <div className="flex gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={e=>{e.stopPropagation();onEdit(s);}} className="flex-1 bg-primary text-white text-[9px] font-bold rounded py-0.5">Edit</button>
                      <button onClick={e=>{e.stopPropagation();onDelete(s);}} className="flex-1 bg-red-500 text-white text-[9px] font-bold rounded py-0.5">Del</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="px-4 py-3 border-t border-gray-100 flex flex-wrap gap-4">
            {FACULTY_LIST.map(f=>(
            <div key={f.id} className="flex items-center gap-1.5 text-xs text-gray-600">
                <div className={`w-2.5 h-2.5 rounded-sm ${getAvatarColor(f)}`}/>
                {getFacultyName(f)}
            </div>
            ))}
        </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LOAD MONITOR SIDEBAR
// ─────────────────────────────────────────────────────────────────────────────

function LoadMonitorPanel({ sched }: { sched: ScheduleAssignment[] }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4">
      <p className="text-sm font-bold text-gray-900 mb-0.5">Load Monitor</p>
      <p className="text-xs text-gray-400 mb-4">Units assigned this semester</p>

      <div className="space-y-4">
        {FACULTY_LIST.map(f=>{
          const u = getTotalUnits(sched, f.id);
          const maxUnits = getFacultyMaxUnits(f);
          const pct = Math.min(u/maxUnits*100, 100);
          const barColor = pct >= 100 ? "bg-red-500" : pct >= 85 ? "bg-amber-400" : "bg-green-500";
          const valColor = pct >= 100 ? "text-red-600" : pct >= 85 ? "text-amber-600" : "text-green-600";
          return (
            <div key={f.id}>
              <div className="flex items-center gap-2 mb-1.5">
                <Avatar initials={getFacultyInitials(f)} colorClass={getAvatarColor(f)} size="sm"/>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900 truncate">{getFacultyName(f)}</p>
                  <p className="text-[10px] text-gray-400">{f.personal.employmentType}</p>
                </div>
                <span className={`text-sm font-black ${valColor}`}>
                  {u}<span className="text-[10px] text-gray-400 font-normal">/{maxUnits}</span>
                </span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${barColor} rounded-full transition-all duration-500`} style={{ width:`${pct}%` }}/>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 p-3 bg-gray-50 rounded-xl text-[11px] text-gray-500 leading-loose">
        🟢 Under 85% — Balanced<br/>
        🟡 85–99% — Near limit<br/>
        🔴 100%+ — Overloaded
      </div>
      <div className="mt-2 p-3 bg-[#FFF3F3] border border-primary/10 rounded-xl text-[11px] text-gray-500 leading-loose">
        <p className="font-bold text-primary mb-1">Unit/Hour Rule</p>
        1 unit = {HOURS_PER_UNIT} hr of class time<br/>
        Exceeding this flags a <span className="font-bold text-red-600">Hard Conflict</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STAT CARD (local, matches StatCard pattern from AdminDashboard)
// ─────────────────────────────────────────────────────────────────────────────

function ScheduleStatCard({ label, value, icon, sub }: { label:string; value:number; icon:React.ReactNode; sub?:string }) {
  return (
    <div className="bg-white border-t-4 border-t-primary rounded-xl p-4 flex items-start gap-3 shadow-sm">
      <div className="bg-[#FFF3F3] p-2.5 rounded-lg text-primary">{icon}</div>
      <div>
        <p className="text-xs font-bold text-gray-400 tracking-wider">{label}</p>
        <p className="text-2xl font-black text-primary leading-tight">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function ManageSchedule() {
  // ── State ──────────────────────────────────────────────────────────────────
  const [schedules,  setSchedules]  = useState<ScheduleAssignment[]>([]);
  const [view,       setView]       = useState<ViewMode>("card");
  const [search,     setSearch]     = useState("");
  const [filterDay,  setFilterDay]  = useState("All");
  const [filterFac,  setFilterFac]  = useState("All");
  const [modal,      setModal]      = useState<"add"|"edit"|"delete"|"scan"|null>(null);
  const [selected,   setSelected]   = useState<ScheduleAssignment|null>(null);
  const [conflicts,  setConflicts]  = useState<Conflict[]>([]);
  const [scanning,   setScanning]   = useState(false);
  const [scanned,    setScanned]    = useState(false);

  // ── Derived values ─────────────────────────────────────────────────────────
  const drafts    = schedules.filter(s=>s.status==="draft").length;
  const finalized = schedules.filter(s=>s.status==="finalized").length;

  const filtered = useMemo(()=>schedules.filter(s=>{
    const f=getFaculty(s.faculty_id), sub=getSubject(s.subject_id), q=search.toLowerCase();
    return (
      (!search || getFacultyName(f).toLowerCase().includes(q) || sub?.name.toLowerCase().includes(q) || sub?.code.toLowerCase().includes(q) || s.section.toLowerCase().includes(q)) &&
      (filterDay==="All" || s.day===filterDay) &&
      (filterFac==="All" || s.faculty_id===filterFac)
    );
  }), [schedules, search, filterDay, filterFac]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const openEdit   = (s:ScheduleAssignment) => { setSelected(s); setModal("edit");   };
  const openDelete = (s:ScheduleAssignment) => { setSelected(s); setModal("delete"); };
  const closeModal = () => { setModal(null); setSelected(null); };

  const handleSave = (entry: ScheduleAssignment) => {
    setSchedules(p => modal==="edit" ? p.map(s=>s.id===entry.id?entry:s) : [...p,entry]);
    setScanned(false);
    closeModal();
  };

  const handleDelete = () => {
    if (!selected) return;
    setSchedules(p=>p.filter(s=>s.id!==selected.id));
    setScanned(false);
    closeModal();
  };

  const handleApplyFix = (fix: Conflict["fix"]) => {
    if (!fix) return;
    setSchedules(p=>p.map(s=>s.id===fix.scheduleId ? { ...s, [fix.field]:fix.value } : s));
  };

  const handleFinalize = () => {
    setSchedules(p=>p.map(s=>({ ...s, status:"finalized" as ScheduleStatus })));
    setScanned(false);
    closeModal();
  };

  // ✏️ EDIT — replace the setTimeout with your actual Supabase + Gemini API call
  const runScan = () => {
    setScanning(true);
    setScanned(false);
    setTimeout(()=>{
      const found = runConflictScan(schedules);
      setConflicts(found);
      setScanning(false);
      setScanned(true);
      setModal("scan");
    }, 1500);
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="p-8 space-y-6 font-lexend">

      {/* ── Page Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Manage Schedule</h1>
          <p className="text-sm text-gray-500 mt-1">
            Draft all assignments freely — then run one AI scan to detect and fix all conflicts at once.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          {/* AI Scan button */}
          <button onClick={runScan} disabled={scanning}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all
              ${scanning ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                         : "bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-200"}`}>
            <Sparkles size={15}/>
            {scanning ? "Scanning..." : "Run AI Conflict Scan"}
          </button>

          {/* Add assignment button — matches primary style from AdminDashboard */}
          <button onClick={()=>setModal("add")}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 transition-colors">
            <Plus size={15}/> Add Assignment
          </button>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <ScheduleStatCard label="TOTAL ASSIGNMENTS" value={schedules.length} icon={<BookOpen size={22}/>} sub="This semester"/>
        <ScheduleStatCard label="FINALIZED"         value={finalized}        icon={<ShieldCheck size={22}/>} sub="Published to faculty"/>
        <ScheduleStatCard label="DRAFT"             value={drafts}           icon={<Clock size={22}/>}   sub="Pending conflict scan"/>
        <ScheduleStatCard label="FACULTY ASSIGNED"  value={FACULTY_LIST.length} icon={<Users size={22}/>} sub="Active this semester"/>
      </div>

      {/* ── Draft Scan Banner ── */}
      {drafts > 0 && !scanned && (
        <div className="flex items-center gap-3 p-4 bg-violet-50 border border-violet-200 rounded-xl">
          <Sparkles size={18} className="text-violet-600 shrink-0"/>
          <div className="flex-1">
            <p className="text-sm font-bold text-violet-800">
              {drafts} draft assignment{drafts!==1?"s":""} pending conflict check
            </p>
            <p className="text-xs text-violet-600 mt-0.5">
              Finish drafting all schedules, then click <strong>Run AI Conflict Scan</strong> to detect and resolve all conflicts at once.
            </p>
          </div>
          <button onClick={runScan} disabled={scanning}
            className="shrink-0 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-xs font-bold transition-colors">
            {scanning ? "Scanning..." : "Scan Now"}
          </button>
        </div>
      )}

      {/* ── All Finalized Banner ── */}
      {scanned && finalized === schedules.length && schedules.length > 0 && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
          <CheckCircle2 size={18} className="text-green-600 shrink-0"/>
          <p className="text-sm font-bold text-green-800">All schedules are finalized and published to faculty dashboards.</p>
        </div>
      )}

      {/* ── Main Two-Column Layout ── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_240px] gap-6 items-start">

        {/* LEFT — Schedule list / views */}
        <div className="space-y-4">

          {/* Toolbar */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 space-y-3">
            {/* Search + View toggle */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                <input
                  className={`${inputCls} pl-9`}
                  placeholder="Search faculty, subject code, or section..."
                  value={search}
                  onChange={e=>setSearch(e.target.value)}
                />
              </div>
              {/* View toggle buttons */}
              <div className="flex gap-1.5">
                {([["card","Card",LayoutGrid],["timetable","Timetable",TableProperties]] as const).map(([id,label,Icon])=>(
                  <button key={id} onClick={()=>setView(id as ViewMode)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-colors
                      ${view===id ? "bg-primary border-primary text-white" : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
                    <Icon size={13}/>{label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter chips */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 flex-1 min-w-[140px]">
                <span className="text-xs text-gray-400 shrink-0">Day:</span>
                <select
                  className={inputCls}
                  value={filterDay}
                  onChange={e => setFilterDay(e.target.value)}
                >
                  <option value="All">All Days</option>
                  {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2 flex-1 min-w-[180px]">
                <span className="text-xs text-gray-400 shrink-0">Faculty:</span>
                <select
                  className={inputCls}
                  value={filterFac}
                  onChange={e => setFilterFac(e.target.value)}
                >
                  <option value="All">All Faculty</option>
                  {FACULTY_LIST.map(f => (
                    <option key={f.id} value={f.id}>{getFacultyName(f as ReturnType<typeof getFaculty>)}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results count */}
          <p className="text-xs text-gray-500 px-1">
            Showing <span className="font-bold text-gray-800">{filtered.length}</span> of {schedules.length} assignments
          </p>

          {/* View content */}
          {filtered.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-2xl p-16 text-center text-gray-400">
              <CalendarDays size={36} className="mx-auto mb-3 opacity-30"/>
              <p className="text-sm">No assignments found.</p>
            </div>
          ) : (
            <>
              {view === "card"       && <CardView      data={filtered} onEdit={openEdit} onDelete={openDelete}/>}
              {view === "timetable"  && <TimetableView data={filtered} onEdit={openEdit} onDelete={openDelete}/>}
            </>
          )}
        </div>

        {/* RIGHT — Load monitor */}
        <LoadMonitorPanel sched={schedules}/>
      </div>

      {/* ── Modals ── */}
      {(modal==="add"||modal==="edit") && (
        <ScheduleFormModal editing={modal==="edit"?selected:null} onSave={handleSave} onClose={closeModal}/>
      )}
      {modal==="delete" && selected && (
        <DeleteModal schedule={selected} onConfirm={handleDelete} onClose={closeModal}/>
      )}
      {modal==="scan" && (
        <ConflictScanModal
          initialConflicts={conflicts}
          onApplyFix={handleApplyFix}
          onClose={closeModal}
          onFinalize={handleFinalize}
        />
      )}
    </div>
  );
}
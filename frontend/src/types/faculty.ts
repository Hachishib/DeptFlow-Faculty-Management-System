// ── faculty/faculty.types.ts ──────────────────────────────
// Shared types used across all faculty management components.

import type { Personal } from "./personal";
import type { Education } from "./education";
import type { Credential } from "./credential";
import type { Research } from "./research";
import type { ScheduleEntry } from "./schedule";

export type EmploymentType = "Full-time" | "Part-time";

export type FacultyMember = {
  id: string;
  avatarUrl?: string;
  personal: Personal; 
  education?: Education[]; 
  credentials?: Credential[]; 
  research?: Research[]; 
  schedule?: ScheduleEntry[]; 
};

export type AddFacultyDTO = {
  email: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  designation: string;
  employmentType: EmploymentType;
  dateHired: string;
};

// ── Shared badge components ───────────────────────────────
export const AVATAR_BG = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-green-600",
  "bg-amber-500",
  "bg-rose-500",
  "bg-cyan-600",
];

export function getAvatarBg(id: string) {
  return AVATAR_BG[id.charCodeAt(id.length - 1) % AVATAR_BG.length];
}

export function getInitials(m: FacultyMember) {
  return `${m.personal.firstName.charAt(0)}${m.personal.lastName.charAt(0)}`.toUpperCase();
}

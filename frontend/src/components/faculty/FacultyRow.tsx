import { Mail, ChevronLeft, Trash2 } from "lucide-react";
import type { FacultyMember } from "../../types/faculty";
import { getAvatarBg, getInitials } from "../../types/faculty";
import { TypeBadge } from "./FacultyBadges";

type Props = {
  member: FacultyMember;
  onView: () => void;
  onDelete: () => void;
};

export default function FacultyRow({ member, onView, onDelete }: Props) {
  const p = member.personal;
  return (
    <div
      onClick={onView}
      className="group bg-white rounded-xl border border-gray-100 hover:border-[#880000]/20 hover:shadow-md transition-all duration-200 p-4 cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-11 h-11 rounded-full ${getAvatarBg(member.id)} flex items-center justify-center text-white font-bold text-sm shrink-0`}
        >
          {getInitials(member)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-bold text-gray-800">
              {p.firstName} {p.lastName}
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{p.designation}</p>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <TypeBadge type={p.employmentType} />
            <span className="text-[10px] text-gray-400">{p.employeeId}</span>
            <span className="text-gray-200">·</span>
            <span className="text-[10px] text-gray-400 flex items-center gap-1">
              <Mail size={9} />
              {p.email}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {/* Delete — stops propagation so it doesn't open the profile */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-2 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
            title="Remove faculty"
          >
            <Trash2 size={15} />
          </button>
          <div className="text-gray-300 group-hover:text-[#880000] transition-colors">
            <ChevronLeft size={16} className="rotate-180" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Skeleton ──────────────────────────────────────────────
export function FacultyRowSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-full bg-gray-100 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-100 rounded w-1/3" />
          <div className="h-3 bg-gray-100 rounded w-1/2" />
          <div className="h-3 bg-gray-100 rounded w-2/3" />
        </div>
      </div>
    </div>
  );
}

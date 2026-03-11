import { useState } from "react";
import { X, Trash2, AlertTriangle } from "lucide-react";

import ProfileCard from "../../components/layouts/ProfileCard";
import TeachingLoadMonitor from "../../components/layouts/LoadMonitor";
import ProfileTabs from "../../components/ui/ProfileTabs";
import ProfileContent from "../../components/layouts/ProfileContent";
import MySchedule from "../../components/layouts/MySchedule";

import type { Tab } from "../../types/profileTab";
import type { FacultyMember, EmploymentType } from "../../types/faculty";
import { TypeBadge } from "./FacultyBadges";
import { getAvatarBg, getInitials } from "../../types/faculty";

type Props = {
  member: FacultyMember;
  onClose: () => void;
  onDelete: () => void;
  onChangeEmployment: (t: EmploymentType) => void;
};

export default function FacultyProfileModal({
  member,
  onClose,
  onDelete,
  onChangeEmployment,
}: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("personal");
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-gray-50 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* ── Modal header ── */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 shrink-0">
          {/* Faculty identity */}
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`w-9 h-9 rounded-full ${getAvatarBg(member.id)} flex items-center justify-center text-white font-bold text-xs shrink-0`}
            >
              {getInitials(member)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-800 truncate">
                {member.personal.firstName} {member.personal.lastName}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {member.personal.designation}
              </p>
            </div>
            <div className="shrink-0 ml-1">
              <TypeBadge type={member.personal.employmentType} />
            </div>
          </div>

          {/* Admin controls */}
          <div className="flex items-center gap-2 shrink-0 ml-4">
            {/* Employment type toggle */}
            <div className="hidden sm:flex gap-1 bg-gray-100 rounded-lg p-1">
              {(["Full-time", "Part-time"] as EmploymentType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => onChangeEmployment(t)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    member.personal.employmentType === t
                      ? t === "Full-time"
                        ? "bg-blue-500 text-white shadow-sm"
                        : "bg-amber-400 text-white shadow-sm"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Delete */}
            <button
              onClick={() => setConfirmDelete(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
            >
              <Trash2 size={13} /> Remove
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ── Modal body ── */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left — ProfileCard + TeachingLoadMonitor */}
            <div className="w-full lg:w-72 shrink-0 space-y-4">
              <ProfileCard
                firstName={member.personal.firstName}
                lastName={member.personal.lastName}
                designation={member.personal.designation}
                email={member.personal.email}
                phone={member.personal.phone}
                employeeId={member.personal.employeeId}
                employmentType={member.personal.employmentType}
                editing={false}
              />
              <TeachingLoadMonitor schedule={member.schedule} />
            </div>

            {/* Right — ProfileTabs + ProfileContent */}
            <div className="flex-1 min-w-0">
              <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              <ProfileContent
                activeTab={activeTab}
                editing={false}
                personal={member.personal}
                setPersonal={() => {}}
                education={member.education}
                credentials={member.credentials}
                research={member.research}
              />
            </div>
          </div>

          {/* Schedule — full width */}
          <MySchedule schedule={member.schedule} />
        </div>
      </div>

      {/* ── Delete confirmation dialog ── */}
      {confirmDelete && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 flex flex-col gap-4">
            {/* Icon + message */}
            <div className="flex flex-col items-center text-center gap-3">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle size={22} className="text-red-600" />
              </div>
              <div>
                <p className="text-base font-bold text-gray-800">
                  Remove Faculty Member?
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  <span className="font-semibold text-gray-700">
                    {member.personal.firstName} {member.personal.lastName}
                  </span>{" "}
                  will be permanently removed. This cannot be undone.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-1">
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex-1 py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={onDelete}
                className="flex-1 py-2.5 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors cursor-pointer"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

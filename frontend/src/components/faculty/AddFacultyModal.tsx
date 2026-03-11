import { useState } from "react";
import { X, Mail, Users } from "lucide-react";
import type { AddFacultyDTO, EmploymentType } from "../../types/faculty";

type Props = {
  onClose: () => void;
  onSubmit: (dto: AddFacultyDTO) => void;
};

const INPUT =
  "border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-[#880000] transition-colors w-full";
const LABEL = "text-[10px] font-bold text-gray-400 uppercase tracking-widest";

export default function AddFacultyModal({ onClose, onSubmit }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [designation, setDesignation] = useState("");
  const [employmentType, setEmploymentType] =
    useState<EmploymentType>("Full-time");
  const [dateHired, setDateHired] = useState("");

  const isValid =
    firstName.trim() &&
    lastName.trim() &&
    email.trim() &&
    employeeId.trim() &&
    designation.trim() &&
    dateHired;

  function handleSubmit() {
    if (!isValid) return;
    onSubmit({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      employeeId: employeeId.trim(),
      designation: designation.trim(),
      employmentType,
      dateHired,
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-[#FFF3F3] p-2 rounded-full">
              <Users size={15} className="text-[#880000]" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">
                Add Faculty Account
              </p>
              <p className="text-xs text-gray-400">
                Faculty completes their profile after logging in
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5 space-y-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className={LABEL}>First Name</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Elena"
                className={INPUT}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={LABEL}>Last Name</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Rivera"
                className={INPUT}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={LABEL}>TUP Email</label>
            <div className="relative">
              <Mail
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="username@tup.edu.ph"
                type="email"
                className={`${INPUT} pl-9`}
              />
            </div>
            <p className="text-[10px] text-gray-400">Used to log in to FIMS.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className={LABEL}>Employee ID</label>
              <input
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="TUP-2024-0001"
                className={INPUT}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={LABEL}>Date Hired</label>
              <input
                value={dateHired}
                onChange={(e) => setDateHired(e.target.value)}
                type="date"
                className={`${INPUT} cursor-pointer`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={LABEL}>Designation</label>
            <input
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              placeholder="e.g. Associate Professor II"
              className={INPUT}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={LABEL}>Employment Type</label>
            <div className="flex gap-3">
              {(["Full-time", "Part-time"] as EmploymentType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setEmploymentType(t)}
                  className={`flex-1 py-2.5 rounded-lg border text-sm font-semibold transition-all cursor-pointer ${
                    employmentType === t
                      ? "bg-[#FEF2F2] border-[#880000] text-[#880000]"
                      : "border-gray-200 text-gray-400 hover:border-gray-300"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 flex gap-3 text-xs text-blue-600 leading-relaxed">
            <Users size={14} className="text-blue-400 shrink-0 mt-0.5" />
            Once created, the faculty member can now login the account using their TUP email
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 px-6 py-4 border-t border-gray-100 shrink-0">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className="flex-1 py-2.5 rounded-lg bg-[#880000] text-white text-sm font-semibold hover:bg-[#6B0000] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

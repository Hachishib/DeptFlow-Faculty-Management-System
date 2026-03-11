import { useState } from "react";
import { X, Check } from "lucide-react";
import type { Education } from "../../types/education";

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (item: Education) => void;
};

export default function AddEducationModal({ open, onClose, onAdd }: Props) {
  const [form, setForm] = useState({ degree: "", school: "", year: "" });
  const f = (key: string) => (v: string) =>
    setForm((p) => ({ ...p, [key]: v }));

  if (!open) return null;

  const handleAdd = () => {
    if (!form.degree.trim()) return;
    onAdd({ ...form, id: String(Date.now()) } as Education);
    setForm({ degree: "", school: "", year: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-lexend">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-bold text-gray-800">Add Education</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 flex flex-col gap-4">
          {/* Degree */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
              Degree / Program
            </label>
            <input
              type="text"
              value={form.degree}
              placeholder="e.g. Ph.D. in Computer Science"
              onChange={(e) => f("degree")(e.target.value)}
              className="text-sm text-gray-800 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#880000]/20 focus:border-[#880000]/50 transition-all"
            />
          </div>

          {/* School */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
              School / University
            </label>
            <input
              type="text"
              value={form.school}
              placeholder="e.g. Technological University of the Philippines"
              onChange={(e) => f("school")(e.target.value)}
              className="text-sm text-gray-800 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#880000]/20 focus:border-[#880000]/50 transition-all"
            />
          </div>

          {/* Year */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
              Year Graduated
            </label>
            <input
              type="text"
              value={form.year}
              placeholder="2024"
              onChange={(e) => f("year")(e.target.value)}
              className="text-sm text-gray-800 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#880000]/20 focus:border-[#880000]/50 transition-all"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleAdd}
            className="w-full mt-1 bg-[#880000] hover:bg-[#6B0000] text-white text-sm font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Check size={14} /> Add Education
          </button>
        </div>
      </div>
    </div>
  );
}

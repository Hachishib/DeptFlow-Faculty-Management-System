import { useState } from "react";
import { X, Check, ChevronDown } from "lucide-react";
import type { Research } from "../../types/research";

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (item: Research) => void;
};

export default function AddResearchModal({ open, onClose, onAdd }: Props) {
  const [form, setForm] = useState({
    title: "",
    journal: "",
    type: "Journal",
    year: "",
  });
  const f = (key: string) => (v: string) =>
    setForm((p) => ({ ...p, [key]: v }));

  if (!open) return null;

  const handleAdd = () => {
    if (!form.title.trim()) return;
    onAdd({ ...form, id: String(Date.now()) } as Research);
    setForm({ title: "", journal: "", type: "Journal", year: "" });
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
          <h2 className="text-sm font-bold text-gray-800">
            Add Research / Publication
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 flex flex-col gap-4">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
              Title
            </label>
            <input
              type="text"
              value={form.title}
              placeholder="Publication title"
              onChange={(e) => f("title")(e.target.value)}
              className="text-sm text-gray-800 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#880000]/20 focus:border-[#880000]/50 transition-all"
            />
          </div>

          {/* Journal */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
              Journal / Conference
            </label>
            <input
              type="text"
              value={form.journal}
              placeholder="e.g. IEEE Transactions…"
              onChange={(e) => f("journal")(e.target.value)}
              className="text-sm text-gray-800 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#880000]/20 focus:border-[#880000]/50 transition-all"
            />
          </div>

          {/* Type + Year */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                Type
              </label>
              <div className="relative">
                <select
                  value={form.type}
                  onChange={(e) => f("type")(e.target.value)}
                  className="w-full appearance-none text-sm text-gray-800 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#880000]/20 focus:border-[#880000]/50 transition-all pr-8"
                >
                  {[
                    "Journal",
                    "Conference",
                    "Book Chapter",
                    "Thesis",
                    "Other",
                  ].map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={13}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                Year
              </label>
              <input
                type="text"
                value={form.year}
                placeholder="2024"
                onChange={(e) => f("year")(e.target.value)}
                className="text-sm text-gray-800 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#880000]/20 focus:border-[#880000]/50 transition-all"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleAdd}
            className="w-full mt-1 bg-[#880000] hover:bg-[#6B0000] text-white text-sm font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Check size={14} /> Add Research
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { X, Check, Upload } from "lucide-react";
import type { Credential } from "../../types/credential";

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (item: Credential) => void;
};

export default function AddCredentialModal({ open, onClose, onAdd }: Props) {
  const [form, setForm] = useState({ name: "", issued: "", expiry: "" });
  const f = (key: string) => (v: string) =>
    setForm((p) => ({ ...p, [key]: v }));

  if (!open) return null;

  const handleAdd = () => {
    if (!form.name.trim()) return;
    onAdd({ ...form, id: String(Date.now()) } as Credential);
    setForm({ name: "", issued: "", expiry: "" });
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
          <h2 className="text-sm font-bold text-gray-800">Upload Credential</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 flex flex-col gap-4">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
              Certification / License Name
            </label>
            <input
              type="text"
              value={form.name}
              placeholder="e.g. AWS Certified Solutions Architect"
              onChange={(e) => f("name")(e.target.value)}
              className="text-sm text-gray-800 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#880000]/20 focus:border-[#880000]/50 transition-all"
            />
          </div>

          {/* Issued + Expiry */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                Date Issued
              </label>
              <input
                type="month"
                value={form.issued}
                onChange={(e) => f("issued")(e.target.value)}
                className="text-sm text-gray-800 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#880000]/20 focus:border-[#880000]/50 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                Expiry Date
              </label>
              <input
                type="month"
                value={form.expiry}
                onChange={(e) => f("expiry")(e.target.value)}
                className="text-sm text-gray-800 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#880000]/20 focus:border-[#880000]/50 transition-all"
              />
            </div>
          </div>

          {/* File upload */}
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl py-6 cursor-pointer hover:border-[#880000]/30 hover:bg-[#FEF2F2]/40 transition-all gap-2">
            <Upload size={20} className="text-gray-300" />
            <span className="text-xs text-gray-400">
              Click to upload certificate file{" "}
              <span className="text-gray-300">(optional)</span>
            </span>
            <input
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </label>

          {/* Submit */}
          <button
            onClick={handleAdd}
            className="w-full mt-1 bg-[#880000] hover:bg-[#6B0000] text-white text-sm font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Check size={14} /> Add Credential
          </button>
        </div>
      </div>
    </div>
  );
}

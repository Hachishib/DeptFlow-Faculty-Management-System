import { useState } from "react";
import { X, Check, Upload } from "lucide-react";
import type { Credential } from "../../types/credential";

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (item: Credential) => void;
};

type CredentialType = "certification" | "license" | "seminar";

export default function AddCredentialModal({ open, onClose, onAdd }: Props) {
  const [type, setType] = useState<CredentialType>("certification");
  const [form, setForm] = useState({
    name: "",
    issuingOrganization: "",
    licenseType: "",
    issuingAuthority: "",
    title: "",
    organizer: "",
    yearObtained: "",
  });
  const [photoUrl, setPhotoUrl] = useState<string | undefined>();

  const f = (key: string) => (v: string) =>
    setForm((p) => ({ ...p, [key]: v }));

  if (!open) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
    }
  };

  const handleAdd = () => {
    let credential: Credential | null = null;

    if (
      type === "certification" &&
      form.name.trim() &&
      form.issuingOrganization.trim()
    ) {
      credential = {
        id: String(Date.now()),
        type: "certification",
        name: form.name,
        issuingOrganization: form.issuingOrganization,
        yearObtained: form.yearObtained || new Date().getFullYear().toString(),
        photoUrl,
      };
    } else if (
      type === "license" &&
      form.licenseType.trim() &&
      form.issuingAuthority.trim()
    ) {
      credential = {
        id: String(Date.now()),
        type: "license",
        licenseType: form.licenseType,
        issuingAuthority: form.issuingAuthority,
        yearObtained: form.yearObtained || new Date().getFullYear().toString(),
        photoUrl,
      };
    } else if (
      type === "seminar" &&
      form.title.trim() &&
      form.organizer.trim()
    ) {
      credential = {
        id: String(Date.now()),
        type: "seminar",
        title: form.title,
        organizer: form.organizer,
        yearObtained: form.yearObtained || new Date().getFullYear().toString(),
        photoUrl,
      };
    }

    if (credential) {
      onAdd(credential);
      setForm({
        name: "",
        issuingOrganization: "",
        licenseType: "",
        issuingAuthority: "",
        title: "",
        organizer: "",
        yearObtained: "",
      });
      setPhotoUrl(undefined);
      onClose();
    }
  };

  const getTitle = () => {
    switch (type) {
      case "certification":
        return "Add Certification";
      case "license":
        return "Add License";
      case "seminar":
        return "Add Seminar Attended";
    }
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
          <h2 className="text-sm font-bold text-gray-800">{getTitle()}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 flex flex-col gap-4">
          {/* Type Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
              Credential Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["certification", "license", "seminar"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    type === t
                      ? "bg-[#880000] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {t === "certification"
                    ? "Certification"
                    : t === "license"
                      ? "License"
                      : "Seminar"}
                </button>
              ))}
            </div>
          </div>

          {/* Certification Fields */}
          {type === "certification" && (
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                  Certification Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  placeholder="e.g. AWS Certified Solutions Architect"
                  onChange={(e) => f("name")(e.target.value)}
                  className="text-sm text-gray-800 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#880000]/20 focus:border-[#880000]/50 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                  Issuing Organization
                </label>
                <input
                  type="text"
                  value={form.issuingOrganization}
                  placeholder="e.g. Amazon Web Services"
                  onChange={(e) => f("issuingOrganization")(e.target.value)}
                  className="text-sm text-gray-800 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#880000]/20 focus:border-[#880000]/50 transition-all"
                />
              </div>
            </>
          )}

          {/* License Fields */}
          {type === "license" && (
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                  License Type
                </label>
                <input
                  type="text"
                  value={form.licenseType}
                  placeholder="e.g. Professional Engineer License"
                  onChange={(e) => f("licenseType")(e.target.value)}
                  className="text-sm text-gray-800 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#880000]/20 focus:border-[#880000]/50 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                  Issuing Authority
                </label>
                <input
                  type="text"
                  value={form.issuingAuthority}
                  placeholder="e.g. PRC - Professional Regulation Commission"
                  onChange={(e) => f("issuingAuthority")(e.target.value)}
                  className="text-sm text-gray-800 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#880000]/20 focus:border-[#880000]/50 transition-all"
                />
              </div>
            </>
          )}

          {/* Seminar Fields */}
          {type === "seminar" && (
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                  Seminar / Workshop Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  placeholder="e.g. Advanced React Patterns Workshop"
                  onChange={(e) => f("title")(e.target.value)}
                  className="text-sm text-gray-800 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#880000]/20 focus:border-[#880000]/50 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                  Organizer
                </label>
                <input
                  type="text"
                  value={form.organizer}
                  placeholder="e.g. Tech Training Academy"
                  onChange={(e) => f("organizer")(e.target.value)}
                  className="text-sm text-gray-800 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#880000]/20 focus:border-[#880000]/50 transition-all"
                />
              </div>
            </>
          )}

          {/* Year Obtained (Common) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
              Year Obtained / Attended
            </label>
            <input
              type="number"
              value={form.yearObtained}
              placeholder={new Date().getFullYear().toString()}
              onChange={(e) => f("yearObtained")(e.target.value)}
              className="text-sm text-gray-800 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#880000]/20 focus:border-[#880000]/50 transition-all"
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>

          {/* Photo/Certificate Upload */}
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl py-6 cursor-pointer hover:border-[#880000]/30 hover:bg-[#FEF2F2]/40 transition-all gap-2">
            <Upload size={20} className="text-gray-300" />
            <span className="text-xs text-gray-400">
              Click to upload certificate/photo{" "}
              <span className="text-gray-300">(optional)</span>
            </span>
            <input
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
            />
          </label>

          {/* Photo Preview */}
          {photoUrl && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="w-10 h-10 rounded bg-green-100 flex items-center justify-center">
                <Check size={16} className="text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-green-700">
                  File uploaded
                </p>
              </div>
            </div>
          )}

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

import { Award, Trash2, Upload } from "lucide-react";
import { useState } from "react";
import SectionHeader from "../ui/SectionHeader";
import AddCredentialModal from "../modals/AddCredentialModal";
import type { Credential } from "../../types/credential";

type CredentialsTabProps = {
  credentials: Credential[];
  setCredentials: (value: Credential[]) => void;
  editing: boolean;
};

export default function CredentialsTab({
  credentials,
  setCredentials,
  editing,
}: CredentialsTabProps) {
  const [openModal, setOpenModal] = useState(false);

  const handleAdd = (item: Credential) => {
    setCredentials([item, ...credentials]);
  };

  const handleDelete = (id: string) => {
    setCredentials(credentials.filter((c) => c.id !== id));
  };

  // Format YYYY-MM → "Mon YYYY"
  const fmt = (val: string) => {
    if (!val) return "—";
    const [y, m] = val.split("-");
    if (!m) return val;
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${months[parseInt(m, 10) - 1]} ${y}`;
  };

  return (
    <div>
      <SectionHeader title="Certifications & Licenses" />

      <div className="flex flex-col gap-3">
        {credentials.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:border-[#880000]/20 transition-all"
          >
            <div className="bg-[#FFF3F3] p-2.5 rounded-full shrink-0">
              <Award size={16} className="text-[#880000]" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800">{item.name}</p>
              <p className="text-xs text-gray-400">
                Issued: {fmt(item.issued)}
              </p>
              <p className="text-xs text-gray-400">
                Expires: {fmt(item.expiry)}
              </p>
            </div>

            {editing && (
              <button
                onClick={() => handleDelete(item.id)}
                className="text-gray-300 hover:text-red-400 transition-colors"
              >
                <Trash2 size={15} />
              </button>
            )}
          </div>
        ))}
      </div>

      {editing && (
        <button
          onClick={() => setOpenModal(true)}
          className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-[#880000]/30 rounded-lg text-xs text-[#880000] font-medium hover:bg-[#FEF2F2]"
        >
          <Upload size={14} /> Upload Credential
        </button>
      )}

      <AddCredentialModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAdd={handleAdd}
      />
    </div>
  );
}

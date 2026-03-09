import { Award, Trash2, Upload } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import type { Credential } from "../../types/credential";

type CredentialsTabProps = {
  credentials: Credential[];
  editing: boolean;
};

export default function CredentialsTab({
  credentials,
  editing,
}: CredentialsTabProps) {
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
              <p className="text-xs text-gray-400">Issued: {item.issued}</p>
              <p className="text-xs text-gray-400">Expires: {item.expiry}</p>
            </div>

            {editing && (
              <button className="text-gray-300 hover:text-red-400">
                <Trash2 size={15} />
              </button>
            )}
          </div>
        ))}
      </div>

      {editing && (
        <button className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-[#880000]/30 rounded-lg text-xs text-[#880000] font-medium hover:bg-[#FEF2F2]">
          <Upload size={14} /> Upload Credential
        </button>
      )}
    </div>
  );
}

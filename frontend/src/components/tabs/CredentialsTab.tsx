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

  // Separate credentials by type and sort by year (most recent first)
  const certifications = credentials
    .filter((c) => c.type === "certification")
    .sort((a, b) => parseInt(b.yearObtained) - parseInt(a.yearObtained));

  const licenses = credentials
    .filter((c) => c.type === "license")
    .sort((a, b) => parseInt(b.yearObtained) - parseInt(a.yearObtained));

  const seminars = credentials
    .filter((c) => c.type === "seminar")
    .sort((a, b) => parseInt(b.yearObtained) - parseInt(a.yearObtained));

  const CredentialEntry = ({
    cred,
    showMeta1,
    showMeta2,
  }: {
    cred: Credential;
    showMeta1: string;
    showMeta2: string;
  }) => (
    <div className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 rounded-lg border border-gray-100 hover:border-[#880000]/20 transition-all">
      <div className="bg-[#FFF3F3] p-2.5 rounded-full shrink-0">
        <Award size={16} className="text-[#880000]" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800">
          {cred.type === "certification"
            ? cred.name
            : cred.type === "license"
              ? cred.licenseType
              : cred.title}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">{showMeta1}</p>
        <p className="text-xs text-gray-400 font-medium">{showMeta2}</p>

        {cred.photoUrl && (
          <div className="mt-3">
            <img
              src={cred.photoUrl}
              alt="Credential"
              className="h-24 w-auto rounded-md border border-gray-200 object-cover"
            />
          </div>
        )}
      </div>

      {editing && (
        <button
          onClick={() => handleDelete(cred.id)}
          className="text-gray-300 hover:text-red-400 transition-colors shrink-0"
        >
          <Trash2 size={15} />
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Certifications Section */}
      <div>
        <SectionHeader title="Certifications" />
        {certifications.length > 0 ? (
          <div className="flex flex-col gap-3">
            {certifications.map((cred) => (
              <CredentialEntry
                key={cred.id}
                cred={cred}
                showMeta1={`Organization: ${cred.issuingOrganization}`}
                showMeta2={`Year: ${cred.yearObtained}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400 p-4">
            No certifications added yet
          </p>
        )}
      </div>

      {/* Licenses Section */}
      <div>
        <SectionHeader title="Licenses" />
        {licenses.length > 0 ? (
          <div className="flex flex-col gap-3">
            {licenses.map((cred) => (
              <CredentialEntry
                key={cred.id}
                cred={cred}
                showMeta1={`Authority: ${cred.issuingAuthority}`}
                showMeta2={`Year: ${cred.yearObtained}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400 p-4">No licenses added yet</p>
        )}
      </div>

      {/* Seminars Attended Section */}
      <div>
        <SectionHeader title="Seminars Attended" />
        {seminars.length > 0 ? (
          <div className="flex flex-col gap-3">
            {seminars.map((cred) => (
              <CredentialEntry
                key={cred.id}
                cred={cred}
                showMeta1={`Organizer: ${cred.organizer}`}
                showMeta2={`Year: ${cred.yearObtained}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400 p-4">
            No seminars attended added yet
          </p>
        )}
      </div>

      {/* Add Button (only in editing mode) */}
      {editing && (
        <button
          onClick={() => setOpenModal(true)}
          className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-[#880000]/30 rounded-lg text-xs text-[#880000] font-medium hover:bg-[#FEF2F2]"
        >
          <Upload size={14} /> Add Credential
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

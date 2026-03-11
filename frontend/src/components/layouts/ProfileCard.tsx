import { Mail, Phone, BadgeCheck, Building2, Upload } from "lucide-react";
import { useRef } from "react";
import placeholder from "../../assets/profile-placeholder.svg";

type ProfileCardProps = {
  firstName: string;
  lastName: string;
  designation: string;
  email: string;
  phone: string;
  employeeId: string;
  employmentType: string;
  editing: boolean;
  photo?: string | null;
  onUploadPhoto?: (file: File) => void;
};

export default function ProfileCard({
  firstName,
  lastName,
  designation,
  email,
  phone,
  employeeId,
  employmentType,
  editing,
  photo,
  onUploadPhoto,
}: ProfileCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleButtonClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) onUploadPhoto?.(file);
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Profile Pic */}
      <div className="h-28 bg-[#880000] relative">
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
          <div className="relative">
            <img
              src={photo || placeholder}
              alt="profile-photo"
              className="w-20 h-20 rounded-full border-4 border-white bg-white object-cover shadow-sm"
            />

            {editing && (
              <>
                <button
                  onClick={handleButtonClick}
                  className="absolute bottom-0 right-0 bg-[#880000] text-white rounded-full p-1.5 hover:bg-[#6B0000] transition-colors cursor-pointer"
                >
                  <Upload size={11} />
                </button>

                {/* Hidden file input */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="pt-12 pb-5 px-5 text-center">
        <p className="text-lg font-bold text-gray-800">
          {firstName} {lastName}
        </p>
        <p className="text-sm text-gray-400 mt-0.5">{designation}</p>

        <div className="mt-4 space-y-2 text-left">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Mail size={16} className="text-[#880000] shrink-0" />
            <span className="truncate">{email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Phone size={16} className="text-[#880000] shrink-0" />
            <span>{phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <BadgeCheck size={16} className="text-[#880000] shrink-0" />
            <span>{employeeId}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Building2 size={16} className="text-[#880000] shrink-0" />
            <span>{employmentType}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Pencil, Save, X } from "lucide-react";

import type { Tab } from "../types/profileTab";
import type { Personal } from "../types/personal";

import ProfileCard from "../components/layouts/ProfileCard";
import TeachingLoadCard from "../components/layouts/TeachingLoadCard";
import ProfileTabs from "../components/ui/ProfileTabs";
import ProfileContent from "../components/layouts/ProfileContent";
import MySchedule from "../components/layouts/MySchedule";

export default function MyProfile() {
  const [activeTab, setActiveTab] = useState<Tab>("personal");
  const [editing, setEditing] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);

  const [personal, setPersonal] = useState<Personal>({
    firstName: "Dan Jheniel",
    lastName: "Bringas",
    email: "danbringas@tup.edu.ph",
    phone: "+63 912 345 6789",
    employeeId: "TUP-2018-0042",
    designation: "Department Head",
    employmentType: "Full-time",
    dateHired: "2018-06-01",
    status: "Active",
  });

  const [snapshot, setSnapshot] = useState<Personal>(personal);

  function handleEdit() {
    setSnapshot(personal);
    setEditing(true);
  }

  function handleSave() {
    setEditing(false);
    // TODO: call PUT /api/faculty/:id with updated personal
  }

  function handleCancel() {
    setPersonal(snapshot);
    setEditing(false);
  }

  function handleUploadPhoto(file: File) {
    const imageUrl = URL.createObjectURL(file);
    setPhoto(imageUrl);
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 font-lexend max-w-full mx-auto">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
            My Profile
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            View and manage your personal information
          </p>
        </div>
        <div className="flex gap-2">
          {editing ? (
            <>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-500 text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <X size={15} /> Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#880000] text-white text-xs sm:text-sm font-semibold hover:bg-[#6B0000] transition-colors cursor-pointer"
              >
                <Save size={15} /> Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#880000] text-[#880000] text-xs sm:text-sm font-semibold hover:bg-[#FEF2F2] transition-colors cursor-pointer"
            >
              <Pencil size={15} /> Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Profile card and tabs */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-90 shrink-0 space-y-4">
          <ProfileCard
            firstName={personal.firstName}
            lastName={personal.lastName}
            designation={personal.designation}
            email={personal.email}
            phone={personal.phone}
            employeeId={personal.employeeId}
            employmentType={personal.employmentType}
            editing={editing}
            photo={photo}
            onUploadPhoto={handleUploadPhoto}
          />
          <TeachingLoadCard />
        </div>

        <div className="flex-1 min-w-0">
          <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <ProfileContent
            activeTab={activeTab}
            editing={editing}
            personal={personal}
            setPersonal={setPersonal}
          />
        </div>
      </div>

      {/* My Schedule — extracted into its own component */}
      <MySchedule />
    </div>
  );
}

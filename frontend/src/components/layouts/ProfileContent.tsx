// ── components/layouts/ProfileContent.tsx ────────────────
//
// Accepts education, credentials, research as optional props.
// Falls back to mock data when not provided (e.g. MyProfile before DB wiring).
// ManageFacultyPage passes real faculty data — no duplication needed.

import { useState } from "react";
import type { Personal } from "../../types/personal";
import type { Tab } from "../../types/profileTab";
import type { Education } from "../../types/education";
import type { Credential } from "../../types/credential";
import type { Research } from "../../types/research";

import PersonalTab from "../tabs/PersonalTab";
import EducationTab from "../tabs/EducationTab";
import CredentialsTab from "../tabs/CredentialsTab";
import ResearchTab from "../tabs/ResearchTab";

// ── Mock fallbacks (used by MyProfile until DB is wired) ──
const MOCK_EDUCATION: Education[] = [
  { id: "1", degree: "BS Computer Science", school: "TUP", year: "2012" },
];
const MOCK_CREDENTIALS: Credential[] = [
  {
    id: "1",
    name: "Professional License",
    issued: "2018",
    expiry: "2028",
    status: "Valid",
  },
];
const MOCK_RESEARCH: Research[] = [
  {
    id: "1",
    title: "AI-Based Faculty Workload Prediction",
    journal: "Int. Journal of Computing",
    year: "2023",
    type: "Publication",
  },
];

// ── PROPS ─────────────────────────────────────────────────
type ProfileContentProps = {
  activeTab: Tab;
  editing: boolean;
  personal: Personal;
  setPersonal:
    | React.Dispatch<React.SetStateAction<Personal>>
    | ((p: Personal) => void);
  // Optional — pass real data from DB; falls back to mock when omitted
  education?: Education[];
  credentials?: Credential[];
  research?: Research[];
};

export default function ProfileContent({
  activeTab,
  editing,
  personal,
  setPersonal,
  education,
  credentials,
  research,
}: ProfileContentProps) {
  // Only initialise mock state when the caller didn't provide data.
  // When real data is passed as props, these useState calls are ignored.
  const [mockEducation] = useState<Education[]>(MOCK_EDUCATION);
  const [mockCredentials] = useState<Credential[]>(MOCK_CREDENTIALS);
  const [mockResearch] = useState<Research[]>(MOCK_RESEARCH);

  const resolvedEducation = education ?? mockEducation;
  const resolvedCredentials = credentials ?? mockCredentials;
  const resolvedResearch = research ?? mockResearch;

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6">
      {activeTab === "personal" && (
        <PersonalTab
          personal={personal}
          setPersonal={setPersonal}
          editing={editing}
        />
      )}
      {activeTab === "education" && (
        <EducationTab education={resolvedEducation} editing={editing} />
      )}
      {activeTab === "credentials" && (
        <CredentialsTab credentials={resolvedCredentials} editing={editing} />
      )}
      {activeTab === "research" && (
        <ResearchTab research={resolvedResearch} editing={editing} />
      )}
    </div>
  );
}

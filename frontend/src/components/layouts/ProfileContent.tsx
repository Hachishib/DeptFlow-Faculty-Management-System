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
  education: educationProp,
  credentials: credentialsProp,
  research: researchProp,
}: ProfileContentProps) {
  const [education, setEducation] = useState<Education[]>(
    educationProp ?? MOCK_EDUCATION,
  );
  const [credentials, setCredentials] = useState<Credential[]>(
    credentialsProp ?? MOCK_CREDENTIALS,
  );
  const [research, setResearch] = useState<Research[]>(
    researchProp ?? MOCK_RESEARCH,
  );

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
        <EducationTab
          education={education}
          setEducation={setEducation}
          editing={editing}
        />
      )}
      {activeTab === "credentials" && (
        <CredentialsTab
          credentials={credentials}
          setCredentials={setCredentials}
          editing={editing}
        />
      )}
      {activeTab === "research" && (
        <ResearchTab
          research={research}
          setResearch={setResearch}
          editing={editing}
        />
      )}
    </div>
  );
}

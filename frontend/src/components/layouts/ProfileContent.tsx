import type { Personal } from "../../types/personal";
import type { Tab } from "../../types/profileTab";
import type { Education } from "../../types/education";
import type { Credential } from "../../types/credential";
import type { Research } from "../../types/research";
import { useState } from "react";

import PersonalTab from "../tabs/PersonalTab";
import EducationTab from "../tabs/EducationTab";
import CredentialsTab from "../tabs/CredentialsTab";
import ResearchTab from "../tabs/ResearchTab";

type ProfileContentProps = {
  activeTab: Tab;
  editing: boolean;
  personal: Personal;
  setPersonal: React.Dispatch<React.SetStateAction<Personal>>;
};

export default function ProfileContent({
  activeTab,
  editing,
  personal,
  setPersonal,
}: ProfileContentProps) {
  const [education] = useState<Education[]>([
    { id: "1", degree: "BS Computer Science", school: "TUP", year: "2012" },
  ]);

  const [credentials] = useState<Credential[]>([
    {
      id: "1",
      name: "Professional License",
      issued: "2018",
      expiry: "2028",
      status: "Valid",
    },
  ]);

  const [research] = useState<Research[]>([
    {
      id: "1",
      title: "AI-Based Faculty Workload Prediction",
      journal: "Int. Journal of Computing",
      year: "2023",
      type: "Publication",
    },
  ]);

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
        <EducationTab education={education} editing={editing} />
      )}
      {activeTab === "credentials" && (
        <CredentialsTab credentials={credentials} editing={editing} />
      )}
      {activeTab === "research" && (
        <ResearchTab research={research} editing={editing} />
      )}
    </div>
  );
}

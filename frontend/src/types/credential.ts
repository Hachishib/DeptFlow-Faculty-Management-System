export type Certification = {
  id: string;
  type: "certification";
  name: string;
  issuingOrganization: string;
  yearObtained: string;
  photoUrl?: string;
};

export type License = {
  id: string;
  type: "license";
  licenseType: string;
  issuingAuthority: string;
  yearObtained: string;
  photoUrl?: string;
};

export type SeminarAttended = {
  id: string;
  type: "seminar";
  title: string;
  organizer: string;
  yearObtained: string;
  photoUrl?: string;
};

export type Experience = {
  id: string;
  type: "experience";
  jobTitle: string;
  company: string;
  startYear: string;
  endYear: string;
};

export type Credential = Certification | License | SeminarAttended | Experience;

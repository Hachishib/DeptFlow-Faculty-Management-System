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

export type Credential = Certification | License | SeminarAttended;

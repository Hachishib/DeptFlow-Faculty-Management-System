export type Credential = {
  id: string;
  name: string;
  issued: string;
  expiry: string;
  status: "Valid" | "Expired";
};

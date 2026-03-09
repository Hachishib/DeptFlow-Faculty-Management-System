export type Research = {
  id: string;
  title: string;
  journal?: string;
  year: string;
  type: "Publication" | "Research" | "Extension";
};

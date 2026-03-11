// Blueprint based on your Supabase ERD for 'subjects'
export interface SubjectInput {
  subject_code: string;
  subject_name: string;
  scope?: string;
}

// 1. Fetch all available subjects
export const getAllSubjectsFromDb = async () => {
  console.log("📤 [Mock DB] Fetching all subjects...");
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    { id: 101, subject_code: "CS101", subject_name: "Introduction to Programming", scope: "Department" },
    { id: 102, subject_code: "MATH201", subject_name: "Calculus I", scope: "University" }
  ];
};

// 2. Add a new subject
export const addSubjectToDb = async (subjectData: SubjectInput) => {
  console.log("📥 [Mock DB] Creating new subject:");
  console.table(subjectData);
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    id: Math.floor(Math.random() * 1000), // Mocked int8 ID
    ...subjectData
  };
};
// import { supabaseAdmin } from "../../utils/supabaseAdmin";

export interface EducationInput {
  id?: string;
  faculty_id: string; 
  degree_level?: string;
  discipline_category?: string;
  university?: string;
  graduation_date?: string; 
}


let mockEducation: EducationInput[] = [
  {
    id: "mock-edu-1",
    faculty_id: "1",
    degree_level: "Bachelor's",
    discipline_category: "Computer Science",
    university: "Technological University of the Philippines",
    graduation_date: "2018-05-20"
  },
  {
    id: "mock-edu-2",
    faculty_id: "1",
    degree_level: "Master's",
    discipline_category: "Information Technology",
    university: "University of the Philippines",
    graduation_date: "2021-06-15"
  }
];

export const createEducationRecord = async (educationData: EducationInput) => {
  console.log("Mock DB: Creating education record...");
  const newRecord = { ...educationData, id: `mock-edu-${Date.now()}` };
  mockEducation.push(newRecord);
  return newRecord;
};

export const getEducationByFaculty = async (facultyId: string) => {
  console.log(`Mock DB: Fetching education for faculty ${facultyId}...`);
  return mockEducation.filter(edu => edu.faculty_id === facultyId);
};

export const updateEducationRecord = async (id: string, updates: Partial<EducationInput>) => {
  console.log(`Mock DB: Updating education record ${id}...`);
  const index = mockEducation.findIndex(edu => edu.id === id);
  if (index === -1) throw new Error("Education record not found in mock database");
  
  mockEducation[index] = { ...mockEducation[index], ...updates };
  return mockEducation[index];
};


/*
export const createEducationRecord = async (educationData: EducationInput) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('education_records')
      .insert([educationData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("DB Create Error:", error.message);
    throw new Error(`Failed to create education record: ${error.message}`);
  }
};

export const getEducationByFaculty = async (facultyId: string) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('education_records')
      .select('*')
      .eq('faculty_id', facultyId);
     
    if (error) throw error;  
    return data;
  } catch (error: any) {
    console.error("DB Fetch Error:", error.message);
    throw new Error(`Failed to fetch education records: ${error.message}`);
  }
};

export const updateEducationRecord = async (id: string, updates: Partial<EducationInput>) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('education_records')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
     
    if (error) throw error;  
    return data;
  } catch (error: any) {
    console.error("DB Update Error:", error.message);
    throw new Error(`Failed to update education record: ${error.message}`);
  }
};
*/
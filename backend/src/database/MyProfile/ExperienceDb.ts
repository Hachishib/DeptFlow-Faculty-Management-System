// import { supabaseAdmin } from "../../utils/supabaseAdmin";

export interface ExperienceInput {
  id?: string;
  faculty_id: string;
  job_title?: string;
  start_year?: number; 
  end_year?: number; 
}



let mockExperiences: ExperienceInput[] = [
  {
    id: "mock-exp-1",
    faculty_id: "1",
    job_title: "Junior Software Developer",
    start_year: 2018,
    end_year: 2020
  },
  {
    id: "mock-exp-2",
    faculty_id: "1",
    job_title: "Instructor I",
    start_year: 2021,
    end_year: 2026 // Or null for present
  }
];

export const createExperience = async (experienceData: ExperienceInput) => {
  console.log("Mock DB: Creating experience record...");
  const newExperience = { ...experienceData, id: `mock-exp-${Date.now()}` };
  mockExperiences.push(newExperience);
  return newExperience;
};

export const getExperiencesByFaculty = async (facultyId: string) => {
  console.log(`Mock DB: Fetching experiences for faculty ${facultyId}...`);
  return mockExperiences.filter(exp => exp.faculty_id === facultyId);
};

export const updateExperience = async (id: string, updates: Partial<ExperienceInput>) => {
  console.log(`Mock DB: Updating experience ${id}...`);
  const index = mockExperiences.findIndex(exp => exp.id === id);
  if (index === -1) throw new Error("Experience not found in mock database");
  
  mockExperiences[index] = { ...mockExperiences[index], ...updates };
  return mockExperiences[index];
};


/*
export const createExperience = async (experienceData: ExperienceInput) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('experiences')  
      .insert([experienceData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("DB Create Error:", error.message);
    throw new Error(`Failed to create experience: ${error.message}`);
  }
};

export const getExperiencesByFaculty = async (facultyId: string) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('experiences')
      .select('*')
      .eq('faculty_id', facultyId);
     
    if (error) throw error;  
    return data;
  } catch (error: any) {
    console.error("DB Fetch Error:", error.message);
    throw new Error(`Failed to fetch experiences: ${error.message}`);
  }
};

export const updateExperience = async (id: string, updates: Partial<ExperienceInput>) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('experiences')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
     
    if (error) throw error;  
    return data;
  } catch (error: any) {
    console.error("DB Update Error:", error.message);
    throw new Error(`Failed to update experience: ${error.message}`);
  }
};
*/
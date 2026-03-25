import { supabaseAdmin } from "../CONTROLLERS/utils/supabaseAdmin";

export interface WorkExperienceInput {
  faculty_id: string;
  job_title: string;
  start_year: number;
  end_year?: number; // Optional (NULL means "Present")
  company?: string;  // Optional
}

// POST: Add a new work experience
export const addWorkExperience = async (expData: WorkExperienceInput) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('faculty_work_experience')
      .insert([expData])
      .select()
      .single();
      
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("DB Add Work Experience Error:", error.message);
    throw error;
  }
};

// GET: Fetch all experience for ONE specific teacher
export const getWorkExperienceByFaculty = async (faculty_id: string) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('faculty_work_experience')
      .select('*')
      .eq('faculty_id', faculty_id)
      .order('start_year', { ascending: false }); // Show newest jobs first!
      
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("DB Fetch Work Experience Error:", error.message);
    throw new Error(`Failed to fetch work experience: ${error.message}`);
  }
};

// PATCH: Update an existing work experience
export const updateWorkExperience = async (id: number, updates: Partial<WorkExperienceInput>) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('faculty_work_experience')
      .update(updates)
      .eq('experience_id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("DB Update Work Experience Error:", error.message);
    throw error;
  }
};

// DELETE: Remove a work experience record
export const deleteWorkExperience = async (id: number) => {
  try {
    const { error } = await supabaseAdmin
      .from('faculty_work_experience')
      .delete()
      .eq('experience_id', id)
      
    if (error) throw error;
    return true;
  } catch (error: any) {
    console.error("DB Delete Work Experience Error:", error.message);
    throw new Error(`Failed to delete work experience: ${error.message}`);
  }
};
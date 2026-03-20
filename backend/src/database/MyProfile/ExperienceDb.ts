import { supabaseAdmin } from "../../utils/supabaseAdmin";

export interface ExperienceInput {
  id?: string;
  faculty_id: string;
  job_title?: string;
  start_year?: number; // using number for year
  end_year?: number; 
}

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
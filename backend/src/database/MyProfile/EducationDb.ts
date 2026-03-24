import { supabaseAdmin } from "../../utils/supabaseAdmin";

export interface EducationInput {
  id?: string;
  faculty_id: string; 
  degree_level?: string;
  discipline_category?: string;
  university?: string;
  graduation_date?: string; 
}


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

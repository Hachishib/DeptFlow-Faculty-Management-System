import { supabaseAdmin } from "../../utils/supabaseAdmin";

export interface EducationInput {
  id?: string; // Optional for creation, required for update
  faculty_id: string; // Foreign key linking to faculty_profiles
  degree_level?: string;
  discipline_category?: string;
  university?: string;
  graduation_date?: string; // Stored as a string for ISO date formats (YYYY-MM-DD)
}

// Create a new education record
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

// Get all education records for a specific faculty member
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

// Update a specific education record
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
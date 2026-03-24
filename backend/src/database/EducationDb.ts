import { supabaseAdmin } from "../utils/supabaseAdmin";

export interface EducationInput {
  faculty_id: string;
  degree_level: string;
  discipline_category: string;
  university: string;
  graduation_date?: string; // Optional, as they might currently be studying!
}

// POST: Add a new degree
export const addEducation = async (educationData: EducationInput) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('faculty_education')
      .insert([educationData])
      .select()
      .single();
      
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("DB Add Education Error:", error.message);
    throw error;
  }
};

// GET: Fetch all education for ONE specific teacher
export const getEducationByFaculty = async (faculty_id: string) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('faculty_education')
      .select('*')
      .eq('faculty_id', faculty_id)
      .order('graduation_date', { ascending: false }); // Newest degrees first!
      
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("DB Fetch Education Error:", error.message);
    throw new Error(`Failed to fetch education: ${error.message}`);
  }
};

// PATCH: Update an existing degree
export const updateEducation = async (id: number, updates: Partial<EducationInput>) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('faculty_education')
      .update(updates)
      .eq('education_id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("DB Update Education Error:", error.message);
    throw error;
  }
};

// DELETE: Remove a degree
export const deleteEducation = async (id: number) => {
  try {
    const { error } = await supabaseAdmin
      .from('faculty_education')
      .delete()
      .eq('education_id', id)
      
    if (error) throw error;
    return true;
  } catch (error: any) {
    console.error("DB Delete Education Error:", error.message);
    throw new Error(`Failed to delete education: ${error.message}`);
  }
};
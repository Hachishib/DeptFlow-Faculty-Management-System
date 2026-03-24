import { supabaseAdmin } from "../../utils/supabaseAdmin";

export interface EducationInput {
  faculty_id: string;
  degree_level: string;
  discipline: string;
  school: string;
  start_year?: number | string;
  end_year?: number | string;
  description?: string;
}

export const createEducation = async (educationData: EducationInput) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('education') 
      .insert([educationData])
      .select()
      .single();

    if (error) throw error;
    return data;

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown database error";
    console.error("DB Create Education Error:", errorMessage);
    throw new Error(`Failed to create education: ${errorMessage}`);
  }
};

export const getEducationByFaculty = async (facultyId: string) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('education') // ✅ FIX
      .select('*')
      .eq('faculty_id', facultyId);

    if (error) throw error;
    return data;

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown database error";
    console.error("DB Fetch Education Error:", errorMessage);
    throw new Error(`Failed to fetch education: ${errorMessage}`);
  }
};

export const updateEducation = async (id: string, updates: Partial<EducationInput>) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('education') // ✅ FIX
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown database error";
    console.error("DB Update Education Error:", errorMessage);
    throw new Error(`Failed to update education: ${errorMessage}`);
  }
};

export const deleteEducation = async (id: string) => {
  try {
    const { error } = await supabaseAdmin
      .from('education') // ✅ FIX
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown database error";
    console.error("DB Delete Education Error:", errorMessage);
    throw new Error(`Failed to delete education: ${errorMessage}`);
  }
};
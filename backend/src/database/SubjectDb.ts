import { supabaseAdmin } from "../utils/supabaseAdmin";

export interface SubjectInput {
  subject_code: string;
  subject_name: string;
  scope?: string;
}

export const getAllSubjectsFromDb = async () => {
  try {
    const { data, error } = await supabaseAdmin
      .from('subjects') 
      .select('*')
      .order('subject_code', { ascending: true }); 

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("Supabase Fetch Subjects Error:", error.message);
    throw new Error(`Failed to fetch subjects: ${error.message}`);
  }
};

export const addSubjectToDb = async (subjectData: SubjectInput) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('subjects') 
      .insert([subjectData])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("Supabase Create Subject Error:", error.message);
    // Pass the exact error so the controller can read the UNIQUE constraint violation
    throw error; 
  }
};
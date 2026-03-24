import { supabaseAdmin }  from "../../utils/supabaseAdmin";

export interface FacultyProfileInput {
  id: string; 
  employee_id?: string;
  full_name?: string;
  email?: string;
  phone_number?: string;
  age?: number;
  birthday?: string; 
  gender?: string;
  city?: string;
  province?: string;
  rank_designation?: string;
  employment_type?: string; 
  date_hired?: string; 
}



export const createFacultyProfile = async (profileData: FacultyProfileInput) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('faculty_profiles')
      .insert([profileData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("DB Create Error:", error.message);
    throw new Error(`Failed to create faculty: ${error.message}`);
  }
};

export const getAllFaculty = async () => {
  try {
    const { data, error } = await supabaseAdmin
      .from('faculty_profiles')
      .select('*');
     
    if (error) throw error;  
    return data;
  } catch (error: any) {
    console.error("DB Fetch Error:", error.message);
    throw new Error(`Failed to fetch faculty: ${error.message}`);
  }
};

export const updateFacultyProfile = async (id: string, updates: Partial<FacultyProfileInput>) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('faculty_profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
     
    if (error) throw error;  
    return data;
  } catch (error: any) {
    console.error("DB Update Error:", error.message);
    throw new Error(`Failed to update faculty: ${error.message}`);
  }
};

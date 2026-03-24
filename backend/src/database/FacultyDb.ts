import { supabaseAdmin }  from "../utils/supabaseAdmin";

export interface FacultyProfileInput {
  faculty_id: string; 
  full_name?: string;
  gender?: string;
  photo_url?: string;
  is_present?: boolean;
  max_units?: number;
  role?: string; 
  employment_type?: string; 
  birthday?: string;
  phone_number?: string;
  employee_id?: string;
  rank_designation?: string;
  date_hired?: string;
  address?: string;
  current_units?: number;
}

// Create a new faculty profile 
export const createFacultyProfile = async (profileData: FacultyProfileInput) => {
  try {
    const { data: result, error } = await supabaseAdmin
      .from('faculty_profiles')
      .insert([profileData])
      .select()
      .single();
    
    if (error) throw error;
    return result;
  
  } catch (error: any) {
    console.error("DB Create Faculty Error:", error.message);
    throw new Error(`Failed to create faculty: ${error.message}`);
  }
};

// Get all faculty profiles
export const getAllFaculty = async () => {
  try {
    const { data, error } = await supabaseAdmin
      .from('faculty_profiles')
      .select('*');
     
    if (error) throw error;  
    return data;

  } catch (error: any) {
    console.error("DB Fetch Faculty Error:", error.message);
    throw new Error(`Failed to fetch faculty: ${error.message}`);
  }
};

// Update a specific faculty profile 
export const updateFacultyProfile = async (id: string, updates: Partial<FacultyProfileInput>) => {
  try {
    const { data: result, error } = await supabaseAdmin
      .from('faculty_profiles')
      .update(updates)
      .eq('faculty_id', id)
      .select()
      .single();
     
    if (error) throw error;  
    return result;

  } catch (error: any) {
    // FIXED: Corrected the copy-paste error message!
    console.error("DB Update Faculty Error:", error.message); 
    throw new Error(`Failed to update faculty: ${error.message}`);
  }
};
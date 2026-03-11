import { supabaseAdmin }  from "../utils/supabaseAdmin";


export interface FacultyProfileInput {
  id: string; 
  full_name?: string;
  age?: number;
  gender?: string;
  photo_url?: string;
  is_present?: boolean;
  max_units?: number;
  role?: string; 
  employment_type?: string; 
}

// Create a new faculty profile 
export const createFacultyProfile = async (profileData: FacultyProfileInput) => {
  try {
    const { data , error } = await supabaseAdmin
      .from('faculty_profiles')
      .insert([profileData])
      .select()
      .single()
    
    if ( error ) throw error;

    return data ;
  
  
  } catch (error: any) {
    console.error("Mock DB Create Error:", error.message);
    throw new Error(`Failed to create faculty: ${error.message}`);
  }
};

// Get all faculty profiles (
export const getAllFaculty = async () => {
  try {
    const { data , error } = await supabaseAdmin
      .from('faculty_profiles')
      .select('*')
     
    if (error) throw error;  

    return data;
  } catch (error) {
    console.error("Mock DB Fetch Error:", error);
    throw new Error("Failed to mock fetch faculty");
  }
};

//  Update a specific faculty profile 
export const updateFacultyProfile = async (id: string, updates: Partial<FacultyProfileInput>) => {
  try {
    const { data , error } = await supabaseAdmin
      .from('faculty_profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
     
    if (error) throw error;  

    return data;
  } catch (error) {
    console.error("Mock DB Fetch Error:", error);
    throw new Error("Failed to mock fetch faculty");
  }
};
import { supabaseAdmin } from "../utils/supabaseAdmin";

export interface CourseInput {
  id?: string;
  faculty_id: string; 
  course_code?: string; 
  course_name?: string; 
  program?: string; 
  section?: string;
  room?: string;
  start_time?: string;
  end_time?: string;   
  day_of_week?: string; 
  semester?: string; 
  academic_year?: string; 
}



// Create a new course/schedule record
export const createCourse = async (courseData: CourseInput) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('faculty_courses') // Waiting For table name
      .insert([courseData])
      .select()
      .single();
    
    if (error) throw error;

    return data;
  } catch (error: any) {
    console.error("DB Create Error:", error.message);
    throw new Error(`Failed to create course record: ${error.message}`);
  }
};

// Get all courses for a specific faculty member
export const getCoursesByFaculty = async (facultyId: string) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('faculty_courses')
      .select('*')
      .eq('faculty_id', facultyId);
     
    if (error) throw error;  

    return data;
  } catch (error: any) {
    console.error("DB Fetch Error:", error.message);
    throw new Error(`Failed to fetch course records: ${error.message}`);
  }
};

// Update a specific course schedule
export const updateCourse = async (id: string, updates: Partial<CourseInput>) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('faculty_courses')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
     
    if (error) throw error;  

    return data;
  } catch (error: any) {
    console.error("DB Update Error:", error.message);
    throw new Error(`Failed to update course record: ${error.message}`);
  }
};

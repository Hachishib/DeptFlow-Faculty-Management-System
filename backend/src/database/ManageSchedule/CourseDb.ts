// import { supabaseAdmin } from "../../utils/supabaseAdmin";

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


let mockCourses: CourseInput[] = [
  {
    id: "mock-course-1",
    faculty_id: "1", 
    course_code: "CS101",
    course_name: "Introduction to Computing",
    program: "BSCS",
    section: "1A",
    room: "Lab 302",
    start_time: "08:00 AM",
    end_time: "10:00 AM",
    day_of_week: "MWF",
    semester: "1st Semester",
    academic_year: "2024-2025"
  },
  {
    id: "mock-course-2",
    faculty_id: "1",
    course_code: "IT204",
    course_name: "Web Systems and Technologies",
    program: "BSIT",
    section: "2C",
    room: "Room 415",
    start_time: "01:00 PM",
    end_time: "04:00 PM",
    day_of_week: "TTH",
    semester: "1st Semester",
    academic_year: "2024-2025"
  }
];

export const createCourse = async (courseData: CourseInput) => {
  console.log("Mock DB: Creating course record...");
  const newCourse = { ...courseData, id: `mock-course-${Date.now()}` };
  mockCourses.push(newCourse);
  return newCourse;
};

export const getCoursesByFaculty = async (facultyId: string) => {
  console.log(`Mock DB: Fetching courses for faculty ${facultyId}...`);
  return mockCourses.filter(course => course.faculty_id === facultyId);
};

export const updateCourse = async (id: string, updates: Partial<CourseInput>) => {
  console.log(`Mock DB: Updating course record ${id}...`);
  const index = mockCourses.findIndex(course => course.id === id);
  if (index === -1) throw new Error("Course record not found in mock database");
  
  mockCourses[index] = { ...mockCourses[index], ...updates };
  return mockCourses[index];
};




/*
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
*/
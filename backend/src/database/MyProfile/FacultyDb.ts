// import { supabaseAdmin }  from "../../utils/supabaseAdmin";

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



let mockFacultyProfiles: FacultyProfileInput[] = [
  {
    id: "1", // Hardcoded to match our other mock files
    employee_id: "EMP-2023-001",
    full_name: "Dr. Jane Doe",
    email: "jane.doe@university.edu",
    phone_number: "09123456789",
    age: 35,
    birthday: "1991-04-15",
    gender: "Female",
    city: "Manila",
    province: "Metro Manila",
    rank_designation: "Associate Professor",
    employment_type: "Full-Time",
    date_hired: "2023-08-01"
  },
  {
    id: "2",
    employee_id: "EMP-2024-042",
    full_name: "John Smith",
    email: "john.smith@university.edu",
    phone_number: "09987654321",
    age: 29,
    birthday: "1995-11-20",
    gender: "Male",
    city: "Quezon City",
    province: "Metro Manila",
    rank_designation: "Instructor I",
    employment_type: "Part-Time",
    date_hired: "2024-01-15"
  }
];

export const createFacultyProfile = async (profileData: FacultyProfileInput) => {
  console.log("Mock DB: Creating faculty profile...");
  const newProfile = { ...profileData, id: profileData.id || `mock-fac-${Date.now()}` };
  mockFacultyProfiles.push(newProfile);
  return newProfile;
};

export const getAllFaculty = async () => {
  console.log("Mock DB: Fetching all faculty profiles...");
  return mockFacultyProfiles;
};

export const updateFacultyProfile = async (id: string, updates: Partial<FacultyProfileInput>) => {
  console.log(`Mock DB: Updating faculty profile ${id}...`);
  const index = mockFacultyProfiles.findIndex(fac => fac.id === id);
  if (index === -1) throw new Error("Faculty profile not found in mock database");
  
  mockFacultyProfiles[index] = { ...mockFacultyProfiles[index], ...updates };
  return mockFacultyProfiles[index];
};


/*
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
*/
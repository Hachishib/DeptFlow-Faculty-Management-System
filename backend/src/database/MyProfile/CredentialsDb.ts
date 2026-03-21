// import { supabaseAdmin } from "../../utils/supabaseAdmin";

export interface CredentialInput {
  id?: string;
  faculty_id: string;
  category: 'Certification' | 'License' | 'Seminar'; 
  title?: string;
  organization?: string;
  authority?: string;
  organizer?: string;
  year?: number; 
  photo_url?: string; 
}


let mockCredentials: CredentialInput[] = [
  {
    id: "mock-cred-1",
    faculty_id: "1",
    category: "Certification",
    title: "AWS Certified Developer",
    organization: "Amazon Web Services",
    year: 2023
  },
  {
    id: "mock-cred-2",
    faculty_id: "1", 
    category: "Seminar",
    title: "Modern Web Development Trends",
    organizer: "Tech Conferences PH",
    year: 2024
  }
];

export const createCredential = async (credentialData: CredentialInput) => {
  console.log("Mock DB: Creating credential...");
  const newCredential = { ...credentialData, id: `mock-cred-${Date.now()}` };
  mockCredentials.push(newCredential);
  
  return newCredential;
};

export const getCredentialsByFaculty = async (facultyId: string) => {
  console.log(`Mock DB: Fetching credentials for faculty ${facultyId}...`);
  return mockCredentials.filter(cred => cred.faculty_id === facultyId);
};

export const updateCredential = async (id: string, updates: Partial<CredentialInput>) => {
  console.log(`Mock DB: Updating credential ${id}...`);
  
  const index = mockCredentials.findIndex(cred => cred.id === id);
  if (index === -1) throw new Error("Credential not found in mock database");

  mockCredentials[index] = { ...mockCredentials[index], ...updates };
  
  return mockCredentials[index];
};


//Uncomment the below code and comment out the above mock implementations when ready to connect to the actual database
// import { supabaseAdmin } from "../../utils/supabaseAdmin";
/*
export const createCredential = async (credentialData: CredentialInput) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('credentials')  // Waiting for table name
      .insert([credentialData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("DB Create Error:", error.message);
    throw new Error(`Failed to create credential: ${error.message}`);
  }
};

export const getCredentialsByFaculty = async (facultyId: string) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('credentials')
      .select('*')
      .eq('faculty_id', facultyId);
     
    if (error) throw error;  
    return data;
  } catch (error: any) {
    console.error("DB Fetch Error:", error.message);
    throw new Error(`Failed to fetch credentials: ${error.message}`);
  }
};

export const updateCredential = async (id: string, updates: Partial<CredentialInput>) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('credentials')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
     
    if (error) throw error;  
    return data;
  } catch (error: any) {
    console.error("DB Update Error:", error.message);
    throw new Error(`Failed to update credential: ${error.message}`);
  }
};
*/
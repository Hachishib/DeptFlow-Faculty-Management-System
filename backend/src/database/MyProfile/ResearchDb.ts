// import { supabaseAdmin } from "../../utils/supabaseAdmin";

export interface ResearchInput {
  id?: string;
  faculty_id: string; 
  title?: string;
  category?: 'Journal' | 'Thesis' | 'Book' | 'Conference' | 'Other'; 
  journal_conference?: string; 
}



let mockResearchRecords: ResearchInput[] = [
  {
    id: "mock-res-1",
    faculty_id: "1", 
    title: "The Impact of AI in Modern Education",
    category: "Journal",
    journal_conference: "Journal of Educational Technology"
  },
  {
    id: "mock-res-2",
    faculty_id: "1",
    title: "Machine Learning Optimization Techniques",
    category: "Conference",
    journal_conference: "IEEE International Conference on Data Mining"
  }
];

export const createResearch = async (researchData: ResearchInput) => {
  console.log("Mock DB: Creating research record...");
  const newRecord = { ...researchData, id: `mock-res-${Date.now()}` };
  mockResearchRecords.push(newRecord);
  return newRecord;
};

export const getResearchByFaculty = async (facultyId: string) => {
  console.log(`Mock DB: Fetching research for faculty ${facultyId}...`);
  return mockResearchRecords.filter(res => res.faculty_id === facultyId);
};

export const updateResearch = async (id: string, updates: Partial<ResearchInput>) => {
  console.log(`Mock DB: Updating research record ${id}...`);
  const index = mockResearchRecords.findIndex(res => res.id === id);
  if (index === -1) throw new Error("Research record not found in mock database");
  
  mockResearchRecords[index] = { ...mockResearchRecords[index], ...updates };
  return mockResearchRecords[index];
};


/*
// Create a new research record
export const createResearch = async (researchData: ResearchInput) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('research_records')
      .insert([researchData])
      .select()
      .single();
    
    if (error) throw error;

    return data;
  } catch (error: any) {
    console.error("DB Create Error:", error.message);
    throw new Error(`Failed to create research record: ${error.message}`);
  }
};

// Get all research records for a specific faculty member
export const getResearchByFaculty = async (facultyId: string) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('research_records')
      .select('*')
      .eq('faculty_id', facultyId);
     
    if (error) throw error;  

    return data;
  } catch (error: any) {
    console.error("DB Fetch Error:", error.message);
    throw new Error(`Failed to fetch research records: ${error.message}`);
  }
};

// Update a specific research record
export const updateResearch = async (id: string, updates: Partial<ResearchInput>) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('research_records')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
     
    if (error) throw error;  

    return data;
  } catch (error: any) {
    console.error("DB Update Error:", error.message);
    throw new Error(`Failed to update research record: ${error.message}`);
  }
};
*/
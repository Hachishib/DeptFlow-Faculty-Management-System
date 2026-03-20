import { supabaseAdmin } from "../../utils/supabaseAdmin";

export interface ResearchInput {
  id?: string;
  faculty_id: string; // Foreign key linking to faculty_profiles
  title?: string;
  category?: 'Journal' | 'Thesis' | 'Book' | 'Conference' | 'Other'; 
  journal_conference?: string; 
}

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
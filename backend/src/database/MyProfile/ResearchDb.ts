import { supabaseAdmin } from "../../utils/supabaseAdmin";

export interface ResearchInput {
  faculty_id: string;
  title: string;
  category?: string;
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
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown database error";
    console.error("DB Create Error:", errorMessage);
    throw new Error(`Failed to create research record: ${errorMessage}`);
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
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown database error";
    console.error("DB Fetch Error:", errorMessage);
    throw new Error(`Failed to fetch research records: ${errorMessage}`);
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
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown database error";
    console.error("DB Update Error:", errorMessage);
    throw new Error(`Failed to update research record: ${errorMessage}`);
  }
};

// Added the Delete function to complete the set!
export const deleteResearch = async (id: string) => {
  try {
    const { error } = await supabaseAdmin
      .from('research_records')
      .delete()
      .eq('id', id);
      
    if (error) throw error;  
    return true; 
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown database error";
    console.error("DB Delete Error:", errorMessage);
    throw new Error(`Failed to delete research record: ${errorMessage}`);
  }
};
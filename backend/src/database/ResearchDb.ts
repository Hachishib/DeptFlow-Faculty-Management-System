import { supabaseAdmin } from "../utils/supabaseAdmin";

export interface ResearchInput {
  faculty_id: string;
  title: string;
  category: string; // ENUM: 'Journal', 'Thesis', 'Book', 'Conference', 'Other'
  journal_conference?: string; // Optional
}

// POST: Add a new research entry
export const addResearch = async (researchData: ResearchInput) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('faculty_research')
      .insert([researchData])
      .select()
      .single();
      
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("DB Add Research Error:", error.message);
    throw error;
  }
};

// GET: Fetch all research for ONE specific teacher
export const getResearchByFaculty = async (faculty_id: string) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('faculty_research')
      .select('*')
      .eq('faculty_id', faculty_id)
      .order('research_id', { ascending: false });
      
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("DB Fetch Research Error:", error.message);
    throw new Error(`Failed to fetch research: ${error.message}`);
  }
};

// PATCH: Update an existing research entry
export const updateResearch = async (id: number, updates: Partial<ResearchInput>) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('faculty_research')
      .update(updates)
      .eq('research_id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("DB Update Research Error:", error.message);
    throw error;
  }
};

// DELETE: Remove a research record
export const deleteResearch = async (id: number) => {
  try {
    const { error } = await supabaseAdmin
      .from('faculty_research')
      .delete()
      .eq('research_id', id);
      
    if (error) throw error;
    return true;
  } catch (error: any) {
    console.error("DB Delete Research Error:", error.message);
    throw new Error(`Failed to delete research: ${error.message}`);
  }
};
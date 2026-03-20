import { supabaseAdmin } from "../../utils/supabaseAdmin";

export interface CredentialInput {
  id?: string;
  faculty_id: string;
  category: 'Certification' | 'License' | 'Seminar'; // Enforcing the 3 categories
  title?: string;
  
  // Specific to Certifications
  organization?: string;
  
  // Specific to Licenses
  authority?: string;
  
  // Specific to Seminars
  organizer?: string;
  
  year?: number; // or string if you prefer YYYY format
  photo_url?: string; // Used for both certificate_photo and license_photo
}

export const createCredential = async (credentialData: CredentialInput) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('credentials')
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
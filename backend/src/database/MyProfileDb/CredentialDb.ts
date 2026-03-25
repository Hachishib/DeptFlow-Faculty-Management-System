import { supabaseAdmin } from "../../CONTROLLERS/utils/supabaseAdmin";

export interface CredentialInput {
  faculty_id: string;
  credential_type: string; // ENUM: 'Certification', 'License', 'Seminar'
  title: string;
  issuer: string;
  issue_year?: number;
  proof_url?: string;
}

// POST: Add a new credential
export const addCredential = async (credentialData: CredentialInput) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('faculty_credentials')
      .insert([credentialData])
      .select()
      .single();
      
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("DB Add Credential Error:", error.message);
    throw error;
  }
};

// GET: Fetch all credentials for ONE specific teacher
export const getCredentialsByFaculty = async (faculty_id: string) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('faculty_credentials')
      .select('*')
      .eq('faculty_id', faculty_id)
      .order('issue_year', { ascending: false }); // Show newest first!
      
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("DB Fetch Credentials Error:", error.message);
    throw new Error(`Failed to fetch credentials: ${error.message}`);
  }
};

// PATCH: Update an existing credential
export const updateCredential = async (id: number, updates: Partial<CredentialInput>) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('faculty_credentials')
      .update(updates)
      .eq('credential_id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("DB Update Credential Error:", error.message);
    throw error;
  }
};

// DELETE: Remove a credential
export const deleteCredential = async (id: number) => {
  try {
    const { error } = await supabaseAdmin
      .from('faculty_credentials')
      .delete()
      .eq('credential_id', id)
      
    if (error) throw error;
    return true;
  } catch (error: any) {
    console.error("DB Delete Credential Error:", error.message);
    throw new Error(`Failed to delete credential: ${error.message}`);
  }
};
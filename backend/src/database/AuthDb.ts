import { supabaseAdmin } from "../utils/supabaseAdmin"; 

export interface GoogleUserInput {
  googleId: string; 
  email: string;
  fullName: string;
  profilePhoto?: string;
}

// src/database/AuthDb.ts

export const syncGoogleUserToDb = async (userData: GoogleUserInput) => {
  try {
    const { data: profile, error } = await supabaseAdmin
      .from('auth_google') 
      .upsert({
        googleid: userData.googleId,      // Matches your DB column 'googleid'
        email: userData.email,            // Matches your DB column 'email'
        fullname: userData.fullName,      // Matches your DB column 'fullname'
        "profilePhoto?": userData.profilePhoto // Matches your DB column 'profilePhoto?'
      }, { onConflict: 'googleid' })      // 'googleid' is your Primary Key
      .select('role') // ⚠️ IMPORTANT: Does a 'role' column exist in this table? 
                      // If not, remove .select('role') or add the column to Supabase!
      .single();

    if (error) throw error;
    return profile;
  } catch (error: any) {
    console.error("Supabase Auth Sync Error:", error.message);
    throw new Error(`Failed to sync user data: ${error.message}`);
  }
};
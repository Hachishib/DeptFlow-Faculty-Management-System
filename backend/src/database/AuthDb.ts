import { supabaseAdmin } from "../utils/supabaseAdmin"; 

export interface GoogleUserInput {
  googleId: string; 
  email: string;
  fullName: string;
  profilePhoto?: string;
}

export const syncGoogleUserToDb = async (userData: GoogleUserInput) => {
  try {
    const { data: profile, error } = await supabaseAdmin
      .from('auth_google')
      .upsert({
        id: userData.googleId,
        full_name: userData.fullName,
        photo_url: userData.profilePhoto
      }, { onConflict: 'id' })
      .select('role') 
      .single();

    if (error) throw error;

    return profile;
  } catch (error: any) {
    console.error("Supabase Auth Sync Error:", error.message);
    throw new Error(`Failed to sync user data: ${error.message}`);
  }
};
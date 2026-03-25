import { supabaseAdmin } from "../../CONTROLLERS/utils/supabaseAdmin"; 

export interface GoogleUserInput {
  googleId: string; 
  email: string;
  fullName: string;
  profilePhoto?: string;
}

export const syncGoogleUserToDb = async (userData: GoogleUserInput) => {
  try {
    const { error: authError } = await supabaseAdmin
      .from('auth_google') 
      .upsert({
        google_id: userData.googleId,      
        email: userData.email            
      }, { onConflict: 'google_id' });

    if (authError) throw authError;


    const { data: profile, error: profileError } = await supabaseAdmin
      .from('faculty_profiles')
      .upsert({
        faculty_id: userData.googleId,
        full_name: userData.fullName,
        photo_url: userData.profilePhoto

      }, { onConflict: 'faculty_id' })
      .select()
      .single();

    if (profileError) throw profileError;


    return profile; 

  } catch (error: any) {
    console.error("Supabase Auth Sync Error:", error.message);
    throw new Error(`Failed to sync user data: ${error.message}`);
  }
};
import { supabaseAdmin } from "../utils/supabaseAdmin"; 

export interface GoogleUserInput {
  googleId: string; 
  email: string;
  fullName: string;
  profilePhoto?: string;
}

export const syncGoogleUserToDb = async (userData: GoogleUserInput) => {
  try {
    
    const { data: authData, error: authError } = await supabaseAdmin
      .from('auth_google') 
      .upsert({
        google_id: userData.googleId,      
        email: userData.email            
        
      }, { onConflict: 'google_id' })
      .select('role')
      .single();

    if (authError) throw authError;

    const nameParts = userData.fullName.split(' ');
    const first = nameParts[0];
    const last = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    const { data: profile, error: profileError } = await supabaseAdmin
      .from('faculty_profiles')
      .upsert({
        faculty_id: userData.googleId,
        first_name: first,
        last_name: last,
        photo_url: userData.profilePhoto
      }, { onConflict: 'faculty_id' })
      .select()
      .single();

    if (profileError) throw profileError;

    return {
      ...profile,
      role: authData.role 
    }; 

  } catch (error: any) {
    console.error("Supabase Auth Sync Error:", error.message);
    throw new Error(`Failed to sync user data: ${error.message}`);
  }
};
import { supabaseAdmin } from "../utils/supabaseAdmin"; 

export interface GoogleUserInput {
  googleId: string; 
  email: string;
  fullName: string;
  profilePhoto?: string;
}

export const syncGoogleUserToDb = async (userData: GoogleUserInput) => {
  try {
    // STEP 1: Save the Keycard (Login Credentials)
    const { error: authError } = await supabaseAdmin
      .from('auth_google') 
      .upsert({
        google_id: userData.googleId,      
        email: userData.email            
      }, { onConflict: 'google_id' });

    if (authError) throw authError;

    // STEP 2: Create or Update the Employee File (Faculty Profile)
    // We use 'upsert' here too! If they update their Google Profile Photo, 
    // it will automatically update their picture in your system the next time they log in.
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('faculty_profiles')
      .upsert({
        faculty_id: userData.googleId,
        full_name: userData.fullName,
        photo_url: userData.profilePhoto
        // Note: We don't send a 'role' here, so it safely defaults 
        // to whatever your Supabase database is set to do for new users.
      }, { onConflict: 'faculty_id' })
      .select()
      .single();

    if (profileError) throw profileError;

    // We return the 'profile' because it contains the cool stuff the frontend needs (like role, full name)
    return profile; 

  } catch (error: any) {
    console.error("Supabase Auth Sync Error:", error.message);
    throw new Error(`Failed to sync user data: ${error.message}`);
  }
};
import { supabaseAdmin } from "../utils/supabaseAdmin"; 

export interface GoogleUserInput {
  googleId: string; 
  email: string;
  fullName: string;
  profilePhoto?: string;
}

export const syncGoogleUserToDb = async (userData: GoogleUserInput) => {
  try {
    const { data: profile, error: fetchError } = await supabaseAdmin
      .from('faculty_profiles')
      .select('role') 
      .eq('google_id', userData.googleId)
      .single();

    if (fetchError){
      throw new Error("Access denied: You are not authorized to use this system.");
    };

    const {data: updatedProfile, error: updateError } = await supabaseAdmin
      .from('faculty_profiles')
      .update({
        full_name: userData.fullName,
        photo_url: userData.profilePhoto
      })
      .eq('google_id', userData.googleId)
      .select('role, full_name, photo_url')
      .single();

    if (updateError) {
      throw new Error(`Failed to update user data: ${updateError.message}`);
    }

    return updatedProfile;
  } catch (error: any) {
    console.error("Supabase Auth Sync Error:", error.message);
    throw new Error(error.message || "An error occurred while syncing user data.");
  }
};
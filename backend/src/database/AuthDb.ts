import { supabaseAdmin } from "../utils/supabaseAdmin"; 

export interface GoogleUserInput {
  googleId: string; 
  email: string;
  fullName: string;
  profilePhoto?: string;
}

export const syncGoogleUserToDb = async (userData: GoogleUserInput) => {
  try {
    // The Whitelist Check
    const { data: existingProfile, error: searchError } = await supabaseAdmin
      .from('faculty_profiles')
      .select('*')
      .eq('email', userData.email)
      .single();


    if (searchError || !existingProfile) {
      throw new Error("whitelist_denied"); 
    }

    const matchedFacultyId = existingProfile.faculty_id;

    const nameParts = userData.fullName.split(' ');
    const first = nameParts[0];
    const last = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    if (!existingProfile.first_name || !existingProfile.last_name || !existingProfile.photo_url) {
      await supabaseAdmin.from('faculty_profiles').update({ 
        first_name: existingProfile.first_name || first,
        last_name: existingProfile.last_name || last,
        photo_url: existingProfile.photo_url || userData.profilePhoto
      }).eq('faculty_id', matchedFacultyId);
      
      existingProfile.first_name = existingProfile.first_name || first;
      existingProfile.last_name = existingProfile.last_name || last;
      existingProfile.photo_url = existingProfile.photo_url || userData.profilePhoto;
    }

    const { error: authError } = await supabaseAdmin
      .from('auth_google') 
      .upsert({
        google_id: userData.googleId,      
        email: userData.email,
        faculty_id: matchedFacultyId 
      }, { onConflict: 'google_id' });

    if (authError) throw authError;

    return {
      ...existingProfile 
    };

  } catch (error: any) {
    console.error("Supabase Auth Sync Error:", error.message);
    throw error; 
  }
};
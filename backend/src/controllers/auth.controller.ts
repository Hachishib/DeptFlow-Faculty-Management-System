import { Request, Response } from "express";
import { supabaseAdmin } from "../utils/supabaseAdmin"; 

export const googleLogin = async (req: Request, res: Response): Promise<any> => {
  try {
    const { googleId, email, fullName, profilePhoto } = req.body;

    if (!googleId || !email) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    // 1. Sync Data to Supabase (Bypassing RLS with Admin Key)
    const { error: syncError } = await supabaseAdmin
      .from('faculty_profiles')
      .upsert({
        id: googleId,
        full_name: fullName,
        photo_url: profilePhoto
      }, { onConflict: 'id' });

    if (syncError) {
      console.error("Sync Error:", syncError.message);
      return res.status(500).json({ message: "Failed to sync user data to database" });
    }

    // 2. Get the user's role from Supabase
    const { data: profile, error: roleError } = await supabaseAdmin
      .from('faculty_profiles')
      .select('role')
      .eq('id', googleId)
      .single();

    if (roleError && roleError.code !== 'PGRST116') {
      console.error("Role Error:", roleError.message);
    }

    // 3. Send the final response back to the React frontend
    return res.status(200).json({
      success: true,
      message: "Login successful",
      role: profile?.role || 'faculty', 
      user: { googleId, email, fullName, profilePhoto },
    });
    
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ message: "Google login failed" });
  }
};
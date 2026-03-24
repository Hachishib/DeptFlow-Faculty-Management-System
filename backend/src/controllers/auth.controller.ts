import { Request, Response } from "express";
import { syncGoogleUserToDb } from "../database/AuthDb";

export const googleLogin = async (req: Request, res: Response): Promise<any> => {
  try {
    const { googleId, email, fullName, profilePhoto } = req.body;

    if (!googleId || !email) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    const profile = await syncGoogleUserToDb({
      googleId,
      email,
      fullName,
      profilePhoto
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      role: profile?.role || 'faculty', 
      user: { googleId, email, fullName, profilePhoto },
    });
    
  } catch (error: any) {
    console.error("FULL CONTROLLER ERROR:", error); 
    return res.status(500).json({ message: "Login failed", error: error.message });
  }
};
import { Request, Response } from "express";

export const googleLogin = async (req: Request, res: Response) => {
  try {
    const { googleId, email, fullName, profilePhoto } = req.body;

    if (!googleId || !email) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    return res.status(200).json({
      message: "Login successful",
      user: { googleId, email, fullName, profilePhoto },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Google login failed" });
  }
  
};
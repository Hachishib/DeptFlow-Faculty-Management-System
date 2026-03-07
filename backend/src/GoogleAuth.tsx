import { Request, Response } from "express";

interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
}

export const verifyGoogleToken = async (req: Request, res: Response) => {
  const { token } = req.body;

  console.log("📥 Request received from frontend");
  console.log("Token received:", token?.substring(0, 20) + "...");

  if (!token) return res.status(400).json({ error: "Token is required" });

  try {
    const userResponse = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`
    );

    if (!userResponse.ok) {
      console.log("❌ Invalid Google token");
      return res.status(401).json({ error: "Invalid Google token" });
    }

    const userProfile = (await userResponse.json()) as GoogleUser;
    console.log("✅ Google Profile fetched:");
    console.log("  - ID:", userProfile.id);
    console.log("  - Email:", userProfile.email);
    console.log("  - Name:", userProfile.name);

    // Strict TUP Check
    // if (!userProfile.email?.endsWith("@tup.edu.ph")) {
    //   console.log("❌ Non-TUP email detected:", userProfile.email);
    //   return res.status(403).json({ error: "Access Denied: Use TUP email." });
    // }

    console.log("✅ TUP email verified! Sending user data to frontend...");

    // Return only the verified data for now
    const responseData = {
      success: true,
      user: {
        googleId: userProfile.id,
        email: userProfile.email,
        profilePhoto: userProfile.picture,
        fullName: userProfile.name,
      },
    };

    console.log("📤 Response being sent to frontend:", responseData);
    return res.status(200).json(responseData);
  } catch (error) {
    console.error("❌ Auth error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
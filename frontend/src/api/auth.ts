export async function handleGoogleAuth(userProfile: {
  googleId: string;
  email: string;
  fullName: string;
  profilePhoto: string;
}) {
  try {
    // 1. Pull the URL from your .env file
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    // 2. Send the data to Render (or localhost if you change the .env later)
    const response = await fetch(`${backendUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userProfile),
    });

    if (!response.ok) {
      throw new Error("Backend response was not ok");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Login API Error:", error);
    return { success: false, message: "Error connecting to backend", role: "faculty" };
  }
}
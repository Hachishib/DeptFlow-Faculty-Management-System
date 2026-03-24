export async function handleGoogleAuth(userProfile: {
  googleId: string;
  email: string;
  fullName: string;
  profilePhoto: string;
}) {
  try {
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const response = await fetch(`${backendUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userProfile),
    });

    const data = await response.json();

    if (!response.ok) {
      return data;
    }

    return data;
  } catch (error: any) {
    console.error("Login API Error:", error);
    return {
      success: false,
      message: error.message || "Error connecting to backend",
    };
  }
}

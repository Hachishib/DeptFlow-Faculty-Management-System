export async function handleGoogleAuth(userProfile: {
  googleId: string;
  email: string;
  fullName: string;
  profilePhoto: string;
}) {
  const response = await fetch("https://deptflow-faculty-management-system.onrender.com/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userProfile),
  });

  return response.json();
}

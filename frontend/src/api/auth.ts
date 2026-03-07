export async function handleGoogleAuth(userProfile: {
  googleId: string;
  email: string;
  fullName: string;
  profilePhoto: string;
}) {
  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userProfile),
  });

  return response.json();
}

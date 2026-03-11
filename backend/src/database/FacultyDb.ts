export interface FacultyProfileInput {
  id: string; 
  full_name?: string;
  age?: number;
  gender?: string;
  photo_url?: string;
  is_present?: boolean;
  max_units?: number;
  role?: string; 
  employment_type?: string; 
}

// Create a new faculty profile 
export const createFacultyProfile = async (profileData: FacultyProfileInput) => {
  try {
    console.log("📥 [Mock DB] Creating new faculty profile:");
    console.table(profileData);
    await new Promise((resolve) => setTimeout(resolve, 300));


    return {
      status: "success",
      message: "Profile successfully mocked in console",
      data: {
        ...profileData,
        created_at: new Date().toISOString() 
      }
    };
  } catch (error) {
    console.error("Mock DB Create Error:", error);
    throw new Error("Failed to mock create faculty");
  }
};

// Get all faculty profiles (
export const getAllFaculty = async () => {
  try {
    console.log("📤 [Mock DB] Fetching all faculty profiles...");

    await new Promise((resolve) => setTimeout(resolve, 300));
    return [
      { id: "user-123", full_name: "Ada Lovelace", role: "teacher", is_present: true },
      { id: "user-456", full_name: "Alan Turing", role: "admin", is_present: false }
    ];
  } catch (error) {
    console.error("Mock DB Fetch Error:", error);
    throw new Error("Failed to mock fetch faculty");
  }
};

//  Update a specific faculty profile 
export const updateFacultyProfile = async (id: string, updates: Partial<FacultyProfileInput>) => {
  try {
    console.log(`🔄 [Mock DB] Updating faculty profile (ID: ${id}) with data:`);
    console.table(updates);

    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      status: "success",
      message: `Profile ${id} successfully updated in console`,
      data: {
        id,
        ...updates,
        updated_at: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error("Mock DB Update Error:", error);
    throw new Error("Failed to mock update faculty");
  }
};
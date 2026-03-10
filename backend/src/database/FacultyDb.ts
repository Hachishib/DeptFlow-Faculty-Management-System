
export const saveFacultyToDb = async (data: any) => {
  try {
    console.log("--- DATABASE FOLDER REACHED ---");
    console.log("Saving following data to DB:", data);

    return { success: true, savedAt: new Date().toISOString() };
  } catch (error) {
    console.error("Database Folder Error:", error);
    throw new Error("Database operation failed");
  }
};
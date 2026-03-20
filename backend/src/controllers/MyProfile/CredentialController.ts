import { Request, Response } from "express";
import { 
  createCredential, 
  getCredentialsByFaculty, 
  updateCredential 
} from "../../database/MyProfile/CredentialsDb";

export const getFacultyCredentials = async (req: Request, res: Response) => {
  try {
    const { faculty_id } = req.params;
    if (!faculty_id) return res.status(400).json({ message: "Faculty ID is required" });

    const credentials = await getCredentialsByFaculty(faculty_id as string);
    return res.status(200).json({ data: credentials });
  } catch (error: any) {
    console.error("Fetch Credentials Error:", error);
    return res.status(500).json({ message: "Failed to retrieve credentials" });
  }
};

export const addCredential = async (req: Request, res: Response) => {
  try {
    const { 
      faculty_id, category, title, organization, 
      authority, organizer, year, photo_url 
    } = req.body;

    if (!faculty_id || !category) {
      return res.status(400).json({ message: "Faculty ID and Category are required" });
    }

    const credentialData = {
      faculty_id, category, title, organization, 
      authority, organizer, year, photo_url
    };

    const newCredential = await createCredential(credentialData);
    
    return res.status(201).json({
      message: `${category} added successfully`,
      data: newCredential
    });
  } catch (error: any) {
    console.error("Create Credential Error:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

export const updateCredentialDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 
    const updates = req.body; 

    if (!id) return res.status(400).json({ message: "Credential ID is required" });

    const updatedCredential = await updateCredential(id as string, updates);

    return res.status(200).json({
      message: "Credential updated successfully",
      data: updatedCredential
    });
  } catch (error: any) {
    console.error("Update Credential Error:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
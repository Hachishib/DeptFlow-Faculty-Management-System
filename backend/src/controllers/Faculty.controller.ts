import { Request, Response } from "express";
import { 
  createFacultyProfile, 
  getAllFaculty, 
  updateFacultyProfile 
} from "../database/FacultyDb";


export const getFacultyList = async (req: Request, res: Response) => {
  try {
    const faculty = await getAllFaculty();
    return res.status(200).json({ data: faculty });
  } catch (error: any) {
    console.error("Fetch Faculty Error:", error);
    return res.status(500).json({ message: "Failed to retrieve faculty profiles" });
  }
};

// POST: Create a new profile
export const createFaculty = async (req: Request, res: Response) => {
  try {
    const { id, full_name, role, employment_type } = req.body;

    if (!id || !full_name) {
      return res.status(400).json({ message: "ID and Full Name are required" });
    }

    const newProfile = await createFacultyProfile(req.body);
    
    return res.status(201).json({
      message: "Faculty profile created successfully",
      data: newProfile
    });
  } catch (error: any) {
    console.error("Create Faculty Error:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

// PATCH: Update specific fields 
export const updateFacultyStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 
    const updates = req.body; 

    if (!id) {
      return res.status(400).json({ message: "Faculty ID is required" });
    }

    const updatedProfile = await updateFacultyProfile(id as string, updates);

    return res.status(200).json({
      message: "Faculty profile updated",
      data: updatedProfile
    });
  } catch (error: any) {
    console.error("Update Faculty Error:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
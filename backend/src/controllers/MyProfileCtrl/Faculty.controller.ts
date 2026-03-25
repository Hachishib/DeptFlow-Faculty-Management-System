import { Request, Response } from "express";
import { 
  createFacultyProfile, 
  getAllFaculty, 
  updateFacultyProfile 
} from "../../database/MyProfileDb/FacultyDb";

export const getFacultyList = async (req: Request, res: Response): Promise<any> => {
  try {
    const faculty = await getAllFaculty();
    return res.status(200).json({ data: faculty });
  } catch (error: any) {
    console.error("Fetch Faculty Error:", error);
    return res.status(500).json({ message: "Failed to retrieve faculty profiles" });
  }
};

export const createFaculty = async (req: Request, res: Response): Promise<any> => {
  try {
    const { faculty_id, full_name } = req.body;

    if (!faculty_id || !full_name) {
      return res.status(400).json({ message: "ID and Full Name are required" });
    }

    const newProfile = await createFacultyProfile(req.body);
    
    return res.status(201).json({
      message: "Faculty profile created successfully",
      data: newProfile
    });
  } catch (error: any) {
    console.error("Create Faculty Error:", error.message);
    
    // Catch Duplicate Employee ID
    if (error.message.includes('unique constraint') && error.message.includes('employee_id')) {
      return res.status(409).json({ message: "Conflict: This Employee ID is already registered to another faculty member." });
    }

    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

export const updateFacultyStatus = async (req: Request, res: Response): Promise<any> => {
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
    console.error("Update Faculty Error:", error.message);
    
    // Catch Duplicate Employee ID during an update
    if (error.message.includes('unique constraint') && error.message.includes('employee_id')) {
      return res.status(409).json({ message: "Conflict: This Employee ID is already registered to another faculty member." });
    }

    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
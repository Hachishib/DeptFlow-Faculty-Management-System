import crypto from "crypto";
import { Request, Response } from "express";
import { 
  createFacultyProfile, 
  getAllFaculty, 
  updateFacultyProfile 
} from "../database/FacultyDb";

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
    const { email } = req.body; 

    if (!email) {
      return res.status(400).json({ message: "Email is required to whitelist a new faculty member." });
    }
    const faculty_id = req.body.faculty_id || crypto.randomUUID(); 

    const newProfile = await createFacultyProfile({
      faculty_id,
      email
    });
    
    return res.status(201).json({
      message: "Faculty successfully whitelisted!",
      data: newProfile
    });
  } catch (error: any) {
    console.error("Create Faculty Error:", error.message);
    if (error.message.includes('unique constraint') && error.message.includes('email')) {
      return res.status(409).json({ message: "Conflict: This email is already on the whitelist." });
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
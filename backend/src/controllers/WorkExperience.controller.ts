import { Request, Response } from "express";
import { 
  addWorkExperience, 
  getWorkExperienceByFaculty, 
  updateWorkExperience, 
  deleteWorkExperience 
} from "../database/WorkExperienceDb";

export const createWorkExperience = async (req: Request, res: Response): Promise<any> => {
  try {
    const { faculty_id, job_title, start_year } = req.body;
    
    // Require the absolute basics
    if (!faculty_id || !job_title || !start_year) {
      return res.status(400).json({ message: "Faculty ID, Job Title, and Start Year are required." });
    }

    const newExp = await addWorkExperience(req.body);
    return res.status(201).json({ message: "Work experience added successfully", data: newExp });
    
  } catch (error: any) {
    console.error("Create Work Experience Error:", error.message);
    
    // Catching the "Time Travel" lock (end_year < start_year)
    if (error.message.includes('valid_experience_years')) {
      return res.status(400).json({ 
        message: "Invalid dates: End year cannot be before the start year." 
      });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const fetchFacultyWorkExperience = async (req: Request, res: Response): Promise<any> => {
  try {
    const faculty_id = req.params.faculty_id as string;
    
    if (!faculty_id) {
      return res.status(400).json({ message: "Faculty ID is required" });
    }

    const expList = await getWorkExperienceByFaculty(faculty_id);
    return res.status(200).json({ data: expList });
  } catch (error) {
    console.error("Fetch Work Experience Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editWorkExperience = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const updates = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid Experience ID" });
    }

    const updatedExp = await updateWorkExperience(id, updates);
    return res.status(200).json({ message: "Work experience updated", data: updatedExp });
  } catch (error: any) {
    console.error("Update Work Experience Error:", error.message);
    if (error.message.includes('valid_experience_years')) {
      return res.status(400).json({ message: "Invalid dates: End year cannot be before the start year." });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeWorkExperience = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid Experience ID" });
    }

    await deleteWorkExperience(id);
    return res.status(200).json({ message: "Work experience record deleted." });
  } catch (error) {
    console.error("Delete Work Experience Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
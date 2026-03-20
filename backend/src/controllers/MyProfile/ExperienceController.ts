import { Request, Response } from "express";
import { 
  createExperience, 
  getExperiencesByFaculty, 
  updateExperience 
} from "../../database/MyProfile/ExperienceDb";

export const getFacultyExperience = async (req: Request, res: Response) => {
  try {
    const { faculty_id } = req.params;
    if (!faculty_id) return res.status(400).json({ message: "Faculty ID is required" });

    const experiences = await getExperiencesByFaculty(faculty_id);
    return res.status(200).json({ data: experiences });
  } catch (error: any) {
    console.error("Fetch Experience Error:", error);
    return res.status(500).json({ message: "Failed to retrieve experiences" });
  }
};

export const addExperience = async (req: Request, res: Response) => {
  try {
    const { faculty_id, job_title, start_year, end_year } = req.body;

    if (!faculty_id || !job_title) {
      return res.status(400).json({ message: "Faculty ID and Job Title are required" });
    }

    const experienceData = { faculty_id, job_title, start_year, end_year };
    const newExperience = await createExperience(experienceData);
    
    return res.status(201).json({
      message: "Experience record added successfully",
      data: newExperience
    });
  } catch (error: any) {
    console.error("Create Experience Error:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

export const updateExperienceDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 
    const updates = req.body; 

    if (!id) return res.status(400).json({ message: "Experience ID is required" });

    const updatedExperience = await updateExperience(id as string, updates);

    return res.status(200).json({
      message: "Experience updated successfully",
      data: updatedExperience
    });
  } catch (error: any) {
    console.error("Update Experience Error:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
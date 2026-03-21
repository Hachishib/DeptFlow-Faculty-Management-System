import { Request, Response } from "express";
import { 
  createResearch, 
  getResearchByFaculty, 
  updateResearch 
} from "../../database/MyProfile/ResearchDb";

export const getFacultyResearch = async (req: Request, res: Response) => {
  try {
    const { faculty_id } = req.params;
    if (typeof faculty_id !== 'string') {
      return res.status(400).json({ message: "Faculty ID string is required" });
    }

    const researchRecords = await getResearchByFaculty(faculty_id);
    return res.status(200).json({ data: researchRecords });
  } catch (error: any) {
    return res.status(500).json({ message: "Failed to retrieve research records" });
  }
};

// POST: Add a new research record
export const addResearch = async (req: Request, res: Response) => {
  try {
    const { 
      faculty_id, 
      title, 
      category, 
      journal_conference 
    } = req.body;

    if (!faculty_id || !title) {
      return res.status(400).json({ message: "Faculty ID and Title are required" });
    }

    const researchData = {
      faculty_id,
      title,
      category,
      journal_conference
    };

    const newResearch = await createResearch(researchData);
    
    return res.status(201).json({
      message: "Research record added successfully",
      data: newResearch
    });
  } catch (error: any) {
    console.error("Create Research Error:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

export const updateResearchDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 
    if (typeof id !== 'string') {
      return res.status(400).json({ message: "Research Record ID is required" });
    }

    const updatedResearch = await updateResearch(id, req.body);
    return res.status(200).json({ data: updatedResearch });
  } catch (error: any) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
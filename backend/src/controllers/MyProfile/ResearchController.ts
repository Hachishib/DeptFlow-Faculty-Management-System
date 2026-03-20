import { Request, Response } from "express";
import { 
  createResearch, 
  getResearchByFaculty, 
  updateResearch 
} from "../../database/MyProfile/ResearchDb";

// GET: Retrieve research records for a specific faculty member
export const getFacultyResearch = async (req: Request, res: Response) => {
  try {
    const { faculty_id } = req.params;

    if (!faculty_id) {
      return res.status(400).json({ message: "Faculty ID is required" });
    }

    const researchRecords = await getResearchByFaculty(faculty_id);
    return res.status(200).json({ data: researchRecords });
  } catch (error: any) {
    console.error("Fetch Research Error:", error);
    return res.status(500).json({ message: "Failed to retrieve research records" });
  }
};

// POST: Add a new research record
export const addResearch = async (req: Request, res: Response) => {
  try {
    // Explicitly destructure allowed fields
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

// PATCH: Update specific research details
export const updateResearchDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // The ID of the research record itself
    const updates = req.body; 

    if (!id) {
      return res.status(400).json({ message: "Research Record ID is required" });
    }

    const updatedResearch = await updateResearch(id as string, updates);

    return res.status(200).json({
      message: "Research record updated successfully",
      data: updatedResearch
    });
  } catch (error: any) {
    console.error("Update Research Error:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
import { Request, Response } from "express";
import { 
  addResearch, 
  getResearchByFaculty, 
  updateResearch, 
  deleteResearch 
} from "../database/ResearchDb";

export const createResearch = async (req: Request, res: Response): Promise<any> => {
  try {
    const { faculty_id, title, category } = req.body;
    
    // Require the absolute basics
    if (!faculty_id || !title || !category) {
      return res.status(400).json({ message: "Faculty ID, Title, and Category are required." });
    }

    const newResearch = await addResearch(req.body);
    return res.status(201).json({ message: "Research added successfully", data: newResearch });
    
  } catch (error: any) {
    console.error("Create Research Error:", error.message);
    
    // Catching the DB Category ENUM Lock
    if (error.message.includes('valid_research_category')) {
      return res.status(400).json({ 
        message: "Invalid category. Must be 'Journal', 'Thesis', 'Book', 'Conference', or 'Other'." 
      });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const fetchFacultyResearch = async (req: Request, res: Response): Promise<any> => {
  try {
    const faculty_id = req.params.faculty_id as string;
    
    if (!faculty_id) {
      return res.status(400).json({ message: "Faculty ID is required" });
    }

    const researchList = await getResearchByFaculty(faculty_id);
    return res.status(200).json({ data: researchList });
  } catch (error) {
    console.error("Fetch Research Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editResearch = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const updates = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid Research ID" });
    }

    const updatedResearch = await updateResearch(id, updates);
    return res.status(200).json({ message: "Research updated", data: updatedResearch });
  } catch (error: any) {
    console.error("Update Research Error:", error.message);
    if (error.message.includes('valid_research_category')) {
      return res.status(400).json({ message: "Invalid category type." });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeResearch = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid Research ID" });
    }

    await deleteResearch(id);
    return res.status(200).json({ message: "Research record deleted." });
  } catch (error) {
    console.error("Delete Research Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
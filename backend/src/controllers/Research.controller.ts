import { Request, Response } from "express";
import { 
  createResearch, 
  getResearchByFaculty, 
  updateResearch,
  deleteResearch, // Imported our new delete function
  ResearchInput   // Imported the interface from the DB file
} from "../../database/MyProfile/ResearchDb";

export const getFacultyResearch = async (req: Request, res: Response) => {
  try {
    const { faculty_id } = req.params;
    if (!faculty_id) return res.status(400).json({ message: "Faculty ID is required" });

    const researchRecords = await getResearchByFaculty(faculty_id);
    return res.status(200).json({ data: researchRecords });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to retrieve research records";
    console.error("Fetch Research Error:", errorMessage);
    return res.status(500).json({ message: errorMessage });
  }
};

export const addResearch = async (req: Request, res: Response) => {
  try {
    // Strongly type the request body using our interface
    const { 
      faculty_id, 
      title, 
      category, 
      journal_conference 
    } = req.body as ResearchInput;

    if (!faculty_id || !title) {
      return res.status(400).json({ message: "Faculty ID and Title are required" });
    }

    const researchData: ResearchInput = {
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
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    console.error("Create Research Error:", errorMessage);
    return res.status(500).json({ message: errorMessage });
  }
};

export const updateResearchDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 
    const updates = req.body;

    if (!id) return res.status(400).json({ message: "Research Record ID is required" });

    const updatedResearch = await updateResearch(id, updates);
    return res.status(200).json({ data: updatedResearch });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    console.error("Update Research Error:", errorMessage);
    return res.status(500).json({ message: errorMessage });
  }
};

// Added the controller function to handle deletion
export const removeResearch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 

    if (!id) return res.status(400).json({ message: "Research Record ID is required" });

    await deleteResearch(id);

    return res.status(200).json({ message: "Research record deleted successfully" });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    console.error("Delete Research Error:", errorMessage);
    return res.status(500).json({ message: errorMessage });
  }
};
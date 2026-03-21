import { Request, Response } from "express";
import { 
    addEducation, 
    getEducationByFaculty, 
    updateEducation, 
    deleteEducation 
} from "../database/EducationDb";

export const createEducation = async (req: Request, res: Response): Promise<any> => {
  try {
    const { faculty_id, degree_level, discipline_category, university } = req.body;
    
    // Basic validation to prevent ghost records
    if (!faculty_id || !degree_level || !discipline_category || !university) {
      return res.status(400).json({ message: "Missing required education fields." });
    }

    const newEd = await addEducation(req.body);
    return res.status(201).json({ message: "Education added successfully", data: newEd });
    
  } catch (error: any) {
    console.error("Create Education Error:", error.message);
    
    // Translating the Database ENUM lock for the frontend
    if (error.message.includes('valid_degree')) {
      return res.status(400).json({ 
        message: "Invalid degree level. Must be 'Bachelors', 'Masters', 'Doctorate', 'Associate', 'Certificate', or 'Diploma'." 
      });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const fetchFacultyEducation = async (req: Request, res: Response): Promise<any> => {
  try {
    const faculty_id = req.params.faculty_id as string;
    
    if (!faculty_id) {
      return res.status(400).json({ message: "Faculty ID is required" });
    }

    const educationList = await getEducationByFaculty(faculty_id);
    return res.status(200).json({ data: educationList });
  } catch (error) {
    console.error("Fetch Education Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editEducation = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const updates = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid Education ID" });
    }

    const updatedEd = await updateEducation(id, updates);
    return res.status(200).json({ message: "Education updated", data: updatedEd });
  } catch (error: any) {
    console.error("Update Education Error:", error.message);
    if (error.message.includes('valid_degree')) {
      return res.status(400).json({ message: "Invalid degree level provided." });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeEducation = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid Education ID" });
    }

    await deleteEducation(id);
    return res.status(200).json({ message: "Education record deleted." });
  } catch (error) {
    console.error("Delete Education Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
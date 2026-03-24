import { Request, Response } from "express";
import { 
  createEducationRecord, 
  getEducationByFaculty, 
  updateEducationRecord 
} from "../../database/MyProfile/EducationDb";


export const getFacultyEducation = async (req: Request, res: Response) => {
  try {
    const { faculty_id } = req.params;

    if (typeof faculty_id !== 'string') {
      return res.status(400).json({ message: "A valid Faculty ID string is required" });
    }

    const educationRecords = await getEducationByFaculty(faculty_id); 
    return res.status(200).json({ data: educationRecords });
  } catch (error: any) {
    return res.status(500).json({ message: "Failed to retrieve education records" });
  }
};

export const createEducation = async (req: Request, res: Response) => {
  try {
    const { 
      faculty_id,
      degree_level,
      discipline_category,
      university,
      graduation_date
    } = req.body;

    if (!faculty_id) {
      return res.status(400).json({ message: "Faculty ID is required to add an education record" });
    }

    const educationData = {
      faculty_id,
      degree_level,
      discipline_category,
      university,
      graduation_date
    };

    const newRecord = await createEducationRecord(educationData);
    
    return res.status(201).json({
      message: "Education record added successfully",
      data: newRecord
    });
  } catch (error: any) {
    console.error("Create Education Error:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

// PATCH: Update a specific education record
export const updateEducationDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 
    const updates = req.body; 

    if (typeof id !== 'string') {
      return res.status(400).json({ message: "A valid Education Record ID is required" });
    }

    const updatedRecord = await updateEducationRecord(id, updates);
    return res.status(200).json({ data: updatedRecord });
  } catch (error: any) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
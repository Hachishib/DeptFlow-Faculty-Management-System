import { Request, Response } from "express";
import { 
  createEducationRecord, 
  getEducationByFaculty, 
  updateEducationRecord 
} from "../../database/MyProfile/EducationDb";



// GET: Retrieve education records for a specific faculty member
export const getFacultyEducation = async (req: Request, res: Response) => {
  try {
    const { faculty_id } = req.params;

    if (!faculty_id) {
      return res.status(400).json({ message: "Faculty ID is required" });
    }

    const educationRecords = await getEducationByFaculty(faculty_id);
    return res.status(200).json({ data: educationRecords });
  } catch (error: any) {
    console.error("Fetch Education Error:", error);
    return res.status(500).json({ message: "Failed to retrieve education records" });
  }
};

// POST: Add a new education record to a faculty profile
export const createEducation = async (req: Request, res: Response) => {
  try {
    // Explicitly destructure the exact fields we want to allow
    const { 
      faculty_id,
      degree_level,
      discipline_category,
      university,
      graduation_date
    } = req.body;

    // faculty_id is strictly required to link the record
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
    const { id } = req.params; // The ID of the specific education record, not the faculty ID
    const updates = req.body; 

    if (!id) {
      return res.status(400).json({ message: "Education Record ID is required" });
    }

    const updatedRecord = await updateEducationRecord(id as string, updates);

    return res.status(200).json({
      message: "Education record updated successfully",
      data: updatedRecord
    });
  } catch (error: any) {
    console.error("Update Education Error:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
import { Request, Response } from "express";
import { 
  getAllSubjectsFromDb, 
  addSubjectToDb 
} from "../database/SubjectDb";

// GET: List all available subjects
export const fetchSubjects = async (req: Request, res: Response) => {
  try {
    const subjects = await getAllSubjectsFromDb();
    return res.status(200).json({ data: subjects });
  } catch (error) {
    console.error("Fetch Subjects Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// POST: Create a new subject
export const createSubject = async (req: Request, res: Response) => {
  try {
    const { subject_code, subject_name, scope } = req.body;

    // Validate required fields based on the ERD (diamonds are solid/required)
    if (!subject_code || !subject_name) {
      return res.status(400).json({ 
        message: "Subject Code and Subject Name are required" 
      });
    }

    const newSubject = await addSubjectToDb({ subject_code, subject_name, scope });
    return res.status(201).json({ 
      message: "Subject created successfully", 
      data: newSubject 
    });
  } catch (error) {
    console.error("Create Subject Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
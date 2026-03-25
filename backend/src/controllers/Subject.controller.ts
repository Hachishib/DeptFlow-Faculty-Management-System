import { Request, Response } from "express";
import { getAllSubjectsFromDb, addSubjectToDb } from "../DATABASE/SubjectDb";

export const fetchSubjects = async (req: Request, res: Response): Promise<any> => {
  try {
    const subjects = await getAllSubjectsFromDb();
    return res.status(200).json({ data: subjects });
  } catch (error) {
    console.error("Fetch Subjects Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createSubject = async (req: Request, res: Response): Promise<any> => {
  try {
    const { subject_code, subject_name, scope } = req.body;

    if (!subject_code || !subject_name) {
      return res.status(400).json({ message: "Subject Code and Subject Name are required" });
    }

    const newSubject = await addSubjectToDb({ subject_code, subject_name, scope });
    return res.status(201).json({ message: "Subject created successfully", data: newSubject });
    
  } catch (error: any) {
    console.error("Create Subject Error:", error.message);
    
    // ADVANCED: Catch the duplicate subject code error from the database
    if (error.message.includes('duplicate key') || error.message.includes('unique_subject_code')) {
      return res.status(409).json({ message: "Conflict: This Subject Code already exists." });
    }

    if (error.message.includes('valid_scope')) {
      return res.status(400).json({ message: "Invalid scope. Please check the allowed subject scopes." });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};
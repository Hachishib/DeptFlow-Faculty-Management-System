import { Request, Response } from "express";
import { 
  createCourse, 
  getCoursesByFaculty, 
  updateCourse 
} from "../../database/ManageSchedule/CourseDb";

export const getFacultyCourses = async (req: Request, res: Response) => {
  try {
    const { faculty_id } = req.params;

    if (typeof faculty_id !== 'string') {
      return res.status(400).json({ message: "Valid Faculty ID is required" });
    }

    console.log("Requested Faculty ID:", faculty_id); 

    const courses = await getCoursesByFaculty(faculty_id as string); 
    return res.status(200).json({ data: courses });
  } catch (error: any) {
    return res.status(500).json({ message: "Failed to retrieve courses" });
  }
};

export const addCourse = async (req: Request, res: Response) => {
  try {
    const { 
      faculty_id,
      course_code,
    } = req.body;

    if (!faculty_id || typeof faculty_id !== 'string') {
      return res.status(400).json({ message: "Faculty ID is required and must be a string" });
    }

    const courseData = { ...req.body };
    const newCourse = await createCourse(courseData);
    
    return res.status(201).json({ data: newCourse });
  } catch (error: any) {
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

export const updateCourseDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 
    const updates = req.body; 

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: "A valid Course Record ID is required" });
    }

    const updatedCourse = await updateCourse(id, updates);

    return res.status(200).json({ data: updatedCourse });
  } catch (error: any) {
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
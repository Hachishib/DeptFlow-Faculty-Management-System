import { Request, Response } from "express";
import { 
  createCourse, 
  getCoursesByFaculty, 
  updateCourse 
} from "../../database/ManageSchedule/CourseDb";

// GET: Retrieve all courses/schedules for a specific faculty member
export const getFacultyCourses = async (req: Request, res: Response) => {
  try {
    const { faculty_id } = req.params;
    console.log("Requested Faculty ID:", faculty_id); // <--- ADD THIS

    const courses = await getCoursesByFaculty(faculty_id);
    console.log("Found Courses:", courses); // <--- ADD THIS
    
    return res.status(200).json({ data: courses });
  } catch (error: any) {
    console.error("Fetch Courses Error:", error); // This will now show the REAL error in your terminal
    return res.status(500).json({ message: "Failed to retrieve courses" });
  }
};
// POST: Add a new course/schedule to a faculty profile
export const addCourse = async (req: Request, res: Response) => {
  try {
    // Explicitly destructure allowed fields
    const { 
      faculty_id,
      course_code,
      course_name,
      program,
      section,
      room,
      start_time,
      end_time,
      day_of_week,
      semester,
      academic_year
    } = req.body;

    if (!faculty_id || !course_code) {
      return res.status(400).json({ message: "Faculty ID and Course Code (ID) are required" });
    }

    const courseData = {
      faculty_id,
      course_code,
      course_name,
      program,
      section,
      room,
      start_time,
      end_time,
      day_of_week,
      semester,
      academic_year
    };

    const newCourse = await createCourse(courseData);
    
    return res.status(201).json({
      message: "Course schedule added successfully",
      data: newCourse
    });
  } catch (error: any) {
    console.error("Create Course Error:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

// PATCH: Update specific course details (like changing a room or time)
export const updateCourseDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // The ID of the course record itself
    const updates = req.body; 

    if (!id) {
      return res.status(400).json({ message: "Course Record ID is required" });
    }

    const updatedCourse = await updateCourse(id as string, updates);

    return res.status(200).json({
      message: "Course details updated successfully",
      data: updatedCourse
    });
  } catch (error: any) {
    console.error("Update Course Error:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
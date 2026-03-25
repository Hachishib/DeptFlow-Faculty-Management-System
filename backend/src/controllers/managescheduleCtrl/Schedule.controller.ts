import { Request, Response } from "express";
import { 
  createScheduleAssignment, 
  getSchedules, 
  updateScheduleAssignment, 
  deleteScheduleAssignment 
} from "../../database/managescheduleDb/ScheduleDb";

export const createSchedule = async (req: Request, res: Response): Promise<any> => {
  try {
    const { 
      faculty_id, subject_id, room_id, start_time, end_time, day_of_week, status,
      section, semester, academic_year 
    } = req.body;

    if (!faculty_id || !subject_id || !room_id || !start_time || !end_time || 
        !day_of_week || !section || !semester || !academic_year) {
      return res.status(400).json({ message: "Missing required scheduling fields" });
    }

    const newSchedule = await createScheduleAssignment({
      ...req.body,
      status: status || "Active" 
    });
    
    return res.status(201).json(newSchedule);
    
  } catch (error: any) {
    console.error("Create Schedule Error:", error.message);
    
    // --- DATABASE RACE-CONDITION & CONFLICT CATCHERS ---
    if (error.message.includes('no_room_double_booking')) {
      return res.status(409).json({ message: "Conflict: This room is already booked during this time." });
    }
    if (error.message.includes('no_faculty_double_booking')) {
      return res.status(409).json({ message: "Conflict: This faculty member is already teaching another class during this time." });
    }
    if (error.message.includes('no_section_double_booking')) {
      return res.status(409).json({ message: "Conflict: This Section is already scheduled for another class at this time." });
    }
    if (error.message.includes('valid_semester')) {
      return res.status(400).json({ message: "Invalid semester. Must be '1st Semester', '2nd Semester', or 'Summer'." });
    }
    if (error.message.includes('valid_acad_year')) {
      return res.status(400).json({ message: "Invalid academic year format. Must be YYYY-YYYY (e.g., '2023-2024')." });
    }
    if (error.message.includes('valid_time')) {
      return res.status(400).json({ message: "End time must be after the start time." });
    }
    if (error.message.includes('valid_day')) {
      return res.status(400).json({ message: "Invalid day of the week. Please use a full capitalized day (e.g., 'Monday')." });
    }
    if (error.message.includes('violates foreign key constraint')) {
      return res.status(400).json({ message: "Invalid Faculty, Room, or Subject ID provided." });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const fetchSchedules = async (req: Request, res: Response): Promise<any> => {
  try {
    const { faculty_id, room_id, day_of_week, subject_id, status, semester, academic_year, section } = req.query;
    
    const schedules = await getSchedules({ 
      faculty_id, room_id, day_of_week, subject_id, status, semester, academic_year, section 
    });
    
    return res.status(200).json({ data: schedules });
  } catch (error) {
    console.error("Fetch Schedules Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateSchedule = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const updates = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid Schedule ID format" });
    }

    const updatedSchedule = await updateScheduleAssignment(id, updates);
    return res.status(200).json(updatedSchedule);
  } catch (error: any) {
    console.error("Update Schedule Error:", error.message);
    if (error.message.includes('no_section_double_booking')) {
      return res.status(409).json({ message: "Conflict: Updating to this time conflicts with another class for this section." });
    }
    if (error.message.includes('no_room_double_booking')) {
      return res.status(409).json({ message: "Conflict: Updating to this time conflicts with another room booking." });
    }
    if (error.message.includes('no_faculty_double_booking')) {
      return res.status(409).json({ message: "Conflict: Updating to this time conflicts with the teacher's schedule." });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteSchedule = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = parseInt(req.params.id as string, 10);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid Schedule ID format" });
    }

    const deletedRecord = await deleteScheduleAssignment(id);
    return res.status(200).json(deletedRecord);
  } catch (error) {
    console.error("Delete Schedule Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
import { Request, Response } from "express";
import { 
  createScheduleAssignment, 
  getSchedules, 
  updateScheduleAssignment, 
  deleteScheduleAssignment 
} from "../database/ScheduleDb";

// POST: Create a new schedule
export const createSchedule = async (req: Request, res: Response) => {
  try {
    const { faculty_id, subject_id, room_id, start_time, end_time, day_of_week, status } = req.body;

    // Basic validation
    if (!faculty_id || !subject_id || !room_id || !start_time || !end_time || !day_of_week) {
      return res.status(400).json({ message: "Missing required scheduling fields" });
    }

    const newSchedule = await createScheduleAssignment(req.body);
    return res.status(201).json(newSchedule);
  } catch (error) {
    console.error("Create Schedule Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET: Fetch schedules (Supports query params like ?faculty_id=123)
export const fetchSchedules = async (req: Request, res: Response) => {
  try {
    const { faculty_id, room_id, day_of_week } = req.query;
    const schedules = await getSchedules({ faculty_id, room_id, day_of_week });
    
    return res.status(200).json({ data: schedules });
  } catch (error) {
    console.error("Fetch Schedules Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// PATCH: Update schedule details
export const updateSchedule = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const updates = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid Schedule ID format" });
    }

    const updatedSchedule = await updateScheduleAssignment(id, updates);
    return res.status(200).json(updatedSchedule);
  } catch (error) {
    console.error("Update Schedule Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// DELETE: Remove a scheduled class
export const deleteSchedule = async (req: Request, res: Response) => {
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
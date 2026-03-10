import { Request, Response } from "express";
import { saveFacultyToDb } from "../database/FacultyDb"; 

export const Faculty = async (req: Request, res: Response) => {
  try {
    const { 
      firstname, lastname, email, phone, 
      employeeId, designation, employementtype, 
      dateHired, Status 
    } = req.body;

   
    if (!email || !employeeId) {
      return res.status(400).json({ message: "Email and Employee ID are required" });
    }

    const result = await saveFacultyToDb({ 
      firstname, lastname, email, phone, 
      employeeId, designation, employementtype, 
      dateHired, Status 
    });

    return res.status(200).json({
      message: "Validation passed and data sent to DB folder",
      dbStatus: result
    });

  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
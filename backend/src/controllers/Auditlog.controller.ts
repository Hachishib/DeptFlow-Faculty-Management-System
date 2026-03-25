import { Request, Response } from "express";
import { createAuditLogInDb, getAuditLogsFromDb } from "../DATABASE/AuditlogDb";

// POST: Create a new audit log
export const createAuditLog = async (req: Request, res: Response) => {
  try {
    const { faculty_id, action_performed, target_table } = req.body;

    if (!faculty_id || !action_performed || !target_table) {
      return res.status(400).json({ message: "faculty_id, action_performed, and target_table are required" });
    }

    const newLog = await createAuditLogInDb({ faculty_id, action_performed, target_table });
    return res.status(201).json({ message: "Audit log created", data: newLog });
  } catch (error) {
    console.error("Create Audit Log Controller Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET: Fetch all audit logs
export const fetchAuditLogs = async (req: Request, res: Response) => {
  try {
    const logs = await getAuditLogsFromDb();
    return res.status(200).json({ data: logs });
  } catch (error) {
    console.error("Fetch Audit Logs Controller Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
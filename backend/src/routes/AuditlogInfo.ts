import { Router } from "express";
import { createAuditLog, fetchAuditLogs } from "../CONTROLLERS/Auditlog.controller";

const router = Router();

router.post("/", createAuditLog);
router.get("/", fetchAuditLogs);

export default router;
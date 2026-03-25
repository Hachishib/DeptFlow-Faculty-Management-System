import { Router } from "express";
import { 
  createSchedule, 
  fetchSchedules, 
  updateSchedule, 
  deleteSchedule 
} from "../../CONTROLLERS/managescheduleCtrl/Schedule.controller";

const router = Router();

router.post("/", createSchedule);
router.get("/", fetchSchedules);
router.patch("/:id", updateSchedule);
router.delete("/:id", deleteSchedule);

export default router;
import { Router } from "express";
import { 
  getFacultyList, 
  createFaculty, 
  updateFacultyStatus 
} from "../../controllers/Faculty.controller.js";

const router = Router();

router.get("/", getFacultyList);
router.post("/", createFaculty);
router.patch("/:id", updateFacultyStatus);

export default router;
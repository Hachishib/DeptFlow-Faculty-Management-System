import { Router } from "express";
import { 
  createWorkExperience, 
  fetchFacultyWorkExperience, 
  editWorkExperience,
  removeWorkExperience 
} from "../../controllers/WorkExperience.controller";

const router = Router();

router.post("/", createWorkExperience);
router.get("/:faculty_id", fetchFacultyWorkExperience);
router.patch("/:id", editWorkExperience);
router.delete("/:id", removeWorkExperience);

export default router;
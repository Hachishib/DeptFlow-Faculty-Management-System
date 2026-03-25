import { Router } from "express";
import { 
  createEducation, 
  fetchFacultyEducation, 
  editEducation,
  removeEducation 
} from "../../CONTROLLERS/MyProfileCtrl/Education.controller";

const router = Router();

router.post("/", createEducation);
router.get("/:faculty_id", fetchFacultyEducation);
router.patch("/:id", editEducation);
router.delete("/:id", removeEducation);

export default router;
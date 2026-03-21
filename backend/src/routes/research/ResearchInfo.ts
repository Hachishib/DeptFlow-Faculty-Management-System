import { Router } from "express";
import { 
  createResearch, 
  fetchFacultyResearch, 
  editResearch,
  removeResearch 
} from "../../controllers/Research.controller";

const router = Router();

router.post("/", createResearch);
router.get("/:faculty_id", fetchFacultyResearch);
router.patch("/:id", editResearch);
router.delete("/:id", removeResearch);

export default router;
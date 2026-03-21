import { Router } from "express";
import { 
  createEducation, 
  fetchFacultyEducation, 
  editEducation,
  removeEducation 
} from "../../controllers/Education.controller";

const router = Router();

// Create a new degree
router.post("/", createEducation);

// Get ALL degrees for a specific faculty member
router.get("/:faculty_id", fetchFacultyEducation);

// Update a specific degree (by the education row ID)
router.patch("/:id", editEducation);

// Delete a specific degree (by the education row ID)
router.delete("/:id", removeEducation);

export default router;
import { Router } from "express";
import { 
  createCredential, 
  fetchFacultyCredentials, 
  editCredential,
  removeCredential 
} from "../../controllers/Credential.controller";

const router = Router();

// Routes for the credentials
router.post("/", createCredential);
router.get("/:faculty_id", fetchFacultyCredentials);
router.patch("/:id", editCredential);
router.delete("/:id", removeCredential);

export default router;
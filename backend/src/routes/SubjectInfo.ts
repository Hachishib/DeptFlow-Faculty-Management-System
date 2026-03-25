import { Router } from "express";
import { 
  fetchSubjects, 
  createSubject 
} from "../CONTROLLERS/Subject.controller";

const router = Router();

router.get("/", fetchSubjects);
router.post("/", createSubject);

export default router;
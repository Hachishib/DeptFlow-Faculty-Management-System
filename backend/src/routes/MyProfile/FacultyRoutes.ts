import { Router } from "express";

import { getFacultyList, createFaculty, updateFacultyStatus } from "../../controllers/MyProfile/Faculty.controller";
import { getFacultyEducation, createEducation, updateEducationDetails } from "../../controllers/MyProfile/EducationController";
import { 
  fetchFacultyEducation, 
  editEducation, 
  removeEducation 
} from "../../controllers/MyProfile/Credential.controller";
import { getFacultyExperience, addExperience, updateExperienceDetails } from "../../controllers/MyProfile/ExperienceController";
import { getFacultyResearch, addResearch, updateResearchDetails } from "../../controllers/MyProfile/ResearchController";

const router = Router();

//  FACULTY PROFILE ROUTES
router.get("/", getFacultyList);
router.post("/", createFaculty);
router.patch("/:id", updateFacultyStatus);


// EDUCATION ROUTES
router.get("/:faculty_id/education", getFacultyEducation);
router.post("/education", createEducation);
router.patch("/education/:id", updateEducationDetails);

router.post("/", createEducation);
router.get("/:faculty_id", fetchFacultyEducation);
router.put("/:id", editEducation);
router.delete("/:id", removeEducation);

// EXPERIENCE ROUTES
router.get("/:faculty_id/experience", getFacultyExperience);
router.post("/experience", addExperience);
router.patch("/experience/:id", updateExperienceDetails);

// RESEARCH ROUTES
router.get("/:faculty_id/research", getFacultyResearch);
router.post("/research", addResearch);
router.patch("/research/:id", updateResearchDetails);

export default router;
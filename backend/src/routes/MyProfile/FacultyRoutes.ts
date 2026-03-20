import { Router } from "express";

import { getFacultyList, createFaculty, updateFacultyStatus } from "../../controllers/MyProfile/Faculty.controller";
import { getFacultyEducation, createEducation, updateEducationDetails } from "../../controllers/MyProfile/EducationController";
import { getFacultyCredentials, addCredential, updateCredentialDetails } from "../../controllers/MyProfile/CredentialController";
import { getFacultyExperience, addExperience, updateExperienceDetails } from "../../controllers/MyProfile/ExperienceController";
import { getFacultyResearch, addResearch, updateResearchDetails } from "../../controllers/MyProfile/ResearchController";

const router = Router();

// 1. FACULTY PROFILE ROUTES
router.get("/", getFacultyList);
router.post("/", createFaculty);
router.patch("/:id", updateFacultyStatus);


// 2. EDUCATION ROUTES
router.get("/:faculty_id/education", getFacultyEducation);
router.post("/education", createEducation);
router.patch("/education/:id", updateEducationDetails);

// 3. CREDENTIAL ROUTES (Certifications, Licenses, Seminars)
router.get("/:faculty_id/credentials", getFacultyCredentials);
router.post("/credentials", addCredential);
router.patch("/credentials/:id", updateCredentialDetails);


// 4. EXPERIENCE ROUTES
router.get("/:faculty_id/experience", getFacultyExperience);
router.post("/experience", addExperience);
router.patch("/experience/:id", updateExperienceDetails);

// 5. RESEARCH ROUTES
router.get("/:faculty_id/research", getFacultyResearch);
router.post("/research", addResearch);
router.patch("/research/:id", updateResearchDetails);

export default router;
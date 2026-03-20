import { Router } from "express";
import { 
  getFacultyCourses, 
  addCourse, 
  updateCourseDetails 
} from "../../controllers/ManageSchedule/CoursesController"; 

const router = Router();

router.get("/:faculty_id/courses", getFacultyCourses);
router.post("/courses", addCourse);
router.patch("/courses/:id", updateCourseDetails);

export default router;
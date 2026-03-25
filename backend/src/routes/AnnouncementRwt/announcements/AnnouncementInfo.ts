import { Router } from "express";
import { 
  createAnnouncement, 
  fetchAnnouncements, 
  acknowledgeAnnouncement, 
  fetchReactions 
} from "../../../controllers/AnnouncementCtrl/Announcement.controller";

const router = Router();


router.post("/", createAnnouncement);
router.get("/", fetchAnnouncements);
router.post("/:id/acknowledge", acknowledgeAnnouncement);
router.get("/:id/reactions", fetchReactions);

export default router;
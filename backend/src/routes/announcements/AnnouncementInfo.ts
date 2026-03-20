import { Router } from "express";
import { 
  createAnnouncement, 
  getAnnouncements, 
  acknowledgeAnnouncement, 
  getAnnouncementReactions 
} from "../../controllers/Announcement/Announcement.controller";

const router = Router();

router.post("/", createAnnouncement);
router.get("/", getAnnouncements);
router.post("/:id/acknowledge", acknowledgeAnnouncement);
router.get("/:id/reactions", getAnnouncementReactions);

export default router;
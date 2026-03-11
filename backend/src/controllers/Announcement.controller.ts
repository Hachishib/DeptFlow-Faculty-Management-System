import { Request, Response } from "express";
import { 
  createAnnouncementToDb, 
  getAnnouncementsFromDb, 
  acknowledgeAnnouncementInDb, 
  getReactionsFromDb 
} from "../database/AnnouncementDb";

//  Create a new announcement
export const createAnnouncement = async (req: Request, res: Response) => {
  try {
    const { content, file_attachment_url, created_by } = req.body;

    if (!content || !created_by) {
      return res.status(400).json({ message: "Content and creator ID (created_by) are required" });
    }

    const newAnnouncement = await createAnnouncementToDb({ content, file_attachment_url, created_by });
    return res.status(201).json({ message: "Announcement posted", data: newAnnouncement });
  } catch (error) {
    console.error("Create Announcement Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET: Fetch all announcements
export const fetchAnnouncements = async (req: Request, res: Response) => {
  try {
    const announcements = await getAnnouncementsFromDb();
    return res.status(200).json({ data: announcements });
  } catch (error) {
    console.error("Fetch Announcements Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// POST: Acknowledge an announcement (Reaction)
export const acknowledgeAnnouncement = async (req: Request, res: Response) => {
  try {
    const announcement_id = parseInt(req.params.id as string, 10);
    const { faculty_id } = req.body; // In a real app, you might get this from req.user (Auth Token)

    if (isNaN(announcement_id) || !faculty_id) {
      return res.status(400).json({ message: "Valid Announcement ID and Faculty ID are required" });
    }

    const reaction = await acknowledgeAnnouncementInDb({ announcement_id, faculty_id });
    return res.status(201).json({ message: "Announcement acknowledged", data: reaction });
  } catch (error) {
    console.error("Acknowledge Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET: See who acknowledged a specific announcement
export const fetchReactions = async (req: Request, res: Response) => {
  try {
    const announcement_id = parseInt(req.params.id as string, 10);

    if (isNaN(announcement_id)) {
      return res.status(400).json({ message: "Invalid Announcement ID" });
    }

    const reactions = await getReactionsFromDb(announcement_id);
    return res.status(200).json({ data: reactions });
  } catch (error) {
    console.error("Fetch Reactions Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
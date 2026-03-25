import { Request, Response } from "express";
import { 
  createAnnouncementToDb, 
  getAnnouncementsFromDb, 
  acknowledgeAnnouncementInDb, 
  getReactionsFromDb 
} from "../../database/AnnouncementDb/AnnouncementDb";

export const createAnnouncement = async (req: Request, res: Response): Promise<any> => {
  try {
    // 1. Pull the new fields from the request
    const { 
      title, content, audience, category, is_pinned, 
      file_attachment_url, created_by 
    } = req.body;

    // 2. Validate all strictly required fields
    if (!title || !content || !audience || !category || !created_by) {
      return res.status(400).json({ 
        message: "Title, content, audience, category, and creator ID are required." 
      });
    }

    // 3. Create it (defaulting is_pinned to false if not provided)
    const newAnnouncement = await createAnnouncementToDb({ 
      title, content, audience, category, 
      is_pinned: is_pinned || false, 
      file_attachment_url, created_by 
    });
    
    return res.status(201).json({ message: "Announcement posted", data: newAnnouncement });
    
  } catch (error: any) {
    console.error("Create Announcement Error:", error.message);
    
    // Catching the ENUM constraints
    if (error.message.includes('valid_audience')) {
      return res.status(400).json({ message: "Invalid audience. Must be 'Part-Time', 'Full-Time', or 'All'." });
    }
    if (error.message.includes('valid_category')) {
      return res.status(400).json({ message: "Invalid category. Must be 'General', 'Urgent', 'Reminder', or 'Event'." });
    }
    
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const fetchAnnouncements = async (req: Request, res: Response): Promise<any> => {
  try {
    const announcements = await getAnnouncementsFromDb();
    return res.status(200).json({ data: announcements });
  } catch (error) {
    console.error("Fetch Announcements Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const acknowledgeAnnouncement = async (req: Request, res: Response): Promise<any> => {
  try {
    const announcement_id = parseInt(req.params.id as string, 10);
    const { faculty_id } = req.body; 

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

export const fetchReactions = async (req: Request, res: Response): Promise<any> => {
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
import { Request, Response } from "express";
import { 
  createAnnouncementToDb, 
  getAnnouncementsFromDb, 
  acknowledgeAnnouncementInDb, 
  getReactionsFromDb 
} from "../../database/Announcement/AnnouncementDb";


// GET: Retrieve all announcements
export const getAnnouncements = async (req: Request, res: Response) => {
  try {
    const announcements = await getAnnouncementsFromDb();
    return res.status(200).json({ data: announcements });
  } catch (error: any) {
    console.error("Fetch Announcements Error:", error);
    return res.status(500).json({ message: "Failed to retrieve announcements" });
  }
};

// POST: Create a new announcement
export const createAnnouncement = async (req: Request, res: Response) => {
  try {
    const { 
      title,
      description,
      audience,
      category,
      file_attachment_url,
      created_by 
    } = req.body;

    // Basic validation for required fields
    if (!title || !description || !created_by) {
      return res.status(400).json({ message: "Title, Description, and Created By are required" });
    }

    const payload = {
      title,
      description,
      audience,
      category,
      file_attachment_url,
      created_by,
      date_announced: new Date().toISOString() // Automatically set the current date
    };

    const newAnnouncement = await createAnnouncementToDb(payload);
    
    return res.status(201).json({
      message: "Announcement created successfully",
      data: newAnnouncement
    });
  } catch (error: any) {
    console.error("Create Announcement Error:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
// POST: Acknowledge an announcement
export const acknowledgeAnnouncement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 
    const { faculty_id } = req.body; 

    if (!id || !faculty_id) {
      return res.status(400).json({ message: "Announcement ID and Faculty ID are required" });
    }

    const payload = {
      announcement_id: Number(id), 
      faculty_id
    };

    const reaction = await acknowledgeAnnouncementInDb(payload);

    return res.status(201).json({
      message: "Announcement acknowledged",
      data: reaction
    });
  } catch (error: any) {
    console.error("Acknowledge Announcement Error:", error);
    
    if (error.message.includes('duplicate key')) {
        return res.status(409).json({ message: "You have already acknowledged this announcement" });
    }

    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

// GET: Retrieve all reactions for a specific announcement
export const getAnnouncementReactions = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Announcement ID is required" });
    }

    const reactions = await getReactionsFromDb(Number(id));

    return res.status(200).json({ 
        message: "Reactions retrieved successfully",
        count: reactions.length, 
        data: reactions 
    });
  } catch (error: any) {
    console.error("Fetch Reactions Error:", error);
    return res.status(500).json({ message: "Failed to retrieve reactions" });
  }
};
import { Request, Response } from "express";
import { 
  getAnnouncementByIdFromDb, 
  updateAnnouncementInDb, 
  deleteAnnouncementFromDb 
} from "../../database/Announcement/AnnouncementDb";

// GET: Retrieve a single announcement by ID
export const getAnnouncementById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Announcement ID is required" });
    }

    const announcement = await getAnnouncementByIdFromDb(id as string);
    return res.status(200).json({ data: announcement });
  } catch (error: any) {
    console.error("Fetch Announcement By ID Error:", error);
    if (error.code === 'PGRST116') {
      return res.status(404).json({ message: "Announcement not found" });
    }
    return res.status(500).json({ message: "Failed to retrieve announcement" });
  }
};

// PUT/PATCH: Update an existing announcement
export const updateAnnouncement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { 
      title,
      description, 
      audience,
      category,
      is_pinned,
      file_attachment_url
    } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Announcement ID is required for updating" });
    }

    const payload: any = {};
    if (title !== undefined) payload.title = title;
    if (description !== undefined) payload.content = description; 
    if (audience !== undefined) payload.audience = audience;
    if (category !== undefined) payload.category = category;
    if (is_pinned !== undefined) payload.is_pinned = is_pinned;
    if (file_attachment_url !== undefined) payload.file_attachment_url = file_attachment_url;

    // Prevent unnecessary database calls if the body is empty
    if (Object.keys(payload).length === 0) {
      return res.status(400).json({ message: "No valid fields provided for update" });
    }

    const updatedAnnouncement = await updateAnnouncementInDb(id as string , payload);
    
    return res.status(200).json({
      message: "Announcement updated successfully",
      data: updatedAnnouncement
    });
  } catch (error: any) {
    console.error("Update Announcement Error:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

// DELETE: Remove an announcement
export const deleteAnnouncement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Announcement ID is required for deletion" });
    }

    await deleteAnnouncementFromDb(id as string);
    
    return res.status(200).json({
      message: "Announcement deleted successfully"
    });
  } catch (error: any) {
    console.error("Delete Announcement Error:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
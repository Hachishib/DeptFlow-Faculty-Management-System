 import { supabaseAdmin }  from "../../utils/supabaseAdmin";

export interface AnnouncementInput {
  title: string;
  content: string;
  audience: string;
  category: string;
  is_pinned: boolean;
  created_at?: string; 
  created_by: string; 
  file_attachment_url?: string; 
}

// Get a single announcement by ID
export const getAnnouncementByIdFromDb = async (id: string) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('announcements')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return data;
  } catch (error: any) {
    console.error("DB Get Announcement By ID Error:", error.message);
    throw new Error(`Failed to get Announcement: ${error.message}`);
  }
};

// Update an existing announcement
export const updateAnnouncementInDb = async (id: string, payload: Partial<AnnouncementInput>) => {
  try {
    const { data: result, error } = await supabaseAdmin
      .from('announcements')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return result;
  } catch (error: any) {
    console.error("DB Update Announcement Error:", error.message);
    throw new Error(`Failed to update Announcement: ${error.message}`);
  }
};

// Delete an announcement
export const deleteAnnouncementFromDb = async (id: string) => {
  try {
    const { error } = await supabaseAdmin
      .from('announcements')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return { success: true, message: "Announcement deleted successfully" };
  } catch (error: any) {
    console.error("DB Delete Announcement Error:", error.message);
    throw new Error(`Failed to delete Announcement: ${error.message}`);
  }
};
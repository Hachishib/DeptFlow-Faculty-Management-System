import { supabaseAdmin }  from "../../utils/supabaseAdmin";

export interface AnnouncementInput {
  title: string;
  content: string;
  audience: string; // 'Part-Time', 'Full-Time', 'All'
  category: string; // 'General', 'Urgent', 'Reminder', 'Event'
  is_pinned?: boolean;
  file_attachment_url?: string;
  created_by: string; 
}

export interface ReactionInput {
  announcement_id: number;
  faculty_id: string;
}

export const createAnnouncementToDb = async (data: AnnouncementInput) => {
  try {
    const { data: result, error } = await supabaseAdmin
      .from('announcements')
      .insert([data])
      .select()
      .single();
    
    if (error) throw error;
    return result; // FIXED: Returns the DB result (which includes the new ID and created_at!)
  } catch (error: any) {
    console.error("DB Create Announce Error:", error.message);
    throw error;
  }
};

export const getAnnouncementsFromDb = async () => {
 try {
    const { data, error } = await supabaseAdmin
      .from('announcements')
      .select('*')
      .order('is_pinned', { ascending: false }) // Pinned announcements show up first!
      .order('created_at', { ascending: false }); // Then newest first

    if (error) throw error;
    return data;
 } catch (error: any) {
    console.error("DB Get Announce Error:", error.message);
    throw new Error(`Failed to Get Announcement: ${error.message}`);
  }
};

export const acknowledgeAnnouncementInDb = async (data: ReactionInput) => {
  try {
    const { data: result, error } = await supabaseAdmin
      .from('announcement_reaction')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return result;
  } catch (error: any) {
    console.error("DB Acknowledge Error:", error.message);
    throw new Error(`Failed to Acknowledge Announcement: ${error.message}`);
  }
};

export const getReactionsFromDb = async (announcement_id: number) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('announcement_reaction') // FIXED: Made sure table name is lowercase to match Supabase standards
      .select('*')
      .eq('announcement_id', announcement_id);

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("DB Get Reactions Error:", error.message);
    throw new Error(`Failed to Get Reactions: ${error.message}`);
  }
};
import { error } from "node:console";
import { supabaseAdmin }  from "../utils/supabaseAdmin";


export interface AnnouncementInput {
  content: string;
  file_attachment_url?: string;
  created_by: string; 
}

export interface ReactionInput {
  announcement_id: number;
  faculty_id: string;
}


export const createAnnouncementToDb = async (data: AnnouncementInput) => {
  try{
    const { data: result , error } = await supabaseAdmin
    .from('announcements')
    .insert([data])
    .select()
    .single()
    
    if ( error ) throw error;
    return data;
  }catch (error: any) {
    console.error("Mock Create Announce Error:", error.message);
    throw new Error(`Failed to create Announcement: ${error.message}`);
  }
};

export const getAnnouncementsFromDb = async () => {
 try {
    const { data , error } = await supabaseAdmin
    .from('announcements')
    .select('*')

    if (error ) throw error;

    return data;
 }catch (error: any) {
    console.error("Mock Get Announce Error::", error.message);
    throw new Error(`Failed to Get Announcement: ${error.message}`);
  }
};


export const acknowledgeAnnouncementInDb = async (data: ReactionInput) => {
    try{
      const { data: result , error } = await supabaseAdmin
      .from('announcement_reaction')
      .insert([data])
      .select()
      .single()

      if (error) throw error;

      return data
    }catch (error: any) {
    console.error("Mock Get Announce Error::", error.message);
    throw new Error(`Failed to Get Announcement: ${error.message}`);
  }
};


export const getReactionsFromDb = async (announcement_id: number) => {
  try{
      const { data , error } = await supabaseAdmin
      .from('Announcement_Reaction')
      .select('*')
      .eq('announcement_id', announcement_id);

      if (error) throw error;

    return data;

    }catch (error: any) {
    console.error("Mock Get Announce Error::", error.message);
    throw new Error(`Failed to Get Announcement: ${error.message}`);
  }
};
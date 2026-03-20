// import { supabaseAdmin }  from "../../utils/supabaseAdmin";

export interface AnnouncementInput {
  id?: string | number;
  title: string;
  description: string;
  audience?: 'PT' | 'FT' | 'FT-PT';
  category?: 'General' | 'Urgent' | 'Reminder' | 'Event' | 'Pinned';
  file_attachment_url?: string;
  date_announced?: string;
  created_by: string; 
}

export interface ReactionInput {
  announcement_id: string | number; 
  faculty_id: string;
}


let mockAnnouncements: AnnouncementInput[] = [
  {
    id: 1,
    title: "Welcome to the New Faculty Portal",
    description: "Please take a moment to update your profile, education, and credentials before the end of the week.",
    audience: "FT-PT",
    category: "General",
    date_announced: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    created_by: "Admin System"
  },
  {
    id: 2,
    title: "Urgent: Final Grade Submission",
    description: "All final grades must be submitted to the registrar by Friday at 5:00 PM.",
    audience: "FT",
    category: "Urgent",
    date_announced: new Date().toISOString(), // Today
    created_by: "Dean's Office"
  }
];

let mockReactions: ReactionInput[] = [
  { announcement_id: 1, faculty_id: "1" } 
];

export const createAnnouncementToDb = async (payload: AnnouncementInput) => {
  console.log("Mock DB: Creating announcement...");
  const newAnnouncement = { 
    ...payload, 
    id: Date.now(), // Generate fake numeric ID
    date_announced: payload.date_announced || new Date().toISOString() 
  };
  mockAnnouncements.push(newAnnouncement);
  return newAnnouncement;
};

export const getAnnouncementsFromDb = async () => {
  console.log("Mock DB: Fetching announcements...");
  return [...mockAnnouncements].sort((a, b) => {
    return new Date(b.date_announced!).getTime() - new Date(a.date_announced!).getTime();
  });
};

export const acknowledgeAnnouncementInDb = async (payload: ReactionInput) => {
  console.log(`Mock DB: Faculty ${payload.faculty_id} acknowledging announcement ${payload.announcement_id}...`);

  const alreadyAcknowledged = mockReactions.find(
    r => r.announcement_id == payload.announcement_id && r.faculty_id === payload.faculty_id
  );

  if (alreadyAcknowledged) {
    throw new Error('duplicate key value violates unique constraint'); // Matches the error your controller checks for!
  }

  const newReaction = { ...payload };
  mockReactions.push(newReaction);
  return newReaction;
};

export const getReactionsFromDb = async (announcement_id: string | number) => {
  console.log(`Mock DB: Fetching reactions for announcement ${announcement_id}...`);
  return mockReactions.filter(r => r.announcement_id == announcement_id);
};


/*
// Create a new announcement
export const createAnnouncementToDb = async (payload: AnnouncementInput) => {
  try {
    const { data: result, error } = await supabaseAdmin
      .from('announcements')  // Waiting for table name
      .insert([payload])
      .select()
      .single();
    
    if (error) throw error;
    
    return result; 
  } catch (error: any) {
    console.error("DB Create Announcement Error:", error.message);
    throw new Error(`Failed to create Announcement: ${error.message}`);
  }
};

// Get all announcements
export const getAnnouncementsFromDb = async () => {
 try {
    const { data, error } = await supabaseAdmin
      .from('announcements')
      .select('*')
      .order('date_announced', { ascending: false }); 

    if (error) throw error;

    return data;
 } catch (error: any) {
    console.error("DB Get Announcement Error:", error.message);
    throw new Error(`Failed to Get Announcements: ${error.message}`);
  }
};

// Record a faculty member acknowledging an announcement
export const acknowledgeAnnouncementInDb = async (payload: ReactionInput) => {
    try {
      const { data: result, error } = await supabaseAdmin
        .from('announcement_reaction') 
        .insert([payload])
        .select()
        .single();

      if (error) throw error;

      return result; 
    } catch (error: any) {
    console.error("DB Acknowledge Error:", error.message);
    throw new Error(`Failed to acknowledge announcement: ${error.message}`);
  }
};

// Get all reactions/acknowledgments for a specific announcement
export const getReactionsFromDb = async (announcement_id: string | number) => {
  try {
      const { data, error } = await supabaseAdmin
        .from('announcement_reaction') 
        .select('*')
        .eq('announcement_id', announcement_id);

      if (error) throw error;

    return data;

    } catch (error: any) {
    console.error("DB Get Reactions Error:", error.message);
    throw new Error(`Failed to get reactions: ${error.message}`);
  }
};
*/
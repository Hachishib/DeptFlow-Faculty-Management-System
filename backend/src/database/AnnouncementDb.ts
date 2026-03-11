// Blueprints based on your Supabase ERD
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
  console.log("📢 [Mock DB] Creating new announcement:");
  console.table(data);
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    id: Math.floor(Math.random() * 1000), 
    ...data,
    created_at: new Date().toISOString()
  };
};

export const getAnnouncementsFromDb = async () => {
  console.log("📤 [Mock DB] Fetching announcements...");
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    { id: 1, content: "Staff meeting at 3 PM", created_by: "user-admin", created_at: new Date().toISOString() },
    { id: 2, content: "Grades are due Friday", created_by: "user-admin", created_at: new Date().toISOString() }
  ];
};


export const acknowledgeAnnouncementInDb = async (data: ReactionInput) => {
  console.log(`✅ [Mock DB] Faculty ${data.faculty_id} acknowledged Announcement ${data.announcement_id}`);
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    id: Math.floor(Math.random() * 10000),
    ...data,
    acknowledged_at: new Date().toISOString()
  };
};


export const getReactionsFromDb = async (announcement_id: number) => {
  console.log(`👀 [Mock DB] Fetching reactions for Announcement ID: ${announcement_id}`);
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    { id: 101, announcement_id, faculty_id: "user-123", acknowledged_at: new Date().toISOString() },
    { id: 102, announcement_id, faculty_id: "user-456", acknowledged_at: new Date().toISOString() }
  ];
};
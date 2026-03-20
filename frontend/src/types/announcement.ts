export type AnnouncementItem = {
  id: string;
  title: string;
  date: string;
  preview: string;
  pinned?: boolean;
};

export type AnnouncementTag      = "General" | "Reminder" | "Urgent" | "Event";
export type AnnouncementAudience = "All Faculty" | "Full-time" | "Part-time";

export type Announcement = {
  id:       string;
  title:    string;
  body:     string;
  date:     string;
  author:   string;
  pinned:   boolean;
  audience: AnnouncementAudience;
  tag:      AnnouncementTag;
  attachment?: {
    url:      string;
    fileName: string;
    fileType: string;
  };
};

// What you send to the DB on create (id and date are generated server-side)
export type CreateAnnouncementDTO = Omit<Announcement, "id" | "date">;

// What you send to the DB on edit
export type UpdateAnnouncementDTO = Partial<Omit<Announcement, "id">>;

export type FilterTag = "All" | AnnouncementTag;

export type AnnouncementFilters = {
  search:    string;
  tag:       FilterTag;
  dateFrom:  string;   
  dateTo:    string;   
};

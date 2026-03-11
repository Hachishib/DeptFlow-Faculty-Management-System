// Define the blueprint based on your ERD
export interface ScheduleInput {
  id?: number; 
  faculty_id: string;
  subject_id: number;
  room_id: number;
  start_time: string; // e.g., '08:00:00'
  end_time: string;   // e.g., '09:30:00'
  day_of_week: string; // e.g., 'Monday'
  status?: string; 
}

// 1. Create a new schedule
export const createScheduleAssignment = async (scheduleData: ScheduleInput) => {
  console.log("📥 [Mock DB] Creating new schedule assignment:");
  console.table(scheduleData);
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    status: "success",
    message: "Schedule successfully mocked in console",
    data: { id: Math.floor(Math.random() * 1000), ...scheduleData }
  };
};

// 2. Fetch schedules (with optional filters)
export const getSchedules = async (filters: any) => {
  console.log("📤 [Mock DB] Fetching schedules with filters:");
  console.table(filters);
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Returning fake data to represent a successful fetch
  return [
    { id: 1, faculty_id: filters.faculty_id || "user-123", subject_id: 101, room_id: 5, day_of_week: "Monday", start_time: "08:00", end_time: "09:30", status: "Active" },
    { id: 2, faculty_id: "user-456", subject_id: 102, room_id: filters.room_id || 6, day_of_week: filters.day_of_week || "Wednesday", start_time: "10:00", end_time: "11:30", status: "Active" }
  ];
};

// 3. Update a schedule
export const updateScheduleAssignment = async (id: number, updates: Partial<ScheduleInput>) => {
  console.log(`🔄 [Mock DB] Updating schedule (ID: ${id}) with data:`);
  console.table(updates);
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    status: "success",
    message: `Schedule ${id} successfully updated`,
    data: { id, ...updates }
  };
};

// 4. Delete a schedule
export const deleteScheduleAssignment = async (id: number) => {
  console.log(`🗑️ [Mock DB] Deleting schedule (ID: ${id})`);
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    status: "success",
    message: `Schedule ${id} successfully deleted`
  };
};
import { supabaseAdmin } from "../utils/supabaseAdmin";

export interface ScheduleInput {
  id?: number; 
  faculty_id: string;
  subject_id: number;
  room_id: number;
  start_time: string; 
  end_time: string;   
  day_of_week: string; 
  status: string; 
}

// Create a new schedule assignment
export const createScheduleAssignment = async (scheduleData: ScheduleInput) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('schedule_assignments') 
      .insert([scheduleData])
      .select()
      .single();

    if (error) throw error;

    return {
      status: "success",
      message: "Schedule successfully created",
      data: data
    };
  } catch (error: any) {
    console.error("Supabase Create Schedule Error:", error.message);
    throw new Error(`Failed to create schedule: ${error.message}`);
  }
};

// 2. Fetch schedules 
export const getSchedules = async (filters: any) => {
  try {

    let query = supabaseAdmin.from('schedule_assignments').select('*');

    if (filters?.faculty_id) query = query.eq('faculty_id', filters.faculty_id);
    if (filters?.room_id) query = query.eq('room_id', filters.room_id);
    if (filters?.day_of_week) query = query.eq('day_of_week', filters.day_of_week);
    if (filters?.subject_id) query = query.eq('subject_id', filters.subject_id);
    if (filters?.status) query = query.eq('status', filters.status);

    const { data, error } = await query;

    if (error) throw error;

    return data;
  } catch (error: any) {
    console.error("Supabase Fetch Schedules Error:", error.message);
    throw new Error(`Failed to fetch schedules: ${error.message}`);
  }
};

// 3. Update a schedule
export const updateScheduleAssignment = async (id: number, updates: Partial<ScheduleInput>) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('schedule_assignments')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return {
      status: "success",
      message: `Schedule ${id} successfully updated`,
      data: data
    };
  } catch (error: any) {
    console.error("Supabase Update Schedule Error:", error.message);
    throw new Error(`Failed to update schedule: ${error.message}`);
  }
};

// 4. Delete a schedule
export const deleteScheduleAssignment = async (id: number) => {
  try {
    const { error } = await supabaseAdmin
      .from('schedule_assignments')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return {
      status: "success",
      message: `Schedule ${id} successfully deleted`
    };
  } catch (error: any) {
    console.error("Supabase Delete Schedule Error:", error.message);
    throw new Error(`Failed to delete schedule: ${error.message}`);
  }
};
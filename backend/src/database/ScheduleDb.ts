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
  // --- NEW FIELDS ---
  section: string;
  semester: string;
  academic_year: string;
}

export const createScheduleAssignment = async (scheduleData: ScheduleInput) => {
  try {
    // 1. INSERT SCHEDULE (Database locks handle ALL conflict checking now!)
    const { data, error } = await supabaseAdmin
      .from('schedule_assignments') 
      .insert([scheduleData])
      .select()
      .single();

    if (error) throw error;

    // 2. THE ECOSYSTEM LINK: Add units to the professor
    // Fetch the units for this subject (defaults to 3 if your table doesn't have a units column)
    const { data: subject } = await supabaseAdmin
      .from('subjects')
      .select('units')
      .eq('id', scheduleData.subject_id)
      .single();
    const unitsToAdd = subject?.units || 3; 

    // Fetch current faculty units, add the new units, and update
    const { data: faculty } = await supabaseAdmin
      .from('faculty_profiles')
      .select('current_units')
      .eq('id', scheduleData.faculty_id)
      .single();
    
    await supabaseAdmin
      .from('faculty_profiles')
      .update({ current_units: (faculty?.current_units || 0) + unitsToAdd })
      .eq('id', scheduleData.faculty_id);

    return {
      status: "success",
      message: "Schedule successfully created",
      data: data
    };
  } catch (error: any) {
    console.error("Supabase Create Schedule Error:", error.message);
    throw error; 
  }
};

export const getSchedules = async (filters: any) => {
  try {
    let query = supabaseAdmin.from('schedule_assignments').select('*');

    if (filters?.faculty_id) query = query.eq('faculty_id', filters.faculty_id);
    if (filters?.room_id) query = query.eq('room_id', filters.room_id);
    if (filters?.day_of_week) query = query.eq('day_of_week', filters.day_of_week);
    if (filters?.subject_id) query = query.eq('subject_id', filters.subject_id);
    if (filters?.status) query = query.eq('status', filters.status);
    
    if (filters?.semester) query = query.eq('semester', filters.semester);
    if (filters?.academic_year) query = query.eq('academic_year', filters.academic_year);
    if (filters?.section) query = query.eq('section', filters.section);

    const { data, error } = await query;

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("Supabase Fetch Schedules Error:", error.message);
    throw new Error(`Failed to fetch schedules: ${error.message}`);
  }
};

export const updateScheduleAssignment = async (id: number, updates: Partial<ScheduleInput>) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('schedule_assignments')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { status: "success", message: `Schedule ${id} successfully updated`, data };
  } catch (error: any) {
    console.error("Supabase Update Schedule Error:", error.message);
    throw new Error(`Failed to update schedule: ${error.message}`);
  }
};

export const deleteScheduleAssignment = async (id: number) => {
  try {
    // 1. Fetch the schedule first to know who to deduct units from
    const { data: schedule } = await supabaseAdmin
      .from('schedule_assignments')
      .select('faculty_id, subject_id')
      .eq('id', id)
      .single();

    if (schedule) {
       const { data: subject } = await supabaseAdmin.from('subjects').select('units').eq('id', schedule.subject_id).single();
       const unitsToSubtract = subject?.units || 3;
       
       const { data: faculty } = await supabaseAdmin.from('faculty_profiles').select('current_units').eq('id', schedule.faculty_id).single();
       const newUnits = Math.max(0, (faculty?.current_units || 0) - unitsToSubtract); // Prevents negative units

       await supabaseAdmin.from('faculty_profiles').update({ current_units: newUnits }).eq('id', schedule.faculty_id);
    }

    // 2. Delete the actual schedule
    const { error } = await supabaseAdmin.from('schedule_assignments').delete().eq('id', id);
    if (error) throw error;

    return { status: "success", message: `Schedule ${id} successfully deleted` };
  } catch (error: any) {
    console.error("Supabase Delete Schedule Error:", error.message);
    throw new Error(`Failed to delete schedule: ${error.message}`);
  }
};
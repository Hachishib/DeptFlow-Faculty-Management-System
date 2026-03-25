import { supabaseAdmin } from "../CONTROLLERS/utils/supabaseAdmin";

export interface AuditLogInput {
  faculty_id: string;
  action_performed: string;
  target_table: string;
}

export const createAuditLogInDb = async (data: AuditLogInput) => {
  try {
    const { data: result, error } = await supabaseAdmin
      .from('audit_logs')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return result;
  } catch (error: any) {
    console.error("Create Audit Log Error:", error.message);
    throw new Error(`Failed to create Audit Log: ${error.message}`);
  }
};

export const getAuditLogsFromDb = async () => {
  try {
    const { data, error } = await supabaseAdmin
      .from('audit_logs')
      .select('*')
      // Automatically sorts so the newest logs are at the top!
      .order('created_at', { ascending: false }); 

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("Get Audit Logs Error:", error.message);
    throw new Error(`Failed to get Audit Logs: ${error.message}`);
  }
};
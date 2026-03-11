import { supabaseAdmin }  from "../utils/supabaseAdmin";

export interface RoomInput {
  id? : number;
  room_no: string;
  is_occupied?: boolean;
  room_schedule?: string;
}

// 1. Fetch all rooms
export const getAllRoomsFromDb = async () => {
  try {
     const { data, error } = await supabaseAdmin
       .from('rooms') 
       .select('*')
       .order('room_no', { ascending: true }); 
      
     if (error) throw error;  
 
     return data;
   } catch (error: any) {
     console.error("Supabase Fetch Rooms Error:", error.message);
     throw new Error(`Failed to fetch rooms: ${error.message}`);
   }
};

// 2. Update room occupancy status
export const updateRoomStatusInDb = async (id: number, is_occupied: boolean) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('rooms') 
      .update({ is_occupied }) 
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      is_occupied: data.is_occupied,
      message: `Room ${data.room_no || id} is now ${data.is_occupied ? "Occupied" : "Available"}`
    };
  } catch (error: any) {
    console.error("Supabase Update Room Status Error:", error.message);
    throw new Error(`Failed to update room status: ${error.message}`);
  }
};


export const addRoomToDb = async (roomData: RoomInput) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('rooms')
      .insert([roomData]) // Supabase handles the ID automatically
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error: any) {
    console.error("Supabase Add Room Error:", error.message);
    throw new Error(`Failed to add room: ${error.message}`);
  }
};
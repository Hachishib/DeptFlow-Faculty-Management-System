import { supabaseAdmin }  from "../CONTROLLERS/utils/supabaseAdmin";

export interface RoomInput {
  room_no: string;
  is_occupied?: boolean;
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

// 2. Add a room 
export const addRoomToDb = async (roomData: RoomInput) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('rooms')
      .insert([{ 
        room_no: roomData.room_no,
        is_occupied: roomData.is_occupied || false 
      }]) 
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("Supabase Add Room Error:", error.message);
    throw new Error(`Failed to add room: ${error.message}`);
  }
};

// 3. Update room occupancy status (The REAL-WORLD OVERRIDE!)
export const updateRoomStatusInDb = async (id: number, is_occupied: boolean) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('rooms') 
      .update({ is_occupied }) 
      .eq('room_id', id)
      .select()
      .single();

    if (error) throw error;

    return {
      room_id: data.room_id,
      room_no: data.room_no,
      is_occupied: data.is_occupied,
      message: `Room ${data.room_no} is now ${data.is_occupied ? "Occupied" : "Available"}`
    };
  } catch (error: any) {
    console.error("Supabase Update Room Status Error:", error.message);
    throw new Error(`Failed to update room status: ${error.message}`);
  }
};
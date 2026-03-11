
export interface RoomInput {
  room_no: string;
  is_occupied?: boolean;
  room_schedule?: string;
}

// Fetch all rooms
export const getAllRoomsFromDb = async () => {
  console.log("📤 [Mock DB] Fetching all rooms...");
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    { id: 1, room_no: "RM-101", is_occupied: true, room_schedule: "Math 101 (8:00-9:30)" },
    { id: 2, room_no: "LAB-204", is_occupied: false, room_schedule: "Available" }
  ];
};

// Add a new room
export const addRoomToDb = async (roomData: RoomInput) => {
  console.log("📥 [Mock DB] Adding new room to system:");
  console.table(roomData);
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    id: Math.floor(Math.random() * 100), 
    ...roomData,
    is_occupied: roomData.is_occupied || false 
  };
};

//Update room occupancy status
export const updateRoomStatusInDb = async (id: number, is_occupied: boolean) => {
  console.log(`🔄 [Mock DB] Updating Room ${id} occupancy status to: ${is_occupied}`);
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    id,
    is_occupied,
    message: `Room ${id} is now ${is_occupied ? "Occupied" : "Available"}`
  };
};
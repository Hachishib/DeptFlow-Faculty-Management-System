import { Request, Response } from "express";
import { getAllRoomsFromDb, addRoomToDb, updateRoomStatusInDb } from "../database/RoomDb";

export const fetchRooms = async (req: Request, res: Response): Promise<any> => {
  try {
    const rooms = await getAllRoomsFromDb();
    return res.status(200).json({ data: rooms });
  } catch (error) {
    console.error("Fetch Rooms Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createRoom = async (req: Request, res: Response): Promise<any> => {
  try {
    const { room_no, is_occupied } = req.body;

    if (!room_no) {
      return res.status(400).json({ message: "Room Number (room_no) is required" });
    }

    const newRoom = await addRoomToDb({ room_no, is_occupied });
    return res.status(201).json({ message: "Room added successfully", data: newRoom });
    
  } catch (error: any) {
    console.error("Create Room Error:", error.message);
    
    // ADVANCED: If our Supabase UNIQUE rule catches a duplicate, send a nice error to the frontend!
    if (error.message.includes('duplicate key') || error.message.includes('unique_room_no')) {
      return res.status(409).json({ message: "This room number already exists." });
    }
    
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// The override controller allows a real human to change the status
export const updateRoomStatus = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const { is_occupied } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid Room ID" });
    }
    
    if (typeof is_occupied !== "boolean") {
      return res.status(400).json({ message: "is_occupied must be a boolean value (true/false)" });
    }

    const updatedRoom = await updateRoomStatusInDb(id, is_occupied);
    return res.status(200).json({ message: "Room status updated", data: updatedRoom });
  } catch (error) {
    console.error("Update Room Status Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
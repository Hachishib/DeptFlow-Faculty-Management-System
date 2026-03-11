import { Request, Response } from "express";
import { 
  getAllRoomsFromDb, 
  addRoomToDb, 
  updateRoomStatusInDb 
} from "../database/RoomDb";

// GET: Fetch all rooms
export const fetchRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await getAllRoomsFromDb();
    return res.status(200).json({ data: rooms });
  } catch (error) {
    console.error("Fetch Rooms Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// POST: Add a new room
export const createRoom = async (req: Request, res: Response) => {
  try {
    const { room_no, is_occupied, room_schedule } = req.body;

    if (!room_no) {
      return res.status(400).json({ message: "Room Number (room_no) is required" });
    }

    const newRoom = await addRoomToDb({ room_no, is_occupied, room_schedule });
    return res.status(201).json({ message: "Room added successfully", data: newRoom });
  } catch (error) {
    console.error("Create Room Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// PATCH: Update real-time room tracking
export const updateRoomStatus = async (req: Request, res: Response) => {
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
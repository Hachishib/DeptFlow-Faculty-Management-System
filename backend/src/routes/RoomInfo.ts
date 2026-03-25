import { Router } from "express";
import { fetchRooms, createRoom, updateRoomStatus } from "../controllers/Room.controller";

const router = Router();

router.get("/", fetchRooms);
router.post("/", createRoom);
router.patch("/:id/status", updateRoomStatus);

export default router;
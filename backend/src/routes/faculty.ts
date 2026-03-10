import express from "express";
import { Faculty } from "../controllers/Faculty.controller.js"; 

const router = express.Router();


router.post("/MyProfile", Faculty);

router.get("/Hello", (req, res) => {
  res.json({ message: "GET request received for Hello" });
});

export default router;
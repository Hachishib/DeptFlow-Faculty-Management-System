import express from "express";
import { googleLogin } from "../../CONTROLLERS/auth.controller";

const router = express.Router();

router.post("/", googleLogin);

export default router;

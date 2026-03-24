import express from "express";
import { googleLogin } from "../../controllers/auth.controller";

const router = express.Router();

router.post("/login", googleLogin);

export default router;

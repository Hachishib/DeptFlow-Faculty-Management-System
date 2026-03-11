import express from "express";
import { googleLogin } from "../../controllers/auth.controller";

const router = express.Router();

router.post("/", googleLogin);

export default router;

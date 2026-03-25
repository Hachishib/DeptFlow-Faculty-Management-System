import express from "express";
import { googleLogin } from "../../CONTROLLERS/authgoogleCtrl/auth.controller";

const router = express.Router();

router.post("/", googleLogin);

export default router;

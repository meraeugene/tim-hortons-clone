import express from "express";
import { createGoogleAuth } from "../controllers/googleAuthController.js";

const router = express.Router();

router.route("/google").post(createGoogleAuth);

export default router;

import express from "express";
import { getMessages, sendMessage, sendFile, getFile } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.get("/sendFile/:id", protectRoute, sendFile);
router.post("/getFile/:id", protectRoute, getFile);

export default router;

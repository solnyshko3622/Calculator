import express from "express";
import { serveFrontend } from "../controllers/frontendController";

const router = express.Router();
router.get("*", serveFrontend);

export default router;

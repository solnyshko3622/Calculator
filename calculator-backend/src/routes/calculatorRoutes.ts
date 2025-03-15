import express from "express";
import calculate from "../controllers/calculatorController";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Calculator API is working");
});

// @ts-ignore
router.put("/calculate", calculate);

export default router;

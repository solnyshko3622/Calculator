// src/controllers/frontendController.ts
import { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";


// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, "../../../calculator_frontend/dist");
export const serveFrontend = (req: Request, res: Response) => {
    if (req.url !== '/') {
        return res.sendFile(path.join(frontendPath, req.url));
    }
    res.sendFile(path.join(frontendPath, "index.html"));
};

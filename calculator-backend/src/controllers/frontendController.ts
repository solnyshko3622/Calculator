import { Request, Response } from "express";
import path from "path";

const frontendPath = path.join(__dirname, "../../../calculator_frontend/dist");
export const serveFrontend = (req: Request, res: Response) => {
    if (req.url !== '/') {
        return res.sendFile(path.join(frontendPath, req.url));
    }
    res.sendFile(path.join(frontendPath, "index.html"));
};

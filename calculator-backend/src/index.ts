import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectContract from "./utils/contract";
import calculatorRouter from "./routes/calculatorRoutes"
import path from "path";
import frontendRoutes from "./routes/frontendRoutes";

dotenv.config();
const app = express();
app.use(frontendRoutes);
app.use(express.static(path.join(__dirname, "../../../calculator_frontend/dist")));
app.use(cors());
app.use(express.json());
app.use('/', calculatorRouter);
app.locals.contract = connectContract;
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


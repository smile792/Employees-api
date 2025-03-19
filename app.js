import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import employeesRoutes from "./routes/employees.js";
import cors from "cors";
dotenv.config();
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/employees", employeesRoutes);

export default app;

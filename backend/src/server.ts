import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {prisma} from "./lib/prisma.js";
import authRouter  from './routes/auth.routes.js';
import adminRouter from './routes/admin.routes.js';
import logger from "./utils/logger.js";
import reviewRouter from "./routes/review.routes.js"
import bookRouter from "./routes/books.routes.js"

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/review',reviewRouter);
app.use('/api/books',bookRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);

  try {
    // const startTime = Date.now();
    await prisma.$connect();
    logger.info("Database Connected")
    // const connectTime = Date.now() - startTime;
    // console.log(` Database connected in ${connectTime}ms`);
  } catch (error) {
    console.error("Database connection failed:", error);
  }
});

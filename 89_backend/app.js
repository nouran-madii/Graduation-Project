import express from "express";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import courseRouter from "./routes/course.routes.js";
import connection from "./database/connection.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.middleware.js";
import companyRouter from "./routes/company.routes.js";
import skillRouter from "./routes/skill.routes.js";
import jobRouter from "./routes/job.routes.js";
import jobSeekerRouter from "./routes/jobSeeker.routes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/compaines', companyRouter);
app.use('/api/v1/skills', skillRouter);
app.use('/api/v1/jobs', jobRouter);
app.use('/api/v1/job-seekers', jobSeekerRouter);


app.all("*", (req, res, next) => {
    const error = new Error(`Can't find this route: ${req.originalUrl}`);
    error.status = 400
    next(error);
  });

app.use(errorMiddleware);


app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await connection();
})

export default app;
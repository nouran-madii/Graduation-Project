import { Router } from "express";
import {
  login,
  registerCompany,
  registerJobSeeker,
} from "../controllers/auth.controller.js";
import upload from "../middlewares/multer.middleware.js";

const authRouter = Router();

authRouter.post("/company/sign-up", upload.single("logo"), registerCompany);
authRouter.post("/job-seeker/sign-up", registerJobSeeker);
authRouter.post("/login", login);

export default authRouter;

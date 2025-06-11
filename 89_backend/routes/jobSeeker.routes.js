import { Router } from "express";
import { protect, restrictTo } from "../controllers/auth.controller.js";
import {
  addSkills,
  getOneJobSeeker,
  jobSeekerImage,
  updateJobSeeker,
} from "../controllers/jobSeeker.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { analyze } from "../skillGap.js";

const jobSeekerRouter = Router();

jobSeekerRouter.get(
  "/get-one",
  protect,
  restrictTo("job-seeker"),
  getOneJobSeeker
);

jobSeekerRouter.post("/analyze", protect, restrictTo("job-seeker"), analyze);

jobSeekerRouter.put(
  "/update",
  protect,
  restrictTo("job-seeker"),
  updateJobSeeker
);
jobSeekerRouter.post(
  "/add-skills",
  protect,
  restrictTo("job-seeker"),
  addSkills
);
jobSeekerRouter.post(
  "/upload-image",
  protect,
  restrictTo("job-seeker"),
  upload.single("image"),
  jobSeekerImage
);
export default jobSeekerRouter;

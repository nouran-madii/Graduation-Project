import { Router } from "express";
import {
  apply,
  create,
  deleteJob,
  getAll,
  getOneJob,
  updateJob,
} from "../controllers/job.controller.js";
import { protect, restrictTo } from "../controllers/auth.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { recommend } from "../recommend.js";

const jobRouter = Router();

jobRouter.route("/").get(getAll).post(protect, restrictTo("employer"), create);

jobRouter.get('/recommend', protect, recommend)
jobRouter
  .route("/:id")
  .get(getOneJob)
  .put(protect, restrictTo("employer"), updateJob)
  .delete(protect, restrictTo("employer"), deleteJob);

jobRouter.post(
  "/apply",
  protect,
  restrictTo("job-seeker"),
  upload.single("cv"),
  apply
);



export default jobRouter;

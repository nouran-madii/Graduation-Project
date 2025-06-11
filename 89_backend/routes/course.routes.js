import { Router } from "express";
import {
  create,
  deleteCourse,
  enrollCourse,
  getAll,
  getOne,
  update,
} from "../controllers/course.controller.js";
import { protect, restrictTo } from "../controllers/auth.controller.js";

const courseRouter = Router();

courseRouter.get("/", getAll);
courseRouter.post("/", protect, restrictTo("employer"), create);
courseRouter
  .route("/:id")
  .get(getOne)
  .put(protect, restrictTo("employer"), update)
  .delete(protect, restrictTo("employer"), deleteCourse);

courseRouter.post("/enroll-course", protect, restrictTo("job-seeker"), enrollCourse );

export default courseRouter;

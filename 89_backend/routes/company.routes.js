import { Router } from "express";
import {
  getAllCompanies,
  getOneEmployer,
  updateCompany,
} from "../controllers/company.controller.js";
import { protect, restrictTo } from "../controllers/auth.controller.js";

const companyRouter = Router();

companyRouter.get("/", getAllCompanies);
companyRouter.get("/:id", getOneEmployer);
companyRouter.put("/update", protect, restrictTo("employer"), updateCompany);

export default companyRouter;

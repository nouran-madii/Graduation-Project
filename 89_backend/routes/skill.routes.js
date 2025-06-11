import { Router } from "express";
import { createSkill, getAll, getOne } from "../controllers/skill.controller.js"

const skillRouter = Router();

skillRouter.get('/', getAll);
skillRouter.get('/:id', getOne);
skillRouter.post('/', createSkill);

export default skillRouter;
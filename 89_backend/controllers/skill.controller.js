import Skill from "../models/skill.model.js";

export const getAll = async(req, res, next) => {
    try {
        const skills = await Skill.find();
        res.status(200).json({
            success: true,
            message: 'Skills retrieved successfully',
            data: skills
        });
    } catch (error) {
        next(error);
    }
}

export const getOne = async(req, res, next) => {
    try {
        const id = req.params.id;
        const skill = await Skill.findById(id);

        res.status(200).json({
            success: true,
            message: 'Skill retrieved successfully',
            data: skill
        });
    } catch (error) {
        next(error);
    }
}

export const createSkill = async(req, res, next) => {
    try {
        const { name } = req.body;
        const newSkill = await Skill.create({name});

        res.status(201).json({
            success: true,
            message: 'Skills created successfully',
            data: newSkill
        })
    } catch (error) {
        next(error);
    }
} 
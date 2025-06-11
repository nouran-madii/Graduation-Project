import Course from "../models/course.model.js";
import Enrollment from "../models/enrollment.model.js";

export const getAll = async (req, res, next) => {
  try {
    const courses = await Course.find().select("name link _id").populate({
      path: "skills_taught",
      select: "name _id",
    });
    res.status(200).json({
      success: true,
      message: "Courses retrieved successfully",
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const { name, link, skills_taught } = req.body;
    const newCourse = await Course.create({ name, link, skills_taught });
    await newCourse.populate({
      path: "skills_taught",
      select: "name _id",
    });
    res.status(201).json({
      success: true,
      message: "Course created Successfully",
      data: newCourse,
    });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const course = await Course.findById(id);

    await course.populate({
      path: "skills_taught",
      select: "name _id",
    });

    res.status(200).json({
      success: true,
      message: "Course retrieved successfully",
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, link, skills_taught } = req.body;
    const course = await Course.findByIdAndUpdate(
      id,
      { name, link, skills_taught },
      { new: true }
    );

    await course.populate({
      path: "skills_taught",
      select: "name _id",
    });

    res.status(200).json({
      success: true,
      message: "Course Updated Successfully",
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const id = req.params.id;
    const cousre = await Course.findByIdAndDelete(id);

    res.status(204).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const enrollCourse = async (req, res, next) => {
  try {
    const jobSeekerId = req.user._id;
    const { courseId } = req.body;

    const alreadyEnrolled = await Enrollment.findOne({
      jobSeekr: jobSeekerId,
      course: courseId,
    });

    if (alreadyEnrolled) {
      const error = new Error("Already enrolled in this course");
      error.status = 400;
      throw error;
    }

    const enrollment = await Enrollment.create({
      jobSeeker: jobSeekerId,
      course: courseId,
    });

    await enrollment.populate({
      path: ["jobSeeker", "course"],
      select: "name _id",
    })

    res.status(201).json({
      success: true,
      message: 'Enrollment successful',
      data: enrollment
    })
  } catch (error) {
    next(error);
  }
};

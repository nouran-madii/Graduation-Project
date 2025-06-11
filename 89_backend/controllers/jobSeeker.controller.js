import JobSeeker from "../models/jobSeeker.model.js";
import cloudinary from "../utils/cloudinary.js";

export const getOneJobSeeker = async (req, res, next) => {
  try {
    const jobSeekerId = req.user._id;
    const jobSeeker = await JobSeeker.findById(jobSeekerId);

    await jobSeeker.populate({
      path: "skills",
      select: "name _id",
    });

    res.status(200).json({
      success: true,
      message: "Jobseeker retrieved successfully",
      data: jobSeeker,
    });
  } catch (error) {
    next(error);
  }
};

export const updateJobSeeker = async (req, res, next) => {
  try {
    const jobSeekerId = req.user._id;
    const {
      firstName,
      lastName,
      email,
      phone,
      gender,
      address,
      skills,
      university,
      degree,
      birth_date,
      graduation_date,
      title
    } = req.body;

    const jobSeeker = await JobSeeker.findByIdAndUpdate(
      jobSeekerId,
      {
        firstName,
        lastName,
        title,
        email,
        phone,
        gender,
        address,
        skills,
        university,
        degree,
        birth_date,
        graduation_date,
      },
      { new: true }
    );

    console.log("REQ.BODY:", req.body);
    await jobSeeker.populate({
      path: "skills",
      select: "name _id",
    });

    res.status(200).json({
      success: true,
      message: "Jobseeker updated successfully",
      data: jobSeeker,
    });
  } catch (error) {
    next(error);
  }
};

export const addSkills = async (req, res, next) => {
  try {
    const jobSeekerId = req.user._id;
    const { skills } = req.body;

    const jobSeeker = await JobSeeker.findByIdAndUpdate(
      jobSeekerId,
      { skills },
      { new: true }
    );

    await jobSeeker.populate({
      path: "skills",
      select: "name _id",
    });
    res.status(200).json({
      success: true,
      message: "skills added successfully",
      data: jobSeeker,
    });
  } catch (error) {
    next(error);
  }
};

export const jobSeekerImage = async (req, res, next) => {
  try {
    const jobSeekerId = req.user._id;
    const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
      folder: "job-seekers",
    });

    const jobSeeker = await JobSeeker.findByIdAndUpdate(
      jobSeekerId,
      { image: secure_url },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "image uploded successfully",
      data: jobSeeker,
    });
  } catch (error) {
    next(error);
  }
};

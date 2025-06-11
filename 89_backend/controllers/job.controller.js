import JobApplication from "../models/job-application.model.js";
import Job from "../models/job.model.js";
import job from "../models/job.model.js";
import cloudinary from "../utils/cloudinary.js";

export const getAll = async (req, res, next) => {
  try {
    const jobs = await job.find().populate({
      path: ["company"],
      select: "name _id",
    });
    res.status(200).json({
      success: true,
      message: "Jobs retrieved successfully",
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

export const getOneJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

     await job.populate({
      path: "company",
      select: "company_name _id logo",
    });

    res.status(200).json({
      success: true,
      message: "Job retrieved successfully",
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const company = req.user._id;
    const {
      description,
      title,
      job_type,
      location,
      salary,
      city,
      area,
      company_address,
      company_website,
      contact,
      experience_level,
      deadline,
      status,
      requirements,
    } = req.body;

    const newJob = await job.create({
      description,
      title,
      company,
      salary,
      job_type,
      location,
      city,
      area,
      company_address,
      company_website,
      contact,
      experience_level,
      deadline,
      status,
      requirements,
    });

    await newJob.populate({
      path: "company",
      select: "name _id",
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: newJob,
    });
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const companyId = req.user._id;
    const id = req.params.id;
    const {
      description,
      title,
      job_type,
      location,
      city,
      salary,
      area,
      company_address,
      company_website,
      contact,
      experience_level,
      deadline,
      status,
      requirements,
    } = req.body;

    const job = await Job.findById(id);

    if (job.company.toString() !== companyId.toString()) {
      const error = new Error("You are not allowed to update this job");
      error.status = 403;
      throw error;
    }

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      {
        description,
        title,
        salary,
        job_type,
        location,
        city,
        area,
        company_address,
        company_website,
        contact,
        experience_level,
        deadline,
        status,
        requirements,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const companyId = req.user._id;
    const id = req.params.id;

    const job = await Job.findById(id);

    if (job.company.toString() !== companyId.toString()) {
      const error = new Error("You are not allowed to delete this job");
      error.status = 403;
      throw error;
    }

    job.status = "deleted";
    await job.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Job Deleted succssfully",
    });
  } catch (error) {
    next(error);
  }
};

export const apply = async (req, res, next) => {
  try {
    const jobSeekerId = req.user._id;
    const {
      jobId,
      firstName,
      lastName,
      email,
      gender,
      phone,
      city,
      area,
      birth_date,
      university,
      graduation_date,
      degree,
      expected_salary,
    } = req.body;

    const job = await Job.findById(jobId);

    if (!job) {
      const error = new Error("Job not found");
      error.status = 404;
      throw error;
    }

    const alreadyApplied = await JobApplication.findOne({
      jobSeeker: jobSeekerId,
      job: jobId,
    });

    if (alreadyApplied) {
      const error = new Error("You have already applied to this job");
      error.status = 400;
      throw error;
    }

    let cvUrl = "";

    if (req.file) {
      const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
        folder: "cvs",
      });

      cvUrl = secure_url;
    }

    const application = await JobApplication.create({
      jobSeeker: jobSeekerId,
      job: jobId,
      firstName,
      lastName,
      email,
      phone,
      university,
      city,
      area,
      expected_salary,
      degree,
      birth_date,
      graduation_date,
      gender,
      cv: cvUrl,
    });

    await application.populate({
      path: ["jobSeeker", "job"],
      select: "name _id",
    });

    res.status(201).json({
      success: true,
      message: "Applied successfully",
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

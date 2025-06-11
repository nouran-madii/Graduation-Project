import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    description: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    title: {
      type: String,
      trim: true,
      required: [true, "job title is required"],
    },
    job_type: { type: String, enum: ["Full_Time", "Part_Time", "Internship"] },
    job_location: { type: String, enum: ["on_site", "remote"] },
    salary: Number,
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    area: {
      type: String,
      required: [true, "area is required"],
      trim: true,
    },
    company_address: {
      type: String,
      required: [true, "Company Address is required"],
      trim: true,
    },
    company_website: {
      type: String,
      required: [true, "Company website is required"],
    },
    contact: {
      type: String,
      required: [true, "contact is required"],
    },
    experience_level: {
      type: String,
      required: [true, "Experience level is required"],
    },
    deadline: {
      type: Date,
    },
    requirements: {
      type: String,
      required: [true, "Job Requirements is required"],
    },
    status: {
      type: String,
      enum: ["draft", "posted", "deleted"],
      default: "posted",
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;

import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
  {
    jobSeeker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobSeeker",
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    gender: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
    },
    birth_date: {
      type: Date,
      required: [true, "Birth date is required"],
    },
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
    university: {
      type: String,
      required: [true, "University is required"],
      trim: true,
    },
    graduation_date: {
      type: Date,
      required: [true, "Graduation date is required"],
    },
    degree: {
      type: String,
      required: [true, "Degree is required"],
    },
    expected_salary: {
      type: String,
    },
    cv: {
      type: String,
      required: [true, "Cv is required"],
    },
  },
  { timestamps: true }
);

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

export default JobApplication;

import mongoose from "mongoose";

const jobSeekerSchema = new mongoose.Schema(
  {
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

    title: {
      type: String,
      lowercase: true,
    },
    phone: {
      type: String,
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
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 8,
    },
    university: {
      type: String,
      trim: true,
    },
    graduation_date: {
      type: Date,
    },
    degree: {
      type: String,
    },
    address: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
    birth_date: {
      type: Date,
    },
    role: {
      type: String,
      default: "job-seeker",
    },
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
  },
  { timestamps: true }
);

const JobSeeker = mongoose.model("JobSeeker", jobSeekerSchema);

export default JobSeeker;

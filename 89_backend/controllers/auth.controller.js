import bcrypt from "bcryptjs";
import Employer from "../models/company.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import JobSeeker from "../models/jobSeeker.model.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res, next) => {
  try {
    const {
      email,
      industry,
      phone,
      password,
      company_name,
      company_website,
      city,
      area,
      address,
      description,
    } = req.body;

    const existingUser = await Employer.findOne({ email });

    if (existingUser) {
      const error = new Error("Employer already exists");
      error.status = 409;
      throw error;
    }


    const hashedPassword = await hashPassword(password);

    let logoUrl = "";

    if (req.file) {
      const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
        folder: "company",
      });

      logoUrl = secure_url;
    }
    const newUser = await Employer.create({
      email,
      password: hashedPassword,
      company_name,
      company_website,
      phone,
      industry,
      city,
      area,
      address,
      description,
      logo: logoUrl
    });

    res.status(201).json({
      success: true,
      message: "Company Created successfully.",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const registerJobSeeker = async (req, res, next) => {
  try {
    const { email, firstName, lastName, password, title } = req.body;

    const existingSeeker = await JobSeeker.findOne({ email });

    if (existingSeeker) {
      const error = new Error("JobSeeker already exists");
      error.status = 409;
      throw error;
    }

    const hashedPassword = await hashPassword(password);
    const newJobSeeker = await JobSeeker.create({
      email,
      firstName,
      lastName,
      title,
      password: hashedPassword,
    });

    console.log("Register body:", req.body);


    res.status(201).json({
      success: true,
      message: "Job seeker Created successfully.",
      data: newJobSeeker,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user =
      (await Employer.findOne({ email })) ??
      (await JobSeeker.findOne({ email }));

    if (!user) {
      const error = new Error("Incorrect email or password");
      error.status = 401;
      throw error;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      const error = new Error("Incorrect email or password");
      error.status = 401;
      throw error;
    }

    const token = jwt.sign({ user_id: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: user,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      const error = new Error("You are not logged in");
      error.status = 401;
      throw error;
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded) {
      const error = new Error("Invalid token");
      error.status = 400;
      throw error;
    }

    const currentUser =
      (await Employer.findById(decoded.user_id)) ??
      (await JobSeeker.findById(decoded.user_id));

    if (!currentUser) {
      const error = new Error(
        "The user belonging to this token does no longer exist"
      );
      error.status = 401;
      throw error;
    }

    req.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};

export const restrictTo = (...roles) => {
  return async (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        const error = new Error("You are not allowed to access this route");
        error.status = 403;
        throw error;
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

import Company from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";

export const getAllCompanies = async (req, res, next) => {
  try {
    const companies = await Company.find();
    res.status(200).json({
      success: true,
      message: "companies retrieved successfully",
      data: companies,
    });
  } catch (error) {
    next(error);
  }
};

export const getOneEmployer = async (req, res, next) => {
  try {
    const employerId = req.params.id;
    const employer = await Company.findById(employerId);

    res.status(200).json({
      success: true,
      message: "Company retrieved successfully",
      data: employer,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCompany = async (req, res, next) => {
  try {
    const employerId = req.user._id;
    const {
      email,
      phone,
      company_name,
      company_website,
      industry,
      city,
      area,
      address,
      description,
    } = req.body;

    const company = await Company.findById(employerId);
    let logoUrl = company.logo;
    if (req.file) {
      const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
        folder: "company",
      });

      logoUrl = secure_url;
    }

    company.email = email;
    company.phone = phone;
    company.company_name = company_name;
    company.company_website = company_website;
    company.industry = industry;
    company.city = city;
    company.area = area;
    company.address = address;
    company.description = description;
    company.logo = logoUrl;

    await company.save();

    res.status(200).json({
      success: true,
      message: "Company data updated successfully",
      data: company,
    });
  } catch (error) {
    next(error);
  }
};

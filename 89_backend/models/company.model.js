import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: 8,
    },
    phone: {
        type: String,
        required: [true, 'Please enter a company phone number']
    },
    company_name: {
        type: String,
        required: [true, 'Please enter a company name'],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    company_website: {
        type: String,
        required: [true, 'Please enter a company website'],
        trim: true
    },
    description: {
        type: String,
        trim: true,
    },
    logo: {
        type: String,
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
      address: {
        type: String,
        required: [true, "Company Address is required"],
        trim: true,
      },
      industry: {
        type: String,
        required: [true, "idustry is required"],
        trim: true,
      },
    role: {
        type: String,
        default: 'employer'
    }

}, { timestamps: true });

const Company = mongoose.models.Company || mongoose.model('Company', companySchema);

export default Company;

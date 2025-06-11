import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpForCompany1 = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    representativeId: "",
    // taxCertificate: null,
    commercialRegistration: "",
    company_website: "",
    industry: "",
    logo: null,
  });

  const [errors, setErrors] = useState({});
  const [taxFileName, setTaxFileName] = useState("");
  const [logoFileName, setLogoFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0] || null,
      }));
      if (files[0]) {
        // if (name === "taxCertificate") setTaxFileName(files[0].name);
        if (name === "logo") setLogoFileName(files[0].name);
      } else {
        // if (name === "taxCertificate") setTaxFileName("");
        if (name === "logo") setLogoFileName("");
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.representativeId.trim()) {
      newErrors.representativeId = "Representative ID is required";
    }
    // if (!formData.taxCertificate) {
    //   newErrors.taxCertificate = "Tax Certificate is required";
    // }
    if (!formData.commercialRegistration.trim()) {
      newErrors.commercialRegistration = "Commercial Registration Number is required";
    }
    if (formData.company_website && !/^https?:\/\/(?:www\.)?[^\s/$.?#].[^\s]*$/.test(formData.company_website)) {
      newErrors.company_website = "Company Website must be a valid URL";
    }
    if (!formData.industry.trim()) {
      newErrors.industry = "Industry is required";
    }
    if (!formData.logo) {
      newErrors.logo = "Company Logo is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const companyInfo = JSON.parse(localStorage.getItem("companyInfo")) || {};

      const fullData = {
        ...companyInfo,
        ...formData,
      };

      console.log("Full submitted data", fullData);

      // نستخدم FormData لإرسال ملفات + بيانات نصية
      const payload = new FormData();
      payload.append("company_name", fullData.company_name || "");
      payload.append("email", fullData.email || "");
      payload.append("phone", fullData.phone || "");
      payload.append("description", fullData.description || "");
      payload.append("representativeId", fullData.representativeId || "");
      // payload.append("taxCertificate", fullData.taxCertificate);
      payload.append("commercialRegistration", fullData.commercialRegistration || "");
      payload.append("company_website", fullData.company_website || "");
      payload.append("industry", fullData.industry || "");
      payload.append("logo", fullData.logo);
      payload.append("password", fullData.password);
      payload.append('area', fullData.area);
      payload.append("address", fullData.address);
      payload.append('city', fullData.city)

      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:3000/api/v1/auth/company/sign-up", 
          payload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("API Response:", response.data);

        
        localStorage.removeItem("companyInfo");

        // توجيه المستخدم
        navigate("/"); // أو أي صفحة نجاح تريدها

      } catch (error) {
        console.error("API Error:", error);
        alert("Something went wrong! Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-no-repeat bg-cover flex items-center justify-center bgLogin pb-10">
      <form
        onSubmit={handleSubmit}
        className="bg-[#f6f4f0] w-11/12 px-8 py-8 w-[620px] rounded-md shadow-md mt-20"
      >
        <h2 className="text-center text-[#4c3f35] text-2xl font-semibold mb-6">
          Create your account
        </h2>

        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block text-sm text-[#4c3f35] mb-1">
              ID of Representative
            </label>
            <input
              type="text"
              name="representativeId"
              value={formData.representativeId}
              onChange={handleChange}
              className={`w-full border rounded-md p-3 text-sm bg-white outline-none ${
                errors.representativeId ? "border-red-500" : ""
              }`}
            />
            {errors.representativeId && (
              <p className="text-red-500 text-xs mt-1">{errors.representativeId}</p>
            )}
          </div>

        </div>

        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block text-sm text-[#4c3f35] mb-1">
              Commercial Registration Number
            </label>
            <input
              type="text"
              name="commercialRegistration"
              value={formData.commercialRegistration}
              onChange={handleChange}
              className={`w-full border rounded-md p-3 text-sm bg-white outline-none ${
                errors.commercialRegistration ? "border-red-500" : ""
              }`}
            />
            {errors.commercialRegistration && (
              <p className="text-red-500 text-xs mt-1">{errors.commercialRegistration}</p>
            )}
          </div>

          <div className="w-1/2">
            <label className="block text-sm text-[#4c3f35] mb-1">Company Website</label>
            <input
              type="url"
              name="company_website"
              value={formData.company_website}
              onChange={handleChange}
              placeholder="URL"
              className={`w-full border rounded-md p-3 text-sm bg-white outline-none ${
                errors.company_website ? "border-red-500" : ""
              }`}
            />
            {errors.company_website && (
              <p className="text-red-500 text-xs mt-1">{errors.company_website}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="w-1/2">
            <label className="block text-sm text-[#4c3f35] mb-1">Industry</label>
            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className={`w-full border rounded-md p-3 text-sm bg-white outline-none ${
                errors.industry ? "border-red-500" : ""
              }`}
            />
            {errors.industry && (
              <p className="text-red-500 text-xs mt-1">{errors.industry}</p>
            )}
          </div>

          <div className="w-1/2">
            <label className="block text-sm text-[#4c3f35] mb-1">Company Logo</label>
            <div className="relative">
              <input
                type="file"
                name="logo"
                onChange={handleChange}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div
                className={`flex items-center justify-end w-full h-12 bg-[#F6F6F6] rounded-md px-4 border border-gray-200 pointer-events-none ${
                  errors.logo ? "border-red-500" : ""
                }`}
              >
                {logoFileName || "Choose a file..."}
              </div>
            </div>
            {errors.logo && (
              <p className="text-red-500 text-xs mt-1">{errors.logo}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading ? "bg-gray-400" : "bg-[#6f5e51]"
          } text-white py-3 rounded-md text-sm font-medium mb-4`}
        >
          {loading ? "Submitting..." : "Sign Up"}
        </button>

        <p className="text-center text-sm text-[#4c3f35]">
          Already Have An Account?{" "}
          <Link to={"/login"}>
            <span className="underline cursor-pointer">Sign In</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForCompany1;

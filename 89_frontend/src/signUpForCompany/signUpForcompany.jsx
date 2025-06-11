import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUpForCompany = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company_name: "",
    password: "",
    phone: "",
    repName: "",
    description: "",
    email: "",
    city: "",
    area: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.company_name.trim()) newErrors.company_name = "Required";
    if (!form.repName.trim()) newErrors.repName = "Required";
    if (!form.description.trim()) newErrors.description = "Required";
    if (!form.email.trim()) newErrors.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email";

    if (!form.password) newErrors.password = "Required";
    else if (form.password.length < 6 || !/[A-Za-z]/.test(form.password) || !/[^A-Za-z0-9]/.test(form.password)) {
      newErrors.password = "Min 6 chars, include letter & symbol";
    }

    if (!form.phone.trim()) newErrors.phone = "Required";
    else if (!/^\d+$/.test(form.phone)) newErrors.phone = "Only numbers allowed";

    if (!form.city) newErrors.city = "Required";
    if (!form.area) newErrors.area = "Required";
    if (!form.address.trim()) newErrors.address = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Save to localStorage or navigate
      localStorage.setItem("companyInfo", JSON.stringify(form));
      navigate("/signUpForCompany1");
    }
  };

  return (
    <div className="min-h-screen bg-no-repeat bg-cover flex items-center relative justify-center bgLogin pb-10">
      <Link to='/'><div className="absolute z-10 font-museo text-[33px] top-5 left-1/2 transform -translate-x-1/2 text-white xl:text-[50px] tracking-wide font-light">
        JOB HUB
      </div></Link>
      <form onSubmit={handleSubmit} className="bg-[#f6f4f0] w-11/12  px-6 py-6 w-[620px] rounded-md shadow-md mt-20 relative">
        <h2 className="text-center text-[#4c3f35] text-2xl font-semibold mb-6 mt-8">Create your account</h2>

        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block text-sm">Company Name</label>
            <input type="text" name="company_name" value={form.company_name} onChange={handleChange} className="w-full border rounded-md p-3 text-sm bg-white outline-none" />
            {errors.company_name && <span className="text-red-500 text-sm">{errors.company_name}</span>}
          </div>

          <div className="w-1/2">
            <label className="block text-sm">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full border rounded-md p-3 text-sm bg-white outline-none" />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block text-sm">Phone Number</label>
            <input type="text" name="phone" value={form.phone} onChange={handleChange} className="w-full border rounded-md p-3 text-sm bg-white outline-none" />
            {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
          </div>

          <div className="w-1/2">
            <label className="block text-sm">Representative Name</label>
            <input type="text" name="repName" value={form.repName} onChange={handleChange} className="w-full border rounded-md p-3 text-sm bg-white outline-none" />
            {errors.repName && <span className="text-red-500 text-sm">{errors.repName}</span>}
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block text-sm">Company Description</label>
            <input type="text" name="description" value={form.description} onChange={handleChange} className="w-full border rounded-md p-3 text-sm bg-white outline-none" />
            {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
          </div>

          <div className="w-1/2">
            <label className="block text-sm">Official Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border rounded-md p-3 text-sm bg-white outline-none" />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>
        </div>

        <div className="flex items-center my-4">
          <hr className="flex-grow border border-gray-300" />
          <span className="px-3 text-sm">Location</span>
          <hr className="flex-grow border border-gray-300" />
        </div>

        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block text-sm">City</label>
            <select name="city" value={form.city} onChange={handleChange} className="w-full border rounded-md p-3 text-sm bg-white outline-none">
              <option value="">Select City</option>
              <option value="Cairo">Cairo</option>
              <option value="Alexandria">Alexandria</option>
            </select>
            {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
          </div>

          <div className="w-1/2">
            <label className="block text-sm">Area</label>
            <select name="area" value={form.area} onChange={handleChange} className="w-full border rounded-md p-3 text-sm bg-white outline-none">
              <option value="">Select Area</option>
              <option value="Nasr City">Nasr City</option>
              <option value="Smouha">Smouha</option>
            </select>
            {errors.area && <span className="text-red-500 text-sm">{errors.area}</span>}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm">Company Address</label>
          <input type="text" name="address" value={form.address} onChange={handleChange} className="w-full border rounded-md p-3 text-sm bg-white outline-none" />
          {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
        </div>

        <button type="submit" className="w-full bg-[#6f5e51] text-white py-3 rounded-md text-sm font-medium mb-3">
          Next
        </button>

        <p className="text-center text-sm text-[#4c3f35]">
          Already Have An Account?
          <Link to="/login">
            <span className="underline cursor-pointer ml-1">Sign In</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForCompany;

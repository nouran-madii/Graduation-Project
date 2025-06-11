import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    title: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "Required";
    if (!formData.lastName.trim()) newErrors.lastName = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";
    if (!formData.password) newErrors.password = "Required";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Required";
    if (!formData.title) newErrors.title = "Required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    const passRegex =
      /^(?=.*[A-Za-z])(?=.*[!@#$%^&*.+_])[A-Za-z\d!@#$%^&*.+_]{6,}$/;
    if (formData.password && !passRegex.test(formData.password)) {
      newErrors.password = "Password must be ≥6, include letter and symbol";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/job-seeker/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          title: formData.title,
        }),
      });

      console.log(response)

      if (!response.ok) {
        const errorData = await response.json();
        setErrors({ apiError: errorData.message || "Registration failed" });
        return;
      }

      const data = await response.json();
      navigate("/login");
    } catch (error) {
      console.error("Error during sign up:", error);
      setErrors({ apiError: "Something went wrong. Please try again later." });
    }
  };

  return (
    <div className="min-h-screen bgLogin flex items-center justify-center">
      <div className="absolute z-10 font-museo text-[33px] top-3 lg:top-6 left-1/2 transform -translate-x-1/2 text-white xl:text-[40px] sm:text-[40px] md:text-[40px] lg:text-[40px] tracking-wide font-light">
        <Link to="/">JOB HUB</Link>
      </div>

      <form
        className="bg-[#f6f4f0] w-11/12 md:w-[550px] px-4 py-6 rounded-md shadow-md mt-12"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center text-[#4c3f35] text-2xl font-semibold mb-4">
          Create your account
        </h2>

        <div className="flex gap-4 mb-2">
          <div className="w-1/2">
            <label className="block text-sm text-[#4c3f35]">First Name</label>
            <input
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border p-3 rounded-md text-sm"
              placeholder="First Name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs">{errors.firstName}</p>
            )}
          </div>

          <div className="w-1/2">
            <label className="block text-sm text-[#4c3f35]">Last Name</label>
            <input
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border p-3 rounded-md text-sm"
              placeholder="Last Name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="mb-2">
          <label className="block text-sm text-[#4c3f35]">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-md text-sm"
            placeholder="Enter Your Email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>

        <div className="mb-2 relative">
          <label className="block text-sm text-[#4c3f35]">Password</label>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded-md text-sm"
            placeholder="Enter Your Password"
          />
          <div
            className="absolute right-3 top-9 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
        </div>

        <div className="mb-4 relative">
          <label className="block text-sm text-[#4c3f35]">
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border p-3 rounded-md text-sm"
            placeholder="Confirm Your Password"
          />
          <div
            className="absolute right-3 top-9 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-[#4c3f35]">Title</label>
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded-md text-sm"
            placeholder="Your Title"
          />
          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title}</p>
          )}
        </div>

        {errors.apiError && (
          <p className="text-red-500 text-center text-sm mb-2">
            {errors.apiError}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-[#6f5e51] text-white py-3 rounded-md text-sm font-medium"
        >
          Sign Up
        </button>

        <div className="flex items-center gap-3 my-3">
          <hr className="flex-grow border-gray-300" />
          <span className="text-sm text-[#4c3f35]">or sign In with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex justify-center gap-4 mb-2">
          {/* Facebook */}
          <button className="w-10 h-10 bg-white border rounded-md flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.9345 28.5V17.0961H21.7623L22.3354 12.6522H17.9346V9.815C17.9346 8.52823 18.2922 7.65128 20.1368 7.65128L22.4903 7.65058V3.6755C22.0834 3.62088 20.6867 3.5 19.061 3.5C15.668 3.5 13.3454 5.57162 13.3454 9.37488V12.6522H9.50781V17.0961H13.3453V28.5L17.9345 28.5Z"
                fill="#3B5998"
              />
            </svg>
          </button>

          {/* Google */}
          <button className="w-10 h-10 bg-white border rounded-md flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.3897 10.9088C17.6516 10.9088 18.8102 11.3114 19.7351 11.9809L22.5739 9.45725C20.9234 8.10152 18.7629 7.27246 16.3897 7.27246C12.7935 7.27246 9.67492 9.16331 8.10547 11.9342L11.2621 14.2563C12.0268 12.3047 14.0307 10.9088 16.3897 10.9088Z"
                fill="#F44336"
              />
              <path
                d="M25.6754 17.0921C25.7241 16.7345 25.7565 16.3698 25.7565 15.9998C25.7565 15.3759 25.6834 14.7684 25.5498 14.1816H16.3906V17.818H21.453C21.0435 18.8098 20.3143 19.6491 19.3861 20.2322L22.5545 22.5629C24.234 21.1892 25.3834 19.2655 25.6754 17.0921Z"
                fill="#2196F3"
              />
              <path
                d="M10.9259 16.0001C10.9259 15.3867 11.0483 14.8013 11.2617 14.2567L8.10504 11.9346C7.41706 13.1492 7.02344 14.5312 7.02344 16.0001C7.02344 17.4527 7.40982 18.8193 8.08351 20.0241L11.2441 17.699C11.0417 17.167 10.9259 16.5968 10.9259 16.0001Z"
                fill="#FFC107"
              />
              <path
                d="M16.3878 21.0903C14.0108 21.0903 11.994 19.6732 11.2427 17.6982L8.08203 20.0233C9.64382 22.8165 12.774 24.7267 16.3878 24.7267C18.7021 24.7267 20.8336 23.9156 22.4964 22.5621L19.3857 20.2314C18.4669 20.8234 17.3714 21.0903 16.3878 21.0903Z"
                fill="#4CAF50"
              />
            </svg>
          </button>
        </div>

        <p className="text-center text-xs text-[#4c3f35]">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;

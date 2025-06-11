import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Login1() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await fetch('http://localhost:3000/api/v1/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (!response.ok) {
          if (response.status === 401) {
            setErrors({ password: 'Incorrect email or password' });
          } else {
            setErrors({ email: 'An error occurred. Please try again.' });
          }
          return;
        }

        const data = await response.json();


        // Save token and user data
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.data.user));
        localStorage.setItem('role', data.data.user.role || 'user');

        navigate('/');
        window.location.reload();
      } catch (error) {
        console.error('Error during login:', error);
        setErrors({ email: 'Network error. Please try again later.' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-no-repeat bg-cover flex items-center bgLogin justify-center relative">
      <div className="absolute inset-0 bg-[#0000004D]/30 z-0"></div>
      <div className="bg-[#f6f4f0] w-11/12 md:w-full shadow-lg px-8 pb-9 mt-12 rounded-md pt-5 max-w-md z-10">
        <h1 className="text-lg md:text-3xl font-medium text-center text-[#4e3c2d] mb-1">
          Login To Your Account
        </h1>
        <p className="text-center text-xs md:text-sm text-[#4e3c2d] mb-6">
          Welcome Back Select Method To Login
        </p>
        <Link to="/">
          <h2 className="absolute z-10 font-museo text-[33px] top-5 md:top-3 lg:top-8 left-1/2 transform -translate-x-1/2 text-white xl:text-[40px] sm:text-[40px] md:text-[40px] lg:text-[40px] tracking-wide font-light ">
            JOB HUB
          </h2>
        </Link>

        <form
          className="relative w-11/12 md:w-full mx-auto z-10"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="mb-2">
            <label
              className="block text-[#4e3c2d] text-sm mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter Your Email"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4 relative">
            <label className="block text-[#4e3c2d] text-sm mb-1" htmlFor="pass">
              Password
            </label>
            <input
              id="pass"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none pr-10 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <EyeOff
                className="absolute right-3 top-9 h-4 w-4 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <Eye
                className="absolute right-3 top-9 h-4 w-4 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#4e3c2d] text-white py-2 rounded-md mt-2 disabled:opacity-50"
            disabled={!email || !password}
          >
            Sign in
          </button>

          <Link to="/forget">
            <div className="text-right mt-2">
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Forgot Password?
              </a>
            </div>
          </Link>

          <div className="flex items-center my-3">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="mx-4 text-sm text-gray-500">or sign in with</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <div className="flex justify-center gap-4 mb-3">
            <button className="w-10 h-10 bg-white border rounded-md flex items-center justify-center">
              {/* Facebook SVG */}
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
            <button className="w-10 h-10 bg-white border rounded-md flex items-center justify-center">
              {/* Google SVG */}
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
                  d="M16.3878 21.0903C14.0108 21.0903 11.994 19.6732 11.2427 17.6982L8.08203 20.0233C9.64382 22.8165 12.774 24.7267 16.3878 24.7267C18.751 24.7267 20.9059 23.9086 22.5517 22.5625L19.3833 20.2317C18.5273 20.7695 17.5027 21.0903 16.3878 21.0903Z"
                  fill="#00B060"
                />
              </svg>
            </button>
          </div>

          <p className="text-center text-sm text-[#4e3c2d]">
            New To JOB HUB?{" "}
            <Link to="/signUp">
              <span className="underline cursor-pointer">Sign Up</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

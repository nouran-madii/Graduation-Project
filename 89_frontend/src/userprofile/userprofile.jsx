import React, { useState, useEffect } from "react";
import { FaStar, FaRegStar, FaUser } from "react-icons/fa";
import img1 from "../assets/d1.jpeg";
import { Link } from "react-router-dom"; // Fixed import from "react-router"

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "SELINA",
    email: "Farahatarek8988@gmail.com",
    phone: "5432123467654",
    address: "New Cairo, Cairo, Egypt",
    title: "UI UX",
    skills: ["Figma", "Adobe Xd", "ILLUSTRATION"] // Added skills array
  });

  useEffect(() => {
    const savedProfileData = localStorage.getItem("profileData");
    const user = localStorage.getItem("currentUser");

    if (savedProfileData) {
      const parsedData = JSON.parse(savedProfileData);
      // Ensure skills is an array
      const skillsArray = Array.isArray(parsedData.skills) 
        ? parsedData.skills 
        : parsedData.skills?.split(',') || ["Figma", "Adobe Xd", "ILLUSTRATION"];
      
      setProfileData({
        ...parsedData,
        skills: skillsArray
      });
    } else if (user) {
      const userData = JSON.parse(user);
      setProfileData(prev => ({
        ...prev,
        name: userData.firstName || prev.name,
        email: userData.email || prev.email,
        phone: userData.phone || prev.phone,
        title: userData.title || prev.title,
        skills: userData.skills || prev.skills
      }));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f2f2f0] py-10 px-4">
      <div className="max-w-[1200px] mx-auto bg-[#f2f2f0] rounded-[10px] p-10 border shadow">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-[26px] text-[#514232] font-light font-museo tracking-wide">
            JOB HUB
          </h1>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm font-medium">
              Home
            </Link>
            <Link to="/edit-profile" className="text-sm font-medium">
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Profile Top Section */}
        <div className="flex gap-6 items-center mb-10">
          <img
            src={img1}
            alt={profileData.name}
            className="w-32 h-40 object-cover rounded-md"
          />
          <div>
            <h2 className="text-xl text-[#514232] font-bold tracking-[0.4em]">
              {profileData.name}
            </h2>
            <p className="text-sm">{profileData.title}</p>
            <div className="flex items-center mt-2 text-sm">
              <span className="mr-2">8.5</span>
              {[...Array(4)].map((_, i) => (
                <FaStar key={i} className="text-yellow-500" />
              ))}
              <FaRegStar className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-10">
          <div className="flex items-center text-base font-bold text-[#514232] mb-2">
            <FaUser className="mr-2" />
            About
          </div>
          <div className="h-[2px] w-full bg-gray-300 mb-6" />

          {/* Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm text-gray-800">
            {/* General Information */}
            <div>
              <h3 className="font-semibold text-gray-600 mb-2">
                General Information
              </h3>
              <div className="space-y-1">
                <p className="font-semibold">
                  <strong className="font-semibold text-[#514232]">Phone:</strong>{" "}
                  {profileData.phone}
                </p>
                <p className="font-semibold">
                  <strong className="font-semibold text-[#514232]">Address:</strong>{" "}
                  {profileData.address}
                </p>
                <p className="font-semibold">
                  <strong className="font-semibold text-[#514232]">E-mail:</strong>{" "}
                  {profileData.email}
                </p>
                <p className="font-semibold">
                  <strong className="font-semibold text-[#514232]">GitHub:</strong>{" "}
                  URL
                </p>
                <p className="font-semibold">
                  <strong className="font-semibold text-[#514232]">CV:</strong> —
                </p>
              </div>
            </div>

            {/* Education + Basic Info */}
            <div>
              <h3 className="font-semibold text-gray-600 mb-2">Education</h3>
              <div className="space-y-1 mb-4">
                <p className="font-semibold">
                  <strong className="font-semibold text-[#514232]">University:</strong>{" "}
                  EELU
                </p>
                <p className="font-semibold">
                  <strong className="font-semibold text-[#514232]">Degree:</strong> —
                </p>
                <p className="font-semibold">
                  <strong className="font-semibold text-[#514232]">Date:</strong>{" "}
                  20/6/2025
                </p>
              </div>
              <h3 className="font-semibold text-gray-600 mb-2">Basic Information</h3>
              <div className="space-y-1">
                <p className="font-semibold">
                  <strong className="font-semibold text-[#514232]">Birthday:</strong>{" "}
                  20/9/2003
                </p>
                <p className="font-semibold">
                  <strong className="font-semibold text-[#514232]">Gender:</strong>{" "}
                  -
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills and Work Section */}
        <div className="grid grid-cols-2 gap-10 text-sm">
          <div>
            <h3 className="font-semibold text-gray-600 border-b border-gray-300 pb-1 mb-2">
              Skills
            </h3>
            <ul className="space-y-1 font-medium">
              {profileData.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600 border-b border-gray-300 pb-1 mb-2">
              Work
            </h3>
            <p className="text-gray-400">—</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "SELINA",
    email: "Farahatarek8988@gmail.com",
    phone: "5432123467654",
    address: "New Cairo, Cairo, Egypt",
  });

  useEffect(() => {
    // First try to load from API, fallback to localStorage if needed
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch('https://your-api-endpoint.com/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // or your auth method
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        
        const data = await response.json();
        setFormData(data);
      } catch (err) {
        console.error("API fetch failed, trying localStorage:", err);
        // Fallback to localStorage if API fails
        const savedData = localStorage.getItem("currentUser");
        if (savedData) {
          setFormData(JSON.parse(savedData));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:3000/api/v1/job-seekers/update', {
        method: 'PUT', // or 'PATCH' depending on your API
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // or your auth method
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      // Save to localStorage as fallback
      localStorage.setItem("profileData", JSON.stringify(formData));
      
      // Navigate to profile page on success
      navigate("/UserProfile");
    } catch (err) {
      setError(err.message || 'An error occurred while updating your profile');
      console.error("Update error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f2f0] flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-md shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-6 text-[#514232]">Edit Profile</h2>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <label className="block mb-2 text-sm">Name</label>
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
          disabled={isLoading}
        />

        <label className="block mb-2 text-sm">Email</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
          disabled={isLoading}
        />

        <label className="block mb-2 text-sm">Phone</label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
          disabled={isLoading}
        />

        <label className="block mb-2 text-sm">Address</label>
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border p-2 mb-6 rounded"
          disabled={isLoading}
        />

        <button
          type="submit"
          className="bg-[#514232] text-white px-4 py-2 rounded w-full disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
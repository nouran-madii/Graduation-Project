import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const JobPostForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const job = location.state?.job;

  // Form state for all fields (expand as needed)
  const [title, setTitle] = useState(job?.title || "");
  const [skills, setSkills] = useState(job?.skills || "");
  const [requirements, setRequirements] = useState(job?.requirements || "");
  const [salary, setSalary] = useState(job?.salary || "");
  const [job_type, setEmploymentType] = useState(job?.job_type || "");
  const [jobLocation, setJobLocation] = useState(job?.jobLocation || "");
  const [city, setCity] = useState(job?.city || "");
  const [area, setArea] = useState(job?.area || "");
  const [company_address, setCompanyAddress] = useState(job?.companyAddress || "");
  const [locationField, setLocationField] = useState(job?.location || "");
  const [experience_level, setExperienceLevel] = useState(job?.experienceLevel || "");
  const [contact, setContactInfo] = useState(job?.contact || "");
  const [category, setCategory] = useState(job?.category || "");
  const [company_website, setCompanyWebsite] = useState(job?.companyWebsite || "");
  const [deadlineDay, setDeadlineDay] = useState(job?.applicationDeadline?.day || "");
  const [deadlineMonth, setDeadlineMonth] = useState(job?.applicationDeadline?.month || "");
  const [deadlineYear, setDeadlineYear] = useState(job?.applicationDeadline?.year || "");
  const [description, setDescription] = useState(job?.description || "");

  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async (e) => {
    e.preventDefault();
    const role = localStorage.getItem('role');
    if (role !== 'employer') {
      window.location.href = '/login';
      return;
    }

    setLoading(true);
    setError(null);

    const newJob = {
      title,
      skills,
      requirements,
      salary,
      job_type,
      jobLocation,
      city,
      area,
      company_address,
      location: locationField,
      experience_level,
      contact,
      category,
      company_website,
      applicationDeadline: { day: deadlineDay, month: deadlineMonth, year: deadlineYear },
    };

    try {
      const response = await fetch('http://localhost:3000/api/v1/jobs', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if your API needs it, e.g.:
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newJob),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save job');
      }

      // On success, navigate to added job confirmation or job list
    navigate('/joblistings');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDraft = (e) => {
    e.preventDefault();
    const role = localStorage.getItem('role');
    if (role !== 'employer') {
      navigate('/login', { replace: true });
      return;
    }
    // You can implement draft saving logic here (API call or localStorage)
  };

  return (
    <div className="min-h-screen bg-[#f1efec] flex items-start justify-center py-10 px-4">
      <div className=" shadow-md border-2  p-10 rounded-md w-full max-w-5xl">
        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-medium mb-1">Job Title</label>
            <input
              type="text"
              placeholder="Enter Job Title"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={title}
              onChange={e => setTitle(e.target.value)}
              disabled={loading}
            />
          </div>
      <div>
      <label className="block font-medium mb-1">Job Description</label>
      <input
        placeholder="Enter Job Description"
        className="w-full border border-gray-300 rounded-md px-4 py-2"
        value={description}
        onChange={e => setDescription(e.target.value)}
        disabled={loading}
      ></input>
    </div>

        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-medium mb-1">Requirements</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={requirements}
              onChange={e => setRequirements(e.target.value)}
              disabled={loading}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Salary Range</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={salary}
              onChange={e => setSalary(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        {/* Row 3: Employment Type & Job Location */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-medium mb-2">Employment Type</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="job_type"
                  value="full-time"
                  checked={job_type === 'Full_Time'}
                  onChange={() => setEmploymentType('Full_Time')}
                  disabled={loading}
                />
                Full Time
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="job_type"
                  value="part-time"
                  checked={job_type === 'Part_Time'}
                  onChange={() => setEmploymentType('Part_Time')}
                  disabled={loading}
                />
                Part Time
              </label>
            </div>
          </div>
          <div>
            <label className="block font-medium mb-2">Job Location</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="location"
                  value="on-site"
                  checked={jobLocation === 'on-site'}
                  onChange={() => setJobLocation('on-site')}
                  disabled={loading}
                />
                On Site
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="jobLocation"
                  value="online"
                  checked={jobLocation === 'online'}
                  onChange={() => setJobLocation('online')}
                  disabled={loading}
                />
                Online
              </label>
            </div>
          </div>
        </div>
        <div className="h-px bg-black my-6" />

        {/* Row 4: City, Area */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-medium mb-1">City</label>
            <select
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={city}
              onChange={e => setCity(e.target.value)}
              disabled={loading}
            >
              <option value="">Select City</option>
              <option value="Cairo">Cairo</option>
              <option value="Alexandria">Alexandria</option>
              <option value="Giza">Giza</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Area</label>
            <select
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={area}
              onChange={e => setArea(e.target.value)}
              disabled={loading}
            >
              <option value="">Select Area</option>
              <option value="Nasr City">Nasr City</option>
              <option value="Heliopolis">Heliopolis</option>
              <option value="Maadi">Maadi</option>
            </select>
          </div>
        </div>

        {/* Row 5: Company Address, Location */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-medium mb-1">Company Address</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={company_address}
              onChange={e => setCompanyAddress(e.target.value)}
              disabled={loading}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Location</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={locationField}
              onChange={e => setLocationField(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>
        <div className="h-px bg-black my-6" />

        {/* Row 6: Experience Level, Contact Info */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-medium mb-1">Experience Level</label>
            <select
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={experience_level}
              onChange={e => setExperienceLevel(e.target.value)}
              disabled={loading}
            >
              <option value="">Select Experience</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid</option>
              <option value="senior">Senior</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Contact Info</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={contact}
              onChange={e => setContactInfo(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        {/* Row 7: Category, Company Website */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-medium mb-1">Category</label>
            <select
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={category}
              onChange={e => setCategory(e.target.value)}
              disabled={loading}
            >
              <option value="">Select Category</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Company Website</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={company_website}
              onChange={e => setCompanyWebsite(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        {/* Row 8: Application Deadline */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block font-medium mb-1">Deadline Day</label>
            <input
              type="number"
              min="1"
              max="31"
              placeholder="Day"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={deadlineDay}
              onChange={e => setDeadlineDay(e.target.value)}
              disabled={loading}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Deadline Month</label>
            <input
              type="number"
              min="1"
              max="12"
              placeholder="Month"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={deadlineMonth}
              onChange={e => setDeadlineMonth(e.target.value)}
              disabled={loading}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Deadline Year</label>
            <input
              type="number"
              placeholder="Year"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={deadlineYear}
              onChange={e => setDeadlineYear(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="flex gap-6">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            onClick={handleDraft}
            className="px-6 py-3 border border-gray-400 rounded-md hover:bg-gray-100 transition"
            disabled={loading}
          >
            Save Draft
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobPostForm;

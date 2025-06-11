// src/pages/JobDetails.jsx
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/v1/jobs/${id}`);
        setJob(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10">Loading job details...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  if (!job) {
    return <div className="text-center mt-10 text-red-500">Job not found</div>;
  }

  // Helper function to render requirements text with line breaks
  const renderRequirements = (requirementsText) => {
    if (!requirementsText) return null;
    
    // Split by newlines or bullet points if they exist in the text
    const lines = requirementsText.split('\n').filter(line => line.trim() !== '');
    
    if (lines.length > 1) {
      return (
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
          {lines.map((line, i) => (
            <li key={i}>{line.trim()}</li>
          ))}
        </ul>
      );
    }
    
    return <p className="text-sm text-gray-700 whitespace-pre-line">{requirementsText}</p>;
  };

  return (
    <div className="bg-[#f4f3f0] min-h-screen px-6 py-10">
      {/* Header Card */}
      <div className="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-md w-full max-w-5xl mx-auto">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
            <div className="flex gap-2 mt-2">
            
                <span className="bg-gray-200 text-sm px-2 py-1 rounded">{job.job_type}</span>
        
            </div>
            <p className="text-gray-600 text-sm mt-2">
              <span className="font-semibold">{job.company.company_name}</span> - {job.area}, {job.city}, {job.location}
            </p>
            <p className="text-gray-500 text-xs mt-1">{job.postedDate}</p>
          </div>
          <img
            src={job.company.logo}
            alt="Company Logo"
            className="w-10 h-10 object-cover"
          />
        </div>
        <Link to={`/ApplyJob/${job._id}`}>
          <button className="bg-[#6b5b4d] text-white px-5 py-2 rounded w-fit hover:opacity-90">
            Apply For Job
          </button>
        </Link>
      </div>

      {/* Job Details Card */}
      <div className="bg-white rounded-2xl p-6 shadow-md mt-6 w-full max-w-5xl mx-auto">
        <h3 className="text-lg font-semibold mb-4">Job Details</h3>
        <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-700">
          <p><span className="font-medium">Experience Needed:</span> {job.experience?.min} to {job.experience?.max} years</p>
          <p><span className="font-medium">Career Level:</span> {job.experience_level}</p>
          <p><span className="font-medium">Education Level:</span> {job.educationLevel || "Not Specified"}</p>
          <p><span className="font-medium">Salary: </span> 
            {job.salary} EGP
          </p>
          <p className="col-span-2"><span className="font-medium">Job Categories:</span> {job.category}</p>
        </div>

        {/* Skills */}
        {job.skills && job.skills.length > 0 && (
          <div className="mt-4">
            <p className="font-medium text-sm mb-2">Skills</p>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, i) => (
                <span key={i} className="bg-gray-200 px-3 py-1 rounded-full text-sm">{skill}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="bg-white rounded-2xl p-6 shadow-md mt-6 w-full max-w-5xl mx-auto space-y-6">
        {job.description && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Job Description</h3>
            <p className="text-sm text-gray-700 whitespace-pre-line">{job.description}</p>
          </div>
        )}

        {job.requirements && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Job Requirements</h3>
            {renderRequirements(job.requirements)}
          </div>
        )}

        {job.benefits && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Job Benefits</h3>
            <ul className="relative border-l-2 border-gray-300 pl-5 space-y-4">
              {Object.entries(job.benefits).map(([key, value], i) => (
                <li key={i} className="flex items-start gap-2 relative">
                  <span className="w-3 h-3 bg-gray-300 rounded-full absolute -left-[14px] top-[6px]"></span>
                  <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                  <span className="text-gray-600">{value ? "Provided" : "Not provided"}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
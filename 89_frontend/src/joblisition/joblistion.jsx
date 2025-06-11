import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import JobCard from '../jobcard/jobcard';
import { Link } from 'react-router-dom';
import axios from 'axios';

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    country: '',
    city: '',
    area: '',
    experience: '',
    career: '',
    type: '',
    category: '',
    date: '',
  });
  const [openFilters, setOpenFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 2;

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/v1/jobs');
        // Ensure each job has an ID and required properties
        const validJobs = response.data.data.filter(job => 
          job._id && job.title && job.location
        );
        setJobs(validJobs);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filterJobs = () => {
    return jobs.filter((job) => {
      // Skip jobs that don't have required properties
      if (!job.title || !job.location) return false;
      
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilters =
        (!filters.country || (job.location && job.location.toLowerCase() === filters.country.toLowerCase())) &&
        (!filters.city || (job.city && job.city.toLowerCase() === filters.city.toLowerCase())) &&
        (!filters.area || (job.area && job.area.toLowerCase() === filters.area.toLowerCase())) &&
        (!filters.experience || (
          job.experience &&
          ((filters.experience === "1-2 yrs" && job.experience.min <= 2 && job.experience.max >= 1) ||
          (filters.experience === "2-3 yrs" && job.experience.min <= 3 && job.experience.max >= 2) ||
          (filters.experience === "3-5 yrs" && job.experience.min <= 5 && job.experience.max >= 3))
        )) &&
        (!filters.career || (job.careerLevel && job.careerLevel.toLowerCase().includes(filters.career.toLowerCase()))) &&
        (!filters.type || (job.type && job.type.includes(filters.type))) &&
        (!filters.category || (job.category && job.category.toLowerCase() === filters.category.toLowerCase())) &&
        (!filters.date || (job.postedDate && job.postedDate.toLowerCase().includes(filters.date.toLowerCase())));
      return matchesSearch && matchesFilters;
    });
  };

  const filteredJobs = filterJobs();
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading jobs...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-[#F5F5F5] min-h-screen flex flex-col items-center px-2 md:px-6">
      {/* Search */}
      <div className="w-full max-w-[1440px] flex justify-center mt-4">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4d3b31]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FiSearch className="absolute top-2.5 right-3 text-gray-500" />
        </div>
      </div>

      {/* Filters & Job Listings */}
      <main className="max-w-[1440px] w-full flex flex-col md:flex-row gap-6 py-8">
        {/* Filters */}
        <div className="md:w-[280px]">
          <button
            className="md:hidden mb-3 w-full bg-[#4d3b31] text-white py-2 rounded-md"
            onClick={() => setOpenFilters(!openFilters)}
          >
            {openFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          <div
            className={`${
              openFilters ? 'block' : 'hidden'
            } md:block bg-white p-4 rounded-md shadow-md max-h-[400px] overflow-auto`}
          >
            {[
              { key: 'country', label: 'Country', options: ['Egypt'] },
              { key: 'city', label: 'City', options: ['Cairo', 'Giza', 'Alexandria', 'Mansoura'] },
              { key: 'area', label: 'Area', options: ['New Cairo', 'Nasr City', 'Dokki', 'Smouha', 'City Center'] },
              { key: 'experience', label: 'Years Of Experience', options: ['1-2 yrs', '2-3 yrs', '3-5 yrs'] },
              { key: 'career', label: 'Career Level', options: ['Entry', 'Junior', 'Mid', 'Senior'] },
              { key: 'type', label: 'Job Type', options: ['Full Time', 'Part Time', 'Remote', 'On-Site'] },
              { key: 'category', label: 'Job Categories', options: ['IT/Software Development', 'Marketing', 'Human Resources', 'Sales'] },
              { key: 'date', label: 'Date Posted', options: ['Today', '2 Days Ago', '3 Days Ago', '5 Days Ago', '1 Week Ago'] },
            ].map(({ key, label, options }) => (
              <div key={`filter-${key}`} className="mb-4">
                <label className="block text-sm font-semibold text-[#3F3F3F] mb-1">{label}</label>
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4d3b31]"
                  value={filters[key]}
                  onChange={(e) => handleFilterChange(key, e.target.value)}
                >
                  <option value="">Select {label}</option>
                  {options.map((opt) => (
                    <option key={`${key}-option-${opt}`} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Job Cards */}
        <div className="flex-1 space-y-4">
          {currentJobs.length === 0 ? (
            <p className="text-center text-gray-600">No jobs found.</p>
          ) : (
            currentJobs.map((job) => (
              <Link key={`job-${job._id || Math.random().toString(36).substring(2, 9)}`} to={`/JobDetails/${job._id}`}>
                <JobCard job={job} />
              </Link>
            ))
          )}

          {/* Pagination */}
          {filteredJobs.length > 0 && (
            <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 pt-4 text-sm">
              <span>
                Showing {indexOfFirstJob + 1}-{Math.min(indexOfLastJob, filteredJobs.length)} of {filteredJobs.length}
              </span>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <button
                      key={`page-${pageNumber}`}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`w-8 h-8 rounded border ${currentPage === pageNumber ? 'bg-gray-300' : ''}`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default JobListings;
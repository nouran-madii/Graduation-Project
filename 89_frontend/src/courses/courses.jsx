import React, { useState, useEffect } from 'react';
import { FaYoutube, FaGraduationCap } from 'react-icons/fa';
import { SiCoursera } from 'react-icons/si';
import home from '../assets/home1.jpg';
import img1 from '../assets/HTML.jpg';
import img2 from '../assets/CSS.jpg';
import img3 from '../assets/Bootstrap.jpg';
import img4 from '../assets/React.jpg';
import img5 from '../assets/JS.jpg';
import { FiSearch } from 'react-icons/fi';
import { BsFilter } from "react-icons/bs";
import axios from 'axios'; // Make sure to install axios

const filters = [
  { name: "HTML", image: img1 },
  { name: "CSS", image: img2 },
  { name: "JS", image: img5 },
  { name: "BootStrap", image: img3 },
  { name: "React.JS", image: img4 },
];

const platformIcon = {
  youtube: <FaYoutube className="text-red-600" />,
  coursera: <SiCoursera className="text-blue-600" />,
  udemy: <FaGraduationCap className="text-purple-700" />,
};

const CoursesPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [coursesData, setCoursesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/v1/courses'); // Replace with your API endpoint
        setCoursesData(response.data.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setCoursesData([]); // Fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []); // Empty dependency array means this runs once on mount

  // Filter courses based on category and search term
  const filteredCourses = coursesData.filter((course) => {
    const matchesCategory = selectedFilter ? course.category === selectedFilter : true;
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="bg-[#f5f5f5] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Loading courses...</p>
          {/* You could add a spinner here */}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#f5f5f5] min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p className="text-lg">Error loading courses: {error}</p>
          <p className="text-sm">Showing static data instead</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f5f5] min-h-screen font-sans">
      {/* Header Image */}
      <div className="w-full h-72 bg-gray-200 flex items-center justify-center">
        <img
          src={home}
          alt="Course Header"
          className="h-full object-cover w-full"
        />
      </div>

      {/* Roadmap Title */}
      <div className="text-center py-6">
        <h1 className="text-[24px] font-medium text-[#2E2E2E]">Roadmap</h1>
        <p className="text-sm text-gray-500 mt-1">Clear Path To Success And Growth</p>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-3 flex-wrap mb-4">
        {filters.map((filter) => (
          <button
            key={filter.name}
            onClick={() => setSelectedFilter(filter.name)}
            className={`w-[200px] h-[160px] rounded overflow-hidden relative shadow-md border-2 ${
              selectedFilter === filter.name ? "border-[#4d3b31]" : "border-transparent"
            }`}
          >
            <img
              src={filter.image}
              alt={filter.name}
              className="absolute inset-0 w-full h-full object-cover "
            />
            <span className="absolute inset-0 flex items-center justify-center font-bold text-white text-lg">
              {filter.name}
            </span>
          </button>
        ))}
      </div>

      {/* More Skills link */}
      <div className="text-center mb-6">
        <a href="#" className="text-[13px] text-[#4d3b31] font-semibold underline">
          For More Skills
        </a>
      </div>

      {/* HTML Courses Title & Search */}
      <div className="px-6 mb-4 flex items-center justify-center">
        <div className="text-center flex flex-col gap-5 justify-center items-center mt-10 mb-6">
          <h2 className="text-2xl font-semibold text-[#2E2E2E]">
            {selectedFilter || "All"} Courses
          </h2>
          <div className="flex justify-center">
            <div className="relative w-[270px]">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2 rounded-[10px] border border-gray-300 focus:outline-none"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <BsFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-lg cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 pb-16">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div key={course.id} className="w-[246px] h-[auto] rounded-[10px] border border-black/30 p-4 shadow bg-white flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold mb-2">{course.name}</h3>
                <div className="flex justify-between text-sm mb-1">
                
                </div>

                {/* Skills as badges */}
                <div className="flex flex-wrap gap-2 my-3">
                  {course.skills_taught.map((skill, index) => (
                    <span key={index} className="bg-gray-200 text-black px-2 py-1 rounded text-xs font-semibold">
                      {skill.name}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400">


                  {platformIcon[course.platform]}
                </div>
              </div>

              <a href={course.link} className="text-center" target="_blank" rel="noopener noreferrer">
                <button className="text-[#3A2E2E] font-bold underline mt-4 text-sm">Click Here</button>
              </a>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">No courses found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;

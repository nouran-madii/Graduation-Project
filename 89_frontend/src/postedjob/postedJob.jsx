// AppliedJobsPage.jsx
import React, { useState } from 'react';
import c3 from '../assets/hastory.jpg';
import c1 from '../assets/c1.jpg';
import c2 from '../assets/c2.jpg';
import c4 from '../assets/c4.jpg';
import CardJob from '../postedjob/cardjob';
import { useNavigate } from 'react-router-dom';

const jobs = [
  {
    title: 'Mid-Level UI/UX Designer',
    company: 'Tenjaz',
    location: 'New Cairo, Cairo, Egypt',
    type: 'Full Time',
    mode: 'On-site',
    posted: '2 Days Ago',
    skills: 'Adobe Xd , Figma , Illustrator , Html , Css',
    salary: '4-6K',
    logo:<svg width="80" height="57" viewBox="0 0 80 57" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <rect x="0.5" y="0.5" width="79" height="56" rx="9.5" fill="url(#pattern0_888_261)"/>
    <rect x="0.5" y="0.5" width="79" height="56" rx="9.5" stroke="#E7E7E7"/>
    <defs>
    <pattern id="pattern0_888_261" patternContentUnits="objectBoundingBox" width="1" height="1">
    <use xlink:href="#image0_888_261" transform="matrix(0.003125 0 0 0.00438596 0 -0.201754)"/>
    </pattern>
    <image id="image0_888_261" width="320" height="320" preserveAspectRatio="none" xlink:href="data:image/jpeg;base64,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"/>
    </defs>
    </svg>
    ,
  },
  {
    title: 'Back End Developer',
    company: 'Tenjaz',
    location: 'New Cairo, Cairo, Egypt',
    type: 'Full Time',
    mode: 'Online',
    posted: '2 Days Ago',
    skills: 'Golang , API , GraphQL',
    salary: '6-9K',
    logo: c4,
  },
];

const suggestions = [
  { title: 'Software Testing', image: c1 },
  { title: 'Back-End', image: c2},
  { title: 'UI UX', image:c3},
  { title: 'Front-End', image:c4},
];


export default function AddedJobsPage() {
  const [jobList, setJobList] = useState(jobs);
  const navigate = useNavigate();

  const handleEdit = (job) => {
    // Navigate to add job page for editing (pass job data via state)
    navigate('/addedjob', { state: { job } });
  };

  const handleDelete = (job) => {
    // Remove job from list (in real app, also delete from backend)
    setJobList(prev => {
      const updated = prev.filter(j => j !== job);
      localStorage.setItem('postedJobs', JSON.stringify(updated));
      return updated;
    });
  };

  // On mount, load jobs from localStorage if available
  React.useEffect(() => {
    const stored = localStorage.getItem('postedJobs');
    if (stored) {
      setJobList(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="bg-[#F3F3F3] text-[#1a1a1a]">
      <div className="relative  w-full h-[340px] bg-cover  flex justify-center items-center  bgHistory" >
  <div className="absolute z-0 inset-0 bg-black bg-opacity-40"></div>

 
  <div className="flex justify-center w-full">
  <div className="relative w-1/3">
    <input
      type="text"
      placeholder="Search"
      className="py-2 pl-10 pr-4 w-full z-10 rounded-full bg-white shadow text-sm"
    />
    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
      </svg>
    </div>
  </div>
</div>

</div>

      {/* Date */}
      <div className="flex items-center my-4">
          <hr className="flex-grow border border-gray-300" />
          <span className="px-3 text-[#4c3f35] text-sm">27/1/2025</span>
          <hr className="flex-grow border border-gray-300" />
        </div>

      {/* Job Cards */}
      <div className="max-w-5xl mx-auto space-y-6 px-4">
        {jobList.map((job, index) => (
          <CardJob job={job} index={index} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>

      {/* Suggested Jobs */}
      <div className="text-center text-sm underline text-[#514232] mt-16">You Can Apply For More Other Jobs Offers Like</div>
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 my-8 px-4">
        {suggestions.map((s, i) => (
          <div key={i} className="rounded  h-52  overflow-hidden relative shadow">
            <img src={s.image} alt={s.title} className="w-full z-0 absolute top-0 left-0 h-full object-cover" />
            <div className="p-2 z-30 absolute text-white bottom-0 left-0 text-center font-medium">{s.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

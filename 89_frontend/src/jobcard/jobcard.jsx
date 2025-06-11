import React from 'react'
import cs from '../assets/about1.jpg';

const JobCard = ({job}) => {
  return (
     <div key={job.id} className="bg-white my-2 rounded-[20px] shadow border p-6 flex items-center justify-between">
                <div className="space-y-2 max-w-[70%]">
                  <h3 className="text-lg font-semibold text-[#3F3F3F]">{job.title}</h3>
                  <p className="text-sm text-gray-600">{`${job.area}, ${job.city}, ${job.location}`}</p>
                  <div className="flex gap-2 text-xs mt-1">
                
                      <span className="bg-[#EDEDED] text-[#3F3F3F] px-2 py-1 rounded">{job.
job_type}</span>
                
                  </div>
                  <p className="text-xs text-gray-500">{job.postedDate}</p>
                  <p className="text-sm mt-1 text-[#3F3F3F] leading-snug">
                    {job.description}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="text-sm text-[#3F3F3F] font-semibold">
                    {job.salary} EGP
                  </p>
                  <img src={cs} alt="Company Logo" className="w-[60px] h-[60px] object-contain" />
                </div>
              </div>
  )
}

export default JobCard
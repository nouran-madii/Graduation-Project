import React, { useState } from 'react'

const CardJob = ({ job, onEdit, onDelete, onDraft }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative bg-white w-2/3 rounded-lg shadow p-6 flex justify-between">
      {/* 3 dots menu */}
      <div
        className="absolute top-2 right-3 cursor-pointer text-gray-400"
        onClick={() => setShowMenu(!showMenu)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
          className="w-5 h-5"
        >
          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>

        {showMenu && (
          <div
            className="menu"
            style={{
              position: 'absolute',
              top: '30px',
              right: '10px',
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              zIndex: 1000,
            }}
          >
            <button onClick={() => onEdit(job)} style={{ display: 'block', width: '100%' }}>
              Edit
            </button>
            <button onClick={() => onDraft(job)} style={{ display: 'block', width: '100%' }}>
              Draft
            </button>
            {/* ✅ pass job._id */}
            <button
              onClick={() => onDelete(job._id)}
              style={{ display: 'block', width: '100%', marginTop: '5px' }}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <div>
        <h2 className="font-semibold">{job.title}</h2>
        <p className="text-sm text-gray-600">
          {job.company} - {job.location}
        </p>
        <div className="flex items-center gap-2 text-xs mt-2">
          <span className="border px-2 py-0.5 rounded">{job.type}</span>
          <span className="border px-2 py-0.5 rounded">{job.mode}</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">{job.posted}</p>

        <p className="text-sm mt-2">
          {Array.isArray(job.skills) ? job.skills.join(', ') : job.skills}
        </p>
      </div>

      <div className="text-right mt-10">
        <p className="font-bold text-sm">
          Salary{' '}
          {typeof job.salary === 'object' ? JSON.stringify(job.salary) : job.salary}
        </p>
      </div>
    </div>
  );
};

export default CardJob;

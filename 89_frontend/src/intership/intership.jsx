import React from "react";

const InternshipPostForm = () => {
  return (
    <div className="min-h-screen bg-[#f1efec] flex items-start justify-center py-10 px-4">
      <div className="shadow-md border-2 p-10 rounded-md w-full max-w-5xl">
        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-medium mb-1">Internship Title</label>
            <input
              type="text"
              placeholder="Enter Your Company Name"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Internship Description</label>
            <input
              type="text"
              placeholder="Company Email"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="mb-6">
          <label className="block font-medium mb-1">Requirements</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        {/* Row 3: Employment Type & Location */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-medium mb-2">Employment Type</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input type="radio" name="employmentType" />
                Full Time
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="employmentType" />
                Part Time
              </label>
            </div>
          </div>
          <div>
            <label className="block font-medium mb-2">Internship Location</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input type="radio" name="internshipLocation" />
                On Site
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="internshipLocation" />
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
            <select className="w-full border border-gray-300 rounded-md px-4 py-2">
              <option>Select City</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Area</label>
            <select className="w-full border border-gray-300 rounded-md px-4 py-2">
              <option>Select Area</option>
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
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Location</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
        </div>
        <div className="h-px bg-black my-6" />

        {/* Row 6: Experience Level, Contact Info */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-medium mb-1">Experience Level</label>
            <select className="w-full border border-gray-300 rounded-md px-4 py-2">
              <option>Select Experience</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Contact Information</label>
            <input
              type="text"
              placeholder="Phone Number / Email"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
        </div>

        {/* Row 7: Internship Category, Website */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-medium mb-1">Internship Category</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Company Website</label>
            <input
              type="text"
              placeholder="URL"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
        </div>

        {/* Row 8: Deadline */}
        <div className="mb-6">
          <label className="block font-medium mb-1">Application Deadline</label>
          <div className="grid grid-cols-3 gap-4">
            <select className="border border-gray-300 rounded-md px-4 py-2">
              <option>Day</option>
            </select>
            <select className="border border-gray-300 rounded-md px-4 py-2">
              <option>Month</option>
            </select>
            <select className="border border-gray-300 rounded-md px-4 py-2">
              <option>Year</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button className="px-6 py-2 border border-gray-400 rounded-md text-gray-700">
            Draft
          </button>
          <button className="px-6 py-2 bg-[#6e5c4f] text-white rounded-md">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default InternshipPostForm;

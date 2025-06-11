import { useState } from "react";
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";

export default function Filter() {
  const [tripType, setTripType] = useState("return");

  return (
    <div className="bg-white rounded-xl shadow-zinc-500  shadow-[0_4px_8px_rgba(0,0,0,0.1)] p-6 md:p-8 max-w-5xl mx-auto mt-10 relative z-10">
      {/* Trip Type */}
      <div className="flex gap-8 mb-6">
        {[
          { label: "Return", value: "return" },
          { label: "One-Way", value: "one-way" },
          { label: "Multi-City", value: "multi-city" },
        ].map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 cursor-pointer text-gray-700"
          >
            <input
              type="radio"
              name="tripType"
              value={option.value}
              checked={tripType === option.value}
              onChange={() => setTripType(option.value)}
              className="accent-black w-4 h-4"
            />
            <span className="text-sm md:text-base">{option.label}</span>
          </label>
        ))}
      </div>

      {/* From - To - Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* From */}
        <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 w-full">
          <FaPlaneDeparture className="mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="From"
            className="w-full outline-none placeholder-gray-500"
          />
        </div>

        {/* To */}
        <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 w-full">
          <FaPlaneArrival className="mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="To"
            className="w-full outline-none placeholder-gray-500"
          />
        </div>

        {/* Button */}
        <button className="bg-sky-400 whitespace-nowrap hover:bg-sky-500 text-white px-6 py-3 rounded-md w-full md:w-auto">
          Search flights
        </button>
      </div>
    </div>
  );
}
// HelpCenter.jsx
import React from "react";

const helpTopics = [
  {
    title: "Account Issues",
    description:
      "Learn how to reset your password, update your email, and manage your profile.",
  },
  {
    title: "Job Search Help",
    description:
      "Tips for finding jobs based on your skills and applying successfully.",
  },
  {
    title: "Skill Roadmap",
    description:
      "Understand how to follow your learning path and add new skills.",
  },
  {
    title: "Courses",
    description: "Find out how to access, track, and complete your courses.",
  },
  {
    title: "Technical Support",
    description:
      "Report bugs or get help with technical problems on the platform.",
  },
  {
    title: "Contact Us",
    description: "Need more help? Reach out to our support team.",
  },
];

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-[#F1F1EF] py-10 px-4 sm:px-10">
      <h1 className="text-5xl md:text-6xl text-[#514232] font-bold text-center mb-10">
        Help Center
      </h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {helpTopics.map((topic, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition duration-300"
          >
            <h2 className="text-xl font-semibold text-[#514232] mb-2">
              {topic.title}
            </h2>
            <p className="text-[#514232]">{topic.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpCenter;

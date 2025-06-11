import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const skillsByMajor = {
  Frontend: ["HTML", "CSS", "JavaScript", "React"],
  Backend: ["Node.js", "Express", "MongoDB"],
  "UI/UX": ["Figma", "Wireframes", "Prototyping"],
};

const languageSuggestions = ["Arabic", "English", "French", "German"];

const AddSkillsAfterLogin = () => {
  const [selectedMajor, setSelectedMajor] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [languageInput, setLanguageInput] = useState('');
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [withSkills, setWithSkills] = useState(true);
  const [withoutSkills, setWithoutSkills] = useState(false);
  const [moreSkills, setMoreSkills] = useState(false);

  const navigate = useNavigate();

  const handleWithSkillsChange = (checked) => {
    setWithSkills(checked);
    if (checked) {
      setWithoutSkills(false);
      setMoreSkills(false);
    }
  };

  const handleWithoutSkillsChange = (checked) => {
    if (checked) {
      setWithSkills(false);
      setWithoutSkills(true);
      setMoreSkills(false);
      navigate('/courses');
    }
  };

  const handleMoreSkillsChange = (checked) => {
    if (checked) {
      setWithSkills(false);
      setWithoutSkills(false);
      setMoreSkills(true);
      navigate('/courses');
    }
  };

  const addSkill = (skill) => {
    const trimmedSkill = skill.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      setSkills([...skills, trimmedSkill]);
    }
    setSkillInput('');
  };

  const addLanguage = (lang) => {
    const trimmedLang = lang.trim();
    if (trimmedLang && !languages.includes(trimmedLang)) {
      setLanguages([...languages, trimmedLang]);
    }
    setLanguageInput('');
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const removeLanguage = (langToRemove) => {
    setLanguages(languages.filter((lang) => lang !== langToRemove));
  };

  const handleNext = () => {
    navigate('/JobListings');
  };

  const filteredSkillSuggestions = skillsByMajor[selectedMajor]?.filter(
    (skill) => !skills.includes(skill)
  );

  const filteredLanguageSuggestions = languageSuggestions.filter(
    (lang) => !languages.includes(lang)
  );

  return (
    <div className="min-h-screen bg-[#eae8e3] px-4 py-6 md:px-8 md:py-8 flex flex-col items-center">
      <div className="w-full max-w-[1120px] flex flex-col md:flex-row gap-8">
        {/* الجانب الأيسر - اختيار الميجور والـ checkboxes */}
        <div className="md:w-1/4 w-full bg-white rounded shadow-md p-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Select your Major</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4d3b31]"
            value={selectedMajor}
            onChange={(e) => setSelectedMajor(e.target.value)}
          >
            <option value="">-- Select Major --</option>
            {Object.keys(skillsByMajor).map((major) => (
              <option key={major} value={major}>
                {major}
              </option>
            ))}
          </select>

          <div className="space-y-4 pt-6">
            <div className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="accent-[#4d3b31]"
                checked={withSkills}
                onChange={(e) => handleWithSkillsChange(e.target.checked)}
                id="withSkills"
              />
              <label htmlFor="withSkills" className="text-sm text-gray-700 select-none">
                With Skills
              </label>
            </div>

            <div className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="accent-[#4d3b31]"
                checked={withoutSkills}
                onChange={(e) => handleWithoutSkillsChange(e.target.checked)}
                id="withoutSkills"
              />
              <label htmlFor="withoutSkills" className="text-sm text-gray-700 select-none">
                Without Skills
              </label>
            </div>

            <div className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="accent-[#4d3b31]"
                checked={moreSkills}
                onChange={(e) => handleMoreSkillsChange(e.target.checked)}
                id="moreSkills"
              />
              <label htmlFor="moreSkills" className="text-sm text-gray-700 select-none">
                More Skills
              </label>
            </div>
          </div>
        </div>

        {/* الجانب الأيمن - إضافة السكيلز واللغات */}
        <div className="md:w-3/4 w-full flex flex-col gap-8">
          {/* Skills Section */}
          <div className="bg-white rounded shadow-md p-6">
            <label className="block text-sm font-semibold mb-3">Skills</label>
            <div className="flex flex-wrap gap-3 mb-4">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-200 px-3 py-1 rounded flex items-center gap-2 text-sm"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="text-[#4d3b31] hover:text-red-500 font-semibold"
                    aria-label={`Remove skill ${skill}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Add new skill"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addSkill(skillInput)}
                className="border border-gray-300 rounded px-3 py-2 text-sm flex-grow focus:outline-none focus:ring-2 focus:ring-[#4d3b31]"
              />
              <button
                onClick={() => addSkill(skillInput)}
                className="bg-[#4d3b31] text-white px-5 py-2 rounded text-sm hover:bg-[#3a2a24] transition"
              >
                Add
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {filteredSkillSuggestions?.map((skill) => (
                <button
                  key={skill}
                  onClick={() => addSkill(skill)}
                  className="bg-gray-100 border border-gray-300 px-3 py-1 rounded text-sm hover:bg-[#d1cfc7]"
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Languages Section */}
          <div className="bg-white rounded shadow-md p-6">
            <label className="block text-sm font-semibold mb-3">Languages</label>
            <div className="flex flex-wrap gap-3 mb-4">
              {languages.map((lang) => (
                <span
                  key={lang}
                  className="bg-gray-200 px-3 py-1 rounded flex items-center gap-2 text-sm"
                >
                  {lang}
                  <button
                    onClick={() => removeLanguage(lang)}
                    className="text-[#4d3b31] hover:text-red-500 font-semibold"
                    aria-label={`Remove language ${lang}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Add new language"
                value={languageInput}
                onChange={(e) => setLanguageInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addLanguage(languageInput)}
                className="border border-gray-300 rounded px-3 py-2 text-sm flex-grow focus:outline-none focus:ring-2 focus:ring-[#4d3b31]"
              />
              <button
                onClick={() => addLanguage(languageInput)}
                className="bg-[#4d3b31] text-white px-5 py-2 rounded text-sm hover:bg-[#3a2a24] transition"
              >
                Add
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {filteredLanguageSuggestions.map((lang) => (
                <button
                  key={lang}
                  onClick={() => addLanguage(lang)}
                  className="bg-gray-100 border border-gray-300 px-3 py-1 rounded text-sm hover:bg-[#d1cfc7]"
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <div className="text-right">
            <button
              onClick={handleNext}
              className="bg-[#4d3b31] text-white px-8 py-2 rounded text-sm hover:bg-[#3a2a24] transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSkillsAfterLogin;

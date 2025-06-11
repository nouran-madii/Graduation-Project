// src/pages/ApplyForm.jsx
import { UploadCloud } from 'lucide-react';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ApplyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobId: id,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    birth_date: '',
    birthMonth: '',
    birthYear: '',
    gender: '',
    city: '',
    area: '',
    graduation_date: '',
    university: '',
    degree: '',
    internship: '',
    expected_salary: '',
    cv: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate options for date selects
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const cities = ['Cairo', 'Giza', 'Alexandria', 'Mansoura'];
  const areas = {
    Cairo: ['New Cairo', 'Nasr City', 'Dokki', 'Maadi'],
    Giza: ['Dokki', 'Mohandessin', 'Haram'],
    Alexandria: ['Smouha', 'Miami', 'Sidi Gaber'],
    Mansoura: ['City Center', 'Gamaleya']
  };
  const universities = ['Cairo University', 'Ain Shams', 'Alexandria University', 'Mansoura University'];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.area) newErrors.area = 'Area is required';
    if (!formData.cv) newErrors.cv = 'CV is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      const formPayload = new FormData();
      
      // Add all form data except jobId (to avoid duplication)
      const { jobId, ...formDataWithoutJobId } = formData;
      Object.entries(formDataWithoutJobId).forEach(([key, value]) => {
        if (value) formPayload.append(key, value);
      });
      
      // Add jobId separately
      formPayload.append('jobId', id);
      
      const response = await axios.post('http://localhost:3000/api/v1/jobs/apply', formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      
      navigate('/', { state: { applicationId: response.data.id } });
    } catch (error) {
      console.error('Application error:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F4F3F1] min-h-screen flex items-center justify-center px-4 py-8">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl border p-10 rounded-[20px] shadow-sm space-y-8 bg-white">
        
        {/* Section 1: Name & Contact */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">First Name*</label>
            <input 
              type="text" 
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter Your First Name" 
              className={`w-full border ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-md px-3 py-2`} 
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Last Name*</label>
            <input 
              type="text" 
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter Your Last Name" 
              className={`w-full border ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-md px-3 py-2`} 
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Phone Number*</label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter Your Phone Number" 
              className={`w-full border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-md px-3 py-2`} 
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Email*</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your Email" 
              className={`w-full border ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-md px-3 py-2`} 
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
        </div>

        {/* Section 2: Birthdate & Gender */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Birthdate</label>
            <div className="flex gap-2">
              <select 
                name="birth_date"
                value={formData.birth_date}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-2 py-2 w-1/3"
              >
                <option value="">Day</option>
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
              <select 
                name="birthMonth"
                value={formData.birthMonth}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-2 py-2 w-1/3"
              >
                <option value="">Month</option>
                {months.map((month, i) => (
                  <option key={month} value={i + 1}>{month}</option>
                ))}
              </select>
              <select 
                name="birthYear"
                value={formData.birthYear}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-2 py-2 w-1/3"
              >
                <option value="">Year</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Gender*</label>
            <div className="flex items-center gap-6 mt-2">
              <label className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleChange}
                  className="accent-black" 
                />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleChange}
                  className="accent-black" 
                />
                Female
              </label>
            </div>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
          </div>
        </div>

        <hr className="border-t-[1.5px] border-black" />

        {/* Section 3: Location */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">City*</label>
            <select 
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full border ${errors.city ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-md px-3 py-2`}
            >
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Area*</label>
            <select 
              name="area"
              value={formData.area}
              onChange={handleChange}
              disabled={!formData.city}
              className={`w-full border ${errors.area ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-md px-3 py-2`}
            >
              <option value="">Select Area</option>
              {formData.city && areas[formData.city].map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
            {errors.area && <p className="text-red-500 text-xs mt-1">{errors.area}</p>}
          </div>
        </div>

        <hr className="border-t-[1.5px] border-black" />

        {/* Section 4: Education */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Graduation Date</label>
            <input 
              type="date" 
              name="graduation_date"
              value={formData.graduation_date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">University</label>
            <select 
              name="university"
              value={formData.university}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Select University</option>
              {universities.map(univ => (
                <option key={univ} value={univ}>{univ}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Degree</label>
            <input 
              type="text" 
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2" 
            />
          </div>
        </div>

        <hr className="border-t-[1.5px] border-black" />

        {/* Section 5: Salary & Experience */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Expected Salary</label>
            <input 
              type="text" 
              name="expected_salary"
              value={formData.expected_salary}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2" 
            />
          </div>
        </div>

        <hr className="border-t-[1.5px] border-black" />

        {/* Section 6: Upload CV */}
        <div>
          <label className="text-[#5E503F] text-lg font-semibold">Your CV*</label>
          <div className="relative">
            <input
              type="file"
              name="cv"
              onChange={handleChange}
              accept=".pdf,.doc,.docx"
              className="peer absolute inset-0 opacity-0 z-10 cursor-pointer"
            />
            <div className={`flex items-center justify-between w-full h-12 bg-[#F6F6F6] rounded-md px-4 border ${errors.cv ? 'border-red-500 bg-red-50' : 'border-gray-200'} pointer-events-none`}>
              <span className="text-gray-500 truncate">
                {formData.cv ? formData.cv.name : 'Upload your CV (PDF or DOC)'}
              </span>
              <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.9827 19.3333C23.9827 19.1933 23.9773 19.052 23.9307 18.912L21.264 10.912C21.0827 10.3667 20.5747 10 20 10H14.6667V12.6667H19.0387L21.2613 19.3333H2.73867L4.96133 12.6667H9.33333V10H4C3.42533 10 2.91733 10.3667 2.736 10.912L0.0693334 18.912C0.0226667 19.052 0.0173333 19.1933 0.0173333 19.3333C1.49012e-08 19.3333 0 26 0 26C0 26.7373 0.596 27.3333 1.33333 27.3333H22.6667C23.404 27.3333 24 26.7373 24 26C24 26 24 19.3333 23.9827 19.3333Z" fill="#A8A3A3"/>
                <path d="M17.3353 8.53867C17.6806 8.53867 18.0259 8.412 18.2779 8.16133C18.7979 7.64133 18.7979 6.796 18.2779 6.276L12.0019 0L5.72594 6.276C5.20594 6.796 5.20594 7.64133 5.72594 8.16133C5.97794 8.41333 6.32327 8.53867 6.6686 8.53867C7.01394 8.53867 7.35927 8.41333 7.61127 8.16133L10.6686 5.104V14C10.6686 14.736 11.2659 15.3333 12.0019 15.3333C12.7379 15.3333 13.3353 14.736 13.3353 14V5.104L16.3926 8.16133C16.6446 8.41333 16.9899 8.53867 17.3353 8.53867Z" fill="#A8A3A3"/>
              </svg> 
            </div>
          </div>
          {errors.cv && <p className="text-red-500 text-xs mt-1">{errors.cv}</p>}
        </div>

        {/* Button */}
        <div className="text-center pt-4">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`bg-[#776A5D] hover:bg-[#5e534a] text-white font-semibold px-8 py-2 rounded-md ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Submitting...' : 'Apply'}
          </button>
        </div>
      </form>
    </div>
  );
}
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Bell, X } from "lucide-react";

function Header() {
  const notifications = [
    {
      title: "New Job Posted: UI/UX Designer",
      time: "2 hours ago",
    },
    {
      title: "Your application was viewed",
      time: "Yesterday",
    },
    {
      title: "Reminder: Interview Tomorrow",
      time: "1 day ago",
    },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const [isopen, setisopen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [role, setRole] = useState('guest'); // guest | candidate | company
  const dropdownRef = useRef(null);

  // إغلاق الدروب داون عند الضغط خارج العنصر
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Detect user role from localStorage
    const storedRole = localStorage.getItem('role');
    setRole(storedRole || 'guest');
  }, []);

  // Log out function
  const handleLogout = () => {
    // Save any user data you want to keep here
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      localStorage.setItem('profileData', currentUser);
    }
    localStorage.removeItem('role');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    setRole('guest');
    setMenuOpen(false);
    window.location.href = '/';
  };

  // Guest Navbar
  if (role === 'guest') {
    return (
      <header className="bg-[#f2f0ed] shadow-sm font-museo relative z-50">
        <div className="max-w-[1440px] mx-auto px-7 py-1 flex items-center justify-between">
          {/* Navbar Links */}
          <nav className="hidden md:hidden lg:flex space-x-6 text-black text-sm font-manuale font-bold">
            <Link to="/" className='text-[#514232] font-sans'>Home</Link>
            <Link to="/about" className='font-sans'>About Us</Link>
            <Link to="/signUpForCompany" className='font-sans'>For Company</Link>
            
          </nav>
          {/* Logo */}
          <div className="text-center py-3 md:mx-20 lg:mx-20 w-[120px] md:flex-1 sm:flex-1 lg:flex-1">
            <Link to="/"><h1 className="text-[22px] whitespace-nowrap pb-3 lg:text-7xl sm:text-[48px] font-light text-[#514232] leading-tight">JOB HUB</h1></Link>
            <p className="text-[0.5rem] md:block lg:block md:text-base text-[#514232] tracking-wide border-t border-[#514232] pt-2 mt-1">For Fresh Graduates</p>
          </div>

          <div className='hidden md:hidden lg:flex space-x-6 px-5 text-black text-sm font-manuale font-bold'>
          {/* <Link to="/addjob" className='font-sans'>Add Job</Link> */}
          
          {/* Add Job Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="bg-[#B8B2A8] font-sans whitespace-nowrap text-white text-xs px-3 py-[2px] rounded"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Add Job
            </button>
            {dropdownOpen && (
              <div className="absolute top-[115%] right-0 bg-white border border-gray-200 shadow-md rounded-md py-2 w-32 text-sm text-[#514232] font-manuale">
                <Link
                  to="/intership"
                  className="block px-4 py-2 hover:bg-gray-100 font-sans"
                  onClick={() => setDropdownOpen(false)}
                >
                  Internship
                </Link>
                <Link
                  to="/addjob"
                  className="block px-4 py-2 hover:bg-gray-100 font-sans border-t border-gray-200"
                  onClick={() => setDropdownOpen(false)}
                >
                  Job
                </Link>
              </div>
            )}
          </div>
            <Link to="/login" className='font-sans'>Login</Link>
          </div>
          {/* Mobile Menu Toggle */}
          <button className="text-2xl text-[#514232]" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="absolute right-6 top-[60px] md:top-24 w-48 bg-[#b2a595] rounded-md shadow-md text-center py-2 z-40">
            <p className="font-manuale pb-2 font-bold">Menu</p>
            <Link to="/about" className="block py-1 font-sans border-t border-white">About Us</Link>
            <Link to="/contact" className="block py-1 font-sans border-t border-white">Contact Us</Link>
            <Link to="/help" className="block py-1 font-sans border-t border-white">Help Center</Link>
            <Link to="/signUp" className="block py-1 font-sans border-t border-white">Sign Up</Link>

            <Link to="/signUpForCompany" className="block lg:hidden py-1 font-sans border-t border-white">For Company</Link>
            <Link to="/login" className="block lg:hidden py-1 font-sans border-t border-white">Login</Link>

            {/* Add Job Dropdown */}
          <div className="relative block lg:hidden py-1 font-sans border-t border-white" ref={dropdownRef}>
            <button
              className="bg-[#B8B2A8] font-sans whitespace-nowrap text-white text-xs px-3 py-[2px] rounded"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Add Job
            </button>
            {dropdownOpen && (
              <div className="absolute top-[115%] right-0 bg-white border border-gray-200 shadow-md rounded-md py-2 w-32 text-sm text-[#514232] font-manuale">
                <Link
                  to="/intership"
                  className="block px-4 py-2 hover:bg-gray-100 font-sans"
                  onClick={() => setDropdownOpen(false)}
                >
                  Internship
                </Link>
                <Link
                  to="/addjob"
                  className="block px-4 py-2 hover:bg-gray-100 font-sans border-t border-gray-200"
                  onClick={() => setDropdownOpen(false)}
                >
                  Job
                </Link>
              </div>
            )}
          </div>
          </div>
        )}
      </header>
    );
  }

  // Company Navbar
  if (role === 'employer') {
    return (
      <header className="bg-[#f2f0ed] shadow-sm font-museo relative z-50">
        <div className="max-w-[1440px] mx-auto px-7 py-1 flex items-center justify-between">
          {/* Left Section: Home, Posted Internships, Add Job, Notification */}
          <div className="flex items-center space-x-8 lg:space-x-10">
            <Link to="/" className="text-[#514232] hidden lg:block font-sans font-bold text-base">Home</Link>
            <Link to="/addedjob" className="font-sans hidden lg:block font-bold text-base">Posted</Link>
            {/* <Link to="/addjob" className="font-sans font-bold text-base">Add Job</Link> */}

            {/* Add Job Dropdown */}
          <div className="relative hidden lg:block" ref={dropdownRef}>
            <button
              className="bg-[#B8B2A8] font-sans whitespace-nowrap text-white text-xs px-3 py-[2px] rounded"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Add Job
            </button>
            {dropdownOpen && (
              <div className="absolute top-[115%] right-0 bg-white border border-gray-200 shadow-md rounded-md py-2 w-32 text-sm text-[#514232] font-manuale">
                <Link
                  to="/intership"
                  className="block px-4 py-2 hover:bg-gray-100 font-sans"
                  onClick={() => setDropdownOpen(false)}
                >
                  Internship
                </Link>
                <Link
                  to="/addjob"
                  className="block px-4 py-2 hover:bg-gray-100 font-sans border-t border-gray-200"
                  onClick={() => setDropdownOpen(false)}
                >
                  Job
                </Link>
              </div>
            )}
          </div>
            <button className="relative" onClick={() => setisopen(true)}>
              <Bell size={28} className="text-[#514232]" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold border border-white">
                {notifications.length}
              </span>
            </button>
          </div>

          {/* Center: Logo and subtitle */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <Link to="/">
              <h1 className="text-[32px] lg:text-7xl font-light text-[#514232] leading-tight tracking-wide" style={{letterSpacing: '0.1em'}}>JOB HUB</h1>
            </Link>
            <p className="text-xs md:text-base text-[#514232] tracking-wide border-t border-[#514232] pt-1 mt-1 w-full text-center max-w-xs">For Fresh Graduates</p>
          </div>

          {/* Right Section: Drafts, Hamburger */}
          <div className="flex items-center space-x-8 lg:space-x-10">
            <Link to="/drafts" className="hidden lg:block font-sans font-bold text-base">Drafts</Link>
            <button className="text-2xl text-[#514232] font-manuale flex items-center" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Notifications Dropdown */}
        {isopen && (
          <div className="absolute left-1/2 md:left-52 lg:left-96 -translate-x-1/2 top-20 w-80 bg-white shadow-xl rounded-lg z-50 border border-gray-200">
            <div className="p-4 border-b font-manuale font-semibold flex justify-between text-gray-700"><p>Notifications</p> <X className='cursor-pointer' onClick={()=>setisopen(false)}/></div>
            <ul className="max-h-60 overflow-y-auto">
              {notifications.map((note, index) => (
                <li key={index} className="p-4 border-b font-manuale last:border-none hover:bg-gray-50">
                  <p className="text-sm font-medium">{note.title}</p>
                  <span className="text-xs text-gray-400">{note.time}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="absolute right-6 top-[60px] md:top-24 w-56 bg-[#b2a595] rounded-md shadow-md text-center py-2 z-40">
            <p className="font-manuale pb-2">Menu</p>
            <Link to="/help" className="block py-1 font-sans border-t border-white">Help Center</Link>
            <Link to="/contact" className="block py-1 font-sans border-t border-white">Contact Us</Link>
            <Link to="/Dashboard" className="block py-1 font-sans border-t border-white">Setting</Link>
            <Link to="/addedjob" className="block lg:hidden py-1 font-sans border-t border-white">Posted</Link>

            {/* Add Job Dropdown */}
          <div className="relative block lg:hidden py-1 font-sans border-t border-white" ref={dropdownRef}>
            <button
              className="bg-[#B8B2A8] font-sans whitespace-nowrap text-white text-xs px-3 py-[2px] rounded"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Add Job
            </button>
            {dropdownOpen && (
              <div className="absolute top-[115%] right-0 bg-white border border-gray-200 shadow-md rounded-md py-2 w-32 text-sm text-[#514232] font-manuale">
                <Link
                  to="/intership"
                  className="block px-4 py-2 hover:bg-gray-100 font-sans"
                  onClick={() => setDropdownOpen(false)}
                >
                  Internship
                </Link>
                <Link
                  to="/addjob"
                  className="block px-4 py-2 hover:bg-gray-100 font-sans border-t border-gray-200"
                  onClick={() => setDropdownOpen(false)}
                >
                  Job
                </Link>
              </div>
            )}
          </div>


            <Link to="/drafts" className="block lg:hidden py-1 font-sans border-t border-white">Drafts</Link>
            <button onClick={handleLogout} className="block w-full py-1 font-sans border-t border-white text-left px-4 text-[#514232]">Log Out</button>
          </div>
        )}
      </header>
    );
  }

  // Candidate (normal user) Navbar
  if (role === 'candidate' || role === 'job-seeker') {
    return (
      <header className="bg-[#f2f0ed] shadow-sm font-museo relative z-50">
        <div className="max-w-[1440px] mx-auto px-7 py-1 flex items-center justify-between">
          {/* Left Section: Home, History, Notification */}
          <div className="flex items-center space-x-8 lg:space-x-10">
            <Link to="/" className="text-[#514232] hidden lg:block font-sans font-bold text-base">Home</Link>
            <Link to="/AppliedJobsPage" className="hidden lg:block font-sans font-bold text-base">History</Link>
            <button className="relative hidden md:block" onClick={() => setisopen(true)}>
              <Bell size={28} className="text-[#514232]" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold border border-white">
                {notifications.length}
              </span>
            </button>
          </div>

          {/* Center: Logo and subtitle */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <Link to="/">
              <h1 className="text-[32px] lg:text-7xl font-light text-[#514232] leading-tight tracking-wide" style={{letterSpacing: '0.1em'}}>JOB HUB</h1>
            </Link>
            <p className="text-xs md:text-base text-[#514232] tracking-wide border-t border-[#514232] pt-1 mt-1 w-full text-center max-w-xs">For Fresh Graduates</p>
          </div>

          {/* Right Section: Search, Profile, Hamburger */}
          <div className="flex items-center gap-3 space-x-6">
            {/* Search Icon */}
            <Link to="/JobListings" className="text-[#514232]">
              <svg width="28" height="28" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.9141 18.2812C23.0859 16.4375 23.7734 14.25 23.7734 11.8984C23.7734 5.32813 18.4531 0 11.8906 0C5.32031 0 0 5.32813 0 11.8984C0 18.4688 5.32031 23.7969 11.8828 23.7969C14.2656 23.7969 16.4844 23.0938 18.3438 21.8906L18.8828 21.5156L27.3672 30L30 27.3203L21.5234 18.8359L21.9141 18.2812ZM18.5469 5.25C20.3203 7.02344 21.2969 9.38281 21.2969 11.8906C21.2969 14.3984 20.3203 16.7578 18.5469 18.5312C16.7734 20.3047 14.4141 21.2812 11.9062 21.2812C9.39844 21.2812 7.03906 20.3047 5.26562 18.5312C3.49219 16.7578 2.51562 14.3984 2.51562 11.8906C2.51562 9.38281 3.49219 7.02344 5.26562 5.25C7.03906 3.47656 9.39844 2.5 11.9062 2.5C14.4141 2.5 16.7734 3.47656 18.5469 5.25Z" fill="#514232" />
              </svg>
            </Link>
            {/* Profile Icon */}
            <Link to="/UserProfile" className="text-[#514232] hidden md:block">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_888_339)">
                  <path d="M27.0004 30H5.00036C4.7124 30.0037 4.42722 29.9433 4.16558 29.8229C3.90395 29.7026 3.67242 29.5254 3.48786 29.3044C3.08161 28.8187 2.91786 28.1556 3.03911 27.485C3.56661 24.5588 5.21286 22.1006 7.80036 20.375C10.0991 18.8431 13.011 18 16.0004 18C18.9897 18 21.9016 18.8438 24.2004 20.375C26.7879 22.1 28.4341 24.5581 28.9616 27.4844C29.0829 28.155 28.9191 28.8181 28.5129 29.3037C28.3284 29.5249 28.0969 29.7022 27.8352 29.8226C27.5736 29.9431 27.2884 30.0037 27.0004 30Z" fill="#514232" />
                  <path d="M20.7901 4.03625C19.5738 2.72313 17.8751 2 16.0001 2C14.1151 2 12.4107 2.71875 11.2001 4.02375C9.97631 5.34312 9.38006 7.13625 9.52006 9.0725C9.79756 12.8925 12.7044 16 16.0001 16C19.2957 16 22.1976 12.8931 22.4794 9.07375C22.6213 7.155 22.0213 5.36563 20.7901 4.03625Z" fill="#514232" />
                </g>
                <defs>
                  <clipPath id="clip0_888_339">
                    <rect width="32" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
            {/* Hamburger Menu */}
            <button className="text-2xl text-[#514232]" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Notifications Dropdown */}
        {isopen && (
          <div className="absolute md:left-52 lg:left-96 -translate-x-1/2 top-20 w-80 bg-white shadow-xl rounded-lg z-50 border border-gray-200">
            <div className="p-4 border-b font-manuale font-semibold flex justify-between text-gray-700"><p>Notifications</p> <X className='cursor-pointer' onClick={()=>setisopen(false)}/></div>
            <ul className="max-h-60 overflow-y-auto">
              {notifications.map((note, index) => (
                <li key={index} className="p-4 border-b font-manuale last:border-none hover:bg-gray-50">
                  <p className="text-sm font-medium">{note.title}</p>
                  <span className="text-xs text-gray-400">{note.time}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="absolute right-6 top-[60px] md:top-24 w-56 bg-[#b2a595] rounded-md shadow-md text-center py-2 z-40">
            <p className="font-manuale pb-2 font-bold">Menu</p>
            <Link to="/help" className="block py-1 font-sans border-t border-white">Help Center</Link>
            <Link to="/contact" className="block py-1 font-sans border-t border-white">Contact Us</Link>
            <Link to="/AppliedJobsPage" className="block lg:hidden py-1 font-sans border-t border-white">History</Link>
            <Link to="/UserProfile" className="block lg:hidden py-1 font-sans border-t border-white">Profile</Link>

            <button onClick={handleLogout} className="block w-full py-1 font-sans border-t border-white text-left px-4 text-[#514232]">Log Out</button>
          </div>
        )}
      </header>
    );
  }

  // Candidate (normal user) Navbar
  if (role === 'candidate' || role === 'user') {
    return (
      <header className="bg-[#f2f0ed] shadow-sm font-museo relative z-50">
        <div className="max-w-[1440px] mx-auto px-7 py-1 flex items-center justify-between">
          {/* Left Section: Home, History, Notification */}
          <div className="flex items-center space-x-8 lg:space-x-10">
            <Link to="/" className="text-[#514232] font-sans font-bold text-base">Home</Link>
            <Link to="/AppliedJobsPage" className="font-sans font-bold text-base">History</Link>
            <button className="relative" onClick={() => setisopen(true)}>
              <Bell size={28} className="text-[#514232]" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold border border-white">
                {notifications.length}
              </span>
            </button>
          </div>

          {/* Center: Logo and subtitle */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <Link to="/">
              <h1 className="text-[32px] lg:text-7xl font-light text-[#514232] leading-tight tracking-wide" style={{letterSpacing: '0.1em'}}>JOB HUB</h1>
            </Link>
            <p className="text-xs md:text-base text-[#514232] tracking-wide border-t border-[#514232] pt-1 mt-1 w-full text-center max-w-xs">For Fresh Graduates</p>
          </div>

          {/* Right Section: Search, Profile, Hamburger */}
          <div className="flex items-center space-x-6">
            {/* Search Icon */}
            <Link to="/JobListings" className="text-[#514232]">
              <svg width="28" height="28" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.9141 18.2812C23.0859 16.4375 23.7734 14.25 23.7734 11.8984C23.7734 5.32813 18.4531 0 11.8906 0C5.32031 0 0 5.32813 0 11.8984C0 18.4688 5.32031 23.7969 11.8828 23.7969C14.2656 23.7969 16.4844 23.0938 18.3438 21.8906L18.8828 21.5156L27.3672 30L30 27.3203L21.5234 18.8359L21.9141 18.2812ZM18.5469 5.25C20.3203 7.02344 21.2969 9.38281 21.2969 11.8906C21.2969 14.3984 20.3203 16.7578 18.5469 18.5312C16.7734 20.3047 14.4141 21.2812 11.9062 21.2812C9.39844 21.2812 7.03906 20.3047 5.26562 18.5312C3.49219 16.7578 2.51562 14.3984 2.51562 11.8906C2.51562 9.38281 3.49219 7.02344 5.26562 5.25C7.03906 3.47656 9.39844 2.5 11.9062 2.5C14.4141 2.5 16.7734 3.47656 18.5469 5.25Z" fill="#514232" />
              </svg>
            </Link>
            {/* Profile Icon */}
            <Link to="/UserProfile" className="text-[#514232]">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_888_339)">
                  <path d="M27.0004 30H5.00036C4.7124 30.0037 4.42722 29.9433 4.16558 29.8229C3.90395 29.7026 3.67242 29.5254 3.48786 29.3044C3.08161 28.8187 2.91786 28.1556 3.03911 27.485C3.56661 24.5588 5.21286 22.1006 7.80036 20.375C10.0991 18.8431 13.011 18 16.0004 18C18.9897 18 21.9016 18.8438 24.2004 20.375C26.7879 22.1 28.4341 24.5581 28.9616 27.4844C29.0829 28.155 28.9191 28.8181 28.5129 29.3037C28.3284 29.5249 28.0969 29.7022 27.8352 29.8226C27.5736 29.9431 27.2884 30.0037 27.0004 30Z" fill="#514232" />
                  <path d="M20.7901 4.03625C19.5738 2.72313 17.8751 2 16.0001 2C14.1151 2 12.4107 2.71875 11.2001 4.02375C9.97631 5.34312 9.38006 7.13625 9.52006 9.0725C9.79756 12.8925 12.7044 16 16.0001 16C19.2957 16 22.1976 12.8931 22.4794 9.07375C22.6213 7.155 22.0213 5.36563 20.7901 4.03625Z" fill="#514232" />
                </g>
                <defs>
                  <clipPath id="clip0_888_339">
                    <rect width="32" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
            {/* Hamburger Menu */}
            <button className="text-2xl text-[#514232]" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Notifications Dropdown */}
        {isopen && (
          <div className="absolute left-1/2 -translate-x-1/2 top-20 w-80 bg-white shadow-xl rounded-lg z-50 border border-gray-200">
            <div className="p-4 border-b font-manuale font-semibold flex justify-between text-gray-700"><p>Notifications</p> <X className='cursor-pointer' onClick={()=>setisopen(false)}/></div>
            <ul className="max-h-60 overflow-y-auto">
              {notifications.map((note, index) => (
                <li key={index} className="p-4 border-b font-manuale last:border-none hover:bg-gray-50">
                  <p className="text-sm font-medium">{note.title}</p>
                  <span className="text-xs text-gray-400">{note.time}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="absolute right-6 top-[60px] md:top-24 w-56 bg-[#b2a595] rounded-md shadow-md text-center py-2 z-40">
            <p className="font-manuale pb-2 font-bold">Menu</p>
            <Link to="/help" className="block py-1 font-sans border-t border-white">Help Center</Link>
            <Link to="/contact" className="block py-1 font-sans border-t border-white">Contact Us</Link>
            <Link to="/Dashboard" className="block py-1 font-sans border-t border-white">Dashboard</Link>
            <button onClick={handleLogout} className="block w-full py-1 font-sans border-t border-white text-left px-4 text-[#514232]">Log Out</button>
          </div>
        )}
      </header>
    );
  }

  // Candidate (normal user) Navbar
  if (role === 'candidate' || role === 'user') {
    return (
      <header className="bg-[#f2f0ed] shadow-sm font-museo relative z-50">
        <div className="max-w-[1440px] mx-auto px-7 py-1 flex items-center justify-between">
          {/* Left Section: Home, History, Notification */}
          <div className="flex items-center space-x-8 lg:space-x-10">
            <Link to="/" className="text-[#514232] font-sans font-bold text-base">Home</Link>
            <Link to="/AppliedJobsPage" className="font-sans font-bold text-base">History</Link>
            <button className="relative" onClick={() => setisopen(true)}>
              <Bell size={28} className="text-[#514232]" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold border border-white">
                {notifications.length}
              </span>
            </button>
          </div>

          {/* Center: Logo and subtitle */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <Link to="/">
              <h1 className="text-[32px] lg:text-7xl font-light text-[#514232] leading-tight tracking-wide" style={{letterSpacing: '0.1em'}}>JOB HUB</h1>
            </Link>
            <p className="text-xs md:text-base text-[#514232] tracking-wide border-t border-[#514232] pt-1 mt-1 w-full text-center max-w-xs">For Fresh Graduates</p>
          </div>

          {/* Right Section: Search, Profile, Hamburger */}
          <div className="flex items-center space-x-6">
            {/* Search Icon */}
            <Link to="/JobListings" className="text-[#514232]">
              <svg width="28" height="28" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.9141 18.2812C23.0859 16.4375 23.7734 14.25 23.7734 11.8984C23.7734 5.32813 18.4531 0 11.8906 0C5.32031 0 0 5.32813 0 11.8984C0 18.4688 5.32031 23.7969 11.8828 23.7969C14.2656 23.7969 16.4844 23.0938 18.3438 21.8906L18.8828 21.5156L27.3672 30L30 27.3203L21.5234 18.8359L21.9141 18.2812ZM18.5469 5.25C20.3203 7.02344 21.2969 9.38281 21.2969 11.8906C21.2969 14.3984 20.3203 16.7578 18.5469 18.5312C16.7734 20.3047 14.4141 21.2812 11.9062 21.2812C9.39844 21.2812 7.03906 20.3047 5.26562 18.5312C3.49219 16.7578 2.51562 14.3984 2.51562 11.8906C2.51562 9.38281 3.49219 7.02344 5.26562 5.25C7.03906 3.47656 9.39844 2.5 11.9062 2.5C14.4141 2.5 16.7734 3.47656 18.5469 5.25Z" fill="#514232" />
              </svg>
            </Link>
            {/* Profile Icon */}
            <Link to="/UserProfile" className="text-[#514232]">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_888_339)">
                  <path d="M27.0004 30H5.00036C4.7124 30.0037 4.42722 29.9433 4.16558 29.8229C3.90395 29.7026 3.67242 29.5254 3.48786 29.3044C3.08161 28.8187 2.91786 28.1556 3.03911 27.485C3.56661 24.5588 5.21286 22.1006 7.80036 20.375C10.0991 18.8431 13.011 18 16.0004 18C18.9897 18 21.9016 18.8438 24.2004 20.375C26.7879 22.1 28.4341 24.5581 28.9616 27.4844C29.0829 28.155 28.9191 28.8181 28.5129 29.3037C28.3284 29.5249 28.0969 29.7022 27.8352 29.8226C27.5736 29.9431 27.2884 30.0037 27.0004 30Z" fill="#514232" />
                  <path d="M20.7901 4.03625C19.5738 2.72313 17.8751 2 16.0001 2C14.1151 2 12.4107 2.71875 11.2001 4.02375C9.97631 5.34312 9.38006 7.13625 9.52006 9.0725C9.79756 12.8925 12.7044 16 16.0001 16C19.2957 16 22.1976 12.8931 22.4794 9.07375C22.6213 7.155 22.0213 5.36563 20.7901 4.03625Z" fill="#514232" />
                </g>
                <defs>
                  <clipPath id="clip0_888_339">
                    <rect width="32" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
            {/* Hamburger Menu */}
            <button className="text-2xl text-[#514232]" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Notifications Dropdown */}
        {isopen && (
          <div className="absolute left-1/2 -translate-x-1/2 top-20 w-80 bg-white shadow-xl rounded-lg z-50 border border-gray-200">
            <div className="p-4 border-b font-manuale font-semibold flex justify-between text-gray-700"><p>Notifications</p> <X className='cursor-pointer' onClick={()=>setisopen(false)}/></div>
            <ul className="max-h-60 overflow-y-auto">
              {notifications.map((note, index) => (
                <li key={index} className="p-4 border-b font-manuale last:border-none hover:bg-gray-50">
                  <p className="text-sm font-medium">{note.title}</p>
                  <span className="text-xs text-gray-400">{note.time}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="absolute right-6 top-[60px] md:top-24 w-56 bg-[#b2a595] rounded-md shadow-md text-center py-2 z-40">
            <p className="font-manuale pb-2 font-bold">Menu</p>
            <Link to="/help" className="block py-1 font-sans border-t border-white">Help Center</Link>
            <Link to="/contact" className="block py-1 font-sans border-t border-white">Contact Us</Link>
            <Link to="/Dashboard" className="block py-1 font-sans border-t border-white">Dashboard</Link>
            <button onClick={handleLogout} className="block w-full py-1 font-sans border-t border-white text-left px-4 text-[#514232]">Log Out</button>
          </div>
        )}
      </header>
    );
  }

  return null;
}

export default Header;



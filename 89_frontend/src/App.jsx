import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
// import { useEffect } from 'react';
import './App.css';

import About1 from './home1/home.jsx';
import Login1 from './login1/login.jsx';
import ForgotPassword from './forgetpass/forgetPass.jsx';
import NewPassword from './newPass/newpass.jsx';
import AddSkills from './addskill/addskill.jsx';
import JobListings from './joblisition/joblistion.jsx';
import JobDetails from './jobdetail/jobdetail.jsx';
import ApplyForm from './applyjob/applyjob.jsx';
import AppliedJobsPage from './history/history.jsx';
import UserProfile from './userprofile/userprofile.jsx';
import Signup1 from './signUp/signUp.jsx';
import Header from './header/header.jsx';

import { Footera } from './footers/footers.jsx';
import CoursesPage from './courses/courses.jsx';
import JobPostForm from './addjob/addJob.jsx';
import InternshipPostForm from './intership/intership.jsx';
import SignUpForCompany from './signUpForCompany/signUpForcompany.jsx';
import SignUpForCompany1 from './SignUpforCompany1/signupforCompany1.jsx';
import AddedJobsPage from './postedjob/postedJob.jsx';
import AboutUs from './about/about.jsx';
import ContactUs from './contact/contact.jsx';
import HelpCenter from './help/help.jsx';
import EditProfile from './editprofile/editProfile.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import DraftsPage from './Drafts/Drafts.jsx';



function AppWrapper() {
  const location = useLocation();
  const noHeaderRoutes = ['/login', '/signUp', '/forget', '/newpass', '/signUpForCompany', '/signUpForCompany1', '/dashboard'];

  const hideHeader = noHeaderRoutes.includes(location.pathname);

  return (
    <>
    
      {!hideHeader && <Header />}
      <Routes>
        <Route path='/' element={<About1 />} />
        <Route path='/about' element={<AboutUs/>} />
        <Route path='/contact' element={<ContactUs/>} />
        <Route path='/help' element={<HelpCenter/>} />
        <Route path="/edit-profile" element={<EditProfile />} />

       
        <Route path='/login' element={<Login1 />} />
        <Route path='/signUpForCompany' element={<SignUpForCompany />} />
        <Route path='/signUpForCompany1' element={<SignUpForCompany1 />} />
        <Route path='/signUp' element={<Signup1 />} />
        <Route path='/forget' element={<ForgotPassword />} />
        <Route path='/newpass' element={<NewPassword />} />
        <Route path='/addSkill' element={<AddSkills />} />
        <Route path='/JobListings' element={<JobListings />} />
        <Route path='/JobDetails/:id' element={<JobDetails />} />
        <Route path='/ApplyJob/:id' element={<ApplyForm />} />
        <Route path='/AppliedJobsPage' element={<AppliedJobsPage />} />
        <Route path='/addedjob' element={<AddedJobsPage />} />
        <Route path='/courses' element={<CoursesPage />} />
        <Route path='/UserProfile' element={<UserProfile />} />
        <Route path='/addjob' element={<JobPostForm />} />
        <Route path='/intership' element={<InternshipPostForm />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/drafts' element={<DraftsPage/>} />

        
        {/* Fallback route */}
      </Routes>
      {!hideHeader && <Footera />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;

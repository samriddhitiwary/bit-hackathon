// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import ClinicCarousel from './components/Carousel/Carousel';
import Appointments from './components/Appoinments/Appoinments';
import Speciality from './components/Speciality/Speciality';
import MiniNavbar from './components/MiniNavbar/MiniNavbar';
import Procedures from './components/Procedures/Procedures';
import ProHealth from './components/ProHealth/ProHealth';
import ConsultOnline from './components/Appoinments/ConsultOnline';
import PatientCare from './components/PatientCare/PatientCare';
import FooterAppointments from './components/FooterAppointments/FooterAppointments';
import Footer from './components/Footer/Footer';
import Login from './components/Header/Login';
import Profile from './components/Header/Profile';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  useEffect(() => {
    document.title = 'Digital Healthcare';
  }, []);

  return (
    <Router>
      <Routes>
        {/* Main layout for general pages */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Speciality />} />
          <Route path="/speciality" element={<Speciality />} />
          <Route path="/procedures" element={<Procedures />} />
          <Route path="/prohealth" element={<ProHealth />} />
        </Route>

        {/* Separate layout for Profile page */}
        <Route path="/profile" element={<ProfileOnlyLayout />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Separate page layout for Consult Online */}
        <Route path="/consult-online" element={<ConsultOnline />} />

        {/* Only Header is rendered for /login route */}
        <Route path="/login" element={<HeaderOnlyLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}


const MainLayout = () => (
  <>
    <Header />
    <ClinicCarousel />
    <Appointments />
    <MiniNavbar />
    <br />
    <Outlet /> 
    <br />
    <PatientCare />
    <FooterAppointments />
    <Footer />
  </>
);


const ProfileOnlyLayout = () => (
  <>
    <Header />
    <Outlet /> 
  </>
);


const HeaderOnlyLayout = () => (
  <>
    <Header />
    <Outlet /> 
  </>
);

export default App;

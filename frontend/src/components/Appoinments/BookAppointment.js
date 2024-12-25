import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './BookAppointment.css';
import Header from '../Header/Header';
import { Modal, Button } from 'react-bootstrap';

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [city, setCity] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientName, setPatientName] = useState('');
  
  const images = [
    '/images/BookAppointment/img1.png',
    '/images/BookAppointment/img2.png',
    '/images/BookAppointment/img3.png',
    '/images/BookAppointment/img4.png',
    '/images/BookAppointment/img5.png',
    '/images/BookAppointment/img6.png',
    '/images/BookAppointment/img7.png',
    '/images/BookAppointment/img8.png',
    '/images/BookAppointment/img9.png',
    '/images/BookAppointment/img10.png',
  ];
  

  const getDoctorImage = (doctorIndex) => {
    const imageIndex = doctorIndex % images.length;
    return images[imageIndex];
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/doctor/getAllDoctors');
        const data = await response.json();
        setDoctors(data);
        setFilteredDoctors(data);

        const userData = JSON.parse(sessionStorage.getItem('userdata'));
        setPatientName(`${userData.fname} ${userData.lname}`);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    filterDoctors();
  }, [searchTerm, specialization, city]);

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSpecializationChange = (e) => {
    setSpecialization(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const filterDoctors = () => {
    let filtered = doctors;

    if (searchTerm) {
      filtered = filtered.filter(doctor =>
        `${doctor.fname} ${doctor.lname}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (specialization) {
      filtered = filtered.filter(doctor => doctor.specialization.toLowerCase() === specialization.toLowerCase());
    }

    if (city) {
      filtered = filtered.filter(doctor => doctor.Location.toLowerCase() === city.toLowerCase());
    }

    setFilteredDoctors(filtered);
  };

  const handleConfirmBooking = async () => {
      
  };
  

  

  return (
    <>
      <Header />
      <br />
      <div className="appointment-container">
        <h1>Book an Appointment</h1>

        {/* <div className="filters">
          <div className="filter">
            <label>Select Specialization</label>
            <select onChange={handleSpecializationChange} value={specialization}>
              <option value="">All Specializations</option>
              {Array.from(new Set(doctors.map(doctor => doctor.specialization))).map((spec, index) => (
                <option key={index} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          <div className="filter">
            <label>Select City</label>
            <select onChange={handleCityChange} value={city}>
              <option value="">All Cities</option>
              {Array.from(new Set(doctors.map(doctor => doctor.Location))).map((loc, index) => (
                <option key={index} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div className="filter">
            <label>Search by Name</label>
            <input
              type="text"
              placeholder="Search for a doctor"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div> */}

<div className="filters-container">
  <div className="filter-item">
    <label>Select Specialization</label>
    <select onChange={handleSpecializationChange} value={specialization}>
      <option value="">All Specializations</option>
      {Array.from(new Set(doctors.map(doctor => doctor.specialization))).map((spec, index) => (
        <option key={index} value={spec}>{spec}</option>
      ))}
    </select>
  </div>

  <div className="filter-item">
    <label>Select City</label>
    <select onChange={handleCityChange} value={city}>
      <option value="">All Cities</option>
      {Array.from(new Set(doctors.map(doctor => doctor.Location))).map((loc, index) => (
        <option key={index} value={loc}>{loc}</option>
      ))}
    </select>
  </div>

  <div className="filter-item">
    <label>Search by Name</label>
    <input
      type="text"
      placeholder="Search for a doctor"
      value={searchTerm}
      onChange={handleSearchChange}
    />
  </div>
</div>


        <div className="doctor-list">
          <h2>Choose a Doctor</h2>
          <ul className="doctor-grid" type="none">
            {filteredDoctors.map((doctor, index) => (
              <li key={doctor._id} className="doctor-card">
                <h3>{doctor.fname} {doctor.lname}</h3>
                <p><i className="fas fa-1stethoscope"></i> {doctor.specialization}</p>
                <p><i className="fas fa-map-marker-alt"></i> {doctor.Location}</p>
                <p><i className="fas fa-graduation-cap"></i> {doctor.Degree}</p>

                <img src={getDoctorImage(index)} alt="Doctor" />
                <div className="degree-availability-line"></div>
                <div className="doctor-schedule">
                  <h4>Availability:</h4>
                  <ul>
                    <li><i className="fas fa-calendar-day"></i> {doctor.schedule.map((schedule, idx) => (
                      <span key={idx}>{schedule.days.join(', ')}</span>
                    ))}</li>
                    <li><i className="fas fa-clock"></i> {doctor.schedule.map((schedule, idx) => (
                      <span key={idx}>{schedule.time.startTime} - {schedule.time.endTime}</span>
                    ))}</li>
                  </ul>
                </div>

                <button onClick={() => handleSelectDoctor(doctor)} className="book-appointment-btn">
                  Book Appointment
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {selectedDoctor && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Doctor:</strong> {`${selectedDoctor.fname} ${selectedDoctor.lname}`}</p>
            <p><strong>Patient:</strong> {patientName}</p>
            <label>Select Day:</label>
            <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
              <option value="">Select Day</option>
              {selectedDoctor.schedule.map((schedule, idx) => (
                schedule.days.map(day => (
                  <option key={`${idx}-${day}`} value={day}>{day}</option>
                ))
              ))}
            </select>
            <label>Select Time:</label>
            <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
              <option value="">Select Time</option>
              {selectedDoctor.schedule.map((schedule, idx) => (
                <option key={idx} value={`${schedule.time.startTime} - ${schedule.time.endTime}`}>
                  {`${schedule.time.startTime} - ${schedule.time.endTime}`}
                </option>
              ))}
            </select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirmBooking}>
              Confirm Booking
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default BookAppointment;



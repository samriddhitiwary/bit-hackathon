import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './Appoinments.css';

const Appointments = () => {
  const navigate = useNavigate(); 

  return (
    <div className='app'>
        <br />

        <Button className='but' variant="light">
            <img src='images/Appointments/img1.svg' alt="Book Appointment" />
            <p>Book Appointment</p>
        </Button> 

        <Button className='but' variant="light">
            <img src='images/Appointments/img2.svg' alt="Book Health Check Up" />
            <p>Book Health Check Up</p>
        </Button> 

        <Button 
          className='but' 
          variant="light" 
          onClick={() => navigate('/consult-online')} 
        >
            <img src='images/Appointments/img3.svg' alt="Consult Online" />
            <p>Consult Online</p>
        </Button> 

        <Button className='but' variant="light">
            <img src='images/Appointments/img4.svg' alt="Buy Medicine" />
            <p>Buy Medicine</p>
        </Button> 

        <Button className='but' variant="light">
            <img src='images/Appointments/img5.svg' alt="Find Hospital" />
            <p>Find Hospital</p>
        </Button> 

        <Button className='but' variant="light">
            <img src='images/Appointments/img6.svg' alt="View Health Record" />
            <p>View Health Record</p>
        </Button> 
    </div>
  );
};

export default Appointments;

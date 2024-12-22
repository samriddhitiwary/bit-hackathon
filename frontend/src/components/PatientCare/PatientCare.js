import React from 'react';
import Button from 'react-bootstrap/Button';
import './PatientCare.css';

const PatientCare = () => {
  return (
    <div className='PatientCare_grid_container'>
            <div className='PatientCare_Header'>
                <h2 className='PatientCare_Header_text' ><b>International Patient Care</b></h2>

            </div>
            <br></br>
            <p className='PatientCare_Text'>“Bringing healthcare of International standards within the reach of every individual.”</p>
            <br></br>
            <br></br>
            
            <br></br>

            <div className='PatientCare_inner_grid'>
                <div className='PatientCare_right'>
                    <img className='PatientCare_main_img' src='images/PatientCare/main.webp'></img>
                </div>


                <div className='PatientCare_left'>

                    <Button className='PatientCare_btn' variant="light">
                        <img className='PatientCare_img' src='images/PatientCare/img1.svg'></img>
                        <p>Hospitals</p>
                    </Button>

                    <Button className='PatientCare_btn' variant="light">
                        <img className='PatientCare_img' src='images/PatientCare/img2.svg'></img>
                        <p>Speciality</p>
                    </Button>

                    <Button className='PatientCare_btn' variant="light">
                        <img className='PatientCare_img' src='images/PatientCare/img3.svg'></img>
                        <p>Plan Your Trip</p>
                    </Button>

                    <Button className='PatientCare_btn' variant="light">
                        <img className='PatientCare_img' src='images/PatientCare/img4.svg'></img>
                        <p>Testimonials</p>
                    </Button>

                    <Button className='PatientCare_btn' variant="light">
                        <img className='PatientCare_img' src='images/PatientCare/img5.svg'></img>
                        <p>FAQ's</p>
                    </Button>

                    <Button className='PatientCare_btn' variant="light">
                        <img className='PatientCare_img' src='images/PatientCare/img6.svg'></img>
                        <p>Find A Doctor</p>
                    </Button>

                    <Button className='PatientCare_btn' variant="light">
                        <img className='PatientCare_img' src='images/PatientCare/img7.svg'></img>
                        <p>Online Consultation</p>
                    </Button>

                    <Button className='PatientCare_btn' variant="light">
                        <img className='PatientCare_img' src='images/PatientCare/img8.svg'></img>
                        <p>Apollo Insurance</p>
                    </Button>

                    <Button className='PatientCare_btn' variant="light">
                        <img className='PatientCare_img' src='images/PatientCare/img9.svg'></img>
                        <p>Visa</p>
                    </Button>

                    









                </div>


            </div>

        </div>
  )
}

export default PatientCare
import React from 'react';
import Button from 'react-bootstrap/Button';
import './ProHealth.css';

const ProHealth = () => {
    return (
        <div className='ProHealth_inner_grid'>
            <div className='ProHealth_left'>
                <img className='ProHealth_main_img' src='images/ProHealth/main.jpg'></img>
            </div>


            <div className='ProHealth_right'>
                <div className='ProHealth_Header'>
                    <h2 className='ProHealth_Header_text' ><b>Get proactive - Be ProHealth !</b></h2>
                    <h5>Build your ProHealth plan now</h5>
                    <br></br>
                    <p>ProHealth Program is a unique end-to-end personalized proactive health program that brings together predictive risk analysis, doctor-curated health packages, cutting-edge diagnostics with expert evaluation, and a personalized path to wellness, designed to make positive shifts – making you healthier</p>
                    <br></br>
                    <p>This health program is based on Independent Living's pioneering efforts in preventive care for almost 40 years and over 22 million health checks.</p>
                    <br></br>
                    <p>Independent Living ProHealth program can PREDICT health risks, help PREVENT ailments, and OVERCOME lifestyle diseases where possible.</p>
                        <Button  className='ProHealth_btn'>Book ProHealth</Button>

                </div>

            </div>


        </div>
    )
}

export default ProHealth
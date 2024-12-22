import React from 'react';
import './WhyChoose.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const WhyChoose = () => {
    return (
        <div className='why_choose_grid_container'>
            
            <div >
                <br></br>
                <h2 className='title'><b>Why Choose Apollo Healthcare?</b> </h2>
                <br></br>
                <p className='title'>Established by Dr Prathap C Reddy in 1983, Apollo Healthcare has a robust presence across the healthcare ecosystem. From routine wellness & preventive health care to innovative life-saving treatments and diagnostic services, Apollo Hospitals has touched more than 200 million lives from over 150 countries.

                </p>

                <div className='content'>
                    <div className='item'>
                        <img className='small_img' src='images/WhyChoose/i1.svg' alt='Image 1'></img>
                        <p className='text'><h3 className='samll_txt'>73+</h3> Largest private healthcare network of Hospitals</p>
                    </div>

                    <div className='item'>
                        <img className='small_img' src='images/WhyChoose/i2.svg' alt='Image 2'></img>
                        <p className='text'><h3 className='samll_txt'>400+</h3> Largest private network of clinics across India</p>
                    </div>

                    <div className='item'>
                        <img className='small_img' src='images/WhyChoose/i3.svg' alt='Image 3'></img>
                        <p className='text'><h3 className='samll_txt'>1100+</h3> Diagnostic centres across India</p>
                    </div>

                    <div className='item'>
                        <img className='small_img' src='images/WhyChoose/i4.svg' alt='Image 4'></img>
                        <p className='text'><h3 className='samll_txt'>5000+</h3> Pharmacies</p>
                    </div>

                    <div className='item'>
                        <img className='small_img' src='images/WhyChoose/i5.svg' alt='Image 5'></img>
                        <p className='text'><h3 className='samll_txt'>10000+</h3> Pin codes Served across India</p>
                    </div>

                    <div className='item'>
                        <img className='small_img' src='images/WhyChoose/i6.svg' alt='Image 6'></img>
                        <p className='text'><h3 className='samll_txt'>11000+</h3> Doctors</p>
                    </div>
                </div>




            </div>


            <div className='why_choose_img'>
                <img className='why_choose_main' src='images/WhyChoose/main.webp'></img>
            </div>
        </div>
    )
}

export default WhyChoose
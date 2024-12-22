import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './NewAtApollo.css';

const NewAtApollo = () => {
  return (
    <div className='NewAtApollo_body'>
    <div className='NewAtApollo_Header'><h3><b className='ApolloHeader'>What’s new at Apollo</b></h3></div>
    <div className='NewAtApollo_full_body'>
     
    <Card className='NewAtApollo_Card'  style={{ width: '18rem' }}>
      <img src='images/NewAtApollo/img1.jpg'></img>
      <Card.Body>
        <Card.Title>A Yemnei Patient with Complex Mitral Valve</Card.Title>
        <Card.Text>
          The life of a 38-year-old Yemeni patientwith chronic Mitral Valve Disease(MVD)...
        </Card.Text>
        <Button variant="primary">Read More</Button>
      </Card.Body>
    </Card>

    <Card className='NewAtApollo_Card' style={{ width: '18rem' }}>
      <img src='images/NewAtApollo/img2.jpg'></img>
      <Card.Body>
        <Card.Title>A 71-year-old patient with two prosthetic cardiac...</Card.Title>
        <Card.Text>
          Apollo Hospital, Chennai proudly announces a landmark achievement in Cardiology...
        </Card.Text>
        <Button variant="primary">Read More</Button>
      </Card.Body>
    </Card>

    <Card className='NewAtApollo_Card' style={{ width: '18rem' }}>
      <img src='images/NewAtApollo/img3.jpg'></img>
      <Card.Body>
        <Card.Title>Apollo Hospitals, Chennai uses oxygen therapy to prevent foot amputation of...</Card.Title>
        <Card.Text>
          In a remarkable medical breakthrough, Apollo Hospital Chennai has successful...
        </Card.Text>
        <Button variant="primary">Read More</Button>
      </Card.Body>
    </Card>

    <Card className='NewAtApollo_Card' style={{ width: '18rem' }}>
      <img src='images/NewAtApollo/img4.jpg'></img>
      <Card.Body>
        <Card.Title>4th Apollo Annual Proton Practicum</Card.Title>
        <Card.Text>
          Improving Survival and Survivorship in Paediatric and CNS Tumours with Proton...
        </Card.Text>
        <Button variant="primary">Read More</Button>
      </Card.Body>
    </Card>
    </div>
    <br></br>
    </div>
  )
}

export default NewAtApollo
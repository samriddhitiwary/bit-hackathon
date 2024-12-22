import React, { useEffect, useState } from 'react';
import { auth } from './Firebase';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Header';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut();
    navigate('/');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Welcome, {user.displayName}</h2>
      <div className="text-center mb-4">
        <img
          src={user.photoURL}
          alt={user.displayName}
          className="rounded-circle"
          style={{ width: '150px', height: '150px' }}
        />
      </div>
      <p className="text-center mb-4">Email: {user.email}</p>
      <div className="d-flex justify-content-center mb-4">
        <Button onClick={handleLogout} variant="danger" className="btn-3d">
          Logout
        </Button>
      </div>

      <h3 className="mb-4 text-center">Update Your Profile</h3>
      <Form>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="dob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="age">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your age"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="weight">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your weight"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="bloodGroup">
              <Form.Label>Blood Group</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your blood group"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-center mt-4">
          <Button type="submit" variant="primary" className="btn-3d">
            Save Changes
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Profile;

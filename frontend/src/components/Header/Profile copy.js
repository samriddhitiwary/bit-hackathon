import React, { useEffect, useState } from 'react';
import { auth } from './Firebase';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToastContainer from 'react-toast';
import { toast } from 'react-toast';

const Profile = () => {
  const initialUser = {
    fname: '',
    lname: '',
    dob: '',
    address: '',
    weight: '',
    blood_group: '',
  };

  const [user, setUser] = useState(initialUser);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const navigate = useNavigate();

  
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isExistingUser) {
        
         response = await axios.put(
          `http://localhost:8000/api/user/update/${user._id}`,
          user
        );
        toast.success(response.data.msg, { position: 'top-right' });
      } else {
        
         response = await axios.post(
          'http://localhost:8000/api/user/create',
          { ...user, email: firebaseUser.email }
        );
        toast.success(response.data.msg, { position: 'top-right' });
      }
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save changes', { position: 'top-right' });
    }
  };


  useEffect(() => {
    const fetchUser = async (email) => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/user/getuserbyemail?email=${email}`
        );
        if (response.data) {
          setUser(response.data);
          setIsExistingUser(true);
          sessionStorage.setItem('userdata', JSON.stringify(response.data))
        }
      } catch (error) {
        console.error(error);
        setIsExistingUser(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setFirebaseUser(firebaseUser);
        fetchUser(firebaseUser.email);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  
  const handleLogout = () => {
    auth.signOut();
    navigate('/');
  };

  if (!firebaseUser) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Welcome, {firebaseUser.displayName}</h2>
      <div className="text-center mb-4">
        <img
          src={firebaseUser.photoURL}
          alt={firebaseUser.displayName}
          className="rounded-circle"
          style={{ width: '150px', height: '150px' }}
        />
      </div>
      <p className="text-center mb-4">Email: {firebaseUser.email}</p>
      <div className="d-flex justify-content-center mb-4">
        <Button onClick={handleLogout} variant="danger" className="btn-3d">
          Logout
        </Button>
      </div>

      <h3 className="mb-4 text-center">
        {isExistingUser ? 'Update Your Profile' : 'Create Your Profile'}
      </h3>
      <Form onSubmit={submitForm}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                name="fname"
                value={user.fname}
                onChange={inputHandler}
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
                name="lname"
                value={user.lname}
                onChange={inputHandler}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="dob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={user.dob}
                onChange={inputHandler}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                name="address"
                value={user.address}
                onChange={inputHandler}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="weight">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your weight"
                name="weight"
                value={user.weight}
                onChange={inputHandler}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="bloodGroup">
              <Form.Label>Blood Group</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your blood group"
                name="blood_group"
                value={user.blood_group}
                onChange={inputHandler}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-center mt-4">
          <Button type="submit" variant="primary" className="btn-3d">
            {isExistingUser ? 'Update Profile' : 'Create Profile'}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Profile;
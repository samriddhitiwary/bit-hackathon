import React, { useState } from 'react';
import { auth, provider } from './Firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, provider);
      navigate('/profile'); 
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Login with Google</h2>
      <Button 
        variant="primary" 
        onClick={handleLogin} 
        disabled={loading}
      >
        {loading ? 'Logging in...' : <><FaGoogle /> Login with Google</>}
      </Button>
    </div>
  );
};

export default Login;

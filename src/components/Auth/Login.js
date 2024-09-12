import React, { useState, useEffect } from 'react';
import { CiUser, CiLock } from "react-icons/ci";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const emailOrPhone = form.emailOrPhone.value;
    const password = form.password.value;

    const invalidToast = () => {
      toast.error("Invalid username or password.");
    }  

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ emailOrPhone, password })
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);

        localStorage.setItem('currentUser', JSON.stringify(data));  // Store the current user in localStorage
        navigate('/home');
      } else {
        invalidToast();
        console.log(data)
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error (show notification, etc.)
    }
  };

  useEffect(() => {

    document.body.style.backgroundColor = 'white'; 

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []); 

  return (
    <div style={{ height: "100vh" }} className="container auth-wrapper auth-wrapper-login d-flex align-items-center">

      <ToastContainer />

      <div style={{ width: "500px" }}>
        <h1 style={{ width: "450px", textAlign: "center", margin: "0 auto" }}>Welcome to the <span style={{ color: "rgb(115, 129, 255)" }}>Organizer End!</span></h1>
        <img style={{ width: "500px" }} src="/meeting.jpg" alt="business meeting" />
      </div>
      <div className="vr"></div>
      <div className="login-form" style={{ width: "450px" }}>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formEmailOrPhone" style={{ paddingBottom: '15px' }}>
            <Form.Label style={{ fontSize: '21px', color: 'grey' }}>EMAIL/PHONE NUMBER</Form.Label>
            <div className="input-group input-icon-wrapper">
              <CiUser size={22} className="input-icon" />
              <Form.Control className="input-with-icon" type="text" name="emailOrPhone" placeholder="nepalieventorg@gmail.com" style={{ fontSize: '18px', color: 'grey' }} />
            </div>
          </Form.Group>

          <Form.Group controlId="formPassword" style={{ paddingBottom: '15px' }}>
            <Form.Label style={{ fontSize: '21px', color: 'grey' }}>PASSWORD</Form.Label>
            <div className="input-group input-icon-wrapper">
              <CiLock size={22} className="input-icon" />
              <Form.Control className="input-with-icon" type={showPassword ? 'text' : 'password'} name="password" placeholder="iampassword" style={{ fontSize: '18px', color: 'grey' }} />
              {showPassword ? (
                <IoEyeOffOutline size={22} className="input-icon input-icon-end" onClick={() => setShowPassword(false)} />
              ) : (
                <IoEyeOutline size={22} className="input-icon input-icon-end" onClick={() => setShowPassword(true)} />
              )}
            </div>
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center" style={{ padding: '0 15px 15px 15px ' }}>
            <Form.Check type="checkbox" label="Remember me" />
            <Button variant="link" style={{ color: 'red', textDecoration: 'underline', padding: 0 }}>Forgot password?</Button>
          </div>

          <Button variant="primary" type="submit" style={{ width: '100%', height: '45px', marginBottom: '15px', borderRadius: '15px' }}>LOGIN</Button>

          <a href="/register" style={{ display: 'block', textAlign: 'center' }}>Don't have an account? Register here</a>
        </Form>
      </div>
    </div>
  );
}

export default Login;

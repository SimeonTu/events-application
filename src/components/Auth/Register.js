import React, { useState } from 'react';
import { CiUser, CiLock, CiPhone } from "react-icons/ci";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { BsEnvelope } from "react-icons/bs";
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const CloseButton = ({ closeToast }) => (
    <Button
      onClick={closeToast}
      style={{ width: "125px", height: "45px", margin: "0 auto", borderRadius: "15px" }}
    >
      OKAY
    </Button>
  );

  const existsToast = () => {
    toast.error(<p className="m-2">Email or phone already in use.<br /></p>, { position: "center" });
  }

  const registeredToast = () => {
    toast.success(<p className="m-2">You've successfully registered, you'll be redirected to the home page in 8 seconds.<br /></p>, {
      position: "bottom-center"
    });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.organizerName.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const brief = form.brief.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const userData = {
      name,
      email,
      phone,
      password,
      brief
    };

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        registeredToast();
        setTimeout(() => {
          navigate('/login');
        }, 8000)
      } else if (response.status === 409) {
        existsToast();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div style={{ height: "100vh" }} className="container auth-wrapper d-flex align-items-center justify-content-around">

      <ToastContainer closeButton={CloseButton} autoClose={90000} />

      <div className="welcome-wrapper" style={{ width: "450px" }}>
        <h1 style={{ width: "450px", textAlign: "center", margin: "0 auto" }}>Welcome to the <span style={{ color: "rgb(115, 129, 255)" }}>Organizer Side</span></h1>
        <img style={{ width: "450px" }} src="/desk.jpeg" alt="business meeting" />
      </div>
      <div className="vr" style={{ margin: "20px 0" }}></div>
      <div className="register-form" style={{ width: "450px" }}>
        <Form id="register-form" onSubmit={handleRegister}>
          <Form.Group controlId="formOrganizerName" style={{ paddingBottom: '15px' }}>
            <Form.Label style={{ fontSize: '20px', color: 'grey' }}>ORGANIZER NAME</Form.Label>
            <div className="input-group input-icon-wrapper">
              <CiUser size={21} className="input-icon" />
              <Form.Control required className="input-with-icon" type="text" name="organizerName" placeholder="Joshua Mashon" style={{ fontSize: '17px', color: 'grey' }} />
            </div>
          </Form.Group>

          <Form.Group controlId="formBrief" style={{ paddingBottom: '15px' }}>
            <Form.Label style={{ fontSize: '20px', color: 'grey' }}>BRIEF</Form.Label>
            <div className="input-group input-icon-wrapper">
              <Form.Control
                required
                className="input-without-icon"
                as="textarea"
                name="brief"
                placeholder="Provide a brief description about yourself or your organization"
                style={{ fontSize: '17px', color: 'grey', resize: 'none' }}
              />
            </div>
          </Form.Group>

          <Form.Group controlId="formEmail" style={{ paddingBottom: '15px' }}>
            <Form.Label style={{ fontSize: '20px', color: 'grey' }}>EMAIL ADDRESS</Form.Label>
            <div className="input-group input-icon-wrapper">
              <BsEnvelope size={18} className="input-icon" />
              <Form.Control required className="input-with-icon" type="email" name="email" placeholder="joshuamason@gmail.com" style={{ fontSize: '17px', color: 'grey' }} />
            </div>
          </Form.Group>

          <Form.Group controlId="formPhone" style={{ paddingBottom: '15px' }}>
            <Form.Label style={{ fontSize: '20px', color: 'grey' }}>PHONE NUMBER</Form.Label>
            <div className="input-group input-icon-wrapper">
              <CiPhone size={21} className="input-icon" />
              <Form.Control required className="input-with-icon" type="tel" name="phone" placeholder="+1234567890" style={{ fontSize: '17px', color: 'grey' }} />
            </div>
          </Form.Group>

          <Form.Group controlId="formPassword" style={{ paddingBottom: '15px' }}>
            <Form.Label style={{ fontSize: '20px', color: 'grey' }}>PASSWORD</Form.Label>
            <div className="input-group input-icon-wrapper">
              <CiLock size={21} className="input-icon" />
              <Form.Control required className="input-with-icon" type={showPassword ? 'text' : 'password'} name="password" placeholder="iampassword123" style={{ fontSize: '17px', color: 'grey' }} />
              {showPassword ? (
                <IoEyeOffOutline size={21} className="input-icon input-icon-end" onClick={() => setShowPassword(false)} />
              ) : (
                <IoEyeOutline size={21} className="input-icon input-icon-end" onClick={() => setShowPassword(true)} />
              )}
            </div>
          </Form.Group>

          <Form.Group controlId="formConfirmPassword" style={{ paddingBottom: '15px' }}>
            <Form.Label style={{ fontSize: '20px', color: 'grey' }}>CONFIRM PASSWORD</Form.Label>
            <div className="input-group input-icon-wrapper">
              <CiLock size={21} className="input-icon" />
              <Form.Control required className="input-with-icon" type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" placeholder="iampassword123" style={{ fontSize: '17px', color: 'grey' }} />
              {showConfirmPassword ? (
                <IoEyeOffOutline size={21} className="input-icon input-icon-end" onClick={() => setShowConfirmPassword(false)} />
              ) : (
                <IoEyeOutline size={21} className="input-icon input-icon-end" onClick={() => setShowConfirmPassword(true)} />
              )}
            </div>
          </Form.Group>

          <Button variant="primary" type="submit" style={{ width: '100%', height: '45px', marginBottom: '15px', borderRadius: '15px' }}>REGISTER AS AN ORGANIZER</Button>

          <a href="/login" style={{ display: 'block', textAlign: 'center' }}>Already an organizer? Login here</a>
        </Form>
      </div>
    </div>
  );
}

export default Register;

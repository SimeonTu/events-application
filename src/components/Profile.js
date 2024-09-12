import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Navibar from './Navibar';

function Profile() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const handleLogout = () => {
    localStorage.removeItem('currentUser');  // Remove user data from localStorage
    navigate('/login');  // Redirect to login page
  };

  return (
    <>
      <Navibar />
      <div className="container">
        {currentUser ? (
          <>
            <h3 className='mt-3' style={{ fontFamily: 'BudujSansBold' }}>Hello {currentUser.name}!</h3>
            <p>Welcome to your profile!</p>

            <h4 style={{ fontFamily: 'BudujSansBold' }}>User bio:</h4>
            <p>{currentUser.brief}</p>
            <Button variant="primary" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <p>Loading...</p>  // Optionally, handle the case where currentUser is not available
        )}
      </div>
    </>
  );
}

export default Profile;

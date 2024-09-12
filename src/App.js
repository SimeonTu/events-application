import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Home';
import CreateEvent from './components/Event/CreateEvent';
import EventDetail from './components/Event/EventDetail';
import EditEvent from './components/Event/EditEvent';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'react-bootstrap';

const CloseButton = ({ closeToast }) => (
  <Button
    onClick={closeToast}
    style={{ width: "125px", height: "45px", margin: "0 auto", borderRadius: "15px" }}
  >
    OKAY
  </Button>
);

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={90000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeButton={CloseButton}
      />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />

          <Route element={<PrivateRoute />}>
            <Route path="/create" element={<CreateEvent />} />
            <Route path="/edit-event/:id" element={<EditEvent />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/event/:id" element={<EventDetail />} />

          <Route path="/" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

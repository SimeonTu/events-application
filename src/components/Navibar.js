import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Form, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PiMagnifyingGlassThin } from "react-icons/pi";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaCircleUser } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

function Navibar({ onFilter }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [searching, setSearching] = useState(false);
  const [filter, setFilter] = useState({
    name: '',
    description: '',
    country: '',
    venueName: '',
    venueAddress: '',
    ticketPrice: '',
    isFreeTicket: false,
    subCategory: '',
    date: '',
    startTime: '',
    endTime: '',
    capacity: ''
  });

  const isLoggedIn = !!localStorage.getItem('currentUser'); // Check if user is logged in
  const currentUser = isLoggedIn ? JSON.parse(localStorage.getItem('currentUser')) : null;

  const hasFilters = Object.values(filter).some(value => value !== '' && value !== false);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;    
    setFilter(prevFilter => ({
      ...prevFilter,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSearch = () => {
    onFilter(filter);
    setShowModal(false);
    setSearching(true)
  };

  const handleCreateClick = () => {
    if (isLoggedIn) {
      navigate('/create');
    } else {
      navigate('/login');
    }
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  const handleBackToEvent = () => {
    const eventId = location.pathname.split('/').pop(); // Extract event ID from URL
    navigate(`/event/${eventId}`);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      name: '',
      description: '',
      country: '',
      venueName: '',
      venueAddress: '',
      ticketPrice: '',
      isFreeTicket: false,
      subCategory: '',
      date: '',
      startTime: '',
      endTime: '',
      capacity: ''
    };
    setFilter(clearedFilters);
    onFilter(clearedFilters); // Pass cleared filters to onFilter
  };

  const renderNavContent = () => {
    if (location.pathname === '/create') {
      return (
        <>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/home" className='d-flex align-center justify-center' style={{ fontWeight: "bold", marginLeft: "20px" }}>
              Home
              <IoHome size={24} style={{ marginLeft: "3px" }} className="ml-1" />
            </Nav.Link>
          </Nav>
          <span style={{ fontFamily: 'BudujSansRegular' }} className="ml-auto fs-4">New Event Creation</span>
        </>
      );
    } else if (location.pathname.startsWith('/event/')) {
      return (
        <>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/home" className='d-flex align-center justify-center' style={{ fontWeight: "bold", marginLeft: "20px" }}>
              Home
              <IoHome size={24} style={{ marginLeft: "3px" }} className="ml-1" />
            </Nav.Link>
          </Nav>
          <span style={{ fontFamily: 'BudujSansRegular' }} className="ml-auto fs-4">Event Description</span>
        </>
      );
    } else if (location.pathname.startsWith('/edit-event/')) {
      return (
        <>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/home" className='d-flex align-center justify-center' style={{ fontWeight: "bold", marginLeft: "20px" }}>
              Home
              <IoHome size={24} style={{ marginLeft: "3px" }} className="ml-1" />
            </Nav.Link>
            <Nav.Link as="button" onClick={handleBackToEvent} className='d-flex align-center justify-center' style={{ fontWeight: "bold", marginLeft: "20px" }}>
              Back to Event
              <IoMdArrowDropleftCircle size={24} style={{ marginLeft: "3px" }} className="ml-1" />
            </Nav.Link>
          </Nav>
          <span style={{ fontFamily: 'BudujSansRegular' }} className="ml-auto fs-4">Edit Event Description</span>
        </>
      );
    } else if (location.pathname === '/profile') {
      return (
        <>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/home" className='d-flex align-center justify-center' style={{ fontWeight: "bold", marginLeft: "20px" }}>
              Home
              <IoHome size={24} style={{ marginLeft: "3px" }} className="ml-1" />
            </Nav.Link>
          </Nav>
          <span className="ml-auto">Profile</span>
        </>
      );
    } else {
      return (
        <>
          <Nav className="ml-auto">
            <Nav.Link as="button" onClick={handleCreateClick} className='d-flex align-center justify-center' style={{ fontWeight: "bold", marginLeft: "20px" }}>
              Create <AiFillPlusCircle size={24} style={{ marginLeft: "3px" }} className="ml-1" />
            </Nav.Link>
          </Nav>
          <Form className="ml-auto">
            <div className='input-icon-wrapper'>
              {searching && hasFilters ? (<RxCross2 size={21} className="input-icon" onClick={() => {
                handleClearFilters()
                setSearching(false)
              }} />) : (<PiMagnifyingGlassThin size={21} className='input-icon' />)}
              <Form.Control
                type="text"
                placeholder="Search events, communities, browse #hashtags"
                className="rounded-pill input-with-icon input-with-icon-search"
                style={{ width: '400px', borderColor: 'rgb(122, 180, 238)' }}
                onClick={() => setShowModal(true)}
              />
            </div>
          </Form>
        </>
      );
    }
  };

  return (
    <>
      <Navbar style={{ height: "65px", backgroundColor: "white", borderBottom: "2px solid rgb(187, 187, 187)" }} expand="lg">
        <Navbar.Brand style={{ paddingLeft: "20px", marginRight: "0", fontFamily: 'BudujSansRegular' }} as={Link} to="/home">EventsApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{ justifyContent: "space-between" }}>
          {renderNavContent()}
          <Nav className="ml-auto">
            <Nav.Link as="button" onClick={handleProfileClick} className='d-flex align-center justify-center ms-3 ms-lg-0' style={{ fontWeight: "bold", marginRight: "20px" }}>
              <FaCircleUser size={24} style={{ marginRight: "5px" }} /> {isLoggedIn ? currentUser.name : "Profile"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Filter Events</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="px-5 py-3 container" style={{ width: '100%', backgroundColor: "white" }}>
            <div className="row">
              <Form.Group className="input-icon-wrapper">
                <Form.Label className="form-header">Name of the Event</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Event Name"
                  value={filter.name}
                  onChange={handleFilterChange}
                  className="input-without-icon-create"
                />
              </Form.Group>
            </div>

            <div className="row">
              <Form.Group className="input-icon-wrapper d-flex flex-column">
                <Form.Label className="form-header">Event Description</Form.Label>
                <textarea
                  name="description"
                  placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  rows={4}
                  value={filter.description}
                  onChange={handleFilterChange}
                  className="input-without-icon-create-textarea"
                />
              </Form.Group>
            </div>

            <div className="row">
              <Form.Group className="input-icon-wrapper">
                <Form.Label className="form-header">Event Country</Form.Label>
                <Form.Control
                  as="select"
                  name="country"
                  value={filter.country}
                  onChange={handleFilterChange}
                  className="input-without-icon-create"
                >
                  <option>United Kingdom</option>
                  <option>United States</option>
                  <option>Canada</option>
                </Form.Control>
              </Form.Group>
            </div>

            <div className="row">
              <Form.Group>
                <Form.Label className="form-header">Sub Category</Form.Label>
                <div className="d-flex flex-wrap sub-category-wrapper">
                  {['Music', 'Sports', 'Live Events', 'Business', 'Arts', 'Shows', 'Festival'].map((subCategory) => (
                    <Button
                      key={subCategory}
                      className="input-without-icon-create-small"
                      onClick={() => handleFilterChange({ target: { name: 'subCategory', value: subCategory } })}
                      style={filter.subCategory === subCategory ?
                        { backgroundColor: 'rgb(10, 117, 225)', color: 'white' }
                        :
                        { backgroundColor: 'white', color: 'black' }}
                    >
                      {subCategory}
                    </Button>
                  ))}
                </div>
              </Form.Group>
            </div>

            <div className="row">
              <Form.Group className="input-icon-wrapper">
                <Form.Label className="form-header">Date and Time</Form.Label>
                <div className="d-flex justify-content-center align-items-center" style={{ marginBottom: "15px" }}>
                  <Form.Control
                    style={{ width: '30%', marginRight: "35px" }}
                    type="date"
                    name="date"
                    value={filter.date}
                    onChange={handleFilterChange}
                    className="input-without-icon-create no-margin"
                    onClick={(e) => e.currentTarget.showPicker()}
                  />
                  <div className="d-flex justify-content-evenly align-items-center" style={{ width: "60%" }}>
                    <Form.Control
                      style={{ width: "33.3%" }}
                      type="time"
                      name="startTime"
                      value={filter.startTime}
                      onChange={handleFilterChange}
                      className="input-without-icon-create no-margin"
                      onClick={(e) => e.currentTarget.showPicker()}
                    />
                    <span className="fs-5">to</span>
                    <Form.Control
                      style={{ width: "33.3%" }}
                      type="time"
                      name="endTime"
                      value={filter.endTime}
                      onChange={handleFilterChange}
                      className="input-without-icon-create no-margin"
                      onClick={(e) => e.currentTarget.showPicker()}
                    />
                  </div>
                </div>
              </Form.Group>
            </div>

            <div className="row">
              <Form.Group className="input-icon-wrapper">
                <Form.Label className="form-header">Venue Name</Form.Label>
                <Form.Control
                  type="text"
                  name="venueName"
                  placeholder="Enter the name of the venue"
                  value={filter.venueName}
                  onChange={handleFilterChange}
                  className="input-without-icon-create"
                />
              </Form.Group>
            </div>

            <div className="row">
              <Form.Group className="input-icon-wrapper">
                <Form.Label className="form-header">Venue Address</Form.Label>
                <Form.Control
                  type="text"
                  name="venueAddress"
                  placeholder="Enter the address of the venue"
                  value={filter.venueAddress}
                  onChange={handleFilterChange}
                  className="input-without-icon-create"
                />
              </Form.Group>
            </div>

            <div className="row">
              <Form.Group className="input-icon-wrapper" style={{ marginBottom: "15px" }}>
                <Form.Label className="form-header">Max Ticket Price</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type="number"
                    name="ticketPrice"
                    placeholder="£0.00"
                    value={filter.ticketPrice}
                    onChange={handleFilterChange}
                    min="0"
                    step="0.01"
                    disabled={filter.isFreeTicket}
                    className="input-without-icon-create no-margin"
                    style={{ width: "125px" }}
                  />
                  <Button
                    onClick={() => handleFilterChange({ target: { name: 'isFreeTicket', value: !filter.isFreeTicket } })}
                    className="ms-2 input-without-icon-create no-margin"
                    style={filter.isFreeTicket ?
                      { backgroundColor: 'rgb(10, 117, 225)', color: 'white' }
                      :
                      { backgroundColor: 'white', color: 'rgb(50,50,50)' }}
                  >
                    Free Ticket
                  </Button>
                </div>
              </Form.Group>
            </div>

            <div className="row">
              <Form.Group className="input-icon-wrapper">
                <Form.Label className="form-header">Min Capacity</Form.Label>
                <Form.Control
                  type="number"
                  name="capacity"
                  placeholder="0"
                  min="0"
                  step="1"
                  value={filter.capacity}
                  onChange={handleFilterChange}
                  className="input-without-icon-create"
                  style={{ width: "75px" }}
                />
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="info" onClick={handleClearFilters}>
            Clear filters
          </Button>
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Navibar;

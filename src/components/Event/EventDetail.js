import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaTicketAlt, FaMoneyBillWave, FaUsers } from 'react-icons/fa';
import { CiLocationOn, CiClock2, CiEdit, CiShare2, CiTrash } from "react-icons/ci";
import { MdCategory } from "react-icons/md";
import Navibar from '../Navibar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const successToast = () => {
    toast.success(<p className="m-2">You've successfully deleted the event!</p>, {
      position: "bottom-center"
    });
  };

  const handleDelete = () => {
    fetch(`http://localhost:5000/event/${event.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            throw new Error(data.error || 'Failed to delete event');
          });
        }
      })
      .then(() => {
        successToast();
        navigate('/home');
      })
      .catch((error) => {
        toast.error(`Failed to delete event: ${error.message}`);
      });
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/event/${id}`);
        if (!response.ok) {
          throw new Error('Event not found');
        }
        const eventData = await response.json();
        setEvent(eventData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!event) return <p>Event not found.</p>;

  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'
  }).format(new Date(event.date));

  return (
    <>
      <Navibar />
      <div className="event-details-wrapper container">
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-md-center mt-4 mb-2">
          <div className="d-flex flex-column flex-lg-row">
            <p style={{ fontFamily: 'BudujSansRegular' }} className="m-0 d-flex justify-content-center align-items-center">
              <CiLocationOn className="me-1" size={20} /> {event.venueName}, {event.venueAddress}, {event.country}
            </p>
            <p style={{ fontFamily: 'BudujSansRegular' }} className="mt-2 mt-md-0 mb-0 ms-md-3 d-flex justify-content-center align-items-center">
              <CiClock2 className="me-1" size={20} /> {formattedDate}, {event.startTime} Onwards
            </p>
          </div>

          <div className="mt-2 mt-md-0">
            <Button variant="link" as={Link} to={`/edit-event/${event.id}`} className="p-1 pt-0 button-hover-effect">
              <CiEdit size={21} style={{ color: "black" }} />
            </Button>
            <Button variant="link" className="p-1 pt-0 button-hover-effect">
              <CiShare2 size={21} style={{ color: "black" }} />
            </Button>
            <Button variant="link" onClick={handleDelete} className="p-1 pt-0 button-hover-effect-red">
              <CiTrash id="trash-icon" size={21} />
            </Button>
          </div>
        </div>


        <div className="mb-3">
          <img
            src={`http://localhost:5000/images/${event.coverImage}`}
            alt="Cover"
            className="img-fluid rounded"
            style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }}
          />
        </div>

        <div className="mb-2">
          <h4 style={{ fontFamily: 'BudujSansBold' }}>{event.name}</h4>
        </div>

        <div className="mb-4">
          <h5 style={{ fontFamily: 'BudujSansRegular' }}>{Number(event.ticketPrice) === 0 ? "Free" : `Starting at £${event.ticketPrice}`}</h5>
        </div>

        <div id="event-info-btns" className="row text-center mb-4 px-2" style={{ fontFamily: 'BudujSansBold' }}>
          <div className="col">
            <Button className="btn-light-pink scaling-button d-flex align-items-center justify-content-center" style={{ borderRadius: '20px', width: '100%' }}>
              50 Tickets Sold <FaTicketAlt className="ms-2" />
            </Button>
          </div>
          <div className="col">
            <Button className="btn-teal scaling-button d-flex align-items-center justify-content-center" style={{ borderRadius: '20px', width: '100%' }}>
              £{Math.round(event.ticketPrice * 50)} Revenue <FaMoneyBillWave className="ms-2" />
            </Button>
          </div>
          <div className="col">
            <Button className="btn-light-green scaling-button d-flex align-items-center justify-content-center" style={{ borderRadius: '20px', width: '100%' }}>
              {event.capacity} Capacity <FaUsers className="ms-2" />
            </Button>
          </div>
          <div className="col">
            <Button className="btn-light-orange scaling-button d-flex align-items-center justify-content-center" style={{ borderRadius: '20px', width: '100%' }}>
              {event.subCategory} <MdCategory className="ms-2" />
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <h5 style={{ fontFamily: 'BudujSansBold' }}>Event Details</h5>
          <p>{event.description}</p>
        </div>

        <div className="row">
          <h5 style={{ fontFamily: 'BudujSansBold' }}>Additional Images</h5>
          {!event.additionalImage1 && !event.additionalImage2 && !event.additionalImage3 && (
            <p><i>No additional images available</i></p>
          )}
          {event.additionalImage1 && (
            <div className="col-md-4 mb-3">
              <img
                src={`http://localhost:5000/images/${event.additionalImage1}`}
                alt="Additional 1"
                className="img-fluid rounded"
                style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} // Added aspect ratio and object fit
              />
            </div>
          )}
          {event.additionalImage2 && (
            <div className="col-md-4 mb-3">
              <img
                src={`http://localhost:5000/images/${event.additionalImage2}`}
                alt="Additional 2"
                className="img-fluid rounded"
                style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} // Added aspect ratio and object fit
              />
            </div>
          )}
          {event.additionalImage3 && (
            <div className="col-md-4 mb-3">
              <img
                src={`http://localhost:5000/images/${event.additionalImage3}`}
                alt="Additional 3"
                className="img-fluid rounded"
                style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} // Added aspect ratio and object fit
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default EventDetail;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Placeholder } from 'react-bootstrap';
import Navibar from './Navibar';

function Home() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    const fetchEvents = async (filters = {}) => {
        try {
            const query = new URLSearchParams(filters).toString();
            const response = await fetch(`http://localhost:5000/events?${query}`);

            if (response.ok) {
                const data = await response.json();
                setEvents(data);
            } else {
                console.error('Error fetching events:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false); // Set loading to false after fetch is complete
        }
    };

    useEffect(() => {
        // Fetch events from the backend API on component mount
        fetchEvents();

        document.body.style.backgroundColor = 'rgb(245, 245, 245)';
        return () => {
            document.body.style.backgroundColor = '';
        };

    }, []);

    const handleFilter = (filters) => {
        setLoading(true);
        fetchEvents(filters);
    };

    return (
        <div style={{ fontFamily: 'BudujSansRegular' }}>
            <Navibar onFilter={handleFilter} />
            <div className="container">
                {loading ? (
                    <div className="row">
                        {[1, 2, 3].map((key) => (
                            <div style={{ margin: "20px 0 40px 0", padding: "0 12px" }} className="col-sm-6 col-lg-3" key={key}>
                                <Card className="card-container">
                                    <div style={{ height: '150px', width: '100%', backgroundColor: '#e0e0e0' }}>
                                        <Placeholder animation="wave" style={{ height: '100%', width: '100%' }} />
                                    </div>
                                    <Card.Body className="card-body">
                                        <Placeholder animation="wave" className="d-flex flex-column justify-content-center align-items-center">
                                            <Placeholder xs={8} className="mt-2 mb-2" />
                                            <Placeholder xs={6} className="mb-2" />
                                            <Placeholder xs={2} className="mb-2" />
                                        </Placeholder>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                ) : events.length === 0 ? (
                    <h3 className='mt-5 text-center opacity-50'>No Events at the moment. <br /> Create a new event by using the "Create" button above.</h3>
                ) : (
                    <>
                        <div className="row">
                            {events.map(event => (
                                <div style={{ margin: "20px 0 40px 0", padding: "0 12px" }} className="col-sm-6 col-lg-3" key={event.id}>
                                    <Link to={`/event/${event.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Card className="card-container">
                                            <div
                                                className="card-image"
                                                style={{ backgroundImage: `url(http://localhost:5000/images/${event.coverImage})`, height: '150px', backgroundSize: 'cover', backgroundPosition: 'center' }}
                                            />
                                            <Card.Body className="card-body">
                                                <Card.Title style={{ fontFamily: 'BudujSansBold' }} className="px-1 mt-1 fs-4">{event.name}</Card.Title>
                                                <Card.Text style={{ margin: "10px 0 0 0" }}>
                                                    {new Intl.DateTimeFormat('en-GB').format(new Date(event.date))} at {event.startTime}
                                                </Card.Text>
                                                <Card.Text style={{ margin: "5px 0 0 0" }}>
                                                    {event.venueName}
                                                </Card.Text>
                                                <Card.Text className="mb-1" style={{ marginTop: "5px", fontFamily: 'BudujSansBold' }}>
                                                    {event.ticketPrice === "0" ? "Free" : `From £${event.ticketPrice}`}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;

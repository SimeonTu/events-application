import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import Navibar from '../Navibar';
import { useDropzone } from 'react-dropzone';
import { IoCloudUploadOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateEvent() {
  const [coverImage, setCoverImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [isFreeTicket, setIsFreeTicket] = useState(false);
  const [ticketPrice, setTicketPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const successToast = () => {
    toast.success(<p className="m-2">You've successfully created an event!</p>, {
      position: "bottom-center"
    });
  };

  const onDrop = (acceptedFiles) => {
    setCoverImage(acceptedFiles[0]); // Only handling one file in this case for the cover image
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 2000000, // 2MB max file size
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif']
    }
  });

  const handleImageUpload = (event) => {
    setCoverImage(event.target.files[0]);
  };

  const handleAdditionalImageUpload = (index, event) => {
    const files = Array.from(event.target.files);
    const newAdditionalImages = [...additionalImages];
    newAdditionalImages[index] = files[0]; // Update the specific index
    setAdditionalImages(newAdditionalImages);
  };


  const handleSubCategorySelect = (subCategory) => {
    setSelectedSubCategory(subCategory);
  };

  const handleTicketPriceChange = (event) => {
    setTicketPrice(event.target.value);
    setIsFreeTicket(event.target.value === '');
  };

  const handleFreeTicketToggle = () => {
    setIsFreeTicket(!isFreeTicket);
    if (!isFreeTicket) {
      setTicketPrice('');
    }
  };

  const handleCreateEvent = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (!coverImage) {
      setErrorMessage('Cover image is required.');
      return;
    }

    if (!selectedSubCategory) {
      setErrorMessage('Sub Category is required.');
      return;
    }

    const form = event.target;

    const formData = new FormData();
    formData.append('name', form.eventName.value);
    formData.append('description', form.eventDescription.value);
    formData.append('country', form.eventCountry.value);
    formData.append('subCategory', selectedSubCategory);
    formData.append('date', form.eventDate.value);
    formData.append('startTime', form.eventStartTime.value);
    formData.append('endTime', form.eventEndTime.value);
    formData.append('venueName', form.venueName.value);
    formData.append('venueAddress', form.venueAddress.value);
    formData.append('ticketPrice', isFreeTicket ? 0 : ticketPrice);
    formData.append('capacity', form.capacity.value);
    formData.append('coverImage', coverImage);

    // Append each additional image with a unique field name
    additionalImages.forEach((file, index) => {
      if (file) {
        formData.append(`additionalImage${index + 1}`, file);
      }
    });

    try {
      const response = await fetch('http://localhost:5000/create-event', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        successToast();
        navigate('/home');
      } else {
        const data = await response.json();
        console.error('Error creating event:', data.error);
        alert(data.error);
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  useEffect(() => {

    document.body.style.backgroundColor = 'rgb(245, 245, 245)';

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <>
      <Navibar />
      <div className="container auth-wrapper d-flex justify-content-center" style={{ maxWidth: '100%' }}>
        <Form onSubmit={handleCreateEvent} className="w-100">
          <div className="d-flex flex-wrap justify-content-around">

            <div className="p-4" style={{ width: '50%' }}>
              <Form.Group>
                <p className="text-center fs-5 mb-3" style={{ fontFamily: "BudujSansRegular" }}>Upload Event Thumbnails</p>
                <div
                  {...getRootProps()}
                  style={{
                    borderRadius: '20px',
                    padding: '50px',
                    textAlign: 'center',
                    backgroundColor: coverImage ? 'transparent' : 'lightgrey', // Change background color if image is uploaded
                    backgroundImage: coverImage ? `url(${URL.createObjectURL(coverImage)})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    height: '300px',
                    width: '70%',
                    margin: '0 auto',
                    cursor: 'pointer'
                  }}
                >
                  <input {...getInputProps()} />
                  {!coverImage && (
                    <div>
                      <IoCloudUploadOutline size={100} color="rgb(112, 125, 255)" />
                      <p style={{ fontSize: '20px' }}>Drop your file here</p>
                      <Button
                        variant="link"
                        style={{
                          color: 'rgb(10, 117, 225)',
                          position: 'absolute',
                          bottom: '15px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '100%'
                        }}
                      >
                        Maximum file size allowed is 2MB
                      </Button>
                    </div>
                  )}
                </div>
                {coverImage ? (
                  <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <Button
                      onClick={() => document.getElementById('cover-image-input').click()}
                      style={{
                        height: '50px',
                        width: '135px',
                        backgroundColor: 'rgb(10, 117, 225)',
                        borderRadius: '20px',
                        color: 'white',
                        border: 'none',
                        boxShadow: '0 2px 2px rgba(0,0,0,0.25)',
                        fontSize: '18px'
                      }}
                    >
                      Replace
                    </Button>
                    <input
                      id="cover-image-input"
                      type="file"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <Button
                      onClick={() => document.getElementById('cover-image-input').click()}
                      style={{
                        height: '50px',
                        width: '135px',
                        backgroundColor: 'rgb(10, 117, 225)',
                        borderRadius: '25px',
                        color: 'white',
                        boxShadow: '0 2px 2px rgba(0,0,0,0.25)',
                        border: 'none'
                      }}
                    >
                      Browse
                    </Button>
                    <input
                      id="cover-image-input"
                      type="file"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                  </div>
                )}
              </Form.Group>

              {/* Additonal Images */}
              <Form.Group>
                <p className="text-center fs-5 mt-4 mb-2" style={{ fontFamily: "BudujSansRegular" }}>Upload More Pictures</p>
                <div className='d-flex flex-column align-items-center'>
                  <div className='d-flex justify-content-around' style={{ width: "100%" }}>
                    {[0, 1].map((index) => (
                      <div
                        key={index}
                        className="upload-zone upload-zone-small"
                        style={{
                          backgroundImage: additionalImages[index] ? `url(${URL.createObjectURL(additionalImages[index])})` : 'none',
                          backgroundColor: additionalImages[index] ? 'transparent' : 'lightgrey',
                          borderRadius: '20px',
                          paddingTop: '50px',
                          textAlign: 'center',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          height: '250px',
                          width: 'calc(50% - 50px)',
                          margin: '5px',
                          position: 'relative',
                          cursor: 'pointer',
                        }}
                        onClick={() => document.getElementById(`additional-image-input-${index}`).click()} // Trigger file input click
                      >
                        <input
                          id={`additional-image-input-${index}`}
                          type="file"
                          accept="image/*"
                          onChange={(event) => handleAdditionalImageUpload(index, event)}
                          style={{ display: 'none' }}
                        />
                        {!additionalImages[index] && (
                          <div>
                            <IoCloudUploadOutline size={50} color="rgb(112, 125, 255)" />
                            <p style={{ fontSize: '16px' }}>Drop file here</p>
                            <Button
                              variant="link"
                              style={{
                                color: 'blue',
                                position: 'absolute',
                                bottom: '15px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '100%',
                              }}
                            >
                              Maximum file size allowed is 2MB
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-3" style={{ width: "100%" }}>
                    <div
                      className="upload-zone upload-zone-small"
                      style={{
                        backgroundImage: additionalImages[2] ? `url(${URL.createObjectURL(additionalImages[2])})` : 'none',
                        backgroundColor: additionalImages[2] ? 'transparent' : 'lightgrey',
                        borderRadius: '20px',
                        paddingTop: '50px',
                        textAlign: 'center',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '250px',
                        width: 'calc(50% - 50px)',
                        margin: '5px auto',
                        position: 'relative',
                        cursor: 'pointer',
                      }}
                      onClick={() => document.getElementById('additional-image-input-2').click()} // Trigger file input click
                    >
                      <input
                        id="additional-image-input-2"
                        type="file"
                        accept="image/*"
                        onChange={(event) => handleAdditionalImageUpload(2, event)}
                        style={{ display: 'none' }}
                      />
                      {!additionalImages[2] && (
                        <div>
                          <IoCloudUploadOutline size={50} color="rgb(112, 125, 255)" />
                          <p style={{ fontSize: '16px' }}>Drop file here</p>
                          <Button
                            variant="link"
                            style={{
                              textDecoration: 'underline',
                              color: 'rgb(10, 117, 225)',
                              position: 'absolute',
                              bottom: '15px',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              width: '100%',
                            }}
                          >
                            Maximum file size allowed is 2MB
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Form.Group>
            </div>


            {/* Right Column */}
            <div className="px-5 py-3 container" style={{ width: '50%', backgroundColor: "white" }}>
              <div className="row">
                <Form.Group className="input-icon-wrapper">
                  <Form.Label className="form-header">Name of the Event</Form.Label>
                  <p style={{ marginBottom: "0.5rem" }}>This will be your event’s title. Your title will be used to help
                    create your event’s summary, description, category, and tags so be specific!</p>
                  <Form.Control type="text" name="eventName" placeholder="Event Name" required className="input-without-icon-create" />
                </Form.Group>
              </div>

              <div className="row">
                <Form.Group className="input-icon-wrapper d-flex flex-column">
                  <Form.Label className="form-header">Event Description</Form.Label>
                  <textarea name="eventDescription" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." rows={4} required className="input-without-icon-create-textarea" />
                </Form.Group>
              </div>

              <div className="row">
                <Form.Group className="input-icon-wrapper">
                  <Form.Label className="form-header">Event Country</Form.Label>
                  <Form.Control as="select" name="eventCountry" required className="input-without-icon-create">
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
                        onClick={() => handleSubCategorySelect(subCategory)}
                        style={selectedSubCategory === subCategory ?
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
                      name="eventDate"
                      placeholder="Date"
                      required
                      className="input-without-icon-create no-margin"
                      onClick={(e) => e.currentTarget.showPicker()}
                    />
                    <div className="d-flex justify-content-evenly align-items-center" style={{ width: "60%" }}>
                      <Form.Control
                        style={{ width: "33.3%" }}
                        type="time"
                        name="eventStartTime"
                        required
                        className="input-without-icon-create no-margin"
                        onClick={(e) => e.currentTarget.showPicker()}
                      />
                      <span className="fs-5">to</span>
                      <Form.Control
                        style={{ width: "33.3%" }}
                        type="time"
                        name="eventEndTime"
                        required
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
                  <Form.Control type="text" name="venueName" placeholder="Enter the name of the venue" required className="input-without-icon-create" />
                </Form.Group>
              </div>

              <div className="row">
                <Form.Group className="input-icon-wrapper">
                  <Form.Label className="form-header">Venue Address</Form.Label>
                  <Form.Control type="text" name="venueAddress" placeholder="Enter the address of the venue" required className="input-without-icon-create" />
                </Form.Group>
              </div>

              <div className="row">
                <Form.Group className="input-icon-wrapper" style={{ marginBottom: "15px" }}>
                  <Form.Label className="form-header">Ticket Price</Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Control
                      type="number"
                      name="ticketPrice"
                      placeholder="£0.00"
                      value={ticketPrice}
                      onChange={handleTicketPriceChange}
                      min="0"
                      disabled={isFreeTicket}
                      required={!isFreeTicket}
                      className="input-without-icon-create no-margin"
                      style={{ width: "125px" }}
                    />
                    <Button
                      onClick={handleFreeTicketToggle}
                      className="ms-2 input-without-icon-create no-margin"
                      style={isFreeTicket ?
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
                  <Form.Label className="form-header">Capacity</Form.Label>
                  <Form.Control
                    type="number"
                    name="capacity"
                    placeholder="0"
                    min="0"
                    step="1"
                    required
                    className="input-without-icon-create"
                    style={{ width: "75px" }}
                  />
                </Form.Group>
              </div>

              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              <Button style={{ height: "50px", borderRadius: "20px", fontFamily: "BudujSansRegular" }} variant="primary" type="submit" className="w-100">Create Event</Button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}

export default CreateEvent;

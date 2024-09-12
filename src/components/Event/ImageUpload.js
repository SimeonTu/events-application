import React from 'react';
import { Button } from 'react-bootstrap';
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from 'react-dropzone';

const ImageUpload = ({ image, onImageChange, uploadText, maxSize = 2000000 }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      onImageChange(acceptedFiles[0]);
    },
    maxSize: maxSize,
    accept: 'image/*',
  });

  return (
    <div
      {...getRootProps()}
      style={{
        borderRadius: '20px',
        padding: '50px',
        textAlign: 'center',
        backgroundColor: image ? 'transparent' : 'lightgrey',
        backgroundImage: image ? `url(/images/${image})` : 'none',
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
      {!image && (
        <div>
          <IoCloudUploadOutline size={100} color="rgb(112, 125, 255)" />
          <p style={{ fontSize: '20px' }}>{uploadText}</p>
          <Button
            variant="link"
            style={{
              textDecoration: 'underline',
              color: 'blue',
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
  );
};

export default ImageUpload;

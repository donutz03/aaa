// src/components/ImageComponent.js
import React from 'react';
import './ImageComponent.css'; // Import the CSS file


const ImageComponent = ({ src, altText }) => {
  return (
    <div className="image-container">
      <img
        src={src}
        alt={altText || "Description of the image"}
        className="centered-image"
      />
    </div>
  );
};

export default ImageComponent;

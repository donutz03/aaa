// src/components/ImageGallery.js
import React, { useState } from 'react';
import ImageComponent from './ImageComponent';
import './ImageGallery.css';

const ImageGallery = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div className="image-gallery">
      <div className="gallery-container">
        <button className="arrow-button" onClick={handlePrevClick}>&larr; Prev</button>
        <ImageComponent src={images[currentImageIndex]} altText={`Image ${currentImageIndex + 1}`} />
        <button className="arrow-button" onClick={handleNextClick}>Next &rarr;</button>
      </div>
    </div>
  );
};

export default ImageGallery;

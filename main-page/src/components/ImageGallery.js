
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import ImageComponent from './ImageComponent';
import './ImageGallery.css';

const ImageGallery = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showCalculator, setShowCalculator] = useState(false);
  const navigate = useNavigate();

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  const toggleCalculator = (show) => {
    setShowCalculator(show);
  };

  return (
    <div className="image-gallery">
      <div className="gallery-container">
        {!showCalculator && (
          <button className="arrow-button" onClick={handlePrevClick}>
            &larr; Prev
          </button>
        )}

        <ImageComponent
          src={images[currentImageIndex]} // Pass the current image URL as src
          altText={`Description of Image ${currentImageIndex + 1}`}
          currentImageIndex={currentImageIndex}
          toggleCalculator={toggleCalculator}
        />

        {!showCalculator && (
          <button className="arrow-button" onClick={handleNextClick}>
            Next &rarr;
          </button>
        )}

        {showCalculator && <Navigate to="/calorie-calculator" replace />}
      </div>
    </div>
  );
};

export default ImageGallery;

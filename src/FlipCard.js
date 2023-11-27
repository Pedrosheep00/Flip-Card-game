import React from 'react';
import './FlipCard.css';

const FlipCard = ({ index, image, isFlipped, onClick, checkForWin }) => {
  const handleClick = () => {
    // Only allow flipping if less than 2 cards are flipped
    if (!isFlipped || isFlipped.length < 2) {
      onClick(index);
      checkForWin();
    }
  };

  console.log('Image path:', image); // Add this line to check the image path

  return (
    <div
      className={`flip-card ${isFlipped ? 'flipped' : ''}`}
      onClick={handleClick}
    >
      <div className="flip-card-inner">
        <div className={`flip-card-front ${isFlipped ? 'hidden' : ''}`}>Click to flip</div>
        <div className="flip-card-back">
          <img src={image} alt={`Card ${index}`} />
        </div>
      </div>
    </div>
  );
};

export default FlipCard;

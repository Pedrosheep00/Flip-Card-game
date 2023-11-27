// App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import FlipCard from './FlipCard';

const App = () => {
  // Array of image paths for the cards
  const images = useMemo(
    () => ['./images/1.jpg', './images/2.jpg', './images/3.jpg', './images/4.jpeg', './images/5.jpg'],
    []
  );

  // Number of cards you want
  const totalCards = 16;

  // State to keep track of shuffled images
  const [shuffledImages, setShuffledImages] = useState([]);

  // State to keep track of flipped cards
  const [flippedCards, setFlippedCards] = useState([]);

  // State to control the visibility of the win overlay
  const [isWinVisible, setIsWinVisible] = useState(false);

  useEffect(() => {
    // Check if the images have already been shuffled
    if (!shuffledImages.length) {
      // Calculate the repeat factor needed to reach the desired total cards
      const repeatFactor = Math.ceil(totalCards / images.length);
  
      // Create an array with repeated images
      const repeatedImages = images.flatMap((image) =>
        Array.from({ length: repeatFactor }, () => image)
      );
  
      // Slice the repeated images array to get the desired total cards
      const newShuffledImages = shuffleArray(repeatedImages).slice(0, totalCards);
  
      // Set the shuffled images only once when the component mounts
      setShuffledImages(newShuffledImages);
    }
  }, [totalCards, images, shuffledImages]); // Add shuffledImages to the dependency array
  

  // Function to handle card click
  const handleCardClick = (index) => {
    setFlippedCards((prevFlippedCards) => [...prevFlippedCards, index]);
  };

  // Function to check for a win
const checkForWin = () => {
  // Count the occurrences of each image in flipped cards
  const imageCounts = {};
  flippedCards.forEach((index) => {
    const image = shuffledImages[index];
    if (imageCounts[image]) {
      imageCounts[image]++;
    } else {
      imageCounts[image] = 1;
    }
  });

  // Check if any image is repeated 4 times or more
  const hasWinningImage = Object.values(imageCounts).some((count) => count >= 4);

  // Display win overlay when an image is repeated 4 times or more
  if (hasWinningImage) {
    setIsWinVisible(true);
  }
};

  // Function to reset the game
  const resetGame = () => {
    // Shuffle all the images again
    const newShuffledImages = shuffleArray([...shuffledImages]);
    setShuffledImages(newShuffledImages);

    setFlippedCards([]);
    setIsWinVisible(false);
  };

  return (
    <div className="App">
      <button className="reset-button" onClick={resetGame}>Reset Game</button>
      <div className="card-container">
        {shuffledImages.map((image, index) => (
          <FlipCard
            key={index}
            index={index}
            image={shuffledImages[index]}
            isFlipped={flippedCards.includes(index)}
            onClick={handleCardClick}
            checkForWin={checkForWin}
          />
        ))}
      </div>
      {/* Win overlay */}
      <div className={`win-overlay ${isWinVisible ? 'overlay-visible' : ''}`}>
        <p>You won!</p>
      </div>
    </div>
  );
};
// Function to shuffle array elements
const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export default App;

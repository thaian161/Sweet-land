import { useState, useEffect } from 'react';
import './index.css';

import ScoreBoard from './components/ScoreBoard';

import blueCandy from './images/Blue.png';
import brownCandy from './images/Brown.png';
import greenCandy from './images/Green.png';
import pinkCandy from './images/Pink.png';
import purpleCandy from './images/Purple.png';
import yellowCandy from './images/Yellow.png';
import blank from './images/blank.png';

const width = 8;
const candyColors = [
  blueCandy,
  brownCandy,
  greenCandy,
  pinkCandy,
  purpleCandy,
  yellowCandy,
];

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);

  const dragStart = (e) => {
    console.log(e.target);
    console.log('drag start');
  };

  const dragDrop = (e) => {
    console.log(e.target);
    console.log('drag drop');
  };

  const dragEnd = (e) => {
    console.log(e.target);
    console.log('drag end');
  };

  const createBoard = () => {
    const randomColorArrangement = [];

    for (let i = 0; i < width * width; i++) {
      /* get randomColor in 2 steps
      const randomNumberFrom0To5 = Math.floor(
        Math.random() * candyColors.length
      );
      const randomColor = candyColors[randomNumberFrom0To5];
      */

      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
  };

  useEffect(() => {
    createBoard();
  }, []);


  useEffect(() => {
    const checkForColumnOfFour = () => {
      for (let i = 0; i <= 39; i++) {
        const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
        const decidedColor = currentColorArrangement[i];

        if (
          columnOfFour.every(
            (square) => currentColorArrangement[square] === decidedColor
          )
        ) {
          columnOfFour.forEach(
            (square) => (currentColorArrangement[square] = '')
          );
        }
      }
    };

    const checkForRowOfFour = () => {
      for (let i = 0; i < 64; i++) {
        const rowOfFour = [i, i + 1, i + 2, i + 3];
        const decidedColor = currentColorArrangement[i];
        const notValid = [
          5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47,
          53, 54, 55, 62, 63, 64,
        ];

        if (notValid.includes(i)) continue;

        if (
          rowOfFour.every(
            (square) => currentColorArrangement[square] === decidedColor
          )
        ) {
          rowOfFour.forEach((square) => (currentColorArrangement[square] = ''));
        }
      }
    };

    const checkForColumnOfThree = () => {
      for (let i = 0; i < 47; i++) {
        const columnOfThree = [i, i + width, i + width * 2];
        const decidedColor = currentColorArrangement[i];

        if (
          columnOfThree.every(
            (square) => currentColorArrangement[square] === decidedColor
          )
        ) {
          columnOfThree.forEach(
            (square) => (currentColorArrangement[square] = '')
          );
        }
      }
    };

    const checkForRowOfThree = () => {
      for (let i = 0; i < 64; i++) {
        const rowOfThree = [i, i + 1, i + 2];
        const decidedColor = currentColorArrangement[i];
        const notValid = [
          6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
        ];

        if (notValid.includes(i)) continue;

        if (
          rowOfThree.every(
            (square) => currentColorArrangement[square] === decidedColor
          )
        ) {
          rowOfThree.forEach(
            (square) => (currentColorArrangement[square] = '')
          );
        }
      }
    };

    const moveIntoSquareBelow = () => {
      for (let i = 0; i <= 55; i++) {
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
        const isFirstRow = firstRow.includes(i);

        if (isFirstRow && currentColorArrangement[i] === '') {
          let randomNumber = Math.floor(Math.random() * candyColors.length);
          currentColorArrangement[i] = candyColors[randomNumber];
        }
        if (currentColorArrangement[i + width] === '') {
          currentColorArrangement[i + width] = currentColorArrangement[i];
          currentColorArrangement[i] = '';
        }
      }
    };

    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();

      setCurrentColorArrangement([...currentColorArrangement]);
    }, 100);

    return () => clearInterval(timer);
  }, [currentColorArrangement]);

  // console.log(currentColorArrangement);

  return (
    <div className="app">
      <ScoreBoard /*score={scoreDisplay}*/ />
      <div className="gameboar-wrapper">
        <div className="game">
          {currentColorArrangement.map((candyColor, index) => (
            <div className="candy-wrapper">
              <img
                key={index}
                src={candyColor}
                alt={candyColor}
                data-id={index}
                // style={{ backgroundColor: candyColor }}
                draggable={true}
                onDragStart={dragStart}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
                onDragLeave={(e) => e.preventDefault()}
                onDrop={dragDrop}
                onDragEnd={dragEnd}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;

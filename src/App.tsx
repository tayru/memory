import React, { useEffect, useState } from 'react';
import './App.css';
import { Header } from './Components/Header/Header';
import { SideBar } from './Components/SideBar/SideBar';
import { Board } from './Components/Board/Board';
import { Modal } from './Components/Modal/Modal';

import fire from "./images/fire.png";
import Nginx from "./images/Nginx.png";
import nodejs from "./images/nodejs.png";
import react from "./images/react.png";
import redux from "./images/redux.png";
import Typescript from "./images/Typescript.png";
import webpack from "./images/webpack.png";
import webstorm from "./images/webstorm.png";

interface Card {
  id: number;
  img: string;
}

const initialArrayCards: Card[] = [
  { id: 1, img: fire },
  { id: 2, img: Nginx },
  { id: 3, img: nodejs },
  { id: 4, img: react },
  { id: 5, img: redux },
  { id: 6, img: Typescript },
  { id: 7, img: webpack },
  { id: 8, img: webstorm },
];

const pairOfArrayCards: Card[] = [...initialArrayCards, ...initialArrayCards];

interface AppProps {}

export const App: React.FC<AppProps> = () => {
  const allMoves: number = 40;
  const [currentMove, setCurrentMove] = useState<number>(0);
  const [MoveLeft, setMoveLeft] = useState<number>(allMoves);

  const [arrayCards, setArrayCards] = useState<Card[]>([]);
  const [openedCards, setOpenedCards] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [hidden, setHidden] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const preloadImages = (images: string[]) => {
    images.forEach(src => {
      new Image().src = src;
    });
  };

  const startGame = (): void => {
    setCurrentMove(0);
    setMoveLeft(allMoves);
    setArrayCards(shuffle(pairOfArrayCards));
    setOpenedCards([]);
    setMatched([]);
    setHidden([]);
    setModalOpen(false);
  };

  useEffect(() => {
    preloadImages(initialArrayCards.map(card => card.img));
    startGame();
  }, []);

  const shuffle = (array: Card[]): Card[] => {
    return array.sort(() => Math.random() - 0.5);
  };

  const checkWin = (): boolean => matched.length === 8;

  useEffect(() => {
    if (checkWin()) setModalOpen(true);
  }, [matched]);

  useEffect(() => {
    setMoveLeft(allMoves - currentMove);
  }, [currentMove]);

  useEffect(() => {
    if (openedCards.length < 2) return;

    const firstMatched = arrayCards[openedCards[0]];
    const secondMatched = arrayCards[openedCards[1]];

    if (secondMatched && firstMatched.id === secondMatched.id) {
      setMatched((prevMatched) => [...prevMatched, firstMatched.id]);
    }

    if (openedCards.length === 2) {
      const timeoutId = setTimeout(() => {
        setOpenedCards([]);
      }, 1500);

      return () => clearTimeout(timeoutId);
    }
  }, [openedCards, arrayCards]);

  useEffect(() => {
    if (openedCards.length === 2) {
      const firstMatched = arrayCards[openedCards[0]];
      const secondMatched = arrayCards[openedCards[1]];

      if (secondMatched && firstMatched.id === secondMatched.id) {
        setHidden((prevHidden) => [...prevHidden, firstMatched.id]);
      }
    }
  }, [openedCards, arrayCards]);

  const flipCard = (index: number): void => {
    if (openedCards.length === 2) {
      setOpenedCards([index]);
    } else {
      if (!openedCards.includes(index)) {
        setOpenedCards((opened) => [...opened, index]);
      }
    }
  };

  const increaseMove = (): void => {
    setCurrentMove((move) => move + 1);
  };

  useEffect(() => {
    if (currentMove >= 40) setModalOpen(true);
  }, [currentMove]);

  return (
      <>
        <div className={'container'}>
          <Modal open={modalOpen} resetGame={startGame} isVictory={checkWin()} turns={currentMove} />
          <Header title='Memory game' />
          <div className='gameContainer'>
            <SideBar title='сделано ходов' allMoves={allMoves} number={currentMove} />
            <Board
                increaseMove={increaseMove}
                arrayCards={arrayCards}
                openedCards={openedCards}
                matched={matched}
                shuffle={shuffle}
                flipCard={flipCard}
                hidden={hidden}
            />
            <SideBar title='осталось попыток' allMoves={allMoves} number={MoveLeft} />
          </div>
        </div>
      </>
  );
};

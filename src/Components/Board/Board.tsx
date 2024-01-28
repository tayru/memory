import React from 'react';
import './Board.css';
import { Cell } from '../Cell/Cell';

interface BoardProps {
    increaseMove: () => void;
    arrayCards: { id: number; img: string }[];
    openedCards: number[];
    matched: number[];
    shuffle: (array: { id: number; img: string }[]) => { id: number; img: string }[];
    flipCard: (index: number) => void;
    hidden: number[];
}

export const Board: React.FC<BoardProps> = ({ increaseMove, arrayCards, openedCards, matched, shuffle, flipCard, hidden }) => {
    const handleCardClick = (index: number): void => {
        if (!openedCards.includes(index)) {
            flipCard(index);
            increaseMove();
        }
    };

    const Cells = arrayCards.map((item, index) => {
        let isFlipped = false;
        let isHidden = false;

        if (openedCards.includes(index)) isFlipped = true;
        if (matched.includes(item.id)) {
            isFlipped = true;
            isHidden = true;
        }
        if (hidden.includes(item.id)) isHidden = true;

        return (
            <Cell
                key={index}
                item={item}
                flipped={isFlipped}
                hidden={isHidden}
                onClick={() => handleCardClick(index)}
            />
        );
    });

    return <main className='board'>{Cells}</main>;
};

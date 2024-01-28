import React from 'react';
import './Modal.css';

interface ModalProps {
    open: boolean;
    resetGame: () => void;
    isVictory: boolean;
    turns: number;
}

export const Modal: React.FC<ModalProps> = ({ open, resetGame, isVictory, turns }) => {
    if (!open) return null;

    return (
        <>
        <div className="modal-back"></div>
        <div className="modal">
            <div className="modal-title">
                {isVictory ? `Поздравляем, вы выиграли на ${turns} ходу!` : 'Увы, вы проиграли'}
            </div>

            <button className="modal-btn" onClick={resetGame}>
                Сыграть ещё
            </button>
        </div>
        </>
    );
};

import React from 'react';
import './Cell.css';
import defaultImg from '../../images/default.png';
import classNames from 'classnames';

interface CellProps {
    item: { id: number; img: string };
    flipped: boolean;
    hidden: boolean;
    onClick: () => void;
}

export const Cell: React.FC<CellProps> = (props) => {
    const cellClasses = classNames('cell', {
        'flipped': props.flipped,
        'hidden': props.hidden
    });
    const imgClasses = classNames({ 'flipped': props.flipped });

    return (
        <div
            className={cellClasses}
            onClick={props.onClick}
        >
            <img className={imgClasses} src={props.flipped ? props.item.img : defaultImg} alt="card" />
        </div>
    );
};
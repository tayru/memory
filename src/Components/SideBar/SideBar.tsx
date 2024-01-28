import React from 'react';
import './SideBar.css';

interface SideBarProps {
    title: string;
    allMoves: number;
    number: number;
}

export const SideBar: React.FC<SideBarProps> = ({ title, number }) => {
    return (
        <aside className="sideBar">
            <div className="sideBar-title">{title}</div>
            <span className="sideBar-number">{number}</span>
        </aside>
    );
};

import React from 'react';
import './Header.css';

interface HeaderProps {
    title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
    return <header className='title'>{title}</header>;
};

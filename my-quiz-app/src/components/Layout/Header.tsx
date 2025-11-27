import React from 'react';

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  title = 'MERN Quiz App' 
}) => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="header-title">
          <span className="header-icon">🎯</span>
          {title}
        </h1>
      </div>
    </header>
  );
};
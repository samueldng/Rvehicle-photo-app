import React from 'react';
import { Card } from 'react-bootstrap';

const StyledCard = ({ title, icon, bgColor, onClick }) => {
  return (
    <Card
      className="text-center p-4 shadow-lg border-0 rounded-3"
      style={{ background: bgColor, transition: 'transform 0.3s, box-shadow 0.3s' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      onClick={onClick}
    >
      <Card.Body>
        {icon}
        <Card.Title className="text-white" style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.25rem' }}>{title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default StyledCard;

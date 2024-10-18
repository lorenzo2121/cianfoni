import React from 'react';
import '../Styles/card2.css'; // Assicurati di collegare il tuo file CSS

const Card2 = ({ image, title, description }) => {
  return (
    <div className="card">
      <img src={image} alt="Card" className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export default Card2;

import React from 'react';
import '../Styles/cardreviews.css'; // Importa il file CSS per lo stile del componente

const Star = ({ filled }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? 'gold' : 'gray'}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

function Card({ rating, image, title, description }) {
  return (
    <div className="card-reviews">
      <img src={image} alt="User" className="card-avatar" />
      <h1>{title}</h1>
      <p>{description}</p>
      <div className="rating">
        {[...Array(5)].map((_, index) => (
          <Star key={index} filled={index < rating} />
        ))}
      </div>
    </div>
  );
}

export default Card;

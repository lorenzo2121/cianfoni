import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faStar as faStarEmpty } from '@fortawesome/free-solid-svg-icons'; // Importa l'icona di stella vuota
import '../Styles/star.css';

const Star = ({ rating, onChange }) => {

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} className="star active"  />);
    } else {
      stars.push(<FontAwesomeIcon key={i} icon={faStarEmpty} className="star empty" />);
    }
  }

  return <div className="star-container">{stars}</div>;
};

export default Star;

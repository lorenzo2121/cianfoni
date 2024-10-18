import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faStar as faStarEmpty } from '@fortawesome/free-solid-svg-icons';
import '../Styles/star.css';

const Star = ({ initialRating = 0, onChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleClick = (index) => {
    setRating(index);
    if (onChange) {
      onChange(index);
    }
  };

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} className="star active" onClick={() => handleClick(i)} />);
    } else {
      stars.push(<FontAwesomeIcon key={i} icon={faStarEmpty} className="star empty" onClick={() => handleClick(i)} />);
    }
  }

  return <div className="star-container">{stars}</div>;
};

export default Star;

// src/components/MagnifyingGlassAnimation.js
import React from 'react';
import Lottie from 'lottie-react';
import magnifyingGlassAnimation from '../Assets/Animation - 1729013525945.json'; // Importa il file JSON

const MagnifyingGlassAnimation = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '60vh',
      backgroundColor: 'rgb(2, 75, 20)', // Colore di sfondo
      borderRadius: '8px',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)',
    }}>
      <Lottie
        animationData={magnifyingGlassAnimation}
        loop={true} // Ripete l'animazione
        style={{ width: '150px', height: '150px' }} // Dimensioni dell'animazione
      />
    </div>
  );
};

export default MagnifyingGlassAnimation;

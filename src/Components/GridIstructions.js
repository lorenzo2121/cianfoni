import React from 'react';
import '../Styles/gridistructions.css'; // Importa il file CSS per gli stili

const GridInstructions = () => {
  return (
    <div className="outer-container"> {/* Contenitore esterno */}
      <div className="grid-container">
        <div className="grid-item item1">
          <div className="svg-container">
            <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#00ff00', stopOpacity: 1 }} /> {/* Verde brillante */}
                  <stop offset="100%" style={{ stopColor: '#008000', stopOpacity: 1 }} /> {/* Verde scuro */}
                </linearGradient>
              </defs>
              <circle cx="25" cy="25" r="25" fill="url(#grad1)" />
              <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="20" fill="white">1</text>
            </svg>
          </div>
        </div>
        <div className="grid-item item2">
          <h2>Cerca</h2>
          <p>Niente di più facile. Cerca il professionista che fa per te</p>
        </div>
        <div className="grid-item item3">
          <div className="svg-container">
            <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#00ff00', stopOpacity: 1 }} /> {/* Verde brillante */}
                  <stop offset="100%" style={{ stopColor: '#008000', stopOpacity: 1 }} /> {/* Verde scuro */}
                </linearGradient>
              </defs>
              <circle cx="25" cy="25" r="25" fill="url(#grad2)" />
              <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="20" fill="white">2</text>
            </svg>
          </div>
        </div>
        <div className="grid-item item4">
          <h2>Confronta</h2>
          <p>Confronta vari professionisti</p>
        </div>
        <div className="grid-item item5">
          <div className="svg-container">
            <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#00ff00', stopOpacity: 1 }} /> {/* Verde brillante */}
                  <stop offset="100%" style={{ stopColor: '#008000', stopOpacity: 1 }} /> {/* Verde scuro */}
                </linearGradient>
              </defs>
              <circle cx="25" cy="25" r="25" fill="url(#grad3)" />
              <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="20" fill="white">3</text>
            </svg>
          </div>
        </div>
        <div className="grid-item item6">
          <h2>Contatta</h2>
          <p>Scegli il professionista che fa al caso tuo</p>
        </div>
      </div>
    </div>
  );
};

export default GridInstructions;

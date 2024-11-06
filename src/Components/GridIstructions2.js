import React from 'react';
import '../Styles/gridistructions2.css'; // Importa il file CSS per gli stili

const GridInstructions = () => {
  return (
    <div className="outer-container2"> {/* Contenitore esterno */}
      <div className="grid-container2">
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
          <h2>Come iniziare</h2>
          <p>Niente di più facile. Registrati compilando con i tuoi dati il form</p>
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
          <h2>Descrizione</h2>
          <p>Assicurati di dare una descrizione della tua azienda e dei tuoi servizi il più completa possibile,elencando tutti i tuoi servizi,
            questo garantirà una migliore visibilità e ricercabilità all'interno del nostro sito.
            Esempio(azienda specializzata in riparazione tubature lavandini sanitari perdite di acqua,
            servizi: riparazione lavandino,riparazione bidet,riparazione tubo e tubature ecc...)
          </p>
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
          <h2>Ottieni le recensioni</h2>
          <p>Una volta registrato nel nostro sito potrai contattare gli utenti (dalle richieste visibili nel tuo profilo) a cui serve un lavoro o una prestazione ed ottenere
            le recensioni dai tuoi clienti.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GridInstructions;

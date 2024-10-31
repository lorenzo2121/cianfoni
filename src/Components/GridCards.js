import React from 'react';
import '../Styles/gridcards.css'; // Assicurati di collegare il tuo file CSS per le card
import Card2 from './Card2'; // Importa il componente della card (dovrai creare il tuo con le modifiche necessarie)
import img1 from '../Assets/RES_SIGNUP_PRO_STEP2.png'

// Definisci un array di dati per le card (immagini, titoli e descrizioni)
const cardData = [
  {
    id: 1,
    image: img1,
    title: 'Card 1',
    description: 'Descrizione per la Card 1.'
  },
  {
    id: 2,
    image: 'path_to_your_image_2.jpg',
    title: 'Card 2',
    description: 'Descrizione per la Card 2.'
  },
  {
    id: 3,
    image: 'path_to_your_image_3.jpg',
    title: 'Card 3',
    description: 'Descrizione per la Card 3.'
  },
  // Aggiungi altre card se necessario
];

const GridCards = () => {
  return (
    <div className="grid-container">
      {cardData.map(card => (
        <Card2
          key={card.id}
          image={card.image}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  );
};

export default GridCards;

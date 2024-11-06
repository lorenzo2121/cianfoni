// TrendServiceCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase';  // Importa Firestore
import '../Styles/cardtrendservice.css';

function TrendServiceCard({ title, description, imageUrl }) {
  const navigate = useNavigate();

  // Funzione per eseguire la query su Firestore in base al titolo della card
  const fetchResultsFromFirestore = async (title) => {
    const q = query(collection(db, "professionisti"), where("profession", "==", title.toLowerCase())); // Query Firestore per cercare i servizi in base alla professione

    try {
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(results)
      // Naviga verso SearchResults passando i risultati
      navigate('/results', {
        state: { results }
      });
    } catch (error) {
      console.error("Errore durante la ricerca su Firestore:", error);
    }
  };

  const handleCardClick = () => {
    fetchResultsFromFirestore(title);  // Esegui la query su Firestore quando clicchi sulla card
  };

  return (
    <div className='trend-service-card' onClick={handleCardClick}>
      <img src={imageUrl} alt={title} className='trend-service-card-image' />
      <h3 className='trend-service-card-title'>{title}</h3>
      <p className='trend-service-card-description'>{description}</p>
    </div>
  );
}

export default TrendServiceCard;

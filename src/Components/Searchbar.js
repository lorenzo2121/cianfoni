import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Assicurati che il percorso sia corretto
import MiniSearch from 'minisearch';

import '../Styles/searchbar.css';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [miniSearch, setMiniSearch] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const professionistiRef = collection(db, 'professionisti');
      const querySnapshot = await getDocs(professionistiRef);
      const documents = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        
        documents.push({
          id: doc.id,
          name: data.name,
          phone: data.phone,
          profession: data.profession,
          experience: data.experience,
          email: data.email,
          city: data.city,
          profilePictureUrl: data.profilePictureUrl,
          description: data.description,
          services: data.services.join(' '), // Converti il vettore in una stringa separata da spazi
        });
      });

      const miniSearchInstance = new MiniSearch({
        fields: ['profession', 'description', 'services'], // Campi da indicizzare
        storeFields: ['id', 'name', 'phone', 'city', 'profession', 'experience', 'email', 'description', 'profilePictureUrl'], // Campi da restituire nei risultati
        searchOptions: {
          prefix: true, // Cerca corrispondenze che iniziano con il termine di ricerca
          fuzzy: 0, // Abilita la ricerca fuzzy con un livello di tolleranza agli errori
        },
      });

      miniSearchInstance.addAll(documents);
      setMiniSearch(miniSearchInstance);
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      console.log('Search term is empty');
      return;
    }

    if (miniSearch) {
      const results = miniSearch.search(searchTerm);
      console.log('Search results:', results);
      navigate('/results', { state: { results } });
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Inserire Professione..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch} className="search-button">
        Cerca
      </button>
    </div>
  );
}

export default SearchBar;

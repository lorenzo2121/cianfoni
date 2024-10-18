import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Styles/searchresults.css';
import logo from '../Assets/logo-removebg-preview.png';

function SearchResults() {
  const { state } = useLocation();
  const { results } = state || { results: [] };
  const navigate = useNavigate();

  const [filterZone, setFilterZone] = useState(''); // Stato per il filtro della zona

  // Funzione per gestire il cambio del filtro di zona
  const handleZoneFilterChange = (e) => {
    setFilterZone(e.target.value.toLowerCase()); // Converte il valore in lowercase per confronti non case-sensitive
  };

  const handleClick = () => {
    navigate('/'); 
  };

  const handleVisitProfile = (email, id) => {
    navigate(`/profile-public`, {
      state: {
        referrer: { pathname: '/results' },
        email: email,  // Opzionale: passaggio dell'indirizzo email come parte dello stato
        id: id
      }
    });
  };

  const filteredResults = results.filter(result => {
    // Verifica che result.city sia definito prima di chiamare toLowerCase()
    return result.city && result.city.toLowerCase().includes(filterZone);
  });

  return (
    <>
      <img className='image' src={logo} onClick={handleClick} alt="Logo" />
      <div className="search-results">
        {/* Elemento di input per il filtro di zona */}
        <div className="zone-filter">
          <label htmlFor="zone">Filtra per zona:</label>
          <input
            type="text"
            id="zone"
            value={filterZone}
            onChange={handleZoneFilterChange}
            placeholder="Inserisci la zona (es. Milano)"
          />
        </div>

        {/* Visualizzazione dei risultati filtrati */}
        {filteredResults.length > 0 ? (
          <ul>
            {filteredResults.map((result) => (
              <li key={result.id}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img className='img-profile' src={result.profilePictureUrl} alt="Profile" />
                </div>
                <h3 className="text-green">{result.name}</h3>
                <p className="text-green"><strong>Professione:</strong> {result.profession}</p>
                <p className="text-green"><strong>Esperienza:</strong> {result.experience} anni</p>
                <button className='result-button' onClick={() => handleVisitProfile(result.email, result.id)}>
                  Visita il Profilo
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nessun risultato trovato</p>
        )}
      </div>
    </>
  );
}

export default SearchResults;

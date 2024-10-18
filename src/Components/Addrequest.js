import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db, storage } from '../firebase'; // Assicurati di importare anche il modulo di storage
import { collection, query, where, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../Styles/addrequest.css';
import { Circles } from 'react-loader-spinner'; // Importa il componente per il caricamento
import Footer from './Footer'
import Navbarsignup from './NavbarSignup'
import { FaBroadcastTower } from 'react-icons/fa';

const AddRequest = () => {
  const location = useLocation();
  const { email } = location.state || {};
  const [prestazione, setPrestazione] = useState('');
  const [zona, setZona] = useState('');
  const [telefono, setTelefono] = useState('');
  const [descrizione, setDescrizione] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false); // Stato per il caricamento
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(''); // Stato per il messaggio di successo o errore

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(''); // Resetta il messaggio prima dell'invio

    const zonaLowerCase = zona.toLowerCase();

    const requestJson = {
      "prestazione/servizio": prestazione,
      "zona": zonaLowerCase,
      "telefono": telefono,
      "descrizione": descrizione,
      "imageUrl": imageUrl,
      "status": "locked"
    };

    try {
      // Caricamento immagine su Firebase Storage
      if (imageFile) {
        const storageRef = ref(storage, `images/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        const url = await getDownloadURL(storageRef);
        setImageUrl(url);
        requestJson.imageUrl = url;
      }

      // Query per trovare l'utente con l'email
      const professionistiCollection = collection(db, 'professionisti');
      const q = query(professionistiCollection, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('Nessun professionista trovato con questa email.');
      } else {
        const userDocRef = querySnapshot.docs[0].ref;
        await updateDoc(userDocRef, {
          richieste: arrayUnion(requestJson)
        });

        // Resetta i campi del form
        setPrestazione('');
        setZona('');
        setTelefono('');
        setDescrizione('');
        setImageFile(null);
        setImageUrl('');
        setMessage('Richiesta aggiunta con successo!'); // Messaggio di successo
      }
    } catch (e) {
      setError('Errore durante l\'aggiunta della richiesta');
      console.error('Errore durante l\'aggiunta della richiesta:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbarsignup />
    <div className="add-request-container">
      <h2 className="add-request-title">Aggiungi una Richiesta</h2>
      <form onSubmit={handleSubmit} className="add-request-form">
        <div>
          <label className="add-request-label">
            Prestazione/Servizio:
            <input
              type="text"
              value={prestazione}
              onChange={(e) => setPrestazione(e.target.value)}
              placeholder="Inserisci prestazione/servizio"
              required
              className="add-request-input"
            />
          </label>
        </div>
        <div>
          <label className="add-request-label">
            Zona:
            <input
              type="text"
              value={zona}
              onChange={(e) => setZona(e.target.value)}
              placeholder="Inserisci zona"
              required
              className="add-request-input"
            />
          </label>
        </div>
        <div>
          <label className="add-request-label">
            Telefono:
            <input
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="Inserisci numero di telefono"
              className="add-request-input"
            />
          </label>
        </div>
        <div>
          <label className="add-request-label">
            Descrizione:
            <textarea
              value={descrizione}
              onChange={(e) => setDescrizione(e.target.value)}
              placeholder="Inserisci una descrizione"
              className="add-request-textarea"
            />
          </label>
        </div>
        <div>
          <label className="add-request-label">
            Immagine:
            <input
              type="file"
              onChange={handleImageChange}
              className="add-request-file"
            />
          </label>
        </div>
        <button type="submit" className="add-request-button" disabled={loading}>
          {loading ? 'Aggiungendo...' : 'Aggiungi Richiesta'}
        </button>

        {/* Mostra la rotellina di caricamento quando il form è in fase di invio */}
        {loading && (
          <div className="loading-spinner">
            <Circles color="#00BFFF" height={50} width={50} />
          </div>
        )}

        {/* Mostra il messaggio di successo o errore */}
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
    <Footer />
    </>
  );
};

export default AddRequest;

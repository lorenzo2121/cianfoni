import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db, storage } from '../firebase';
import { collection, query, where, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../Styles/addrequest.css';
import { Circles } from 'react-loader-spinner'; 
import Footer from './Footer';
import Navbarsignup from './NavbarSignup';

const AddRequest = () => {
  const location = useLocation();
  const { email } = location.state || {};
  const [prestazione, setPrestazione] = useState('');
  const [zona, setZona] = useState('');
  const [telefono, setTelefono] = useState('');
  const [descrizione, setDescrizione] = useState('');
  const [imageFiles, setImageFiles] = useState([]); // Stato per le immagini multiple
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const handleImageChange = (event) => {
    var files = Array.from(event.target.files);
    if (files.length + imageFiles.length > 3) {
      alert("Puoi caricare al massimo 3 immagini.");
      event.target.value = "";
      setImageFiles([]);
    } else {
      setImageFiles((prevFiles) => [...prevFiles, ...files]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage('');

    const zonaLowerCase = zona.toLowerCase();

    const requestJson = {
      "prestazione/servizio": prestazione,
      "zona": zonaLowerCase,
      "telefono": telefono,
      "descrizione": descrizione,
      "imageUrls": [], // Usa un array per gli URL delle immagini
      "status": "locked"
    };

    try {
      // Carica le immagini su Firebase Storage
      for (const imageFile of imageFiles) {
        const storageRef = ref(storage, `images/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        const url = await getDownloadURL(storageRef);
        requestJson.imageUrls.push(url); // Aggiungi ogni URL a requestJson
      }

      // Query per trovare l'utente per email
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

        // Reset dei campi del modulo
        setPrestazione('');
        setZona('');
        setTelefono('');
        setDescrizione('');
        setImageFiles([]); // Pulisci le immagini selezionate
        setMessage('Richiesta aggiunta con successo!');
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
                required
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
                required
              />
            </label>
          </div>
          <div>
            <label className="add-request-label">
              Immagini (massimo 3):
              <input
                type="file"
                onChange={handleImageChange}
                multiple
                required
                className="add-request-file"
              />
            </label>
            {/* Mostra le anteprime delle immagini selezionate */}
            <div className="image-preview">
              {imageFiles.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="preview-image"
                />
              ))}
            </div>
          </div>
          <button type="submit" className="add-request-button" disabled={loading}>
            {loading ? 'Aggiungendo...' : 'Aggiungi Richiesta'}
          </button>

          {/* Spinner di caricamento */}
          {loading && (
            <div className="loading-spinner">
              <Circles color="#00BFFF" height={50} width={50} />
            </div>
          )}

          {/* Messaggio di successo o errore */}
          {message && <p className="success">{message}</p>}
          {error && <p className="error">{error}</p>}
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddRequest;

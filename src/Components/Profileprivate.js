import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../Components/Authcontext'; // Importa il contesto di autenticazione
import '../Styles/profileprivate.css'; // Assicurati di avere gli stili corretti
import lockedphone from '../Assets/RES_POST_PHONE_PLACEHOLDER.jpg';
import Footer from './Footer'

const ProfilePrivate = () => {
  const { currentUser } = useAuth(); // Ottieni l'utente autenticato
  const [requests, setRequests] = useState([]);
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!currentUser) return; // Se non c'è un utente loggato, non fare nulla

      try {
        // Crea una query per cercare l'utente per email
        const q = query(
          collection(db, 'professionisti'),
          where('email', '==', currentUser.email) // Filtra per email dell'utente
        );

        const querySnapshot = await getDocs(q);
        let userRequests = [];
        let totalCount = 0;

        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          if (userData.richieste) {
            userData.richieste.forEach((richiesta, index) => {
              userRequests.push({ ...richiesta, userId: doc.id, requestIndex: index });
              totalCount++;
            });
          }
        });

        setRequests(userRequests);
        setRequestCount(totalCount);
      } catch (error) {
        console.error('Errore nel fetch delle richieste:', error);
      }
    };

    fetchRequests(); // Chiama la funzione per recuperare le richieste
  }, [currentUser]); // Aggiungi currentUser come dipendenza

  // Funzione per eliminare una richiesta
  const handleDelete = async (requestIndex) => {
    try {
      // Step 1: Esegui una query per cercare il documento dell'utente autenticato tramite la sua email
      const q = query(
        collection(db, 'professionisti'),
        where('email', '==', currentUser.email)
      );
  
      const querySnapshot = await getDocs(q);
  
      // Step 2: Controlla se la query ha restituito documenti
      if (querySnapshot.empty) {
        console.error('Nessun documento trovato per l\'email:', currentUser.email);
        return;
      }
  
      // Step 3: Prendi il primo documento (supponendo che ogni email sia univoca e ci sia un solo risultato)
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
  
      // Step 4: Controlla se il documento contiene richieste
      if (!userData || !userData.richieste) {
        console.error('Nessun dato utente o richieste trovate');
        return;
      }
  
      // Step 5: Filtra la richiesta da eliminare basandosi sull'index
      const updatedRequests = userData.richieste.filter((_, index) => index !== requestIndex);
  
      // Step 6: Aggiorna il documento dell'utente con le richieste aggiornate
      await updateDoc(doc(db, 'professionisti', userDoc.id), { richieste: updatedRequests });
  
      // Step 7: Aggiorna lo stato locale
      setRequests(updatedRequests);
      setRequestCount(updatedRequests.length); // Aggiorna il conteggio delle richieste
  
    } catch (error) {
      console.error('Errore nell\'eliminazione della richiesta:', error);
    }
  };
  

// Funzione per contattare una richiesta (sbloccare il numero)
const handleContact = async (requestIndex) => {
  try {
    // Step 1: Esegui una query per cercare il documento dell'utente autenticato tramite la sua email
    const q = query(
      collection(db, 'professionisti'),
      where('email', '==', currentUser.email)
    );

    const querySnapshot = await getDocs(q);

    // Step 2: Controlla se la query ha restituito documenti
    if (querySnapshot.empty) {
      console.error('Nessun documento trovato per l\'email:', currentUser.email);
      return;
    }

    // Step 3: Prendi il primo documento (supponendo che ogni email sia univoca e ci sia un solo risultato)
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    // Step 4: Controlla se il documento contiene richieste
    if (!userData || !userData.richieste) {
      console.error('Nessun dato utente o richieste trovate');
      return;
    }

    // Step 5: Aggiorna lo status a 'unlocked' e decrementa il contatore delle richieste rimanenti
    userData.richieste[requestIndex].status = 'unlocked';
    userData.richiesterimanentin = (userData.richiesterimanentin || 0) - 1;

    // Step 6: Aggiorna il documento dell'utente con le modifiche
    await updateDoc(doc(db, 'professionisti', userDoc.id), {
      richieste: userData.richieste,
      richiesterimanentin: userData.richiesterimanentin
    });

    // Step 7: Aggiorna lo stato locale per riflettere il cambio nello stato 'unlocked'
    setRequests((prevRequests) =>
      prevRequests.map((request, idx) =>
        idx === requestIndex ? { ...request, status: 'unlocked' } : request
      )
    );
  } catch (error) {
    console.error('Errore nel contattare la richiesta:', error);
  }
};


  return (
    <div>
    <nav className="navbar-private">
      <h1 className='profile-private-title'>Profile</h1>
      <div className="requests">
        Richieste
        {requestCount >= 0 && <span className="badge">{requestCount}</span>}
      </div>
    </nav>
    <div className="content">
      {requests.length > 0 ? (
        <div className="requests-container">
          {requests.map((request, index) => (
            <div key={index} className="request-card">
              {/* Render images from the imageUrls array */}
              {request.imageUrls && request.imageUrls.length > 0 && (
                <div className="image-gallery">
                  {request.imageUrls.map((imageUrl, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={imageUrl}
                      alt={`Richiesta ${imgIndex + 1}`}
                      className="request-image"
                    />
                  ))}
                </div>
              )}
              <h3>Servizio: {request['prestazione/servizio']}</h3>
              <p>Zona: {request.zona}</p>
              <p>
                Telefono: {request.status === 'locked' ? <img src={lockedphone} alt="Locked" className="locked-image" /> : request.telefono}
              </p>
              <p>Descrizione: {request.descrizione}</p>
              <div className="buttons">
                {request.status === 'unlocked' ? (
                  <p className='contattato'>Contattato</p>
                ) : (
                  <button onClick={() => handleContact(index)}>Contatta</button>
                )}
                <button onClick={() => handleDelete(index)}>Elimina</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Nessuna richiesta disponibile.</p>
      )}
    </div>
    <Footer />
  </div>
  );
};

export default ProfilePrivate;

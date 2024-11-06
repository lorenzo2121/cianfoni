import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Star from './StarClick';
import '../Styles/reviewform.css';
import logo from '../Assets/logo-removebg-preview.png';
import { db, storage } from '../firebase';
import { collection, updateDoc, arrayUnion, query, where, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Circles } from 'react-loader-spinner'; // Importa il componente di caricamento

function ReviewForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(1);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // Stato di caricamento
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  console.log(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Imposta lo stato di caricamento a true

    let imageUrl = '';

    if (image) {
      const imageRef = ref(storage, `reviews/${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    const reviewData = {
      title,
      description,
      rating,
      image: imageUrl,
    };

    try {
      // Query to get the document with the specified email
      const q = query(collection(db, 'professionisti'), where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userDocRef = userDoc.ref;

        // Update the document with the new review
        await updateDoc(userDocRef, {
          reviews: arrayUnion(reviewData)
        });

        console.log('Recensione aggiunta con successo!');
        navigate("/profile-public", { state: { email } });
      } else {
        console.log('Nessun documento trovato per questa email.');
      }
    } catch (error) {
      console.error('Errore durante il salvataggio della recensione:', error);
    } finally {
      setLoading(false); // Imposta lo stato di caricamento a false
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <>
      <nav className='navbar-review-form'>
        <img src={logo} alt="Logo" />
      </nav>
      <div className="review-form">
        <h1>Lascia una recensione</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>Titolo:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

            <label>Descrizione:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

            <label>Rating:</label>
            <Star rating={rating} onChange={(value) => setRating(value)} />

            <label>Immagine:</label>
            <input type="file" onChange={handleImageChange} accept="image/*" />
          </div>
          <button className='form-grid-button' type="submit" disabled={loading}>Invia recensione</button>
        </form>
        {loading && (
          <div className="loading-spinner">
            <Circles color="#00BFFF" height={80} width={80} />
          </div>
        )}
      </div>
    </>
  );
}

export default ReviewForm;

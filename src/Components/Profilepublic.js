import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure the path is correct
import '../Styles/profilepublic.css'; // Ensure you have the correct CSS
import img from '../Assets/100.png'; // Default image
import Navbar from '../Components/NavbarSignup'; // Navbar component
import Card from '../Components/Cardreviews'; // Import the Card component
import Star from '../Components/Star'; // Import the Star component
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper
import 'swiper/css'; // Import Swiper styles

function Profilepublic() {
  const location = useLocation(); // Get location
  const navigate = useNavigate(); // Initialize navigator
  const { email } = location.state || {}; // Extract email from state
  const [professional, setProfessional] = useState(null); // State for professional data
  const [averageRating, setAverageRating] = useState(0); // State for average rating

  // References to sections
  const infoRef = useRef(null);
  const reviewsRef = useRef(null);
  const servicesRef = useRef(null);
  const galleryRef = useRef(null); // Reference for gallery section

  // Fetch professional data
  useEffect(() => {
    const fetchProfessional = async () => {
      if (email) {
        const professionistiRef = collection(db, 'professionisti');
        const q = query(professionistiRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          setProfessional({
            id: querySnapshot.docs[0].id,
            ...data,
          });

          // Calculate average rating
          if (data.reviews && data.reviews.length > 0) {
            const totalRating = data.reviews.reduce((sum, review) => sum + review.rating, 0);
            const average = totalRating / data.reviews.length;
            setAverageRating(average);
          }
        }
      }
    };

    fetchProfessional();
  }, [email]);

  // Handle request button click
  const handleRequestClick = () => {
    navigate('/add-request', { state: { email: professional.email } }); // Pass email
  };

  // Handle review button click
  const handleReviewClick = () => {
    navigate('/add-review', { state: { email: professional.email } }); // Pass email
  };

  // Scroll functions
  const scrollToInfo = () => {
    infoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // If professional data is not yet available
  if (!professional) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className='main-container-profile-public'>
        <div className='profile-container'>
          <div className='profile-item'>
            <div className="small-div">
              <img className='profile-img' src={professional.profilePictureUrl || img} alt="Profile" />
            </div>
            <div className="large-div">
              <div className="sub-div-1">
                <h3>{professional.name}</h3>
                <div className='profilo-aziendale'>Profilo aziendale</div>
              </div>
              <div className="sub-div-2">
                <Star rating={averageRating} />
              </div>
            </div>
          </div>

          <div className='profile-item'>
            <div className="info-item" onClick={scrollToInfo}>Informazioni</div>
            <div className="info-item" onClick={scrollToReviews}>Recensioni</div>
            <div className="info-item" onClick={scrollToServices}>Servizi</div>
            <div className="info-item" onClick={scrollToGallery}>Galleria</div> {/* Link to Gallery */}
          </div>

          <div className='profile-item' ref={infoRef}>
            <h3>Descrizione</h3>
            <p>{professional.description}</p>
          </div>

          <div className='services-container' ref={servicesRef}>
            <h3>Servizi Offerti</h3>
            {professional.services && professional.services.length > 0 ? (
              <ul>
                {professional.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            ) : (
              <p>Nessun servizio disponibile.</p>
            )}
          </div>

          <div className='profile-item large-profile'>
            <h3>Entra in contatto</h3>
            <button className='request-button' onClick={handleRequestClick}>Invia richiesta</button>
            <p>oppure</p>
            <h3>Invia una recensione</h3>
            <button className='request-button' onClick={handleReviewClick}>Invia una recensione</button>
            <p>Il servizio è totalmente gratuito</p>
          </div>
        </div>
      </div>

      <div className='reviews-section' ref={reviewsRef}>
        <h3>Recensioni</h3>
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {professional.reviews && professional.reviews.length > 0 ? (
            professional.reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <Card
                  rating={review.rating}
                  image={review.image || img} // Default image if not present
                  title={review.title}
                  description={review.description}
                />
              </SwiperSlide>
            ))
          ) : (
            <p>Nessuna recensione disponibile.</p>
          )}
        </Swiper>
      </div>

      {/* Gallery Section */}
      <div className='gallery-section' ref={galleryRef}>
        <h3>Galleria</h3>
        <div className='gallery-container'>
          {professional.galleryUrls && professional.galleryUrls.length > 0 ? (
            professional.galleryUrls.map((url, index) => (
              <img key={index} src={url} alt={`Gallery Image ${index}`} className='gallery-image' />
            ))
          ) : (
            <p>Nessuna immagine disponibile nella galleria.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Profilepublic;

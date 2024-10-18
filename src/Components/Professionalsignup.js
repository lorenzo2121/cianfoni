import Navbarsignup from './NavbarSignup';
import React, { useState } from 'react';
import { db, auth, storage } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Card from './Card';
import Gridistructions2 from '../Components/GridIstructions2';
import card1 from '../Assets/RES_HOME_HOW_IT_WORKS_STEP1_IT.png';
import card2 from '../Assets/RES_HOME_HOW_IT_WORKS_STEP2_IT.png';
import card3 from '../Assets/RES_HOME_HOW_IT_WORKS_STEP3_IT.png';
import '../Styles/professionalsignup.css';
import '../Styles/gridistructions2.css';
import Footer from './Footer'

export default function Professionalsignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    profession: '',
    experience: '',
    description: '',
    profilePicture: null,
    city: '',
    services: [],
    gallery: [],
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [newService, setNewService] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePicture') {
      setFormData({
        ...formData,
        profilePicture: files[0],
      });
    } else if (name === 'gallery') {
      setFormData({
        ...formData,
        gallery: Array.from(files),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateStep = () => {
    const { name, email, password, phone, profession, experience, description, city, profilePicture, services, gallery } = formData;

    switch (currentStep) {
      case 1:
        return name && email;
      case 2:
        return password && phone;
      case 3:
        return profession && experience;
      case 4:
        return description && city;
      case 5:
        return services.length > 0;
      case 6:
        return profilePicture;
      case 7:
        return gallery.length > 0;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prevStep) => prevStep + 1);
      setMessage('');
    } else {
      setMessage('Please fill out all required fields.');
    }
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      console.log('User registered:', userCredential.user.uid);

      // Send verification email
      await sendEmailVerification(userCredential.user);
      console.log('Verification email sent');

      let profilePictureUrl = '';
      if (formData.profilePicture) {
        const storageRef = ref(storage, `profilePictures/${userCredential.user.uid}`);
        await uploadBytes(storageRef, formData.profilePicture);
        profilePictureUrl = await getDownloadURL(storageRef);
      }

      // Upload gallery images
      const galleryUrls = [];
      for (const file of formData.gallery) {
        const galleryRef = ref(storage, `gallery/${userCredential.user.uid}/${file.name}`);
        await uploadBytes(galleryRef, file);
        const url = await getDownloadURL(galleryRef);
        galleryUrls.push(url);
      }

      const docRef = await addDoc(collection(db, 'professionisti'), {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        profession: formData.profession,
        experience: formData.experience,
        description: formData.description,
        city: formData.city,
        profilePictureUrl,
        galleryUrls,
        services: formData.services,
        reviews: [],
        richieste: [],
        richiesterimanentin: 10,
      });
      console.log('Document written with ID: ', docRef.id);

      setMessage('Registration successful! Please verify your email.');
      setFormData({
        name: '',
        email: '',
        password: '',
        phone: '',
        profession: '',
        experience: '',
        description: '',
        profilePicture: null,
        city: '',
        services: [],
        gallery: [],
      });
      setCurrentStep(1); // Reset to step 1 after submission
    } catch (error) {
      console.error('Error during registration:', error);
      setMessage('An error occurred during registration.');
    }
    setLoading(false);
  };

  const handleAddService = () => {
    if (newService.trim() !== '') {
      setFormData((prevData) => ({
        ...prevData,
        services: [...prevData.services, newService.trim()],
      }));
      setNewService('');
    }
  };

  return (
    <>
      <Navbarsignup />
      <div className='bg-container'>
        <div className='form-container'>
          <h2>Inserisci i dati personali e della tua azienda</h2>
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <>
                <label>
                  Nome Azienda:
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <label>
                  Email:
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
                <div className="button-container">
                  <button type="button" onClick={handleNext}>Next</button>
                </div>
              </>
            )}
            {currentStep === 2 && (
              <>
                <label>
                  Password:
                  <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </label>
                <label>
                  Telefono:
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                </label>
                <div className="button-container">
                  <button type="button" onClick={handleBack}>Prev</button>
                  <button type="button" onClick={handleNext}>Next</button>
                </div>
              </>
            )}
            {currentStep === 3 && (
              <>
                <label>
                  Professione:
                  <input type="text" name="profession" value={formData.profession} onChange={handleChange} required />
                </label>
                <label>
                  Esperienza (anni):
                  <input type="number" name="experience" value={formData.experience} onChange={handleChange} required />
                </label>
                <div className="button-container">
                  <button type="button" onClick={handleBack}>Prev</button>
                  <button type="button" onClick={handleNext}>Next</button>
                </div>
              </>
            )}
            {currentStep === 4 && (
              <>
                <label>
                  Descrizione (Servizi offerti):
                  <textarea name="description" value={formData.description} onChange={handleChange} required />
                </label>
                <label>
                  Città:
                  <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                </label>
                <div className="button-container">
                  <button type="button" onClick={handleBack}>Prev</button>
                  <button type="button" onClick={handleNext}>Next</button>
                </div>
              </>
            )}
            {currentStep === 5 && (
              <>
                <label>
                  Inserisci i servizi offerti:
                  <div className="service-input">
                    <input
                      type="text"
                      value={newService}
                      onChange={(e) => setNewService(e.target.value)}
                      placeholder="Nome del servizio"
                    />
                    <button type="button" onClick={handleAddService}>Aggiungi Servizio</button>
                  </div>
                </label>
                <ul>
                  {formData.services.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
                <div className="button-container">
                  <button type="button" onClick={handleBack}>Prev</button>
                  <button type="button" onClick={handleNext}>Next</button>
                </div>
              </>
            )}
            {currentStep === 6 && (
              <>
                <label>
                  Immagine del Profilo:
                  <input type="file" name="profilePicture" onChange={handleChange} required />
                </label>
                <div className="button-container">
                  <button type="button" onClick={handleBack}>Prev</button>
                  <button type="button" onClick={handleNext}>Next</button>
                </div>
              </>
            )}
            {currentStep === 7 && (
              <>
                <label>
                  Galleria di Foto:
                  <input type="file" name="gallery" onChange={handleChange} multiple required />
                </label>
                <div className="preview-gallery">
                  {formData.gallery.map((file, index) => (
                    <img key={index} src={URL.createObjectURL(file)} alt={`Preview ${index}`} width="100" height="100" />
                  ))}
                </div>
                <div className="button-container">
                  <button type="button" onClick={handleBack}>Prev</button>
                  <button type="submit">Submit</button>
                </div>
              </>
            )}
            {message && <p>{message}</p>}
            {loading && <div className="loading-spinner"></div>}
          </form>
        </div>
      </div>
      <Gridistructions2 />
      <div className='card-container-1'>
        <div className='card-container-2'>
          <Card image={card1} title="Step 1:" description={"Inizia con i tuoi dati"} />
          <Card image={card2} title="Step 2:" description={"Completa il tuo profilo"} />
          <Card image={card3} title="Step 3:" description={"Verifica la tua email"} />
        </div>
      </div>
      <Footer />
    </>
  );
}

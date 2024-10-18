import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Title from './Components/Title';
import Title2 from './Components/Title2';
import Card from './Components/Card';
import card1 from './Assets/signup.jpg';
import card2 from './Assets/compare.png';
import card3 from './Assets/contact.jpg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Components/Authcontext'; // Importa il provider del contesto di autenticazione
import Professionalsignup from './Components/Professionalsignup';
import Main from './Components/Main';
import Trendservice from './Components/TrendService';
import Searchbar from './Components/Searchbar';
import Searchresults from './Components/Searchresults';
import Profilepublic from './Components/Profilepublic';
import Reviewform from './Components/Reviewform';
import Section2 from './Components/Section2';
import Profileprivate from './Components/Profileprivate';
import PrivateRoute from './Components/Privateroute';
import AddRequest from './Components/Addrequest';
import Buysubscription from './Components/Buysubscription';
import Gridistructions from './Components/GridIstructions';
import { Lottie } from 'lottie-react'; // Importa il componente Lottie
import Animation from './Components/Animation'
import videoBg from './Assets/search.mp4'
import Footer from './Components/Footer'

function HomePage(){

  console.log(videoBg);

  const scrollToSearchSection = () => {
    const searchSection = document.getElementById('search-section');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className='main-container'>
        {/* Aggiungi l'elemento video */}
        <video className='background-video' autoPlay loop muted>
          <source src={videoBg} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
        <section className='search-section' id='search-section'>
        <Navbar />
        <Title text={"Trova il tuo professionista"} />
        </section>
        <Searchbar />
        <Title2 text={"Come funziona profinder"} />
        <div className='main-section'>
          <div className='container1'>
            <Card 
              image={card1} 
              title="Cerca" 
              description="Cerca il professionista che fa per te" 
            />
            <Card 
              image={card2} 
              title="Confronta" 
              description="Confronta vari professionisti" 
            />
            <Card 
              image={card3} 
              title="Contatta" 
              description="Scegli il professionista che fa al caso tuo" 
            />
          </div>
        </div>
        <Trendservice />
        <Gridistructions />
        <div className='blu-container'>
        <div className='left'>
          <div className='title'>
            <h3>Conosco la persona giusta per te!</h3>
          </div>
          <div className='description'>
            Ti connetto con i professionisti per realizzare ciò che desideri. Trova Professionisti competenti e disponibli in oltre 1.000 categorie di servizi.
          </div>
          <div className='button'>
            <button onClick={scrollToSearchSection}>Trova professionista gratis</button>
          </div>
        </div>
      </div>
      <Section2 />
      <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider> {/* Wrap App with AuthProvider */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/professional-signup" element={<Professionalsignup />} />
          <Route path="/results" element={<Searchresults />} />
          <Route path="/profile-public" element={<Profilepublic />} />
          <Route path="/add-review" element={<Reviewform />} />
          <Route path="/add-request" element={<AddRequest />} />
          <Route path="/buy-subscription" element={<Buysubscription />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profileprivate />} />
          </Route>
          {/*<Route path="/login" element={<Accedi />} />
          <Route path="/reset-password" element={<ResetPassword />} />*/}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

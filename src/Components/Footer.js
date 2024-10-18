import '../Styles/footer.css';
import img2 from '../Assets/logo-no-bg.png';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  return (
    <>
      <div className='footer-container'>
        <div className='footer-column'>
          <img className='logo-footer-column' src={img2} alt="Logo" />
          <p>Con The Work affianchiamo la crescita di chi vuole innovare 
            trasmettendogli le migliori conoscenze,
            competenze e network per farlo al meglio.</p>
          <div className='icons-social'>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <div><FaFacebookF /></div>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <div><FaTwitter /></div>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <div><FaInstagram /></div>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <div><FaLinkedinIn /></div>
            </a>
          </div>
        </div>
        <div className='footer-column'>
          <h3 className='title'>Su di noi</h3>
          <ul className='footer-links'>
            <li><a href="#">Home</a></li>
            <li><a href="#">Chi siamo</a></li>
            <li><a href="#">Lavora con noi</a></li>
            <li><a href="#">Contattaci</a></li>
          </ul>
        </div>
        <div className='footer-column'>
          <h3 className='title'>I nostri servizi</h3>
          <ul className='footer-links'>
            <li><a href="#">Servizio 1</a></li>
            <li><a href="#">Servizio 2</a></li>
            <li><a href="#">Servizio 3</a></li>
          </ul>
        </div>
      </div>
      
      <div className='div1'>
        <div className='div1-item'><p>Informativa privacy</p></div>
        <div className='div1-item'><p>Termini e condizioni</p></div>
        <div className='div1-item'><p>Informativa cookies</p></div>
      </div>

      <div className='div2'>
        <p className='text-div2'>© Copyright 2020-2024 | The Work | All Rights Reserved | The Work S.r.l. SB - P.IVA: 02613410204 | 
           N° REA: MN-266523 | Capitale versato: 13.747,21 € | Relazione d'impatto benefit 2023</p>
      </div>
    </>
  );
}

export default Footer;

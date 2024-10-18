import '../Styles/main.css';
import img1 from '../Assets/RES_SIGNUP_PRO_STEP1.png'
import img2 from '../Assets/RES_SIGNUP_PRO_STEP2.png'
import img3 from '../Assets/RES_SIGNUP_PRO_STEP3.png'
import img4 from '../Assets/RES_SIGNUP_PRO_STEP4.png'
import img5 from '../Assets/RES_SIGNUP_PRO_STEP5.png'
import img6 from '../Assets/RES_SIGNUP_PRO_STEP6.png'
import img7 from '../Assets/RES_SIGNUP_PRO_STEP7.png'
import img8 from '../Assets/RES_SIGNUP_PRO_STEP8.png'

export default function Main() {
    return (
        <div className="main">
            <h1 className='main-title'>Perché iscriversi su Profinder</h1>
            <div className="table-container">
                <div className="cell">
                    <img src={img1} alt="Image 1" />
                    <h1>Piu clienti per la tua attivita</h1>
                    <p>Ogni giorno, clienti in tutta Italia effettuano richieste per trovare i migliori professionisti e attività locali.
                        Con Ernesto puoi accedere a una nuova rete continua di cliente per la tua attività.</p>
                </div>
                <div className="cell">
                    <img src={img2} alt="Image 2" />
                    <h1>Cell 2</h1>
                    <p>Description for cell 2</p>
                </div>
                <div className="cell">
                    <img src={img3} alt="Image 3" />
                    <h1>Cell 3</h1>
                    <p>Description for cell 3</p>
                </div>
                <div className="cell">
                    <img src={img4} alt="Image 4" />
                    <h1>Cell 4</h1>
                    <p>Description for cell 4</p>
                </div>
                <div className="cell">
                    <img src={img5} alt="Image 5" />
                    <h1>Cell 5</h1>
                    <p>Description for cell 5</p>
                </div>
                <div className="cell">
                    <img src={img6} alt="Image 6" />
                    <h1>Cell 6</h1>
                    <p>Description for cell 6</p>
                </div>
                <div className="cell">
                    <img src={img7} alt="Image 7" />
                    <h1>Cell 7</h1>
                    <p>Description for cell 7</p>
                </div>
                <div className="cell">
                    <img src={img8} alt="Image 8" />
                    <h1>Cell 8</h1>
                    <p>Description for cell 8</p>
                </div>
            </div>
        </div>
    );
}

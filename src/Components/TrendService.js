// TrendService.js
import React from 'react';
import '../Styles/trendservice.css';
import TrendServiceCard from './CardTrendService';
import imbianchino from '../Assets/imbianchino.jpg'
import idraulico from '../Assets/idraulico.jpg'
import avvocato from '../Assets/avvocato.jpg'
import gommista from '../Assets/gommista.jpg'
import parquettista from '../Assets/parquettista.jpg'
import elettricista from '../Assets/elettricista.jpg'
import fabbro from '../Assets/fabbro.jpg'
import falegname from '../Assets/falegname.jpg'

// Simuliamo un vettore di servizi con professioni
const trendingServices = [
    { title: 'Imbianchino', description: 'Servizio di tinteggiatura professionale.', imageUrl: imbianchino },
    { title: 'Avvocato', description: 'Consulenza legale per privati e aziende.', imageUrl: avvocato },
    { title: 'Gommista', description: 'Servizio di cambio gomme e assistenza pneumatici.', imageUrl: gommista },
    { title: 'Idraulico', description: 'Riparazioni e installazioni idrauliche.', imageUrl: idraulico },
    { title: 'Parquettista', description: 'Posa e manutenzione di pavimenti in legno.', imageUrl: parquettista },
    { title: 'Elettricista', description: 'Installazione e riparazione di impianti elettrici.', imageUrl: elettricista },
    { title: 'Fabbro', description: 'Lavorazione del ferro e installazione di serrature.', imageUrl: fabbro },
    { title: 'Falegname', description: 'Progettazione e realizzazione di mobili su misura.', imageUrl: falegname }
];

function TrendService() {
    return (
        <div className='trend-service-container'>
            <h1 className='trend-service-title'>Servizi in tendenza</h1>
            <div className='trend-service-grid-container'>
                {trendingServices.map((service, index) => (
                    <TrendServiceCard 
                        key={index}
                        title={service.title}
                        description={service.description}
                        imageUrl={service.imageUrl}
                    />
                ))}
            </div>
        </div>
    );
}

export default TrendService;

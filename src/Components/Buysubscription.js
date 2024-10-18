import React, { useState } from 'react';
import '../Styles/buysubscription.css'; // Importa il file CSS
import { useAuth } from './Authcontext'; // Assicurati di importare il contesto

const Buysubscription = () => {
  const { getUserEmail } = useAuth();
  const [isAnnual, setIsAnnual] = useState(false);

  const monthlySubscriptions = [
    { name: 'Basic', price: '29.99€', features: ['Feature 1', 'Feature 2'], priceId: 'price_1PfczkJ1H5ZQ9QSPCHsJ55Ia' },
    { name: 'Standard', price: '20€', features: ['Feature 1', 'Feature 2', 'Feature 3'], priceId: 'price_monthly_standard' },
    { name: 'Premium', price: '30€', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], priceId: 'price_monthly_premium' },
  ];

  const annualSubscriptions = [
    { name: 'Basic', price: '100€', features: ['Feature 1', 'Feature 2'], priceId: 'price_annual_basic' },
    { name: 'Standard', price: '200€', features: ['Feature 1', 'Feature 2', 'Feature 3'], priceId: 'price_annual_standard' },
    { name: 'Premium', price: '300€', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], priceId: 'price_annual_premium' },
  ];

  const subscriptions = isAnnual ? annualSubscriptions : monthlySubscriptions;

  const handlePurchase = async (priceId) => {
    try {
      const userEmail = getUserEmail();
      const response = await fetch('http://localhost:4242/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId, userEmail }), // Invia anche l'userEmail nel corpo della richiesta
      });
      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      console.error('Errore durante la creazione della sessione di checkout:', error);
    }
  };

  return (
    <div className="container-buy-subscription">
      <h1 className="buy-subscription-h1">Choose your subscription</h1>
      <div className="buy-subscription-buttons">
        <button className={!isAnnual ? 'active' : ''} onClick={() => setIsAnnual(false)}>Monthly</button>
        <button className={isAnnual ? 'active' : ''} onClick={() => setIsAnnual(true)}>Annual</button>
      </div>
      <div className="buy-subscription-subscriptions">
        {subscriptions.map((sub, index) => (
          <div key={index} className="buy-subscription-subscription">
            <h2>{sub.name}</h2>
            <p>{sub.price}</p>
            <ul>
              {sub.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <button onClick={() => handlePurchase(sub.priceId)}>Acquista</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buysubscription;

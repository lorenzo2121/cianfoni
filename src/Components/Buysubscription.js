import React from 'react';
import '../Styles/buysubscription.css';
import { useAuth } from './Authcontext';

const Buysubscription = () => {
  const { getUserEmail } = useAuth();

  const subscriptionOptions = [
    { name: '5 Richieste', price: '5€', description: '5 richieste di servizio', priceId: 'price_1QGHpdJ1H5ZQ9QSPLyjuHqKg' },
    { name: '15 Richieste', price: '10€', description: '15 richieste di servizio', priceId: 'price_1QGHq2J1H5ZQ9QSPvVzhBZ6D' },
    { name: '30 Richieste', price: '15€', description: '30 richieste di servizio', priceId: 'price_1QGHqSJ1H5ZQ9QSPAd1CsLGG' },
  ];

  const handlePurchase = async (priceId) => {
    try {
      const userEmail = getUserEmail();
      const response = await fetch('http://16.16.182.37:4242/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId, userEmail }),
      });
      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      console.error('Errore durante la creazione della sessione di checkout:', error);
    }
  };

  return (
    <div className="container-buy-subscription">
      <h1 className="buy-subscription-h1">Choose Your Request Package</h1>
      <div className="buy-subscription-options">
        {subscriptionOptions.map((option, index) => (
          <div key={index} className="buy-subscription-card">
            <h2>{option.name}</h2>
            <p>{option.price}</p>
            <p>{option.description}</p>
            <button onClick={() => handlePurchase(option.priceId)}>Acquista</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buysubscription;

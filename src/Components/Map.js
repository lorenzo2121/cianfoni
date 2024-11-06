import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

function Map({ city }) {
  const [coordinates, setCoordinates] = useState(null);
  const googleMapsApiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Sostituisci con la tua chiave API

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${googleMapsApiKey}`
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const location = data.results[0].geometry.location;
          setCoordinates(location);
        }
      } catch (error) {
        console.error('Errore durante il fetch delle coordinate:', error);
      }
    };

    fetchCoordinates();
  }, [city, googleMapsApiKey]);

  if (!coordinates) {
    return <p>Caricamento mappa...</p>;
  }

  const mapStyles = {
    height: '400px',
    width: '100%',
  };

  const defaultCenter = {
    lat: coordinates.lat,
    lng: coordinates.lng,
  };

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap mapContainerStyle={mapStyles} zoom={12} center={defaultCenter}>
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;

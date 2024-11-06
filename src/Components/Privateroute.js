// PrivateRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Authcontext";

const PrivateRoute = () => {
  const { currentUser, pending } = useAuth(); // Aggiungi lo stato pending

  // Mostra un indicatore di caricamento finché Firebase non ha determinato lo stato dell'utente
  if (pending) {
    return <div>Loading...</div>; // Qui puoi personalizzare meglio il caricamento se vuoi
  }

  // Se non c'è un utente loggato, reindirizza alla home page
  if (!currentUser) {
    console.log("current user non trovato");
    return <Navigate to="/" replace />;
  }

  // Renderizza i figli se l'utente è autenticato
  return <Outlet />;
};

export default PrivateRoute;

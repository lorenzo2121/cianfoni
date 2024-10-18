import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from "../firebase"; // Assicurati che il percorso di importazione sia corretto
import { signOut } from 'firebase/auth';
import '../Styles/authcontext.css';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            console.log("Auth state changed: ", user); // Debug: log dello stato di autenticazione
            if (user) {
                setCurrentUser(user);
                setIsLoggedIn(true);
            } else {
                setCurrentUser(null);
                setIsLoggedIn(false);
            }
            setPending(false);
        });
        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    const login = (user) => {
        console.log("User logged in: ", user); // Debug: log dell'utente che ha effettuato il login
        setCurrentUser(user);
        setIsLoggedIn(true);
    };

    const logout = async () => {
        try {
            await signOut(auth);
            console.log("User logged out"); // Debug: log dell'utente che ha effettuato il logout
            setCurrentUser(null);
            setIsLoggedIn(false);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const getUserEmail = () => {
        return currentUser ? currentUser.email : null;
    };

    // Mostra un indicatore di caricamento mentre Firebase controlla l'autenticazione
    if (pending) {
        return (
            <div className="loading-container-auth">
                <div className="spinner-auth"></div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ currentUser, isLoggedIn, login, logout, getUserEmail }}>
            {children}
        </AuthContext.Provider>
    );
};

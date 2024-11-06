import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import '../Styles/loginform.css';
import { useAuth } from './Authcontext'; // Importa il contesto di autenticazione

const LoginForm = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Stato locale per gestire il caricamento
    const { login } = useAuth(); // Usa il contesto di autenticazione

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Login effettuato con successo:', userCredential.user.email);
            setIsLoading(false);
            login(); // Chiama la funzione di login dal contesto di autenticazione
            onClose(); // Chiudi il form di login dopo il login
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="login-form-container">
            <div className="login-form">
                <h2>Accedi</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="btn-login" disabled={isLoading}>
                        {isLoading ? 'Caricamento...' : 'Login'}
                    </button>
                </form>
                <button onClick={onClose} className="btn-close">Chiudi</button>
                {isLoading && <div className="loader"></div>}
            </div>
        </div>
    );
};

export default LoginForm;
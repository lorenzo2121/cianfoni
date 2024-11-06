import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import '../Styles/navbar.css';
import logo from '../Assets/logo-no-bg.png';
import LoginForm from './Loginform';
import { useAuth } from './Authcontext';
import { useNavigate } from 'react-router-dom';
import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

const Navbar = () => {
    const [sidebar, setSidebar] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState(''); // Nuovo stato per la password attuale
    const { isLoggedIn, logout } = useAuth();

    const navigate = useNavigate();
    const auth = getAuth();

    const toggleSidebar = () => {
        setSidebar(!sidebar);
    };

    const handleLoginClick = () => {
        setShowLoginForm(true);
    };

    const handleCloseLoginForm = () => {
        setShowLoginForm(false);
    };

    const handleClick = () => {
        navigate("/professional-signup");
    };

    const handleProfile = () => {
        navigate("/profile");
    };

    const handleSubscription = () => {
        navigate("/buy-subscription");
    };

    const handleLogout = () => {
        logout();
    };

    const handleChangePassword = () => {
        setShowChangePasswordForm(true);
    };

    const handleUpdatePassword = async () => {
        const user = auth.currentUser;

        if (user) {
            // Crea un oggetto credential con la password attuale
            const credential = EmailAuthProvider.credential(user.email, currentPassword);

            try {
                // Ri-autenticazione dell'utente
                await reauthenticateWithCredential(user, credential);

                // Aggiorna la password
                await updatePassword(user, newPassword);
                alert('Password aggiornata con successo!');
                setShowChangePasswordForm(false);
                setNewPassword('');
                setCurrentPassword(''); // Resetta la password attuale
            } catch (error) {
                console.error('Errore durante l\'aggiornamento della password:', error);
                alert('Errore durante l\'aggiornamento della password. Assicurati di aver inserito correttamente la password attuale.');
            }
        }
    };

    return (
        <div>
            <nav className="navbar">
                <FaBars className="menu-icon" onClick={toggleSidebar} />
                <img src={logo} alt="Logo" className="logo" />
                <button className="btn" onClick={handleClick}>Registra la tua azienda</button>
            </nav>
            <div className={`sidebar ${sidebar ? 'active' : ''}`}>
                <ul>
                    {isLoggedIn ? (
                        <>
                            <li><a href="" onClick={handleProfile}>Profile</a></li>
                            <li><a href="" onClick={handleLogout}>Logout</a></li>
                            <li><a href="" onClick={handleChangePassword}>Change Password</a></li>
                            <li><a href="" onClick={handleSubscription}>Buy Requests</a></li>
                        </>
                    ) : (
                        <li><a href="#" onClick={handleLoginClick}>Accedi</a></li>
                    )}
                </ul>
            </div>
            {sidebar && <div className="overlay" onClick={toggleSidebar}></div>}
            {showLoginForm && (
                <div className="login-form-container">
                    <LoginForm onClose={handleCloseLoginForm} />
                </div>
            )}
            {showChangePasswordForm && (
                <div className="change-password-form-container">
                    <h2>Cambia la tua password</h2>
                    <input
                        type="password"
                        placeholder="Password attuale"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Nuova password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button onClick={handleUpdatePassword}>Aggiorna Password</button>
                    <button onClick={() => setShowChangePasswordForm(false)}>Chiudi</button>
                </div>
            )}
        </div>
    );
};

export default Navbar;

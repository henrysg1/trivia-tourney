import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css'; // Importing the custom CSS for styles

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', {
                username: email, // Map 'email' to 'username' for DRF compatibility
                password,
            });

            // Save the token to localStorage
            localStorage.setItem('token', response.data.access);

            // Redirect to the dashboard
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid email or password. Please try again.');
        }
    };

    const handleCreateAccount = () => {
        navigate('/signup');
    };

    return (
        <div className="login-page">
            <div className="logo-login-page">
                <img src="/images/logo.png" alt="Trivia Tourney Logo" />
            </div>
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>
                {error && <div className="error-message">{error}</div>}
                <div className="create-account">
                    <p>Don't have an account?</p>
                    <button onClick={handleCreateAccount} className="signup-button">
                        Create Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

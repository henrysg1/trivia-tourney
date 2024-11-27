import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Add login logic here (e.g., API call to verify user)
        // If successful, redirect to the dashboard
        navigate('/dashboard');
    };

    const handleCreateAccount = () => {
        // Navigate to the signup page
        navigate('/signup');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <div style={{ marginTop: '20px' }}>
                <p>Don't have an account?</p>
                <button onClick={handleCreateAccount}>Create Account</button>
            </div>
        </div>
    );
};

export default LoginPage;

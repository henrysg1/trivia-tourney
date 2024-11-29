import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/dashboard'); // Redirect to the dashboard
    };

    return (
        <header>
            <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                Trivia Tourney
            </div>
            <div className="settings">⚙️ Settings</div>
        </header>
    );
};

export default Header;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Header.css'; // Import custom CSS for styling

const Header = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const baseURL = "http://127.0.0.1:8000"; // Backend URL

    const handleLogoClick = () => {
        navigate('/dashboard'); // Redirect to the dashboard
    };

    const handleSettingsClick = () => {
        navigate('/settings'); // Redirect to settings page
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get(`${baseURL}/api/user/`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(response.data);
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        const refreshToken = localStorage.getItem('refresh_token');
                        if (refreshToken) {
                            try {
                                const refreshResponse = await axios.post(`${baseURL}/api/token/refresh/`, {
                                    refresh: refreshToken,
                                });
                                localStorage.setItem('token', refreshResponse.data.access);
                                fetchUserData(); // Retry fetching the user data
                            } catch (refreshError) {
                                console.error('Token refresh failed:', refreshError);
                                navigate('/'); // Redirect to login if refresh fails
                            }
                        } else {
                            navigate('/'); // Redirect to login if no refresh token
                        }
                    } else {
                        console.error('Error fetching user data:', error);
                    }
                }
            }
        };
        fetchUserData();
    }, [navigate]);

    return (
        <header className="header">
            <div className="logo-header" onClick={handleLogoClick}>
                <img src="/images/logo.png" alt="Trivia Tourney Logo" />
            </div>
            {user && (
                <div className="user-info">
                    <img
                        className="profile-picture"
                        src={`${baseURL}${user.profile_picture}`}
                        alt={`${user.username}'s Profile`}
                    />
                    <div className="user-details">
                        <span className="username">{user.username}</span>
                        {user.rank && (
                            <div className="user-rank">
                                <img
                                    className="rank-icon"
                                    src={`${baseURL}${user.rank.image}`}
                                    alt={`Rank image for ${user.rank.name}`}
                                />
                                <span>{user.rank.name}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className="settings" onClick={handleSettingsClick}>
                ⚙️
            </div>
        </header>
    );
};

export default Header;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get('http://127.0.0.1:8000/api/user/', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(response.data);
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                navigate('/');
            }
        };

        fetchUser();
    }, [navigate]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="panel">
                <h1>Welcome, {user.username}</h1>
                <p>Your Score: {user.score || 1200}</p>
                <p>Your Rank: {user.rank || '#15'}</p>
            </div>
            <div className="panel">
                <h2>Recent Quiz Scores</h2>
                <ul>
                    <li>Science: 80%</li>
                    <li>History: 70%</li>
                    <li>General Knowledge: 90%</li>
                </ul>
            </div>
            <button onClick={() => navigate('/select-quiz')}>Play a Quiz</button>
            <div style={{ marginTop: '20px' }}>
                <LogoutButton />
            </div>
        </div>
    );
};

export default Dashboard;

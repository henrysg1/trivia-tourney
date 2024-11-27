import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome, [Username]</h1>
            <p>Your Score: 1200</p>
            <p>Your Rank: #15</p>
            <h2>Recent Quiz Scores</h2>
            <ul>
                <li>Science: 80%</li>
                <li>History: 70%</li>
                <li>General Knowledge: 90%</li>
            </ul>
            <button onClick={() => navigate('/select-quiz')}>Play a Quiz</button>
        </div>
    );
};

export default Dashboard;

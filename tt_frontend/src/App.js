import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import SelectQuizPage from './pages/SelectQuizPage';
import QuizPage from './pages/QuizPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/select-quiz" element={<SelectQuizPage />} />
                <Route path="/quiz" element={<QuizPage />} />
            </Routes>
        </Router>
    );
}

export default App;

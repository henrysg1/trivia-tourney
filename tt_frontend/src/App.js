import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import SelectQuizPage from './pages/SelectQuizPage';
import QuizPage from './pages/QuizPage';
import PrivateRoute from './privateRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/select-quiz" element={<PrivateRoute><SelectQuizPage /></PrivateRoute>} />
                <Route path="/quiz" element={<PrivateRoute><QuizPage /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}

export default App;

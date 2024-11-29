import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import SelectQuizPage from './pages/SelectQuizPage';
import QuizPage from './pages/QuizPage';
import PrivateRoute from './privateRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
    return (
        <Router>
            <Header />
            <div className="container">
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/select-quiz" element={<PrivateRoute><SelectQuizPage /></PrivateRoute>} />
                <Route path="/quiz" element={<PrivateRoute><QuizPage /></PrivateRoute>} />
            </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;

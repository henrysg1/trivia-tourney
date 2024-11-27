import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './Question';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch questions from the API
        axios.get('http://127.0.0.1:8000/api/questions/')
            .then((response) => {
                setQuestions(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Failed to load questions.');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading questions...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Quiz</h1>
            {questions.map((question, index) => (
                <Question key={index} question={question} />
            ))}
        </div>
    );
};

export default Quiz;

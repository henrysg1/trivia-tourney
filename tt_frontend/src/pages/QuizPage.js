import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const QuizPage = () => {
    const location = useLocation();
    const category = location.state?.category || 'general';

    const [question, setQuestion] = useState({
        text: 'What is the capital of France?',
        options: ['Paris', 'London', 'Berlin', 'Madrid'],
        correctAnswer: 'Paris',
    });

    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);

    const handleAnswer = (option) => {
        setSelectedOption(option);
        setIsAnswered(true);
        setIsCorrect(option === question.correctAnswer);
    };

    return (
        <div>
            <div className="panel">
                <h1>{category} Quiz</h1>
                <h2>{question.text}</h2>
            </div>
            <div className="grid">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        disabled={isAnswered}
                        style={{
                            backgroundColor: isAnswered
                                ? option === question.correctAnswer
                                    ? 'green'
                                    : option === selectedOption
                                    ? 'red'
                                    : 'white'
                                : 'white',
                            color: isAnswered && option === selectedOption ? 'white' : 'black',
                        }}
                    >
                        {option}
                    </button>
                ))}
            </div>
            {isAnswered && (
                <div className="panel">
                    {isCorrect ? (
                        <p style={{ color: 'green' }}>Correct!</p>
                    ) : (
                        <p style={{ color: 'red' }}>
                            Wrong! The correct answer is {question.correctAnswer}.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default QuizPage;

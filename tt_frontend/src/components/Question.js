import React, { useState } from 'react';

const Question = ({ question }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsAnswered(true);
        setIsCorrect(option === question.correct_answer);
    };

    return (
        <div className="question">
            <h2>{question.question}</h2>
            <div>
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        disabled={isAnswered}
                        className={isAnswered ? (option === question.correct_answer ? 'correct' : 'incorrect') : ''}
                    >
                        {option}
                    </button>
                ))}
            </div>
            {isAnswered && (
                <div>
                    {isCorrect ? <p>Correct!</p> : <p>Wrong. The correct answer is {question.correct_answer}.</p>}
                </div>
            )}
        </div>
    );
};

export default Question;

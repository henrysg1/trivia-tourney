import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
    { name: 'General Knowledge', id: 'general' },
    { name: 'Science', id: 'science' },
    { name: 'History', id: 'history' },
];

const SelectQuizPage = () => {
    const navigate = useNavigate();

    const selectCategory = (categoryId) => {
        // Pass the selected category as part of the state or URL
        navigate('/quiz', { state: { category: categoryId } });
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Select a Quiz Category</h1>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                {categories.map((category) => (
                    <div
                        key={category.id}
                        style={{
                            border: '1px solid #000',
                            padding: '20px',
                            cursor: 'pointer',
                            width: '150px',
                        }}
                        onClick={() => selectCategory(category.id)}
                    >
                        <h2>{category.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectQuizPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignupPage.css';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        country: '',
        profile_picture: null,
    });
    const [fileName, setFileName] = useState('No file chosen'); // To show selected file name
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({
            ...prev,
            profile_picture: file,
        }));
        setFileName(file ? file.name : 'No file chosen'); // Update file name display
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append('username', formData.username);
        form.append('email', formData.email);
        form.append('password', formData.password);
        form.append('country', formData.country);
        if (formData.profile_picture) {
            form.append('profile_picture', formData.profile_picture);
        }

        axios
            .post('http://127.0.0.1:8000/api/register/', form)
            .then(() => navigate('/'))
            .catch((err) => setError(err.response.data));
    };

    return (
        <div className="signup-page">
            <div className="logo">
                <h1>Trivia Tourney</h1>
            </div>
            <div className="signup-form">
                <h2>Create an Account</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="input-group">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="country"
                            placeholder="Country"
                            value={formData.country}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group file-input">
                        <label htmlFor="profile_picture" className="custom-file-label">
                            Choose File
                        </label>
                        <input
                            type="file"
                            id="profile_picture"
                            name="profile_picture"
                            onChange={handleFileChange}
                        />
                        <span className="file-name">{fileName}</span>
                    </div>
                    <button type="submit" className="signup-button">
                        Create Account
                    </button>
                </form>
                {error && <div className="error-message">{JSON.stringify(error)}</div>}
            </div>
        </div>
    );
};

export default SignupPage;
